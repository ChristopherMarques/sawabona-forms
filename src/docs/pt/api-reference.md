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
| `i18n` | `object` | Não | Sobrescreve textos padrão (próximo, voltar). |

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
| `brandColor` | `string` | - | Cor para o nome da marca no selo. |

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
