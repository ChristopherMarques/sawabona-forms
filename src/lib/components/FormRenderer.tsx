import React from 'react';
import type { FormSchema } from '../core/types';
import { useFormEngine } from '../core/useFormEngine';
import { FormContext } from '../core/FormContext';
import { QuestionRenderer } from './QuestionRenderer';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface FormRendererProps {
    schema: FormSchema;
    onSubmit: (answers: any) => void;
}

const defaultI18n = {
    next: 'Next',
    back: 'Back',
    submit: 'Submit',
    required: 'Required',
    optional: 'Optional',
    stepInfo: 'Question {{current}} of {{total}}'
};

export function FormRenderer({ schema, onSubmit }: FormRendererProps) {
    const formState = useFormEngine({ schema, onSubmit });
    const theme = schema.theme || {
        backgroundColor: '#ffffff',
        textColor: '#000000', // Start with generic defaults, override in usage
        primaryColor: '#000000',
        borderRadius: '8px',
        fontFamily: 'sans-serif'
    };

    const i18n = { ...defaultI18n, ...schema.i18n };

    const containerStyles = {
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
    } as React.CSSProperties;

    // Enhanced Button Styles
    const primaryButtonStyles = {
        backgroundColor: theme.primaryColor,
        color: theme.textColor, // Assuming light text on dark primary for now, or based on contrast
        borderRadius: '4px', // Sharper, more modern look
        fontWeight: 600,
    } as React.CSSProperties;

    const secondaryButtonStyles = {
        color: theme.primaryColor,
        borderRadius: '4px',
        fontWeight: 600,
    } as React.CSSProperties;

    if (formState.isCompleted) {
        return (
            <div
                className="flex flex-col items-center justify-center h-screen w-full p-8 text-center"
                style={containerStyles}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center"
                >
                    <div className="mb-6 p-4 rounded-full bg-green-500/20 text-green-500 w-24 h-24 flex items-center justify-center">
                        <Check size={48} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Obrigado!</h1>
                    <p className="text-xl opacity-70 max-w-md leading-relaxed">Suas respostas foram enviadas com sucesso.</p>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = schema.questions.find(q => q.id === formState.currentStepId);

    // Progress percentage
    const progress = ((schema.questions.findIndex(q => q.id === formState.currentStepId) + 1) / schema.questions.length) * 100;

    return (
        <FormContext.Provider value={{ ...formState, schema }}>
            <div
                className="w-full h-screen flex flex-col relative overflow-hidden transition-colors duration-700"
                style={containerStyles}
            >
                {/* Minimal Top Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 z-50">
                    {/* Background Track */}
                    <div className="absolute top-0 left-0 w-full h-full bg-current opacity-10" />

                    {/* Active Progress */}
                    <motion.div
                        className="h-full relative z-10"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ backgroundColor: theme.primaryColor }}
                    />
                </div>

                {/* Main Centered Content */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 w-full max-w-5xl mx-auto z-10">
                    <AnimatePresence mode="wait">
                        {currentQuestion && (
                            <motion.div
                                key={currentQuestion.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full"
                            >
                                <QuestionRenderer question={currentQuestion} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer / Navigation */}
                <div className="w-full p-6 md:p-10 flex flex-col md:flex-row justify-between items-center z-20 gap-4">
                    {/* Powered By Badge */}
                    {theme.showPoweredBy !== false && (
                        <a
                            href="#"
                            className="order-3 md:order-1 group flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-black/20 hover:border-primary/50 hover:bg-black/40 transition-all duration-300 cursor-pointer no-underline backdrop-blur-sm"
                        >
                            <span className="text-[10px] md:text-xs font-mono font-medium tracking-[0.2em] uppercase text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                                Powered By
                            </span>
                            <span
                                className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase transition-colors shadow-primary"
                                style={{ color: theme.brandColor || theme.primaryColor }}
                            >
                                {theme.poweredBy?.replace('Powered by ', '') || 'SAWABONA TECH'}
                            </span>
                        </a>
                    )}

                    {/* Navigation Buttons - Right aligned */}
                    <div className="flex items-center gap-4 order-2 md:order-3 ml-auto">
                        <motion.button
                            onClick={formState.prevStep}
                            disabled={formState.history.length === 0}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none transition-all hover:bg-white/5 rounded-full"
                            style={secondaryButtonStyles}
                        >
                            <ChevronLeft size={24} />
                        </motion.button>

                        <motion.button
                            onClick={formState.nextStep}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-3 md:px-10 md:py-4 text-lg font-bold shadow-2xl flex items-center gap-3 transition-all rounded-lg"
                            style={primaryButtonStyles}
                        >
                            <span>{formState.currentStepId === schema.questions[schema.questions.length - 1].id ? i18n.submit : i18n.next}</span>
                            {formState.currentStepId !== schema.questions[schema.questions.length - 1].id && <ChevronRight size={20} strokeWidth={3} />}
                        </motion.button>
                    </div>
                </div>
            </div>
        </FormContext.Provider>
    );
}
