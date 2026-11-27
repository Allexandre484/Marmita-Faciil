# MarmitaFácil

Aplicação web acadêmica para apoiar a rotina de uma pequena marmitaria, centralizando pedidos, acompanhamento da cozinha, entregas e pagamentos.

## Objetivo

Organizar os pedidos recebidos pela marmitaria, reduzir erros de personalização e facilitar o acompanhamento da produção e dos recebimentos.

## Funcionalidades

- Cadastro e consulta de pedidos.
- Seleção de tamanho, quantidade e personalizações, com cálculo automático do valor.
- Registro de observações, endereço, forma de pagamento e entregador.
- Acompanhamento da produção por etapas: Recebido, Em preparo, Pronto, Saiu para entrega e Entregue.
- Fluxo simplificado para retirada, sem etapa de entrega.
- Controle de pagamentos recebidos e pendentes.
- Fechamento diário do caixa, com totais por forma de pagamento.
- Histórico de pedidos por data.
- Atalho para WhatsApp com mensagem pré-preenchida. O envio é manual: a pessoa responsável revisa e confirma a mensagem no WhatsApp.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro
- LocalStorage para armazenamento local
- Node.js Test Runner para testes automatizados
- GitHub Actions para verificação automatizada e publicação

## Como executar

1. Clone ou baixe este repositório.
2. Abra a pasta do projeto.
3. Abra `index.html` em um navegador atualizado.

**Atenção:** os dados são armazenados no LocalStorage do navegador e dispositivo utilizados. Não há banco de dados em nuvem nem sincronização entre dispositivos. Limpar os dados do navegador pode apagar os pedidos salvos.

## Testes

É necessário ter Node.js instalado. Na pasta do projeto, execute:

```bash
npm test
```

A verificação automatizada também é executada pelo GitHub Actions a cada atualização da branch principal e em pull requests. Os testes cobrem regras de pedidos e cálculos implementados no módulo de pedidos.

## Estrutura do projeto

```text
.
├── .github/workflows/   # Automação de testes e publicação
├── css/                 # Estilos da aplicação
├── docs/                # Documentação do projeto e registros
├── js/                  # Lógica da aplicação
├── tests/               # Testes automatizados
├── index.html           # Página principal
├── package.json         # Configuração dos testes
└── README.md
```

## Documentação acadêmica

Os documentos de apoio às entregas estão na pasta [docs](docs/):

- [Processo de desenvolvimento e entregas acadêmicas](docs/PROCESSO_DE_DESENVOLVIMENTO.md)
- [Registro de adições e decisões](docs/REGISTRO_DE_ADICOES.md)
- [Plano e registro de testes](docs/PLANO_E_REGISTRO_DE_TESTES.md)

## Gestão do projeto

O acompanhamento das atividades da equipe é feito no [quadro Marmita Fácil no Jira](https://a-team-xn76axk5.atlassian.net/jira/software/projects/MF/boards/2). O repositório contém o código-fonte e a documentação necessária para compreender e avaliar o projeto.

## Limitações conhecidas

- Os pedidos ficam salvos apenas no navegador utilizado.
- O link do WhatsApp não envia mensagens automaticamente.
- Não há rastreamento GPS ou acompanhamento de entregas em tempo real.

## Uso de inteligência artificial

A IA foi utilizada como ferramenta de apoio para sugestões, revisão e identificação de possíveis erros. As decisões sobre funcionalidades, validação dos resultados, testes e ajustes finais devem ser avaliadas e assumidas pela equipe. O histórico de alterações e testes é mantido na documentação e nos commits do repositório.
