import { useEffect } from 'react';
import type { Question } from '../../core/types';
import { useFormContext } from '../../core/FormContext';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../utils';

export function SelectInput({ question }: { question: Question }) {
    const { answers, setAnswer, nextStep, schema } = useFormContext();
    const isMultiSelect = question.type === 'multi-select' || question.multiple;
    const value = answers[question.id];

    // Initialize to array if multi-select and value is missing
    const currentValue = isMultiSelect
        ? (Array.isArray(value) ? value : (value !== undefined ? [value] : []))
        : (value as string || '');

    const handleSelect = (optionValue: string | number | boolean) => {
        if (isMultiSelect) {
            const currentArray = currentValue as any[];
            const isSelected = currentArray.includes(optionValue);

            let newValue: any[];
            if (isSelected) {
                newValue = currentArray.filter(v => v !== optionValue);
            } else {
                newValue = [...currentArray, optionValue];
            }

            setAnswer(question.id, newValue as any);
        } else {
            setAnswer(question.id, optionValue);
            setTimeout(() => nextStep(), 400);
        }
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
        <div
            className="flex flex-col gap-3 w-full max-w-xl max-h-[55vh] overflow-y-auto pr-2 pb-2 -mr-2 scroll-smooth"
            style={{
                gap: 'var(--sw-option-gap, 0.75rem)',
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--sw-primary) transparent'
            }}
        >
            {question.options?.map((option, index) => {
                const isSelected = isMultiSelect
                    ? (currentValue as any[]).includes(option.value)
                    : currentValue === option.value;

                return (
                    <motion.button
                        key={String(option.value)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.05, 0.5) }} // Cap the delay so long lists don't take forever
                        onClick={() => handleSelect(option.value)}
                        className={cn(
                            `w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                            flex items-center justify-between group flex-shrink-0`,
                            isSelected
                                ? 'border-sw-primary bg-sw-primary/5 text-sw-primary'
                                : 'border-sw-text-secondary/10 hover:border-sw-primary/50 hover:bg-sw-primary/5',
                            schema.theme?.customClasses?.option,
                            isSelected && schema.theme?.customClasses?.optionActive
                        )}
                        style={{
                            padding: 'var(--sw-option-padding, 1rem)',
                            borderRadius: 'var(--sw-option-radius, 0.5rem)',
                            borderWidth: 'var(--sw-option-border, 2px)',
                            ...(isSelected && schema.theme?.optionActiveColor ? {
                                borderColor: 'var(--sw-option-active)'
                            } : {})
                        }}
                    >
                        <span className="text-base md:text-lg font-medium flex items-center gap-3 w-full" style={{
                            ...(schema.theme?.labelFont && { fontFamily: 'var(--font-sw-label)' }),
                            ...(schema.theme?.labelFontSize && { fontSize: 'var(--size-sw-label)' })
                        }}>
                            <span className={`
                                flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                ${isSelected ? 'border-sw-primary bg-sw-primary' : 'border-sw-text-secondary/30 group-hover:border-sw-primary/50'}
                            `} style={{
                                    ...(isSelected && schema.theme?.optionActiveColor ? {
                                        borderColor: 'var(--sw-option-active)',
                                        backgroundColor: 'var(--sw-option-active)'
                                    } : {})
                                }}>
                                {isSelected && <Check size={14} className="text-sw-background" />}
                            </span>
                            <span className="break-words whitespace-pre-wrap">{option.label}</span>
                        </span>

                        {!schema.i18n?.hideSelectText && (
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] md:text-xs font-mono uppercase tracking-widest text-sw-text-secondary/50 flex-shrink-0 ml-4 hidden sm:inline-block">
                                {schema.i18n?.selectKey || "Select"} <span className="hidden md:inline">Key {index + 1}</span>
                            </span>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
