# Sawabona Forms

A powerful, customizable, and animated form rendering library for React. Built with `framer-motion` and Tailwind CSS.

## Features

- 🚀 **Schema-driven**: Define your forms with a simple JSON schema.
- 🎨 **Fully Customizable**: Control colors, fonts, and layout via theme props.
- 🎭 **Smooth Animations**: Built-in transitions powered by Framer Motion.
- 📱 **Responsive**: Mobile-first design that looks great on any device.
- ⌨️ **Keyboard Navigation**: Optimized for keyboard users.
- 🛠️ **Developer Friendly**: Written in TypeScript with full type safety.

## Installation

```bash
npm install sawabona-forms framer-motion lucide-react clsx tailwind-merge
# or
yarn add sawabona-forms framer-motion lucide-react clsx tailwind-merge
```

## Usage

1. **Import the styles**:
   Import the CSS file in your root component file (e.g., `main.tsx` or `App.tsx`):

   ```tsx
   import 'sawabona-forms/dist/sawabona-forms.css';
   ```

2. **Use the `FormRenderer`**:

   ```tsx
   import { FormRenderer, FormSchema } from 'sawabona-forms';

   const schema: FormSchema = {
     title: "Contact Us",
     questions: [
       {
         id: "name",
         type: "text",
         title: "What is your name?",
         placeholder: "Type your name here...",
         validation: { required: true }
       },
       {
         id: "email",
         type: "email",
         title: "What is your email?",
         placeholder: "name@example.com",
         validation: { required: true, pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" }
       }
     ],
     theme: {
       primaryColor: "#716C4A",
       backgroundColor: "#EFE9DB",
       textColor: "#171717",
       buttonVariant: "solid", // or 'outline'
       submitText: "Send Message"
     }
   };

   function App() {
     const handleSubmit = (answers: any) => {
       console.log("Form submitted:", answers);
     };

     return (
       <div style={{ height: '100vh' }}>
         <FormRenderer schema={schema} onSubmit={handleSubmit} />
       </div>
     );
   }
   ```

## API Reference

### `FormRenderer` Props

| Prop | Type | Description |
|------|------|-------------|
| `schema` | `FormSchema` | The JSON schema defining the form structure and theme. |
| `onSubmit` | `(answers: any) => void` | Callback function fired when the form is submitted. |

### `FormSchema`

| Property | Type | Description |
|----------|------|-------------|
| `title` | `string` | Form title. |
| `questions` | `Question[]` | Array of question objects. |
| `theme` | `FormTheme` | (Optional) Theme customization. |
| `i18n` | `object` | (Optional) Override text strings (Next, Back, Submit, etc.). |

### Question Types

- `text`: Single line text input.
- `email`: Email input with validation.
- `number`: Numeric input.
- `url`: URL input.
- `select`: options selection.
- `rating`: Star rating input.

## License

MIT
