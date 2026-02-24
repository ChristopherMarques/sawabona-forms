# API Reference

This page details the JSON structure used to define forms in Sawabona Forms. The schema is a standard JSON object that defines everything from questions to theming.

## FormSchema

The root object of your form definition.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the form. |
| `title` | `string` | Yes | The title of the form. |
| `questions` | `Question[]` | Yes | An array of question objects (see below). |
| `theme` | `FormTheme` | No | Customization options for the form's appearance. |
| `i18n` | `object` | No | Override labels (next, back, submit, pressEnter). |
| `disableAutoFocus` | `boolean` | No | Prevent auto-scroll/focus on load. |
| `layoutSettings.internalScroll` | `boolean` | No | Overrides the internal form scrolling behavior. If `true` (default), the form scrolls inside its own container. If `false`, it lets the parent window scroll naturally. |

## FormTheme

Customize the look and feel of your form.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `primaryColor` | `string` | - | Main color for buttons and active states. |
| `backgroundColor` | `string` | `#ffffff` | Background color of the form container. |
| `textColor` | `string` | `#000000` | Main text color. |
| `fontFamily` | `string` | `sans-serif` | Font family for all text. |
| `borderRadius` | `string` | `8px` | Border radius for buttons and inputs. |
| `submitText` | `string` | - | Custom text for the final submit button. |
| `buttonVariant` | `'solid' \| 'outline'` | `'solid'` | Style of the navigation buttons. |
| `showPoweredBy` | `boolean` | `true` | Whether to show the "Powered By" badge. |
| `poweredBy` | `string` | - | Custom text for the badge. |
| `poweredByUrl` | `string` | - | URL when clicking the badge. |
| `brandColor` | `string` | - | Color for the brand name in the badge. |

### Typography & Fonts

| Property | Type | Description |
|----------|------|-------------|
| `titleFont` | `string` | Custom font family for question titles. |
| `descriptionFont` | `string` | Custom font family for descriptions. |
| `labelFont` | `string` | Custom font family for input labels. |
| `titleFontSize` | `string` | Custom font size for titles (e.g. `2rem`). |
| `descriptionFontSize` | `string` | Custom font size for descriptions. |
| `labelFontSize` | `string` | Custom font size for labels and options. |

### Options Styling

| Property | Type | Description |
|----------|------|-------------|
| `optionPadding` | `string` | Padding inside multiple-choice bounds. |
| `optionBorderRadius` | `string` | Border radius for multiple-choice buttons. |
| `optionBorderWidth` | `string` | Border width for multiple-choice bounds. |
| `optionActiveColor` | `string` | Active state border and background tint color. |
| `optionGap` | `string` | Gap spacing between option items. |
| `customClasses` | `object` | A master configuration for CSS classes injection (like Tailwind classes). Accepts keys: `container`, `title`, `description`, `input`, `option`, `optionActive`, `buttonPrimary`, `buttonSecondary`. |

## Question

Defines a single step or input field.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique ID for the question. |
| `type` | `string` | Yes | see **Question Types**. |
| `title` | `string` | Yes | The main question text. |
| `description` | `string` | No | Helper text below the title. |
| `placeholder` | `string` | No | Placeholder text for inputs. |
| `validation` | `object` | No | Validation rules (required, min, max, etc.). |
| `options` | `Option[]` | No | Required for `select`, `multi-select`. |
| `multiple` | `boolean` | No | Explicit flag to enable multiple choice selection on `select` questions. |

## Question Types

| Type | Description |
|------|-------------|
| `text` | Single line text input. |
| `email` | Text input with email validation. |
| `number` | Numeric input. |
| `url` | URL input. |
| `select` | Dropdown or radio selection. |
| `multi-select` | Multiple choice selection. |
| `date` | Date picker. |
| `rating` | Star or number rating. |
| `boolean` | Yes/No toggle. |

## Validation Rules

| Property | Type | Description |
|----------|------|-------------|
| `required` | `boolean` | Is the field mandatory? |
| `min` | `number` | Minimum value (for numbers) or length. |
| `max` | `number` | Maximum value (for numbers) or length. |
| `pattern` | `string` | Regex pattern for text inputs. |
| `maskType` | `'phone' \| 'cellphone' \| 'cpf' \| 'cnpj' \| 'cep' \| 'custom'` | Built-in numeric input mask presets. |
| `mask` | `string` | Used when `maskType` is `custom`. E.g., `(##) ####-####`. |

## Form Schema Extras (i18n)

When overriding `i18n`, additional keys exist to customize standard options labels.

| Property | Type | Description |
|----------|------|-------------|
| `selectKey` | `string` | Override the default `Select` text displayed on option hints. |
| `hideSelectText` | `boolean` | Hide the `Select Key N` hint text entirely. |
