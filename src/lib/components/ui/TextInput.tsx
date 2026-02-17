import React, { useRef, useEffect } from 'react';
import type { Question } from '../../core/types';
import { useFormContext } from '../../core/FormContext';
import { motion } from 'framer-motion';

export function TextInput({ question }: { question: Question }) {
    const { answers, setAnswer, nextStep } = useFormContext();
    const value = (answers[question.id] as string) || '';
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Auto-focus with a slight delay to allow transition to complete
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 500);
        return () => clearTimeout(timer);
    }, [question.id]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            // Basic validation check before moving
            if (question.validation?.required && !value) return;
            nextStep();
        }
    };

    return (
        <div className="w-full relative group">
            <input
                ref={inputRef}
                type={question.type}
                value={value}
                onChange={(e) => setAnswer(question.id, e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={question.placeholder || 'Type your answer...'}
                className="w-full bg-transparent text-3xl md:text-5xl border-b-2 border-primary/20 focus:border-primary py-4 outline-none transition-all placeholder:text-muted-foreground/20 font-light"
            />
            <motion.div
                initial={{ width: "0%" }}
                animate={{ width: value ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-[2px] bg-primary"
            />

            <div className="mt-4 flex items-center gap-2 opacity-0 animate-in fade-in slide-in-from-top-2 duration-700 delay-300 fill-mode-forwards">
                <div className="flex items-center gap-1.5 text-sm md:text-base font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-md">
                    <span>Pressione</span>
                    <span className="font-bold border border-primary/30 rounded px-1 min-w-[20px] text-center">↵</span>
                    <span>Enter</span>
                </div>
            </div>
        </div>
    );
}
