# Começando

## Instalação

Instale o pacote via npm ou yarn:

```bash
npm install sawabona-forms framer-motion lucide-react
# or
yarn add sawabona-forms framer-motion lucide-react
```

## Uso Básico

Importe o `FormRenderer` e passe seu schema:

```tsx
import { FormRenderer, FormSchema } from 'sawabona-forms';
import 'sawabona-forms/dist/style.css';

const schema: FormSchema = {
  id: 'meu-formulario',
  questions: [
    {
      id: 'nome',
      type: 'text',
      title: 'Qual é o seu nome?',
      required: true
    }
  ]
};

export default function MyForm() {
  return (
    <div style={{ height: '100vh' }}>
      <FormRenderer 
        schema={schema} 
        onSubmit={(respostas) => console.log(respostas)} 
      />
    </div>
  );
}
```
