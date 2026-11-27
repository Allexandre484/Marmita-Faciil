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

Os pedidos ficam armazenados no LocalStorage do navegador utilizado. Para uma demonstração em sala, use sempre o mesmo navegador e dispositivo.

## Como executar os testes

É necessário ter Node.js instalado. No terminal, dentro da pasta do projeto, execute:

```bash
npm test
```

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
- Fila de pedidos com mudança de status.
- Registro de pagamento.
- Resumo de valores recebidos.

## Próximas etapas

- Melhorar o controle de entregas.
- Implementar histórico e fechamento diário do caixa.
- Realizar testes com pelo menos duas pessoas e registrar os resultados.
- Criar o Product Backlog, quadro Kanban e planejamento das Sprints.

## Transparência no uso de IA

A IA foi utilizada como copiloto para apoiar a estrutura inicial, sugerir organização dos arquivos e auxiliar na elaboração dos testes. As decisões de produto devem ser revisadas pela equipe, considerando a rotina da persona. Durante o desenvolvimento, registrar neste documento os erros identificados, as correções realizadas manualmente e as decisões finais tomadas pela equipe.
