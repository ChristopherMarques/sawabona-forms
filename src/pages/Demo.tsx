import { FormRenderer } from '../lib/components/FormRenderer';
import type { FormSchema } from '../lib/core/types';
import '../index.css';
import { Toaster, toast } from 'sonner';
import { PageTransition } from '../components/PageTransition';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, ArrowLeft } from 'lucide-react';

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
        backgroundColor: '#EFE9DB',
        primaryColor: '#716C4A',
        textColor: '#171717',
        fontFamily: 'Inter, sans-serif',
        borderRadius: '12px',
        poweredBy: 'Sawabona Tech',
        showPoweredBy: true,
        brandColor: '#716C4A'
    }
};

export default function Demo() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const handleSubmit = (answers: any) => {
        console.log('Formulário Submetido:', answers);
        toast.success('Formulário enviado com sucesso! Obrigado por participar.');
    };

    return (
        <PageTransition>
            <div className="w-full h-screen bg-[#EFE9DB] relative select-none">
                <div className="bg-noise"></div>

                {/* Header Controls */}
                <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
                    <Link to="/" className="p-2 rounded-full bg-[#716C4A]/10 text-[#716C4A] hover:bg-[#716C4A]/20 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>

                    <div className="flex items-center gap-2 px-3 py-1 bg-[#716C4A]/10 rounded-full border border-[#716C4A]/10">
                        <Globe size={14} className="text-[#716C4A]" />
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`hover:text-[#716C4A] transition-colors ${i18n.language === 'en' ? 'text-[#716C4A] font-bold' : 'text-[#716C4A]/60'}`}
                        >EN</button>
                        <span className="text-[#716C4A]/20">|</span>
                        <button
                            onClick={() => changeLanguage('pt')}
                            className={`hover:text-[#716C4A] transition-colors ${i18n.language === 'pt' ? 'text-[#716C4A] font-bold' : 'text-[#716C4A]/60'}`}
                        >PT</button>
                    </div>
                </div>

                <Toaster position="top-right" theme="light" />
                <FormRenderer
                    schema={demoSchema}
                    onSubmit={handleSubmit}
                />
            </div>
        </PageTransition>
    );
}
