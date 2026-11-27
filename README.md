# MarmitaFácil

Web App acadêmico para ajudar uma pequena marmitaria a organizar pedidos, cozinha, entregas e pagamentos.

## Objetivo

Reduzir a desorganização dos pedidos recebidos pelo WhatsApp, evitar erros de personalização e facilitar o acompanhamento dos pagamentos.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro
- LocalStorage para persistência local
- Node.js Test Runner para testes automatizados

## Como executar

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto.
3. Abra o arquivo `index.html` no navegador.

Os pedidos ficam armazenados no LocalStorage do navegador utilizado. Para uma demonstração em sala, use sempre o mesmo navegador e dispositivo. O histórico consulta os pedidos salvos localmente e não sincroniza entre dispositivos.

## Como executar os testes

É necessário ter Node.js instalado. No terminal, dentro da pasta do projeto, execute:

```bash
npm test
```

O GitHub Actions também executa os testes automaticamente a cada atualização da branch `main` e em pull requests. Na execução de 27/11/2026, os 15 testes automatizados estavam aprovados.

## Estrutura

```text
marmitafacil/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── orders.js
├── tests/
│   └── orders.test.js
├── package.json
└── README.md
```

## Funcionalidades iniciais

- Cadastro de pedidos.
- Personalização de marmitas.
- Cálculo automático do total.
- Fila de pedidos organizada por etapa da cozinha, com contagem por status.
- Fluxo de status adaptado ao tipo de pedido: retirada não passa pela etapa de entrega.
- Destaque visual para personalizações e observações do pedido.
- Fila responsiva, com rolagem horizontal em telas maiores e organização em coluna no celular.
- Registro de pagamento.
- Resumo de valores recebidos.
- Fechamento diário por data, com total vendido, recebido, pendente e divisão dos recebimentos por Pix, dinheiro e cartão.
- Histórico de pedidos por data, com consulta dos pedidos em ordem do mais recente para o mais antigo, sem ações de alteração na fila.
- Cadastro opcional do entregador no pedido, com possibilidade de definir ou alterar o responsável depois; pedidos de retirada não exibem essa opção.

## Próximas etapas

- Validar manualmente o cadastro e a alteração do entregador.
- Validar o histórico de pedidos e o fechamento diário do caixa com usuários.
- Realizar testes com pelo menos duas pessoas e registrar os resultados.
- Criar o Product Backlog, quadro Kanban e planejamento das Sprints.

## Transparência no uso de IA

A IA foi utilizada como copiloto para apoiar a estrutura inicial, sugerir organização dos arquivos e auxiliar na elaboração dos testes. As decisões de produto devem ser revisadas pela equipe, considerando a rotina da persona. Durante o desenvolvimento, registrar neste documento os erros identificados, as correções realizadas manualmente e as decisões finais tomadas pela equipe.
