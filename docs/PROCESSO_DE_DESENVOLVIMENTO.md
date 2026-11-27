# Processo de desenvolvimento e entregas acadêmicas

Este documento reúne como o MarmitaFácil foi planejado e desenvolvido, relacionando as atividades às práticas solicitadas na disciplina.

## Aplicação publicada

A versão web do projeto pode ser acessada pelo GitHub Pages:

**[https://allexandre484.github.io/Marmita-Faciil/](https://allexandre484.github.io/Marmita-Faciil/)**

## 1. Design Sprint

### Problema identificado
O recebimento de pedidos por mensagens pode dificultar a visualização de todos os pedidos, das personalizações, do andamento do preparo e da situação dos pagamentos.

### Persona de referência
**Marta — responsável pela marmitaria.** Precisa registrar pedidos rapidamente, repassar instruções claras à cozinha e saber quais pedidos estão prontos, em entrega ou com pagamento pendente.

### Jornada e gargalos
1. Receber o pedido: informações ficam espalhadas nas conversas.
2. Anotar itens e personalizações: existe risco de esquecer observações.
3. Preparar: é difícil saber a situação de cada pedido sem uma fila organizada.
4. Entregar ou disponibilizar para retirada: é necessário identificar o tipo de atendimento e o responsável pela entrega.
5. Receber: é importante distinguir pagamentos recebidos e pendentes.

### Solução proposta
Uma tela única para cadastrar pedidos e acompanhar cada um por etapas, com informações de personalização, entrega e pagamento.

### Wireframes e validação
Anexar nesta seção as imagens dos wireframes utilizados e registrar os testes com pelo menos duas pessoas. Para cada participante, informar apenas perfil geral (sem dados pessoais), tarefa executada, dificuldade observada, comentário e melhoria aplicada.

**Situação:** a estrutura da solução está descrita, mas as imagens dos wireframes e os resultados dos testes com duas pessoas devem ser inseridos após a realização/organização dessas evidências. Não considerar testes com usuários concluídos sem os respectivos registros.

## 2. Scrum e Kanban

### Organização
O trabalho foi dividido em histórias de usuário e acompanhado no Jira.

- [Projeto Marmita Fácil no Jira](https://a-team-xn76axk5.atlassian.net/jira/software/projects/MF/boards/2)
- Chave do projeto: `MF`
- Quadro: colunas de acompanhamento do fluxo de trabalho.

### Backlog resumido

| Área | História/necessidade | Prioridade |
|---|---|---|
| Pedidos | Cadastrar cliente, itens, quantidades e personalizações | Alta |
| Cozinha | Visualizar pedidos por etapa e atualizar o status | Alta |
| Entrega | Diferenciar entrega e retirada e registrar entregador | Média |
| Pagamentos | Registrar forma de pagamento e situação | Alta |
| Caixa | Consultar totais recebidos e pendentes por dia | Alta |
| Histórico | Consultar pedidos anteriores | Média |
| Comunicação | Abrir WhatsApp com mensagem do pedido pré-preenchida | Média |
| Qualidade | Testar cálculos, status, personalizações e fechamento | Alta |

### Sprints

**Sprint 1 — Cadastro e cozinha**
- Estrutura da aplicação e cadastro de pedidos.
- Cálculo de valores e personalizações.
- Organização da fila e atualização de status.
- Testes das regras principais.

**Sprint 2 — Entregas, pagamentos e histórico**
- Fluxo de entrega e retirada.
- Registro de entregador.
- Pagamentos e fechamento diário.
- Histórico e atalho para WhatsApp.
- Revisão e testes integrados.

As Sprints acima descrevem a divisão planejada do trabalho. Atualizar datas, responsáveis e resultados conforme o histórico real do Jira.

### Limites WIP
Como referência para o Kanban, limitar a até duas atividades simultâneas em andamento e duas em revisão. Se o quadro não aplicar o limite automaticamente, a equipe deve acompanhá-lo manualmente.

## 3. XP — desenvolvimento e qualidade

A aplicação foi construída de forma incremental, com separação entre estrutura HTML, estilos CSS e lógica JavaScript. As alterações são registradas por commits no GitHub.

### Práticas aplicadas
- Pequenas entregas incrementais.
- Testes automatizados para regras do módulo de pedidos.
- Verificação de sintaxe JavaScript na integração contínua.
- Revisão e correção de problemas encontrados.
- Atualização da documentação junto das funcionalidades.

### Executar os testes

```bash
npm test
```

O plano detalhado e o registro dos testes estão em [PLANO_E_REGISTRO_DE_TESTES.md](PLANO_E_REGISTRO_DE_TESTES.md).

## 4. Evidências para a entrega

- [ ] Capturas dos wireframes.
- [ ] Registro dos testes com pelo menos duas pessoas e melhorias realizadas.
- [ ] Captura do backlog no Jira.
- [ ] Capturas das duas Sprints e do quadro Kanban com limites WIP.
- [ ] Histórico de commits no GitHub.
- [ ] Resultado da execução dos testes automatizados.
- [ ] Demonstração da aplicação funcionando.

## 5. Uso de IA

A IA foi utilizada como apoio para gerar sugestões, revisar trechos de código e auxiliar na documentação e nos testes. A equipe deve revisar as sugestões, testar o comportamento no sistema e decidir quais alterações serão incorporadas. Problemas identificados e correções devem permanecer registrados no histórico do projeto.
