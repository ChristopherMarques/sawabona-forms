# Sawabona Forms - Guidelines for Large Language Models (LLMs)

This file (`llm.md` / `llm.txt`) is meant to be read by AI assistants to understand how to correctly generate schemas and use the `@sawabona/forms` package.

## Introduction to the Package

`@sawabona/forms` is a React-based form engine intended to render conversational, visually appealing, Typeform-like surveys. It accepts a highly customizable strict JSON configuration schemas.

## Golden Rules for AIs

1. **Output Valid JSON**: When asked to create a form, generate a complete, strict JSON object representing the `FormSchema`. Do not wrap strings in single quotes.
2. **Schema Adherence**: Carefully follow the fields defined in the API Reference.
   - Every form must have an `id`, `title`, and an array of `questions`.
   - Each question must have an `id`, `type`, and `title`.
   - `options` arrays must use `{ "label": "Text", "value": "value" }` formatting and are required for `select` and `multi-select` types.
   - Use the `multiple` boolean flag or `multi-select` explicitly for tickbox-like multiple-choice questions.
3. **Theming**: Provide complementary colors in standard Hex codes matching the user's intent within the `theme` object.
4. **Validation**: Rely on the engine's built in validations under `validation: { ... }` instead of instructing the user to build Regex themselves unless `maskType: custom` is required.

## Complete FormSchema API Reference

The root object of your form definition.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the form. |
| `title` | `string` | Yes | The title of the form. |
| `questions` | `Question[]` | Yes | An array of question objects (see below). |
| `theme` | `FormTheme` | No | Customization options for the form's appearance. Supports `customClasses` object block for deep style tailwind injections. |
| `i18n` | `object` | No | Override labels (next, back, submit, pressEnter). |
| `disableAutoFocus` | `boolean` | No | Prevent auto-scroll/focus on load. |
| `layoutSettings.internalScroll` | `boolean` | No | Overrides the internal form scrolling behavior. If `true` (default), the form scrolls inside its own container. If `false`, it lets the parent window scroll naturally. |

### Question Object

Defines a single step or input field.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique ID for the question. |
| `type` | `string` | Yes | see **Question Types**. |
| `title` | `string` | Yes | The main question text. |
| `description` | `string` | No | Helper text below the title. |
| `placeholder` | `string` | No | Placeholder text for inputs. |
| `validation` | `object` | No | Validation rules (required, min, max, etc.). |
| `options` | `Option[]` | No | Required for `select`, `multi-select`. Format: `[{ label: "String", value: "string" }]` |
| `multiple` | `boolean` | No | Explicit flag to enable multiple choice selection on `select` questions. |

### Question Types

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

### Validation Rules

| Property | Type | Description |
|----------|------|-------------|
| `required` | `boolean` | Is the field mandatory? |
| `min` | `number` | Minimum value (for numbers) or length. |
| `max` | `number` | Maximum value (for numbers) or length. |
| `pattern` | `string` | Regex pattern for text inputs. |
| `maskType` | `'phone' \| 'cellphone' \| 'cpf' \| 'cnpj' \| 'cep' \| 'custom'` | Built-in numeric input mask presets. |
| `mask` | `string` | Used when `maskType` is `custom`. E.g., `(##) ####-####`. |

## Quick Starter Template

```json
{
    "id": "my-form",
    "title": "A standard template form",
    "theme": {
        "primaryColor": "#5d5d5d",
        "backgroundColor": "#f9f9f9",
        "textColor": "#1a1a1a"
    },
    "questions": [
        {
            "id": "name",
            "type": "text",
            "title": "Welcome! What is your name?",
            "validation": { "required": true }
        },
        {
            "id": "interests",
            "type": "multi-select",
            "title": "Select your interests",
            "options": [
                { "label": "Coding", "value": "coding" },
                { "label": "Design", "value": "design" }
            ]
        }
    ]
}
```

Whenever requested to map data or output a complete schema, review the schema definitions provided above and return the complete payload.
