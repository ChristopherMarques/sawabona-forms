# Referência da API

Esta página detalha a estrutura JSON usada para definir formulários no Sawabona Forms. O schema é um objeto padrão que define desde as perguntas até o tema.

## FormSchema

O objeto raiz da definição do seu formulário.

| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| `id` | `string` | Sim | Identificador único do formulário. |
| `title` | `string` | Sim | O título do formulário. |
| `questions` | `Question[]` | Sim | Lista de objetos de pergunta (veja abaixo). |
| `theme` | `FormTheme` | Não | Opções de personalização da aparência. |
| `i18n` | `object` | Não | Sobrescreve textos (próximo, voltar, pressEnter). |
| `disableAutoFocus` | `boolean` | Não | Evita scroll/foco automático ao carregar. |
| `layoutSettings.internalScroll` | `boolean` | Não | Substitui o comportamento de rolagem interno. Se `true` (padrão), o formulário rola dentro de seu próprio contêiner. Se `false`, permite que a página global role naturalmente. |

## FormTheme (Tema)

Personalize o visual e estilo do seu formulário.

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `primaryColor` | `string` | - | Cor principal para botões e estados ativos. |
| `backgroundColor` | `string` | `#ffffff` | Cor de fundo do contêiner. |
| `textColor` | `string` | `#000000` | Cor do texto principal. |
| `fontFamily` | `string` | `sans-serif` | Família da fonte para todo o texto. |
| `borderRadius` | `string` | `8px` | Arredondamento das bordas de botões e inputs. |
| `submitText` | `string` | - | Texto personalizado para o botão de enviar. |
| `buttonVariant` | `'solid' \| 'outline'` | `'solid'` | Estilo dos botões de navegação (Sólido ou Contorno). |
| `showPoweredBy` | `boolean` | `true` | Se deve mostrar o selo "Powered By". |
| `poweredBy` | `string` | - | Texto personalizado para o selo. |
| `poweredByUrl` | `string` | - | URL ao clicar no selo. |
| `brandColor` | `string` | - | Cor para o nome da marca no selo. |

### Tipografia e Fontes

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `titleFont` | `string` | Fonte customizada para os títulos. |
| `descriptionFont` | `string` | Fonte customizada para as descrições. |
| `labelFont` | `string` | Fonte customizada para inputs e labels. |
| `titleFontSize` | `string` | Tamanho da fonte customizado do título (ex. `2rem`). |
| `descriptionFontSize` | `string` | Tamanho da fonte customizado da descrição. |
| `labelFontSize` | `string` | Tamanho da fonte customizado de labels e opções. |

### Estilização de Opções Multiescolha

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `optionPadding` | `string` | Preenchimento interno (padding) nas opções. |
| `optionBorderRadius` | `string` | Arredondamento da borda dos botões de opções. |
| `optionBorderWidth` | `string` | Espessura da borda. |
| `optionActiveColor` | `string` | Cor de destaque no fundo e borda quando a opção estiver ativa. |
| `optionGap` | `string` | Espaçamento (`gap`) entre as opções da lista. |
| `customClasses` | `object` | Configuração mestre para injeção de classes CSS (como Tailwind). Aceita as chaves: `container`, `title`, `description`, `input`, `option`, `optionActive`, `buttonPrimary`, `buttonSecondary`. |

## Question (Pergunta)

Define um único passo ou campo de entrada.

| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| `id` | `string` | Sim | ID único para a pergunta. |
| `type` | `string` | Sim | veja **Tipos de Pergunta**. |
| `title` | `string` | Sim | O texto principal da pergunta. |
| `description` | `string` | Não | Texto de ajuda abaixo do título. |
| `placeholder` | `string` | Não | Texto de exemplo para inputs. |
| `validation` | `object` | Não | Regras de validação (obrigatório, min, max, etc.). |
| `options` | `Option[]` | Não | Obrigatório para `select`, `multi-select`. |
| `multiple` | `boolean` | Não | Flag para acionar modo múltipla-escolha em perguntas `select`. |

## Tipos de Pergunta

| Tipo | Descrição |
|------|-----------|
| `text` | Entrada de texto simples. |
| `email` | Texto com validação de email. |
| `number` | Entrada numérica. |
| `url` | Entrada de URL. |
| `select` | Seleção única (dropdown ou rádio). |
| `multi-select` | Seleção múltipla. |
| `date` | Seletor de data. |
| `rating` | Avaliação por estrelas ou números. |
| `boolean` | Alternância Sim/Não. |

## Regras de Validação

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `required` | `boolean` | O campo é obrigatório? |
| `min` | `number` | Valor mínimo (números) ou tamanho mínimo. |
| `max` | `number` | Valor máximo (números) ou tamanho máximo. |
| `pattern` | `string` | Padrão Regex para inputs de texto. |
| `maskType` | `'phone' \| 'cellphone' \| 'cpf' \| 'cnpj' \| 'cep' \| 'custom'` | Máscaras formatadas automaticamente baseadas no tipo fornecido (opera sob campos não formatados). |
| `mask` | `string` | Define o padrão de máscara interativo em caso de `maskType` ser designado como `custom` (Ex: `#-#.#`). |

## Personalização Extra de i18n

Ao definir o bloco de `i18n`, chaves adicionais podem ser empregues para as opções.

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `selectKey` | `string` | Sobrescreve a dica padrão de `Select` (ou "Selecionar") exibida nas opções em "Select Key N". |
| `hideSelectText` | `boolean` | Oculta integralmente o informativo `Select Key N` / `Selecionar Tecla N` dos botões. |
