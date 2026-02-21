# @sawabona/forms

<div align="center">

[![Feito pela Sawabona Tech](https://img.shields.io/badge/Feito%20pela-Sawabona%20Tech-716C4A?style=for-the-badge&logoColor=white)](https://www.sawabona.tech/)
[![Licença: MIT](https://img.shields.io/badge/Licença-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Uma biblioteca de formulários poderosa, customizável e animada para React.**
*Feita com tecnologias modernas: baseada em schema, acessível e performática.*

</div>

---

## 🌍 Por que @sawabona/forms?

O **Sawabona Forms** nasceu para facilitar a criação de formulários conversacionais de alta qualidade. Enquanto muitas ferramentas de mercado são caras ou presas a ecossistemas fechados, o `@sawabona/forms` oferece uma **base open-source e focada no desenvolvedor** para criar experiências de coleta de dados que realmente engajam.

Capture leads, receba feedbacks ou faça o onboarding de usuários com uma interface que parece uma conversa, e não um interrogatório chato.

### Principais Recursos

- 🚀 **Arquitetura Baseada em Schema**: Defina formulários complexos com um JSON simples.
- 🎨 **100% Personalizável (White-Label)**: Controle total de cores, fontes e bordas para combinar com sua marca.
- 💬 **Interpolação de Variáveis**: Crie conversas dinâmicas citando respostas anteriores (ex: "Prazer, {{nome}}!").
- 🎭 **Animações Suaves**: Transições fluidas nativas, impulsionadas pelo `framer-motion`.
- 📱 **Mobile-First**: Experiência de uso perfeita em celulares e tablets.
- 🛡️ **Segurança Integrada**: Sanitização de input, proteção contra DoS e validações prontas para uso.
- 🔄 **Reinício Automático**: Modo Kiosk para eventos, reiniciando o formulário automaticamente após o envio.
- ⌨️ **Acessível**: Navegação otimizada para teclado e leitores de tela.

---

## 📦 Instalação

Instale o pacote e suas dependências via npm, yarn ou pnpm.

```bash
npm install @sawabona/forms
# ou
yarn add @sawabona/forms
```

---

## 🚀 Começando

### 1. Importe os Estilos
A biblioteca vem com um arquivo CSS zero-config. O CSS é essencial para o layout funcionar corretamente. Importe-o uma vez no seu componente raiz (`_app.tsx`, `layout.tsx` ou `main.tsx`).

```tsx
import '@sawabona/forms/dist/sawabona-forms.css';
```

### 2. Crie o Schema
Defina a estrutura do seu formulário. Sem JSX complexo, apenas descritivo.

```tsx
import { FormSchema } from '@sawabona/forms';

const manualDoMundo: FormSchema = {
  title: "Fale Conosco",
  questions: [
    {
      id: "nome",
      type: "text",
      title: "Qual é o seu nome?",
      placeholder: "Digite seu nome aqui...",
      validation: { required: true, maxLength: 100 }
    },
    {
      id: "email",
      type: "email",
      title: "Prazer em te conhecer, {{nome}}! Qual é o seu melhor e-mail?",
      validation: { required: true, email: true }
    }
  ],
  theme: {
    primaryColor: "#716C4A",
    backgroundColor: "#EFE9DB",
    textColor: "#171717",
    fontFamily: '"Josefin Sans", sans-serif'
  }
};
```

### 3. Renderize o Formulário

```tsx
import { FormRenderer } from '@sawabona/forms';

export default function MinhaPagina() {
  return (
    <div style={{ height: '100vh' }}>
      <FormRenderer 
        schema={manualDoMundo} 
        onSubmit={(dados) => console.log(dados)} 
      />
    </div>
  );
}
```

---

## 🏗️ Estrutura Recomendada

Para aplicações escaláveis, recomendamos manter seus schemas separados dos seus componentes:

```
src/
├── schemas/
│   ├── formulario-contato.ts
│   └── fluxo-onboarding.ts
├── components/
│   └── WrapperFormulario.tsx
└── pages/
    └── contato.tsx
```

Isso garante que sua lógica permaneça limpa e seu conteúdo seja facilmente editável (ou buscado de uma API!).

---

## 📚 Referência da API

### `FormSchema`

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `title` | `string` | Título do formulário. |
| `questions` | `Question[]` | Array de perguntas. |
| `theme` | `FormTheme` | (Opcional) Customização visual (cores, fontes). |
| `i18n` | `object` | (Opcional) Tradução de botões e textos fixos. |
| `autoReload` | `boolean` | (Opcional) Se `true`, reinicia o formulário automaticamente após o envio. |
| `reloadDelay` | `number` | (Opcional) Tempo em milissegundos para aguardar antes de reiniciar (Padrão: 3000). |
| `disableAutoFocus` | `boolean` | (Opcional) Desativar scroll automático no carregamento (Padrão: false). |

### `FormTheme` (Customização Avançada)

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `primaryColor`, `backgroundColor`, `textColor` | `string` | Cores base do formulário. |
| `fontFamily` | `string` | Fonte padrão para o formulário. |
| `titleFont`, `descriptionFont`, `labelFont` | `string` | Fontes específicas para título, descrição e labels. |
| `titleFontSize`, `descriptionFontSize`, `labelFontSize` | `string` | (Opcional) Tamanhos de fonte customizados via CSS units (ex: `2rem`). |
| `optionPadding`, `optionBorderRadius`, `optionBorderWidth`, `optionGap`, `optionActiveColor` | `string` | Estilização avançada das opções de múltipla escolha ou opções únicas. |

### `ValidationRules` (Validação e Máscaras)

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `required` | `boolean` | Campo obrigatório. |
| `maskType` | `'phone' \| 'cellphone' \| 'cpf' \| 'cnpj' \| 'cep' \| 'custom'` | Máscaras de entrada pré-definidas para formatação automática (somente inputs numéricos padrão). |
| `mask` | `string` | Padrão customizado de formatação via interface `#` (Ex: `(##) ####-####`). Apenas funciona quando `maskType` for definido como `'custom'`. |
| `pattern` | `string` | Padrão regex para ditar estritamente a validação. |

### `i18n` (Internacionalização Extra)

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `next`, `back`, `submit` | `string` | Textos padronizados de navegação. |
| `selectKey` | `string` | Personalização do texto das opções (O padrão é "Select"). |
| `hideSelectText` | `boolean` | Esconde inteiramente o indicador e instrução "Select Key X" dos botões. |

---

## 🤝 Contribuindo

Contribuições da comunidade são muito bem-vindas! Seja corrigindo um bug, adicionando um novo tipo de pergunta ou melhorando a documentação.

Por favor, leia nosso [Guia de Contribuição](CONTRIBUTING.md) para aprender como:
1. Fazer um fork do repositório
2. Criar uma branch de feature
3. Enviar um Pull Request (usando nosso template)

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  <p>Mantido com ❤️ pela <a href="https://www.sawabona.tech/">Sawabona Tech</a></p>
</div>
