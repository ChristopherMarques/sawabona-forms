# Começando

Comece a usar o Sawabona Forms em menos de 5 minutos.

## Instalação

Instale o pacote via npm, yarn ou pnpm.

```bash
npm install sawabona-forms
# ou
yarn add sawabona-forms
```

## Uso Básico

1. **Importe o CSS**: estilos específicos são necessários para o layout funcionar.
2. **Defina seu Schema**: descreva suas perguntas em um JSON.
3. **Renderize o Componente**: passe o schema e um handler `onSubmit`.

```tsx
import { FormRenderer, FormSchema } from 'sawabona-forms';
import 'sawabona-forms/dist/style.css'; // Não esqueça de importar isso!

const meuSchema: FormSchema = {
  id: 'onboarding',
  title: 'Bem-vindo!',
  questions: [
    {
      id: 'nome',
      type: 'text',
      title: 'Olá! Qual é o seu nome?',
      validation: { required: true }
    },
    {
        id: 'email',
        type: 'email',
        title: 'Prazer em te conhecer, {{nome}}! Qual seu email?',
        validation: { required: true, email: true }
    }
  ]
};

export default function App() {
  const handleSubmit = (data: any) => {
    console.log('Formulário Enviado:', data);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <FormRenderer 
        schema={meuSchema} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}
```

## Lógica & Variáveis

Você pode referenciar respostas anteriores usando chaves duplas `{{variavel}}`.

No exemplo acima, `{{nome}}` na pergunta de email será substituído pela resposta dada na pergunta de nome.

## Temas

Passe um objeto `theme` para customizar o visual.

```tsx
const tema = {
    primaryColor: '#716C4A', // Cor da sua marca
    backgroundColor: '#EFE9DB',
    textColor: '#171717',
    fontFamily: '"Josefin Sans", sans-serif'
};
```

Confira o [Playground](/docs/playground) para experimentar schemas e temas ao vivo.
