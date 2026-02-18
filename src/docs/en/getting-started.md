# Getting Started

Get up and running with Sawabona Forms in less than 5 minutes.

## Installation

Install the package via npm, yarn, or pnpm.

```bash
npm install @sawabona/forms
# or
yarn add @sawabona/forms
```

## Basic Usage

1. **Import the CSS**: specific styles are required for the layout to work.
2. **Define your Schema**: describe your questions.
3. **Render the Component**: pass the schema and an `onSubmit` handler.

```tsx
import { FormRenderer, FormSchema } from '@sawabona/forms';
import '@sawabona/forms/dist/sawabona-forms.css'; // Make sure to import this!

const mySchema: FormSchema = {
  id: 'onboarding',
  title: 'Welcome!',
  questions: [
    {
      id: 'name',
      type: 'text',
      title: 'Hi! What is your name?',
      validation: { required: true }
    },
    {
        id: 'email',
        type: 'email',
        title: 'Great to meet you, {{name}}! What is your email?',
        validation: { required: true, email: true }
    }
  ]
};

export default function App() {
  const handleSubmit = (data: any) => {
    console.log('Form Submitted:', data);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <FormRenderer 
        schema={mySchema} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}
```

## Logic & Variables

You can reference previous answers using double curly braces `{{variable}}`.

In the example above, `{{name}}` in the email question will be replaced by the answer from the `name` question.

## Theming

Pass a `theme` object to customize the look and feel.

```tsx
const theme = {
    primaryColor: '#716C4A', // Your brand color
    backgroundColor: '#EFE9DB',
    textColor: '#171717',
    fontFamily: '"Josefin Sans", sans-serif'
};
```


## Auto-Reload (Kiosk Mode)

If you are using the form at an event or kiosk, you might want it to reset automatically after submission.

```tsx
const schema: FormSchema = {
  // ... other props
  autoReload: true,
  reloadDelay: 5000 // Resets after 5 seconds (default 3000ms)
};
```

Check out the [Playground](/docs/playground) to experiment with schemas and themes live.
