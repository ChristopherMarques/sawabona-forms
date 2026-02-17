# Getting Started

## Installation

Install the package via npm or yarn:

```bash
npm install sawabona-forms framer-motion lucide-react
# or
yarn add sawabona-forms framer-motion lucide-react
```

## Basic Usage

Import the `FormRenderer` and pass your schema:

```tsx
import { FormRenderer, FormSchema } from 'sawabona-forms';
import 'sawabona-forms/dist/style.css';

const schema: FormSchema = {
  id: 'my-form',
  questions: [
    {
      id: 'name',
      type: 'text',
      title: 'What is your name?',
      required: true
    }
  ]
};

export default function MyForm() {
  return (
    <div style={{ height: '100vh' }}>
      <FormRenderer 
        schema={schema} 
        onSubmit={(answers) => console.log(answers)} 
      />
    </div>
  );
}
```
