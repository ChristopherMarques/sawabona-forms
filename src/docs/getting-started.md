# Getting Started

Install the package via npm or yarn.

\`\`\`bash
npm install sawabona-forms
\`\`\`

## Basic Usage

Import the \`FormRenderer\` and your stylesheet.

\`\`\`tsx
import { FormRenderer, FormSchema } from 'sawabona-forms';
import 'sawabona-forms/dist/style.css';

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
