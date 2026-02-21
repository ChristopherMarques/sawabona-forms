import { useState, useCallback, useRef } from 'react';
import { FormRenderer } from '../lib/components/FormRenderer';
import type { FormSchema } from '../lib/core/types';
import { RefreshCw, Play, AlertCircle, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Toaster, toast } from 'sonner';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/github-dark.css';

hljs.registerLanguage('json', json);

const defaultSchemas: Record<string, FormSchema> = {
    en: {
        id: 'playground-form',
        title: 'Playground Form',
        questions: [
            {
                id: 'welcome',
                type: 'text',
                title: 'Welcome to the Playground! What is your name?',
                placeholder: 'Type your name here...',
                validation: { required: true }
            },
            {
                id: 'role',
                type: 'select',
                title: 'What is your role?',
                options: [
                    { value: 'dev', label: 'Developer' },
                    { value: 'designer', label: 'Designer' },
                    { value: 'pm', label: 'Product Manager' }
                ]
            },
            {
                id: 'experience',
                type: 'number',
                title: 'How many years of experience do you have?',
                validation: { min: 0, max: 50 }
            },
            {
                id: 'phone',
                type: 'text',
                title: 'What is your cell phone number?',
                placeholder: '(XX) XXXXX-XXXX',
                validation: { required: true, maskType: 'cellphone' }
            }
        ],
        theme: {
            primaryColor: '#716C4A',
            backgroundColor: '#EFE9DB',
            textColor: '#171717',
            borderRadius: '12px',
            fontFamily: 'Josefin Sans, sans-serif',
            showPoweredBy: true,
            poweredBy: 'Sawabona Forms',
            poweredByUrl: 'https://sawabona.tech',
            titleFont: 'Josefin Sans, serif',
            titleFontSize: '2.5rem',
            descriptionFont: 'Inter, sans-serif',
            labelFont: 'Inter, sans-serif',
            optionPadding: '1.25rem',
            optionBorderRadius: '0.75rem',
            optionBorderWidth: '2px',
            optionActiveColor: '#716C4A',
            optionGap: '1rem'
        },
        i18n: {
            pressEnter: 'Press Enter',
            selectKey: 'Select',
            hideSelectText: false
        },
        disableAutoFocus: true,
    },
    pt: {
        id: 'playground-form-pt',
        title: 'Formulário Playground',
        questions: [
            {
                id: 'boas-vindas',
                type: 'text',
                title: 'Bem-vindo ao Playground! Qual é o seu nome?',
                placeholder: 'Digite seu nome aqui...',
                validation: { required: true }
            },
            {
                id: 'cargo',
                type: 'select',
                title: 'Qual é o seu cargo?',
                options: [
                    { value: 'dev', label: 'Desenvolvedor' },
                    { value: 'designer', label: 'Designer' },
                    { value: 'pm', label: 'Gerente de Produto' }
                ]
            },
            {
                id: 'experiencia',
                type: 'number',
                title: 'Quantos anos de experiência você tem?',
                placeholder: 'Digite sua experiência aqui...',
                validation: { min: 0, max: 50 }
            },
            {
                id: 'celular',
                type: 'text',
                title: 'Qual é o seu celular?',
                placeholder: '(XX) XXXXX-XXXX',
                validation: { required: true, maskType: 'cellphone' }
            }
        ],
        theme: {
            primaryColor: '#716C4A',
            backgroundColor: '#EFE9DB',
            textColor: '#171717',
            borderRadius: '12px',
            fontFamily: 'Josefin Sans, sans-serif',
            submitText: 'Enviar Agora!',
            buttonVariant: 'outline',
            showPoweredBy: true,
            poweredBy: 'Sawabona Forms',
            poweredByUrl: 'https://sawabona.tech',
            titleFont: 'Josefin Sans, serif',
            optionPadding: '1.25rem',
            optionBorderRadius: '0.75rem',
            optionGap: '1rem'
        },
        i18n: {
            pressEnter: 'Pressione Enter',
            selectKey: 'Selecionar',
            hideSelectText: false
        },
        autoReload: true,
        reloadDelay: 3000,
        disableAutoFocus: true,
    }
};

export const Playground = () => {
    const { t, i18n } = useTranslation();
    // Get language without region (pt-BR -> pt)
    const lang = (i18n.language || 'en').split('-')[0];
    const initialSchema = defaultSchemas[lang] || defaultSchemas['en'];

    const [schemaString, setSchemaString] = useState(JSON.stringify(initialSchema, null, 4));
    const [parsedSchema, setParsedSchema] = useState<FormSchema>(initialSchema);
    const [error, setError] = useState<string | null>(null);
    const [key, setKey] = useState(0);
    const [copied, setCopied] = useState(false);

    // Update schema when language changes, but only if user hasn't heavily modified it? 
    // Actually simpler to just reset or provide a "Reset to Default" button.
    // For now, valid initial load is enough.

    const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

    const handleApply = useCallback(() => {
        try {
            const parsed = JSON.parse(schemaString);
            setParsedSchema(parsed);
            setError(null);
            setKey(prev => prev + 1); // Force re-render
            toast.success(t('playground.schema_updated', 'Schema updated successfully!'));
            // Auto-switch to preview on mobile on successful apply
            if (window.innerWidth < 1024) {
                setActiveTab('preview');
            }
        } catch (e: any) {
            setError(e.message);
            toast.error(t('playground.invalid_json', 'Invalid JSON Syntax'), {
                description: e.message
            });
        }
    }, [schemaString, t]);

    const handleCopy = () => {
        navigator.clipboard.writeText(schemaString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Highlighted code generation
    const highlightedCode = hljs.highlight(schemaString, { language: 'json' }).value;

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const preRef = useRef<HTMLPreElement>(null);

    const handleScroll = () => {
        if (textareaRef.current && preRef.current) {
            preRef.current.scrollTop = textareaRef.current.scrollTop;
            preRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    };

    const commonStyles = {
        fontFamily: '"Fira Code", monospace',
        fontSize: '14px',
        lineHeight: '20px',
        padding: '16px', // p-4
        tabSize: 4,
        margin: 0,
        whiteSpace: 'pre' as const,
        overflow: 'auto',
        border: 'none',
        outline: 'none',
        resize: 'none' as const,
        background: 'transparent',
        color: '#f8f8f2' // Ensure punctuation is visible
    };

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] md:h-[calc(100vh-6rem)] gap-4 md:gap-6">
            <Toaster position="top-right" theme="dark" />
            <div className="flex flex-col md:flex-row md:items-center justify-between shrink-0 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-heading text-[#171717]">{t('playground.title', 'Playground')}</h1>
                    <p className="text-sm md:text-base text-[#716C4A]">{t('playground.subtitle', 'Edit the schema and see the form update in real-time.')}</p>
                </div>

                {/* Mobile Tabs */}
                <div className="flex lg:hidden bg-[#EFE9DB] p-1 rounded-lg border border-[#716C4A]/20 self-start">
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'code'
                            ? 'bg-[#716C4A] text-[#EFE9DB] shadow-sm'
                            : 'text-[#716C4A] hover:bg-[#716C4A]/10'
                            }`}
                    >
                        <span>JSON</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'preview'
                            ? 'bg-[#716C4A] text-[#EFE9DB] shadow-sm'
                            : 'text-[#716C4A] hover:bg-[#716C4A]/10'
                            }`}
                    >
                        <span>Preview</span>
                    </button>
                </div>

                <div className="flex gap-2 md:gap-4 self-end md:self-auto">
                    <button
                        onClick={() => {
                            const newLang = (i18n.language || 'en').split('-')[0];
                            const newSchema = defaultSchemas[newLang] || defaultSchemas['en'];
                            setSchemaString(JSON.stringify(newSchema, null, 4));
                            setParsedSchema(newSchema);
                            setKey(prev => prev + 1);
                        }}
                        className="text-xs md:text-sm text-[#716C4A] hover:underline"
                    >
                        {t('playground.reset_default', 'Reset to Default')}
                    </button>
                    <button
                        onClick={handleApply}
                        className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-2 bg-[#716C4A] text-[#EFE9DB] rounded-lg hover:bg-[#5a563b] transition-colors font-bold shadow-lg shadow-[#716C4A]/20 text-sm md:text-base"
                    >
                        <Play size={16} fill="currentColor" /> {t('playground.apply', 'Run Code')}
                    </button>
                </div>
            </div>

            <div className="flex-1 grid lg:grid-cols-2 gap-8 min-h-0 relative">
                {/* Editor - Terminal Style */}
                <div className={`flex-col rounded-xl bg-[#1e1e1e] shadow-2xl overflow-hidden h-full ring-1 ring-white/10 ${activeTab === 'code' ? 'flex' : 'hidden lg:flex'
                    }`}>
                    {/* Mac-style Window Header */}
                    <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between shrink-0 border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <span className="text-xs font-mono font-bold text-white/40">schema.json</span>
                        <button onClick={handleCopy} className="text-white/40 hover:text-white transition-colors">
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                    </div>

                    <div className="flex-1 relative group">
                        {/* Overlay Container */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden text-sm font-mono leading-relaxed">
                            {/* Highlighted Layer */}
                            <pre
                                ref={preRef}
                                className="absolute inset-0 w-full h-full pointer-events-none scrollbar-hide font-mono"
                                aria-hidden="true"
                                style={commonStyles}
                            >
                                <code
                                    className="block min-h-full font-mono whitespace-pre"
                                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                                    style={{ fontFamily: 'inherit' }}
                                />
                            </pre>

                            {/* Input Layer */}
                            <textarea
                                ref={textareaRef}
                                className="absolute inset-0 w-full h-full text-transparent caret-white z-10 font-mono"
                                value={schemaString}
                                onChange={(e) => setSchemaString(e.target.value)}
                                onScroll={handleScroll}
                                spellCheck={false}
                                autoCapitalize="off"
                                autoComplete="off"
                                style={{ ...commonStyles, color: 'transparent' }}
                            />
                        </div>
                    </div>

                    {/* Footer Status Bar */}
                    <div className="bg-[#2d2d2d] border-t border-white/5 px-4 py-1 flex justify-between items-center text-[10px] text-white/40 font-mono shrink-0">
                        <span>JSON</span>
                        {error ? (
                            <span className="text-red-400 flex items-center gap-1"><AlertCircle size={10} /> {t('playground.invalid', 'Invalid Syntax')}</span>
                        ) : (
                            <span className="text-green-400 flex items-center gap-1"><Check size={10} /> {t('playground.valid', 'Valid')}</span>
                        )}
                    </div>
                </div>

                {/* Preview */}
                <div className={`flex-col rounded-3xl border-8 border-[#171717] bg-[#EFE9DB] shadow-2xl overflow-hidden relative h-full transition-all duration-300 ${activeTab === 'preview' ? 'flex' : 'hidden lg:flex'
                    }`}>
                    <div className="absolute top-4 right-4 z-50">
                        <button
                            onClick={() => setKey(prev => prev + 1)}
                            className="p-2 bg-white/50 hover:bg-white rounded-full text-[#716C4A] transition-colors shadow-sm"
                            title={t('playground.reset', 'Reset Form')}
                        >
                            <RefreshCw size={16} />
                        </button>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
                            <FormRenderer
                                key={key}
                                schema={parsedSchema}
                                onSubmit={(data) => {
                                    console.log(data);
                                    toast.success(t('playground.success', 'Form submitted successfully!'), {
                                        description: t('playground.success_desc', 'Check the console for the data payload.')
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
