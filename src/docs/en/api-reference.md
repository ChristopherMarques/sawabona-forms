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
| `brandColor` | `string` | - | Color for the brand name in the badge. |

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
