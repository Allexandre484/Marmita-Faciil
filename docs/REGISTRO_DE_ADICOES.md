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
- Fluxo de status ainda pode ser refinado para retirada e entrega.

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
