/* ============================================================
   PASSO FIRME — ilustrações e mini-gráficos em SVG
   Usado pelo app (index.html) e pelo painel (painel.html).
   As cores vêm das variáveis CSS de cada página.
   ============================================================ */
window.ILU = (function () {
  let n = 0;
  const uid = p => p + (++n);
  const S = 'stroke-linecap="round" stroke-linejoin="round" fill="none"';
  const seta = id => `<marker id="${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" style="fill:var(--muted)"/></marker>`;

  /* ---------- cenas dos testes ---------- */
  function tug() {
    const m = uid('m');
    return `<svg class="ilu" viewBox="0 0 360 184" role="img" aria-label="Cadeira de 46 centímetros e percurso de 3 metros até a marca, ida e volta">
      <defs>${seta(m)}</defs>
      <line x1="8" y1="150" x2="352" y2="150" style="stroke:var(--line)" stroke-width="3" stroke-linecap="round"/>
      <g ${S} style="stroke:var(--ink)" stroke-width="6"><path d="M54 62 V150 M54 104 H96 M92 104 V150"/></g>
      <line x1="34" y1="106" x2="34" y2="148" style="stroke:var(--muted)" stroke-width="1.5" marker-start="url(#${m})" marker-end="url(#${m})"/>
      <text x="26" y="98" text-anchor="middle" class="ilu-t">46 cm</text>
      <path d="M104 52 C160 14, 250 14, 310 54" ${S} style="stroke:var(--acc)" stroke-width="2.5" stroke-dasharray="6 6" marker-end="url(#${m})"/>
      <path d="M306 72 C250 46, 160 46, 110 70" ${S} style="stroke:var(--acc)" stroke-width="2.5" stroke-dasharray="6 6" marker-end="url(#${m})" opacity=".55"/>
      <text x="200" y="22" text-anchor="middle" class="ilu-t ilu-m">ida e volta, no passo habitual</text>
      <g ${S} style="stroke:var(--pri)" stroke-width="6">
        <path d="M200 76 L195 110 M199 82 L214 99 M199 82 L184 97 M195 110 L211 148 M195 110 L181 148"/></g>
      <circle cx="203" cy="64" r="9" style="fill:var(--pri)"/>
      <path d="M308 150 L318 120 L328 150 Z" style="fill:var(--acc)"/><rect x="304" y="148" width="28" height="4" rx="2" style="fill:var(--acc)"/>
      <line x1="96" y1="166" x2="316" y2="166" style="stroke:var(--muted)" stroke-width="1.5" marker-start="url(#${m})" marker-end="url(#${m})"/>
      <text x="206" y="181" text-anchor="middle" class="ilu-t">3 metros</text>
    </svg>`;
  }

  function sl() {
    const m = uid('m');
    return `<svg class="ilu" viewBox="0 0 330 184" role="img" aria-label="Pessoa levantando e sentando numa cadeira de 43 centímetros, com os braços cruzados, durante 30 segundos">
      <defs>${seta(m)}</defs>
      <line x1="8" y1="150" x2="322" y2="150" style="stroke:var(--line)" stroke-width="3" stroke-linecap="round"/>
      <g ${S} style="stroke:var(--ink)" stroke-width="6"><path d="M58 60 V150 M58 107 H108 M104 107 V150"/></g>
      <line x1="40" y1="109" x2="40" y2="148" style="stroke:var(--muted)" stroke-width="1.5" marker-start="url(#${m})" marker-end="url(#${m})"/>
      <text x="30" y="100" text-anchor="middle" class="ilu-t">43 cm</text>
      <g opacity=".35"><g ${S} style="stroke:var(--pri)" stroke-width="6"><path d="M76 99 L72 64 M76 99 L118 99 L120 148 M64 74 L84 80 M84 74 L64 80"/></g><circle cx="71" cy="50" r="9" style="fill:var(--pri)"/></g>
      <path d="M126 62 Q160 20 194 40" ${S} style="stroke:var(--acc)" stroke-width="2.5" marker-end="url(#${m})"/>
      <path d="M194 112 Q160 136 128 118" ${S} style="stroke:var(--acc)" stroke-width="2.5" marker-end="url(#${m})" opacity=".6"/>
      <g ${S} style="stroke:var(--pri)" stroke-width="6"><path d="M214 42 V96 M214 96 L206 148 M214 96 L222 148 M203 58 L225 64 M225 58 L203 64"/></g>
      <circle cx="214" cy="28" r="9" style="fill:var(--pri)"/>
      <g transform="translate(282 52)"><circle r="20" style="fill:var(--surface);stroke:var(--acc)" stroke-width="3"/><path d="M0 -12 V0 L8 6" ${S} style="stroke:var(--acc)" stroke-width="3"/></g>
      <text x="282" y="94" text-anchor="middle" class="ilu-t">30 s</text>
      <text x="160" y="178" text-anchor="middle" class="ilu-t ilu-m">braços cruzados no peito</text>
    </svg>`;
  }

  /* ---------- pés (vista de cima) para o teste de equilíbrio ---------- */
  function pe(cx, cy, lado, estilo, dedos) {
    const k = lado === 'D' ? 1 : -1, x = d => cx + d * k;
    let g = `<path d="M${x(-6)} ${cy + 15} Q${x(-9)} ${cy - 2} ${x(-6)} ${cy - 11} Q${cx} ${cy - 15} ${x(6)} ${cy - 10} Q${x(9)} ${cy - 1} ${x(6)} ${cy + 15} Q${cx} ${cy + 20} ${x(-6)} ${cy + 15} Z" ${estilo}/>`;
    if (dedos !== false) [[-4.5, -16, 3.2], [0, -17.5, 2.3], [3.4, -16.5, 2], [6, -14.5, 1.8], [8, -12, 1.5]]
      .forEach(([dx, dy, r]) => { g += `<circle cx="${x(dx)}" cy="${cy + dy}" r="${r}" ${estilo}/>`; });
    return g;
  }
  const POS = [
    [[26, 45, 'E'], [44, 45, 'D']],
    [[27, 54, 'E'], [43, 36, 'D']],
    [[35, 63, 'E'], [35, 27, 'D']],
    [[35, 46, 'E']]
  ];
  function pes(i, status, tam) {
    const cor = status === 'ok' ? 'var(--ok)' : status === 'fail' ? 'var(--bad)' : 'var(--muted)';
    const est = `style="fill:${cor};fill-opacity:.18;stroke:${cor}" stroke-width="2.5"`;
    let g = POS[i].map(([x, y, l]) => pe(x, y, l, est)).join('');
    if (i === 3) g += pe(52, 34, 'D', `style="fill:none;stroke:${cor}" stroke-width="1.8" stroke-dasharray="3 3" opacity=".6"`);
    const nomes = ['pés juntos', 'semi-tandem', 'tandem', 'apoio em uma perna'];
    return `<svg class="pes" viewBox="0 0 70 90" width="${tam || 56}" height="${Math.round((tam || 56) * 90 / 70)}" role="img" aria-label="Posição dos pés: ${nomes[i]}">${g}</svg>`;
  }

  /* ---------- medidor de risco ---------- */
  function arco(cx, cy, r, a0, a1) {
    const p = a => [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  function medidor(risco) {
    const ang = { baixo: 150, moderado: 90, alto: 30 }[risco] ?? 90;
    const nx = 100 + 62 * Math.cos(ang * Math.PI / 180), ny = 100 - 62 * Math.sin(ang * Math.PI / 180);
    return `<svg class="medidor" viewBox="0 0 200 118" role="img" aria-label="Medidor de risco: ${risco}">
      <path d="${arco(100, 100, 80, 178, 122)}" style="stroke:var(--baixo)" stroke-width="20" fill="none"/>
      <path d="${arco(100, 100, 80, 118, 62)}" style="stroke:var(--moderado)" stroke-width="20" fill="none"/>
      <path d="${arco(100, 100, 80, 58, 2)}" style="stroke:var(--alto)" stroke-width="20" fill="none"/>
      <line x1="100" y1="100" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" style="stroke:var(--ink)" stroke-width="6" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="9" style="fill:var(--ink)"/>
      <text x="22" y="116" class="ilu-t ilu-m" text-anchor="middle">baixo</text><text x="178" y="116" class="ilu-t ilu-m" text-anchor="middle">alto</text>
    </svg>`;
  }

  /* ---------- barra com faixa de referência ---------- */
  function barra(o) {
    const W = 300, x0 = 12, x1 = 288, max = o.max, X = v => x0 + (Math.max(0, Math.min(v, max)) / max) * (x1 - x0);
    const xr = X(o.ref), bomAbaixo = o.bom === 'abaixo';
    const zonaBoa = bomAbaixo ? [x0, xr] : [xr, x1], zonaRuim = bomAbaixo ? [xr, x1] : [x0, xr];
    let marca = '';
    if (o.valor != null && o.valor !== '') {
      const v = Number(o.valor), ok = bomAbaixo ? v < o.ref : v >= o.ref, xv = X(v);
      marca = `<circle cx="${xv}" cy="30" r="9" style="fill:${ok ? 'var(--ok)' : 'var(--bad)'};stroke:var(--surface)" stroke-width="3"/>
        <text x="${Math.min(Math.max(xv, 30), 270)}" y="12" text-anchor="middle" class="ilu-v">${String(o.rotulo ?? v).replace('.', ',')}${o.unidade || ''}</text>`;
    } else marca = `<text x="150" y="12" text-anchor="middle" class="ilu-t ilu-m">não realizado</text>`;
    return `<svg class="barra" viewBox="0 0 ${W} 58" role="img" aria-label="${o.aria || ''}">
      <rect x="${x0}" y="24" width="${x1 - x0}" height="12" rx="6" style="fill:var(--line)"/>
      <rect x="${zonaBoa[0]}" y="24" width="${Math.max(0, zonaBoa[1] - zonaBoa[0])}" height="12" style="fill:var(--ok)" opacity=".28"/>
      <rect x="${zonaRuim[0]}" y="24" width="${Math.max(0, zonaRuim[1] - zonaRuim[0])}" height="12" style="fill:var(--bad)" opacity=".22"/>
      <line x1="${xr}" y1="18" x2="${xr}" y2="42" style="stroke:var(--ink)" stroke-width="2.5"/>
      <text x="${xr}" y="54" text-anchor="middle" class="ilu-t">ref. ${String(o.ref).replace('.', ',')}${o.unidade || ''}</text>
      <text x="${x0}" y="54" class="ilu-t ilu-m">0</text><text x="${x1}" y="54" text-anchor="end" class="ilu-t ilu-m">${max}${o.unidade || ''}</text>
      ${marca}</svg>`;
  }

  /* ---------- ícones ---------- */
  const IC = {
    triagem: '<rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 11h6M9 15h4"/>',
    tug: '<circle cx="13" cy="4" r="2"/><path d="M12 7l-2 7 3 3v5M10 14l-3 8M11 9l5 3M11 9l-4 3"/>',
    sl: '<path d="M6 3v18M6 13h11v8M15 13v-2"/>',
    eq: '<path d="M8 4c-2 0-3 3-3 6s1 5 3 5 2-2 2-5-1-6-2-6zM16 9c-2 0-3 3-3 6s1 5 3 5 2-2 2-5-1-6-2-6z"/>',
    casa: '<path d="M3 11l9-7 9 7v10H3z"/><path d="M10 21v-6h4v6"/>',
    alerta: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
    pessoas: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-4 3-6 6-6s6 2 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14c3 0 5 2 5 5"/>',
    relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    queda: '<circle cx="15" cy="4" r="2"/><path d="M14 7l-5 5 4 3-3 6M9 12l-5-1M13 15l6 1"/><path d="M3 21h18"/>',
    grafico: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    check: '<path d="M5 12l5 5 9-10"/>'
  };
  const icone = (nome, tam) => `<svg class="ic" viewBox="0 0 24 24" width="${tam || 22}" height="${tam || 22}" stroke="currentColor" stroke-width="2" ${S} aria-hidden="true">${IC[nome] || ''}</svg>`;

  /* ---------- ilustração da tela inicial ---------- */
  function hero() {
    let pegadas = '';
    [[34, 172, 'E'], [62, 150, 'D'], [92, 170, 'E'], [122, 148, 'D'], [152, 168, 'E']].forEach(([x, y, l], i) => {
      pegadas += `<g transform="translate(${x} ${y}) rotate(80) scale(.62)" opacity="${.3 + i * .12}">${pe(0, 0, l, 'style="fill:var(--acc)"')}</g>`;
    });
    return `<svg class="ilu hero-svg" viewBox="0 0 320 200" role="img" aria-label="Pessoa caminhando com passos firmes">
      <circle cx="210" cy="104" r="88" style="fill:var(--pri-soft)"/>
      ${pegadas}
      <g ${S} style="stroke:var(--pri)" stroke-width="8">
        <path d="M206 78 L198 128 M204 88 L224 112 M204 88 L184 108 M198 128 L218 176 M198 128 L178 172"/></g>
      <circle cx="210" cy="62" r="13" style="fill:var(--pri)"/>
      <line x1="150" y1="180" x2="290" y2="180" style="stroke:var(--line)" stroke-width="4" stroke-linecap="round"/>
    </svg>`;
  }

  return { tug, sl, pes, medidor, barra, icone, hero };
})();
