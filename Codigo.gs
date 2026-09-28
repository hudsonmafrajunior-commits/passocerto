/**
 * PASSO FIRME — backend (Google Apps Script)
 * Banco de dados: a planilha à qual este script está vinculado (aba "Triagens").
 *
 * 1. Rode setup() uma vez (menu Executar) e autorize.
 * 2. Veja a senha do painel em Registro de execução.
 * 3. Implante como App da Web (Executar como: Eu | Acesso: Qualquer pessoa).
 */

const TRIAGEM = ['instavel', 'medo', 'auxilio', 'apoio_moveis', 'levantar_bracos', 'meds', 'meds_sono', 'tontura', 'urgencia', 'visao', 'pes', 'tristeza'];
const CASA = ['casa_tapetes', 'casa_luz', 'casa_barras', 'casa_piso', 'casa_escada', 'casa_alcance', 'casa_calcado', 'casa_animais', 'casa_cama'];

const CAB = ['data_hora', 'codigo', 'tipo', 'aplicador', 'local', 'iniciais', 'idade', 'sexo',
  'queda12', 'quedas_n', 'queda_lesao', ...TRIAGEM,
  'tug_s', 'tug_status', 'tug_auxilio', 'tug_marcha',
  'sl_reps', 'sl_status', 'sl_bracos', 'sl_ref',
  'eq_e1', 'eq_e2', 'eq_e3', 'eq_e4', 'eq_status',
  ...CASA,
  'triagem_positiva', 'tug_alterado', 'sl_alterado', 'eq_alterado', 'unipodal_menor5', 'n_alterados', 'risco',
  'aceita_contato', 'contato', 'obs', 'id_envio'];
const NUMERICOS = ['idade', 'tug_s', 'sl_reps', 'sl_ref', 'eq_e1', 'eq_e2', 'eq_e3', 'eq_e4', 'n_alterados'];

/* ---------------- configuração ---------------- */
function setup() {
  aba_();
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('SENHA_PAINEL')) props.setProperty('SENHA_PAINEL', Utilities.getUuid().slice(0, 8));
  Logger.log('Tudo pronto. Senha do painel: ' + props.getProperty('SENHA_PAINEL'));
}

/** Para trocar a senha: edite o texto e rode esta função. */
function trocarSenhaPainel() {
  PropertiesService.getScriptProperties().setProperty('SENHA_PAINEL', 'COLOQUE_A_NOVA_SENHA');
}

/* ---------------- API ---------------- */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (!/^QDA-[A-Z0-9]{5}$/.test(d.codigo || '')) throw new Error('código inválido');
    if (['avaliacao', 'reavaliacao'].indexOf(d.tipo) < 0) throw new Error('tipo inválido');
    const idade = Number(d.idade);
    if (!(idade >= 60 && idade <= 120)) throw new Error('idade inválida');

    // evita duplicar quando a fila offline reenvia
    const idEnvio = d.codigo + '|' + d.tipo + '|' + JSON.stringify([d.tug_s, d.sl_reps, d.eq_e1, d.eq_e2, d.eq_e3, d.eq_e4, d.risco, d.idade]);
    const sh = aba_();
    if (sh.getLastRow() > 1) {
      const col = CAB.indexOf('id_envio') + 1;
      if (sh.getRange(2, col, sh.getLastRow() - 1, 1).createTextFinder(idEnvio).matchEntireCell(true).findNext()) return json_({ ok: true, repetido: true });
    }
    d.id_envio = idEnvio;
    sh.appendRow(CAB.map(h => h === 'data_hora' ? new Date() : limpar_(h, d[h])));
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, erro: String(err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const p = e.parameter || {};
  try {
    if (p.action === 'codigo') {
      const c = String(p.c || '').toUpperCase();
      const regs = linhas_().filter(r => r.codigo === c);
      if (!regs.length) return json_({ ok: true, existe: false });
      const u = regs[regs.length - 1];
      return json_({ ok: true, existe: true, ant: {
        data: dataTxt_(u.data_hora, 'dd/MM/yyyy'), sexo: u.sexo, iniciais: u.iniciais, risco: u.risco,
        tug_s: u.tug_s, sl_reps: u.sl_reps, eq_e3: u.eq_e3, eq_e4: u.eq_e4 } });
    }
    if (p.action === 'painel') {
      const senha = PropertiesService.getScriptProperties().getProperty('SENHA_PAINEL');
      if (!senha || p.key !== senha) return json_({ ok: false, erro: 'senha incorreta' });
      return json_(Object.assign({ ok: true }, painel_()));
    }
    return json_({ ok: true, msg: 'API do Passo Firme funcionando' });
  } catch (err) {
    return json_({ ok: false, erro: String(err.message || err) });
  }
}

/* ---------------- painel ---------------- */
function painel_() {
  const todas = linhas_();
  // primeira avaliação de cada pessoa = retrato da população (linha de base)
  const porCodigo = {};
  todas.forEach(r => { (porCodigo[r.codigo] = porCodigo[r.codigo] || []).push(r); });
  const base = Object.keys(porCodigo).map(c => porCodigo[c][0]);
  const n = base.length;

  const conta = (arr, campo) => arr.reduce((o, r) => { const v = r[campo]; if (v !== '' && v != null) o[v] = (o[v] || 0) + 1; return o; }, {});
  const sim = campo => base.filter(r => r[campo] === 'sim').length;
  const media = a => a.length ? a.reduce((s, v) => s + v, 0) / a.length : null;
  const nums = (arr, campo) => arr.map(r => r[campo]).filter(v => v !== '' && v != null && !isNaN(v)).map(Number);

  const fatores = {}; TRIAGEM.forEach(k => fatores[k] = sim(k));
  const casa = {}; CASA.forEach(k => casa[k] = conta(base, k));

  const faixa = i => i < 65 ? '60 a 64' : i < 70 ? '65 a 69' : i < 75 ? '70 a 74' : i < 80 ? '75 a 79' : i < 85 ? '80 a 84' : '85 ou mais';
  const faixas = base.reduce((o, r) => { const f = faixa(Number(r.idade)); o[f] = (o[f] || 0) + 1; return o; }, {});

  // evolução: pessoas com duas ou mais avaliações (primeira x última)
  const ordem = { baixo: 0, moderado: 1, alto: 2 };
  const pares = Object.keys(porCodigo).filter(c => porCodigo[c].length > 1).map(c => ({ a: porCodigo[c][0], b: porCodigo[c][porCodigo[c].length - 1] }));
  const par = campo => pares.filter(p => num_(p.a[campo]) != null && num_(p.b[campo]) != null);
  const evol = campo => { const ps = par(campo); return { n: ps.length, antes: media(ps.map(p => num_(p.a[campo]))), depois: media(ps.map(p => num_(p.b[campo]))) }; };
  const mudanca = { melhorou: 0, igual: 0, piorou: 0 };
  pares.forEach(p => { const d = ordem[p.b.risco] - ordem[p.a.risco]; if (d < 0) mudanca.melhorou++; else if (d > 0) mudanca.piorou++; else mudanca.igual++; });

  const ultimas = todas.slice(-40).reverse().map(r => ({
    data: dataTxt_(r.data_hora, 'dd/MM/yyyy HH:mm'), codigo: r.codigo, tipo: r.tipo, aplicador: r.aplicador, local: r.local,
    idade: r.idade, sexo: r.sexo, risco: r.risco, tug_s: r.tug_s, sl_reps: r.sl_reps, eq_e4: r.eq_e4, queda12: r.queda12,
    contato: r.aceita_contato === 'sim' ? r.contato : '', obs: r.obs
  }));

  return {
    pessoas: n, registros: todas.length, reavaliacoes: todas.filter(r => r.tipo === 'reavaliacao').length,
    risco: conta(base, 'risco'), locais: conta(base, 'local'), aplicadores: conta(todas, 'aplicador'), sexo: conta(base, 'sexo'), faixas,
    quedas: sim('queda12'), quedasLesao: sim('queda_lesao'), triagemPositiva: sim('triagem_positiva'),
    tugAlt: sim('tug_alterado'), slAlt: sim('sl_alterado'), eqAlt: sim('eq_alterado'), uni5: sim('unipodal_menor5'),
    tugMedia: media(nums(base, 'tug_s')), slMedia: media(nums(base, 'sl_reps')), idadeMedia: media(nums(base, 'idade')),
    fatores, casa,
    evolucao: { pessoas: pares.length, tug: evol('tug_s'), sl: evol('sl_reps'), unipodal: evol('eq_e4'), risco: mudanca },
    ultimas
  };
}

/* ---------------- utilitários ---------------- */
function aba_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Triagens');
  if (!sh) sh = ss.insertSheet('Triagens');
  if (sh.getLastRow() === 0) {
    sh.appendRow(CAB);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, CAB.length).setFontWeight('bold');
  }
  return sh;
}

function linhas_() {
  const sh = aba_(), n = sh.getLastRow();
  if (n < 2) return [];
  const vals = sh.getRange(1, 1, n, sh.getLastColumn()).getValues(), h = vals.shift();
  return vals.map(r => { const o = {}; h.forEach((k, i) => o[k] = r[i]); return o; });
}

function limpar_(campo, v) {
  if (v === '' || v == null) return '';
  if (NUMERICOS.indexOf(campo) >= 0) { const x = Number(v); return isNaN(x) ? '' : x; }
  let s = String(v).slice(0, campo === 'obs' ? 400 : campo === 'id_envio' ? 200 : 80);
  if (/^[=+\-@]/.test(s)) s = "'" + s; // impede fórmulas na planilha
  return s;
}
function num_(v) { return v === '' || v == null || isNaN(v) ? null : Number(v); }
function dataTxt_(v, f) { return v instanceof Date ? Utilities.formatDate(v, Session.getScriptTimeZone(), f) : String(v || ''); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
