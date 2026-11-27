# Plano e registro de testes — MarmitaFácil

## Objetivo
Verificar cálculo do pedido, personalizações, mudança de status e soma dos pagamentos recebidos.

## Ambiente
- HTML, CSS e JavaScript puro.
- LocalStorage do navegador.
- Node.js Test Runner (node:test).
- Regras em js/orders.js; testes em tests/orders.test.js.

## Casos automatizados
| ID | Cenário | Resultado esperado |
|---|---|---|
| T01 | Duas marmitas médias (R$ 22) com farofa extra (R$ 2 cada) | R$ 48,00 |
| T02 | Pedido com sem feijão e farofa extra | Personalizações registradas |
| T03 | Status atual Em preparo | Próximo status Pronto |
| T04 | R$ 20 pago, R$ 25 pendente e R$ 30 pago | R$ 50,00 recebidos |
| T05 | Quantidade igual a zero | Entrada rejeitada |

## Execução
Na pasta raiz, execute `npm test`. Registre data, quantidade de testes aprovados/reprovados e correções após cada execução. Não marque como aprovado sem executar.

## Testes manuais de usabilidade
Os testes abaixo precisam ser realizados com duas pessoas. Não preencher resultados fictícios.

### Participante 1
1. Cadastrar pedido para Cliente de teste.
2. Selecionar marmita média.
3. Marcar Sem feijão.
4. Escrever “trocar salada por farofa” nas observações.
5. Selecionar Pix e marcar como pago.
6. Salvar e localizar na fila.

### Participante 2
1. Cadastrar pedido para retirada.
2. Selecionar duas marmitas.
3. Escolher dinheiro e deixar pendente.
4. Salvar e avançar status até Pronto.
5. Localizar usando o filtro.

### Ficha de registro
| Pergunta | Participante 1 | Participante 2 |
|---|---|---|
| Concluiu sem ajuda? | A preencher | A preencher |
| Entendeu campos e botões? | A preencher | A preencher |
| Teve dificuldade? | A preencher | A preencher |
| Tempo gasto | A preencher | A preencher |
| Sugestão | A preencher | A preencher |

### Síntese
- Data:
- Participantes:
- Dificuldades:
- Melhorias priorizadas:
- Alterações realizadas:

## Critérios de aceite
- Total considera tamanho, quantidade e adicionais.
- Personalizações ficam visíveis no pedido.
- Status avança pelo fluxo definido.
- Caixa soma somente pedidos pagos.
- Interface permite cadastro simples e leitura rápida.