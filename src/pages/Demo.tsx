import { FormRenderer } from '../lib/components/FormRenderer';
import type { FormSchema } from '../lib/core/types';
import '../index.css';
import { Toaster, toast } from 'sonner';

const demoSchema: FormSchema = {
    id: 'demo-form-1',
    title: 'Pesquisa de Satisfação',
    i18n: {
        next: 'Próximo',
        back: 'Voltar',
        submit: 'Finalizar',
        required: 'Obrigatório',
        optional: 'Opcional',
        stepInfo: 'Questão {{current}} de {{total}}'
    },
    questions: [
        {
            id: 'q1',
            type: 'text',
            title: 'Olá! Qual o seu nome?',
            placeholder: 'Digite seu nome aqui...',
            validation: { required: true, minLength: 2 },
            description: 'Vamos começar nos conhecendo melhor.'
        },
        {
            id: 'q2',
            type: 'email',
            title: 'Qual seu melhor e-mail?',
            placeholder: 'nome@exemplo.com',
            validation: { required: true, pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' },
            description: 'Prometemos não enviar spam.'
        },
        {
            id: 'q3',
            type: 'select',
            title: 'Como você nos conheceu?',
            options: [
                { label: 'Redes Sociais', value: 'social_media' },
                { label: 'Indicação de Amigo', value: 'friend' },
                { label: 'Google / Pesquisa', value: 'search' },
                { label: 'Outro', value: 'other' }
            ],
            validation: { required: true }
        },
        {
            id: 'q4',
            type: 'rating',
            title: 'Como você avalia sua experiência?',
            validation: { required: true, max: 5 },
            description: 'Sendo 1 estrela "Ruim" e 5 estrelas "Excelente".',
            minLabel: 'Ruim',
            maxLabel: 'Excelente'
        },
        {
            id: 'q5',
            type: 'text',
            title: 'Algum comentário final?',
            placeholder: 'Sinta-se à vontade para compartilhar...',
            validation: { required: false },
            description: 'Sua opinião é muito importante para nós.'
        }
    ],
    theme: {
        backgroundColor: '#1A1A1B',
        primaryColor: '#D90429',
        textColor: '#FFF2F2',
        fontFamily: 'Inter, sans-serif',
        borderRadius: '12px',
        poweredBy: 'Sawabona Tech',
        showPoweredBy: true,
        brandColor: '#D90429'
    }
};

export default function Demo() {
    const handleSubmit = (answers: any) => {
        console.log('Formulário Submetido:', answers);
        toast.success('Formulário enviado com sucesso! Obrigado por participar.');
    };

    return (
        <div className="w-full h-screen bg-[#1A1A1B]">
            <Toaster position="top-right" theme="dark" />
            <FormRenderer
                schema={demoSchema}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
