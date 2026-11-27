# Registro de adições e evolução — MarmitaFácil

Atualize este documento a cada entrega relevante.

## Versão inicial
### Arquivos
- index.html: página, resumo, fila e formulário.
- css/style.css: identidade visual minimalista e responsiva.
- js/app.js: eventos, renderização, LocalStorage e indicadores.
- js/orders.js: cálculo, criação, status e soma de recebimentos.
- tests/orders.test.js: testes automatizados.
- package.json: comando npm test.
- README.md: instruções do projeto.

### Funcionalidades
| Funcionalidade | Situação |
|---|---|
| Cadastro de cliente e pedido | Implementada |
| Tamanho e quantidade | Implementada |
| Sem feijão, sem salada e farofa extra | Implementada |
| Observações | Implementada |
| Cálculo automático | Implementada |
| Fila e avanço de status | Implementada |
| Pagamento pago/pendente | Implementada |
| Resumo de recebimentos | Implementada |
| Salvamento local | Implementada |
| Testes das regras iniciais | Implementados |
| Fila visual separada por etapa | Implementada |
| Personalizações em destaque | Implementada |

## Limitações
- LocalStorage não sincroniza dispositivos.
- Sem integração automática com WhatsApp.
- Entregador não está implementado.
- Fechamento diário detalhado e histórico por data estão planejados.
- Substituição de salada por farofa é anotada em observações.
- O sistema ainda não possui data/hora prevista do pedido; por isso, não calcula atrasos automaticamente.
- Fluxo de status específico para retirada e entrega implementado.

## Próximas adições
| Prioridade | Adição | Critério |
|---|---|---|
| Alta | Fluxo específico de retirada e entrega | Etapas adequadas ao tipo de pedido |
| Alta | Fechamento por data e pagamento | Totais conferem com pedidos pagos |
| Média | Nome do entregador | Pedido registra responsável |
| Média | Histórico | Consulta pedidos anteriores |
| Média | Aviso de atraso | Pedido com horário previsto recebe destaque |

## 2026-11-27 — Organização visual da cozinha
- Problema: a fila anterior mostrava todos os pedidos em uma lista única, dificultando a identificação rápida da etapa de produção.
- Arquivos alterados: `js/app.js`, `css/style.css`.
- Implementação: pedidos agrupados em colunas por status; cada coluna mostra a quantidade de pedidos; personalizações e observações receberam destaque visual.
- Verificação: conferir manualmente a exibição com pedidos em diferentes status e em tela pequena; executar `npm test`.
- Resultado dos testes: registrar após execução no ambiente local.
- Commit da implementação: `629ad31635064f274c186f9f956cd8889b2f488e` (JavaScript); `1a0cf1e61d610fc4fcc03600a9e46c37b4826f5b` (CSS).
- Pendências: fluxo de retirada e entrega específico; datas/horários previstos para permitir alerta de atraso.

## Modelo para nova alteração
### [Data] — [Nome]
- Problema:
- Arquivos alterados:
- Implementação:
- Verificação:
- Resultado dos testes:
- Commit:
- Pendências:


## 2026-11-27 — Fluxo específico de retirada e entrega
- Problema: pedidos de retirada percorriam a mesma sequência de status dos pedidos com entrega, incluindo uma etapa que não se aplica.
- Arquivos alterados: `js/orders.js`, `js/app.js`, `tests/orders.test.js`.
- Implementação: pedidos de retirada seguem Recebido → Em preparo → Pronto → Entregue. Pedidos de entrega seguem Recebido → Em preparo → Pronto → Saiu para entrega → Entregue. O botão informa o próximo status.
- Testes adicionados: avanço de status para entrega; retirada pula a etapa de entrega; rejeição de status inválido.
- Verificação: testes automatizados precisam ser executados com `npm test`; não declarar aprovação antes da execução.
- Commits: regras `f12bdce09cc242f8eeb18aa64726c7ffea8b2f20`; interface `820c33d46e02ecad77ff0bbf13c45899c7f4a5fb`; testes `8f4926f61a7175e676945241961ddddf65c59bee`.
- Pendências: validar manualmente os dois tipos de pedido no navegador e atualizar o Jira conforme a validação.


## 2026-11-27 — Fechamento diário do caixa
- Problema: o resumo anterior mostrava apenas o total geral recebido, sem separar as vendas por dia, forma de pagamento ou valores pendentes.
- Arquivos alterados: `index.html`, `js/app.js`, `js/orders.js`, `css/style.css`, `tests/orders.test.js`, `README.md`.
- Implementação: painel com seletor de data; total vendido no dia; total efetivamente recebido; valor e quantidade de pedidos pendentes; recebimentos pagos separados por Pix, dinheiro e cartão.
- Regra: vendas incluem todos os pedidos criados na data escolhida; recebido e divisão por forma de pagamento consideram somente pedidos marcados como pagos. Pendências são somadas separadamente.
- Persistência: utiliza os pedidos já salvos no LocalStorage; não cria backend nem sincronização entre dispositivos.
- Teste automatizado adicionado: confere filtro por data, soma de vendas, pagos, pendentes e divisão por forma de pagamento.
- Verificação manual pendente: conferir fechamento em duas datas, alternar pagamento de pendente para pago e comparar os valores apresentados.
- Resultado dos testes: pendente de execução local com `npm test`; não declarar aprovação antes da execução.
- Limitação: pedidos antigos sem `createdAt` válido não entram no resumo diário.
- Commit: será registrado após a atualização dos arquivos.


## 2026-11-27 — Histórico de pedidos por data
- Problema: pedidos antigos ficavam misturados à fila operacional, dificultando a consulta de vendas e ocorrências de dias anteriores.
- Arquivos alterados: `index.html`, `js/app.js`, `js/orders.js`, `css/style.css`, `tests/orders.test.js` e `README.md`.
- Implementação: nova área de histórico com seletor de data; exibe cliente, número, horário, tipo de pedido, marmitas, personalizações, observações, pagamento, status e total.
- Organização: pedidos da data escolhida são apresentados do mais recente para o mais antigo. O histórico é somente para consulta e não oferece botões para alterar status ou pagamento.
- Persistência: consulta os pedidos já armazenados no LocalStorage deste navegador. Não recupera dados de outros dispositivos nem pedidos que não estejam salvos.
- Testes adicionados: filtro por data, ordenação cronológica decrescente e retorno vazio quando nenhuma data é selecionada.
- Verificação: executar `npm test` e conferir manualmente datas com pedidos, datas sem pedidos e pedidos com personalizações.
- Resultado dos testes: pendente de execução local; não declarar aprovação antes da execução.
- Commit: registrado pelo GitHub após a atualização dos arquivos.
