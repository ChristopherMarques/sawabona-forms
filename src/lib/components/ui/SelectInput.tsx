import { useEffect } from 'react';
import type { Question } from '../../core/types';
import { useFormContext } from '../../core/FormContext';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function SelectInput({ question }: { question: Question }) {
    const { answers, setAnswer, nextStep, schema } = useFormContext();
    const value = (answers[question.id] as string) || '';

    const handleSelect = (optionValue: string | number | boolean) => {
        setAnswer(question.id, optionValue);
        setTimeout(() => nextStep(), 400);
    };

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toUpperCase();
            const index = letters.indexOf(key);
            if (index >= 0 && index < (question.options?.length || 0)) {
                handleSelect(question.options![index].value);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [question.options, question.id]);

    return (
        <div className="flex flex-col gap-3 w-full max-w-xl" style={{ gap: 'var(--sw-option-gap, 0.75rem)' }}>
            {question.options?.map((option, index) => {
                const isSelected = Array.isArray(value)
                    ? value.includes(option.value)
                    : value === option.value;

                return (
                    <motion.button
                        key={String(option.value)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(option.value)}
                        className={`
                            w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                            flex items-center justify-between group
                            ${isSelected
                                ? 'border-sw-primary bg-sw-primary/5 text-sw-primary'
                                : 'border-sw-text-secondary/10 hover:border-sw-primary/50 hover:bg-sw-primary/5'
                            }
                        `}
                        style={{
                            padding: 'var(--sw-option-padding, 1rem)',
                            borderRadius: 'var(--sw-option-radius, 0.5rem)',
                            borderWidth: 'var(--sw-option-border, 2px)',
                            ...(isSelected && schema.theme?.optionActiveColor ? {
                                borderColor: 'var(--sw-option-active)'
                            } : {})
                        }}
                    >
                        <span className="text-lg font-medium flex items-center gap-3" style={{
                            ...(schema.theme?.labelFont && { fontFamily: 'var(--font-sw-label)' }),
                            ...(schema.theme?.labelFontSize && { fontSize: 'var(--size-sw-label)' })
                        }}>
                            <span className={`
                                flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                ${isSelected ? 'border-sw-primary bg-sw-primary' : 'border-sw-text-secondary/30 group-hover:border-sw-primary/50'}
                            `} style={{
                                    ...(isSelected && schema.theme?.optionActiveColor ? {
                                        borderColor: 'var(--sw-option-active)',
                                        backgroundColor: 'var(--sw-option-active)'
                                    } : {})
                                }}>
                                {isSelected && <Check size={14} className="text-sw-background" />}
                            </span>
                            {option.label}
                        </span>

                        {!schema.i18n?.hideSelectText && (
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono uppercase tracking-widest text-sw-text-secondary/50">
                                {schema.i18n?.selectKey || "Select"} <span className="hidden md:inline">Key {index + 1}</span>
                            </span>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
