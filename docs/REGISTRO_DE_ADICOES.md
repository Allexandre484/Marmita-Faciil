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

## Limitações
- LocalStorage não sincroniza dispositivos.
- Sem integração automática com WhatsApp.
- Entregador não está implementado.
- Fechamento diário detalhado e histórico por data estão planejados.
- Substituição de salada por farofa é anotada em observações.
- Fluxo de status ainda pode ser refinado para retirada e entrega.

## Próximas adições
| Prioridade | Adição | Critério |
|---|---|---|
| Alta | Destaque das personalizações | Cozinha identifica alterações rapidamente |
| Alta | Separação por etapas | Pedidos agrupados por situação |
| Alta | Fluxo de retirada e entrega | Etapas adequadas ao tipo de pedido |
| Média | Nome do entregador | Pedido registra responsável |
| Média | Fechamento por data e pagamento | Totais conferem com pedidos pagos |
| Média | Histórico | Consulta pedidos anteriores |
| Média | Aviso de atraso | Pedido antigo recebe destaque |

## Modelo para nova alteração
### [Data] — [Nome]
- Problema:
- Arquivos alterados:
- Implementação:
- Verificação:
- Resultado dos testes:
- Commit:
- Pendências: