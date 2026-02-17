import { useEffect } from 'react';
import type { Question } from '../../core/types';
import { useFormContext } from '../../core/FormContext';
import { cn } from '../../utils';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function SelectInput({ question }: { question: Question }) {
    const { answers, setAnswer, nextStep } = useFormContext();
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
        <div className="flex flex-col gap-3 w-full max-w-xl">
            {question.options?.map((option, index) => {
                const isSelected = value === option.value;
                return (
                    <motion.button
                        key={String(option.value)}
                        onClick={() => handleSelect(option.value)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.02, x: 5, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                            "group flex items-center gap-4 p-4 md:p-6 rounded-lg border-2 text-left transition-all duration-200 outline-none",
                            isSelected
                                ? "border-primary bg-primary/10 text-primary shadow-lg"
                                : "border-muted-foreground/20 hover:border-primary/50 hover:bg-white/5"
                        )}
                    >
                        <div className={cn(
                            "w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded border text-sm md:text-base font-bold transition-colors",
                            isSelected
                                ? "bg-primary text-secondary border-primary"
                                : "border-muted-foreground/30 text-muted-foreground group-hover:border-primary group-hover:text-primary"
                        )}>
                            {letters[index]}
                        </div>
                        <span className="text-xl md:text-2xl font-medium flex-1">{option.label}</span>
                        {isSelected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <Check className="w-6 h-6 md:w-8 md:h-8" />
                            </motion.div>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
