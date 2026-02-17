import { useState, useCallback, useMemo } from 'react';
import type { FormSchema, FormState, AnswerValue, Question } from './types';

interface UseFormEngineProps {
    schema: FormSchema;
    onSubmit?: (answers: Record<string, AnswerValue>) => void;
}

export function useFormEngine({ schema, onSubmit }: UseFormEngineProps) {
    const [state, setState] = useState<FormState>({
        answers: {},
        currentStepId: schema.questions[0]?.id || '',
        history: [],
        isSubmitting: false,
        errors: {},
        isCompleted: false,
    });

    const currentQuestionIndex = useMemo(() =>
        schema.questions.findIndex(q => q.id === state.currentStepId),
        [schema.questions, state.currentStepId]
    );

    const currentQuestion = schema.questions[currentQuestionIndex];

    const setAnswer = useCallback((questionId: string, value: AnswerValue) => {
        setState(prev => ({
            ...prev,
            answers: {
                ...prev.answers,
                [questionId]: value
            },
            // Clear error on modification
            errors: {
                ...prev.errors,
                [questionId]: ''
            }
        }));
    }, []);

    const registerError = useCallback((questionId: string, error: string | null) => {
        setState(prev => {
            if (error === null) {
                const { [questionId]: _, ...rest } = prev.errors;
                return { ...prev, errors: rest };
            }
            return {
                ...prev,
                errors: { ...prev.errors, [questionId]: error }
            };
        });
    }, []);

    const validateCurrentStep = useCallback((): boolean => {
        if (!currentQuestion) return true;

        const answer = state.answers[currentQuestion.id];
        const rules = currentQuestion.validation;

        if (!rules) return true;

        if (rules.required && (answer === undefined || answer === '' || (Array.isArray(answer) && answer.length === 0))) {
            registerError(currentQuestion.id, schema.i18n?.required || 'This field is required');
            return false;
        }

        // Add more validation logic here (email, etc.)

        return true;
    }, [currentQuestion, state.answers, registerError, schema.i18n]);

    const calculateNextStep = useCallback((question: Question): string | 'submit' => {
        // Logic evaluation placeholder - for now just linear navigation
        // Real implementation would check question.logic against answers

        // Default next step
        const currentIndex = schema.questions.findIndex(q => q.id === question.id);
        if (currentIndex < schema.questions.length - 1) {
            return schema.questions[currentIndex + 1].id;
        }

        return 'submit';
    }, [schema.questions]);

    const nextStep = useCallback(() => {
        if (!validateCurrentStep()) return;

        const nextStepId = calculateNextStep(currentQuestion);

        if (nextStepId === 'submit') {
            setState(prev => ({ ...prev, isCompleted: true }));
            onSubmit?.(state.answers);
        } else {
            setState(prev => ({
                ...prev,
                history: [...prev.history, prev.currentStepId],
                currentStepId: nextStepId
            }));
        }
    }, [currentQuestion, state.answers, validateCurrentStep, calculateNextStep, onSubmit]);

    const prevStep = useCallback(() => {
        if (state.history.length === 0) return;

        const previousStepId = state.history[state.history.length - 1];
        setState(prev => ({
            ...prev,
            history: prev.history.slice(0, -1),
            currentStepId: previousStepId
        }));
    }, [state.history]);

    const jumpToStep = useCallback((stepId: string) => {
        const stepExists = schema.questions.some(q => q.id === stepId);
        if (!stepExists) {
            console.warn(`Step ${stepId} does not exist`);
            return;
        }
        setState(prev => ({
            ...prev,
            history: [...prev.history, prev.currentStepId],
            currentStepId: stepId
        }));
    }, [schema.questions]);

    return {
        ...state,
        setAnswer,
        nextStep,
        prevStep,
        jumpToStep,
        submitForm: () => onSubmit?.(state.answers),
        registerError,
        // Helper to calculate progress
        progress: ((currentQuestionIndex) / schema.questions.length) * 100
    };
}
