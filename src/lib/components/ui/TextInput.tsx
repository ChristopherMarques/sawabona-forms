import { useRef, useEffect, type KeyboardEvent, type ChangeEvent } from 'react';
import type { Question } from '../../core/types';
import { useFormContext } from '../../core/FormContext';
import { motion } from 'framer-motion';

export function TextInput({ question }: { question: Question }) {
    const { answers, setAnswer, nextStep, schema } = useFormContext();
    const rawValue = answers[question.id];
    const value = rawValue !== undefined && rawValue !== null ? String(rawValue) : '';
    const inputRef = useRef<HTMLInputElement>(null);

    // Check if this is the first question
    const isFirstQuestion = schema.questions[0].id === question.id;
    const shouldAutoFocus = !schema.disableAutoFocus || !isFirstQuestion;

    useEffect(() => {
        if (shouldAutoFocus) {
            // Auto-focus with a slight delay to allow transition to complete
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [question.id, shouldAutoFocus]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;

        // Security: Enforce max length to prevent DoS (default 2048 chars if not specified)
        const MAX_SAFE_LENGTH = question.validation?.maxLength || 2048;
        if (val.length > MAX_SAFE_LENGTH) {
            val = val.slice(0, MAX_SAFE_LENGTH);
        }

        if (question.type === 'number') {
            const num = val === '' ? '' : parseFloat(val);
            setAnswer(question.id, num);
        } else {
            setAnswer(question.id, val);
        }
    };

    const validateInput = (): boolean => {
        if (question.validation?.required && !value) return false;

        if (value) {
            if (question.validation?.minLength && value.length < question.validation.minLength) return false;

            if (question.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return false;

            if (question.validation?.pattern) {
                try {
                    const regex = new RegExp(question.validation.pattern);
                    if (!regex.test(value)) return false;
                } catch (e) {
                    console.error('Invalid regex pattern in schema', e);
                }
            }

            if (question.type === 'number') {
                const num = parseFloat(value);
                if (!isNaN(num)) {
                    if (question.validation?.min !== undefined && num < question.validation.min) return false;
                    if (question.validation?.max !== undefined && num > question.validation.max) return false;
                }
            }
        }

        return true;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!validateInput()) {
                // Shake or show error (logic to be added to Context if needed, for now just block)
                const formContainer = document.querySelector('.sawabona-form-container') || document.body;
                formContainer.classList.add('shake-animation'); // Placeholder for visual feedback
                setTimeout(() => formContainer.classList.remove('shake-animation'), 500);
                return;
            }
            nextStep();
        }
    };

    // Assuming 'error' state is managed elsewhere or will be added.
    // For this change, we'll just declare it as undefined to avoid compilation errors.
    const error = undefined;

    return (
        <div className="w-full relative group">
            <input
                ref={inputRef}
                type={question.type}
                value={typeof value === 'string' || typeof value === 'number' ? value : ''}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={question.placeholder}
                minLength={question.validation?.minLength}
                maxLength={question.validation?.maxLength || 2048} // Default max length for security
                min={question.validation?.min}
                max={question.validation?.max}
                pattern={question.validation?.pattern}
                className={`
                    w-full bg-transparent border-b-2 border-sw-text-secondary/20 
                    py-4 text-2xl md:text-3xl font-medium outline-none transition-colors
                    placeholder:text-sw-text-secondary/30
                    focus:border-sw-primary
                    font-sw-heading
                `}
            // autoFocus removed in favor of controlled focus in useEffect
            />

            {/* Error Message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 font-medium"
                >
                    {error}
                </motion.p>
            )}

            <p className="text-sm opacity-50 mt-4">
                {/* Helper text or validation hints could go here */}
                {/* Helper text or validation hints could go here */}
                {(question.type === 'email' || question.type === 'text' || question.type === 'number' || question.type === 'url') &&
                    (schema.i18n?.pressEnter || "Press Enter to continue")
                }
            </p>
        </div>
    );
}
