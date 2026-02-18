# Getting Started

Install the package via npm or yarn.

```bash
npm install @sawabona/forms
# or
yarn add @sawabona/forms
```

## Basic Usage

Import the `FormRenderer` and your stylesheet.

```tsx
import { FormRenderer, FormSchema } from '@sawabona/forms';
import '@sawabona/forms/dist/sawabona-forms.css';

const schema: FormSchema = {
  id: 'my-form',
  title: 'My First Form',
  questions: [
    {
      id: 'name',
      type: 'text',
      title: 'What is your name?'
    }
  ]
};

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <FormRenderer 
        schema={schema} 
        onSubmit={(data) => console.log(data)} 
      />
    </div>
  );
}
\`\`\`

## Auto-Reload (Kiosk Mode)

If you are using the form at an event or kiosk, you might want it to reset automatically after submission.

```tsx
const schema: FormSchema = {
  // ... other props
  autoReload: true,
  reloadDelay: 5000 // Resets after 5 seconds (default 3000ms)
};
```
