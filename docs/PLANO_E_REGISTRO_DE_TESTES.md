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

## Registro de validação — 2026-11-27

### Melhoria: fila da cozinha organizada por etapa
- Arquivos envolvidos: `js/app.js` e `css/style.css`.
- Documentação complementar: `README.md` e `docs/REGISTRO_DE_ADICOES.md`.
- Cenário manual 1: cadastrar pedidos em diferentes status e conferir se cada pedido aparece na coluna correspondente.
- Cenário manual 2: conferir os contadores de cada coluna após avançar o status de um pedido.
- Cenário manual 3: cadastrar pedidos com Sem feijão, Sem salada, Farofa extra e observações; conferir se os avisos aparecem no cartão.
- Cenário manual 4: abrir a aplicação em tela estreita e conferir a organização responsiva.
- Regressão: executar `npm test` para verificar se cálculo, personalizações, status e recebimentos continuam funcionando.
- Resultado: pendente de execução local. Não declarar os cenários aprovados antes de testá-los.
- Observação: a fila apresenta as etapas Recebido, Em preparo, Pronto, Saiu para entrega e Entregue. O fluxo específico de retirada ainda será desenvolvido.


## Registro de validação — 2026-11-27

### Melhoria: fluxo por tipo de pedido
- Cenário automatizado 1: pedido de entrega em Pronto avança para Saiu para entrega.
- Cenário automatizado 2: pedido de retirada em Pronto avança diretamente para Entregue.
- Cenário automatizado 3: pedido de retirada em Em preparo avança para Pronto.
- Cenário automatizado 4: status desconhecido gera erro.
- Cenários manuais: cadastrar um pedido de Entrega e outro de Retirada; avançar ambos e conferir as etapas exibidas no quadro.
- Resultado da execução: pendente de execução local; rodar `npm test` na pasta do projeto. Não registrar como aprovado sem execução.


## Registro de validação — 2026-11-27

### Melhoria: fechamento diário do caixa
- Cenário automatizado: três pedidos em 27/11/2026 (dois pagos, um pendente) e um pedido em 26/11/2026; conferir que somente os três pedidos da data selecionada são considerados.
- Resultado esperado: vendas R$ 95,00; recebido R$ 70,00; pendente R$ 25,00; um pedido pendente; Pix R$ 30,00; dinheiro R$ 0,00; cartão R$ 40,00.
- Cenários manuais: selecionar uma data sem pedidos; alternar entre duas datas; marcar um pedido pendente como pago e conferir a atualização; testar em tela pequena.
- Regressão: executar `npm test`.
- Resultado: pendente de execução local. Não marcar como aprovado antes da execução.


## Registro de validação — 2026-11-27

### Melhoria: histórico de pedidos por data
- Cenário automatizado 1: informar uma data e confirmar que somente os pedidos daquele dia são retornados.
- Cenário automatizado 2: confirmar que os pedidos aparecem do horário mais recente para o mais antigo.
- Cenário automatizado 3: informar data vazia e confirmar que a lista fica vazia.
- Cenários manuais: cadastrar dois pedidos em uma data; escolher essa data no histórico; conferir cliente, horário, tipo, tamanho, personalizações, observações, pagamento, status e valor; selecionar outra data sem pedidos; confirmar a mensagem de lista vazia.
- Segurança operacional: confirmar que a consulta do histórico não apresenta botões para avançar status nem alterar pagamento.
- Regressão: executar `npm test`.
- Resultado: pendente de execução local. Não marcar como aprovado antes da execução.
- Limitação: o histórico depende do LocalStorage do navegador e não sincroniza dados entre dispositivos.


### Resultado da execução automatizada — 27/11/2026
- Ambiente: GitHub Actions, Ubuntu, Node.js 20.
- Comando executado: `npm test`.
- Resultado: 11 testes aprovados, 0 reprovados, 0 ignorados.
- Inclui os cenários de filtro de histórico por data, ordenação do mais recente para o mais antigo e data vazia.
- Execução: https://github.com/Allexandre484/Marmita-Faciil/actions/runs/45999374727
- Validação manual no navegador e teste com usuários: ainda pendentes.


## Registro de validação — cadastro e acompanhamento do entregador (MF-13)

### Cenários automatizados
- Criar pedido de entrega com nome do entregador e confirmar que o nome fica salvo.
- Definir o entregador após cadastrar o pedido.
- Alterar o entregador já atribuído.
- Rejeitar nome vazio e nome com mais de 60 caracteres.
- Confirmar que pedidos de retirada não recebem entregador.

### Cenários manuais
- Cadastrar um pedido de entrega informando o entregador.
- Cadastrar outro pedido sem entregador e usar o botão “Definir entregador”.
- Alterar o nome e recarregar a página para verificar a persistência.
- Conferir o nome no cartão do pedido e no histórico.
- Selecionar Retirada e confirmar que endereço e entregador ficam ocultos e que o fluxo pula “Saiu para entrega”.
- Testar em tela pequena.

### Resultado
- Testes automatizados: aguardando execução do GitHub Actions.
- Testes manuais: pendentes; não declarar aprovação antes de testar.
- Limitação: não há GPS, rastreamento em tempo real, cadastro/login de entregadores ou atualização remota.


### Resultado da execução automatizada — 27/11/2026
- Ambiente: GitHub Actions, Ubuntu, Node.js 20.
- Comando executado: `npm test`.
- Resultado: 15 testes aprovados, 0 reprovados.
- Novos cenários de entregador aprovados: cadastro junto ao pedido, atribuição posterior, alteração do responsável, rejeição de nome vazio, bloqueio para retirada e limite de 60 caracteres.
- Execução: https://github.com/Allexandre484/Marmita-Faciil/actions/runs/46000306525
- Validação manual da interface ainda pendente.
