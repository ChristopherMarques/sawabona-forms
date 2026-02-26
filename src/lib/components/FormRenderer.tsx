import { type CSSProperties, useEffect } from 'react';
import type { FormSchema, FormTheme } from '../core/types';
import { useFormEngine } from '../core/useFormEngine';
import { FormContext } from '../core/FormContext';
import { QuestionRenderer } from './QuestionRenderer';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { cn } from '../utils';

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
    const theme: FormTheme = schema.theme || {
        backgroundColor: '#ffffff',
        textColor: '#000000', // Start with generic defaults, override in usage
        primaryColor: '#000000',
        borderRadius: '8px',
        // fontFamily removed to allow inheritance
    };

    const i18n = { ...defaultI18n, ...schema.i18n };

    const containerStyles = {
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
        // Inject CSS Variables for Tailwind to pick up
        '--color-sw-primary': theme.primaryColor,
        '--color-sw-background': theme.backgroundColor,
        '--color-sw-text-primary': theme.primaryColor,
        '--color-sw-text-secondary': theme.textColor,
        '--font-sw-heading': theme.fontFamily || 'inherit',
        '--font-sw-body': theme.fontFamily || 'inherit',
        ...(theme.titleFont && { '--font-sw-title': theme.titleFont }),
        ...(theme.descriptionFont && { '--font-sw-description': theme.descriptionFont }),
        ...(theme.labelFont && { '--font-sw-label': theme.labelFont }),
        ...(theme.titleFontSize && { '--size-sw-title': theme.titleFontSize }),
        ...(theme.descriptionFontSize && { '--size-sw-description': theme.descriptionFontSize }),
        ...(theme.labelFontSize && { '--size-sw-label': theme.labelFontSize }),
        ...(theme.optionPadding && { '--sw-option-padding': theme.optionPadding }),
        ...(theme.optionBorderRadius && { '--sw-option-radius': theme.optionBorderRadius }),
        ...(theme.optionBorderWidth && { '--sw-option-border': theme.optionBorderWidth }),
        ...(theme.optionGap && { '--sw-option-gap': theme.optionGap }),
        ...(theme.optionActiveColor && { '--sw-option-active': theme.optionActiveColor }),
    } as React.CSSProperties;

    // Enhanced Button Styles
    const isOutline = theme.buttonVariant === 'outline';

    const primaryButtonStyles = {
        backgroundColor: isOutline ? 'transparent' : theme.primaryColor,
        color: isOutline ? theme.primaryColor : theme.textColor,
        border: isOutline ? `2px solid ${theme.primaryColor}` : 'none',
        borderRadius: theme.borderRadius || '8px',
        fontWeight: 600,
    } as CSSProperties;

    const secondaryButtonStyles = {
        color: theme.primaryColor,
        borderRadius: theme.borderRadius || '8px',
        fontWeight: 600,
    } as CSSProperties;

    const { autoReload, reloadDelay = 3000 } = schema;

    // Layout logic: internal scroll vs natural page scroll
    const isInternalScroll = schema.layoutSettings?.internalScroll !== false;

    // Auto-reload effect
    useEffect(() => {
        if (formState.isCompleted && autoReload) {
            const timer = setTimeout(() => {
                formState.resetForm();
            }, reloadDelay);
            return () => clearTimeout(timer);
        }
    }, [formState.isCompleted, autoReload, reloadDelay, formState.resetForm]);

    if (formState.isCompleted) {
        return (
            <div
                className={cn(
                    "flex flex-col items-center justify-center w-full p-8 text-center relative",
                    isInternalScroll ? "h-full overflow-hidden" : "min-h-screen",
                    theme.customClasses?.container
                )}
                style={containerStyles}
            >
                {/* Auto-reload progress bar */}
                {autoReload && (
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: reloadDelay / 1000, ease: "linear" }}
                        className="absolute top-0 left-0 h-1 bg-green-500 z-50"
                    />
                )}

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
                className={cn(
                    "w-full flex flex-col relative transition-colors duration-700",
                    isInternalScroll ? "h-full overflow-hidden" : "min-h-screen",
                    theme.customClasses?.container
                )}
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

                {/* Main Content */}
                <div className={cn(
                    "flex-1 w-full relative z-10 flex flex-col px-6 md:px-12",
                    isInternalScroll ? "overflow-y-auto" : ""
                )} style={{ scrollbarWidth: 'none' }}>
                    {/* Top Spacer for centering */}
                    <div className="flex-1 flex-shrink-0 min-h-[2rem]" />

                    <div className="w-full max-w-5xl mx-auto py-4">
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

                    {/* Bottom Spacer for centering */}
                    <div className="flex-1 flex-shrink-0 min-h-[2rem]" />
                </div>

                {/* Footer / Navigation */}
                <div className="w-full px-6 pt-6 pb-8 md:p-10 flex flex-col md:flex-row justify-between items-center z-20 gap-4">
                    {/* Powered By Badge */}
                    {theme.showPoweredBy !== false && (
                        <a
                            href={theme.poweredByUrl || '#'}
                            target={theme.poweredByUrl ? '_blank' : undefined}
                            rel={theme.poweredByUrl ? 'noopener noreferrer' : undefined}
                            className="order-3 md:order-1 group flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-black/20 hover:border-sw-primary/50 hover:bg-black/40 transition-all duration-300 cursor-pointer no-underline backdrop-blur-sm"
                        >
                            <span className="text-[10px] md:text-xs font-mono font-medium tracking-[0.2em] uppercase text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                                Powered By
                            </span>
                            <span
                                className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase transition-colors shadow-sw-primary"
                                style={{ color: theme.brandColor || theme.primaryColor }}
                            >
                                {theme.poweredBy?.replace('Powered by ', '') || 'SAWABONA TECH'}
                            </span>
                        </a>
                    )}

                    {/* Navigation Buttons - Right aligned (default) */}
                    <div className={cn(
                        "flex items-center justify-end gap-3 md:gap-4 order-2 md:order-3 w-full md:w-auto md:flex-1",
                        theme.customClasses?.buttonContainer
                    )}>
                        <motion.button
                            onClick={formState.prevStep}
                            disabled={formState.history.length === 0}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none transition-all hover:bg-black/5 dark:hover:bg-white/5 rounded-full",
                                theme.customClasses?.buttonSecondary
                            )}
                            style={secondaryButtonStyles}
                        >
                            <ChevronLeft size={20} />
                        </motion.button>

                        <motion.button
                            onClick={formState.nextStep}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                                "px-6 py-2.5 md:px-8 md:py-3 text-base md:text-lg font-semibold shadow-lg flex items-center gap-2 transition-all rounded-lg",
                                theme.customClasses?.buttonPrimary
                            )}
                            style={primaryButtonStyles}
                        >
                            <span>
                                {formState.currentStepId === schema.questions[schema.questions.length - 1].id
                                    ? (theme.submitText || i18n.submit)
                                    : i18n.next}
                            </span>
                            {formState.currentStepId !== schema.questions[schema.questions.length - 1].id && <ChevronRight size={18} strokeWidth={2.5} />}
                        </motion.button>
                    </div>
                </div>
            </div>
        </FormContext.Provider>
    );
}
