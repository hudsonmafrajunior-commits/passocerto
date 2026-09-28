# Passo Firme

Triagem de risco de quedas em pessoas idosas, feita para ser aplicada por estudantes, agentes comunitários de saúde e profissionais em grupos de convivência, UBS e visitas domiciliares. Projeto de extensão em Fisioterapia (eixo Inovação e Sustentabilidade).

## O protocolo

Baseado na iniciativa **STEADI** (Stopping Elderly Accidents, Deaths & Injuries, do CDC):

| Etapa | O que avalia | Considerado alterado |
|---|---|---|
| Triagem | Quedas no último ano, instabilidade, medo de cair e outros fatores de risco (remédios, tontura, visão, urgência urinária…) | Queda no último ano, instabilidade ou medo de cair |
| Timed Up and Go | Mobilidade | 12 s ou mais, ou não conseguiu fazer |
| Sentar e levantar 30 s | Força de membros inferiores | Abaixo da referência por idade e sexo (Rikli e Jones), ou usou os braços |
| Equilíbrio em 4 posições | Equilíbrio estático | Não manteve o tandem por 10 s. Menos de 5 s em uma perna gera alerta adicional |
| Segurança da casa | Riscos no ambiente | Gera orientações, não entra no nível de risco |

**Nível de risco**
- **Alto:** queda com lesão ou 2 ou mais quedas no ano; ou triagem positiva com algum teste alterado; ou 2 ou mais testes alterados.
- **Moderado:** triagem positiva ou 1 teste alterado.
- **Baixo:** nenhum dos anteriores.

Os testes têm cronômetro embutido, com sinal sonoro e vibração. Um teste não realizado por incapacidade ou por segurança conta como alterado; por recusa, fica fora do cálculo.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | App do aplicador (triagem, testes, resultado e folha impressa) |
| `painel.html` | Painel da equipe, com senha |
| `config.js` | URL da API, nome do projeto, texto de encaminhamento, WhatsApp |
| `dados.js` | Perguntas, orientações, checklist da casa e tabelas de referência |
| `Codigo.gs` | Backend no Google Apps Script (não vai para o GitHub) |

## 1. Planilha e Apps Script

1. Crie uma planilha no Google Drive, por exemplo **Passo Firme - Dados**.
2. Na planilha: **Extensões > Apps Script**. Apague o conteúdo e cole o `Codigo.gs`. Salve.
3. Selecione `setup` e clique em **Executar**. Autorize.
4. Em **Registro de execução**, anote a **senha do painel**. A aba `Triagens` é criada automaticamente.
5. **Implantar > Nova implantação > App da Web**. Executar como: **Eu**. Quem pode acessar: **Qualquer pessoa**.
6. Copie a URL que termina em `/exec`.

> Ao alterar o `Codigo.gs`, use **Gerenciar implantações > Editar > Nova versão** para manter a mesma URL.

## 2. Configurar

No `config.js`, cole a URL em `API_URL` e ajuste `ENCAMINHAMENTO` com o serviço de referência do seu território. Abrir a URL `/exec` no navegador deve mostrar `API do Passo Firme funcionando`.

## 3. Publicar no GitHub Pages

1. Envie `index.html`, `painel.html`, `config.js`, `dados.js` e `README.md` para um repositório.
2. **Settings > Pages > Deploy from a branch > main / root**.
3. App: `https://SEU-USUARIO.github.io/passo-firme/` · Painel: `.../passo-firme/painel.html`

## Uso em campo

- O nome do aplicador e o local ficam lembrados no aparelho.
- Sem internet, a triagem é concluída normalmente e os dados são enviados quando a conexão voltar.
- O botão **Imprimir folha para a pessoa** gera uma folha com o resultado, as orientações e o código de reavaliação.
- Nenhum nome é coletado; apenas iniciais (opcionais) e telefone, se a pessoa aceitar contato.

## Dados

Cada triagem é uma linha da aba `Triagens`, com uma coluna para cada pergunta e cada teste. O painel usa a **primeira avaliação** de cada pessoa como retrato da população e compara a primeira com a última avaliação para medir a evolução.

## Referências

- CDC. STEADI – Older Adult Fall Prevention (Algorithm for Fall Risk Screening, Assessment & Intervention; Stay Independent; TUG; 30-Second Chair Stand; 4-Stage Balance Test).
- Rikli RE, Jones CJ. Senior Fitness Test Manual. Human Kinetics.
- Podsiadlo D, Richardson S. The Timed "Up & Go". J Am Geriatr Soc. 1991;39(2):142-8.
- Vellas BJ et al. One-leg balance is an important predictor of injurious falls in older persons. J Am Geriatr Soc. 1997;45(6):735-8.
