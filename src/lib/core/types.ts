

export type QuestionType =
    | 'text'
    | 'email'
    | 'number'
    | 'url'
    | 'select'
    | 'multi-select'
    | 'date'
    | 'boolean'
    | 'rating'
    | 'opinion-scale'
    | 'statement';

export interface Option {
    label: string;
    value: string | number | boolean;
}

export interface LogicCondition {
    fieldId: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
    value: any;
}

export interface LogicAction {
    type: 'jump_to' | 'submit';
    targetId?: string; // Question ID to jump to
}

export interface QuestionLogic {
    conditions: LogicCondition[];
    action: LogicAction;
}

export interface ValidationRules {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: any) => string | boolean;
}

export interface Question {
    id: string;
    type: QuestionType;
    title: string;
    description?: string;
    placeholder?: string;
    options?: Option[]; // For select, multi-select, opinion-scale
    validation?: ValidationRules;
    logic?: QuestionLogic[];
    defaultValue?: any;
    // UI Customizations specific to this question
    layout?: 'split' | 'centered' | 'full';
    imageUrl?: string;
    minLabel?: string;
    maxLabel?: string;
}

export interface FormTheme {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily?: string;
    borderRadius: string;
    // Branding & UI
    poweredBy?: string; // e.g. "Sawabona Forms"
    showPoweredBy?: boolean;
    brandColor?: string; // Specific color for the brand name in badge

    // Controls
    submitText?: string; // Custom text for submit button
    buttonVariant?: 'solid' | 'outline';
}

export interface FormSchema {
    id: string;
    title: string;
    questions: Question[];
    theme?: FormTheme;
    i18n?: {
        next: string;
        back: string;
        submit: string;
        required: string;
        optional: string;
        stepInfo: string; // e.g., "Question {{current}} of {{total}}"
    };
    // Behaviors
    autoReload?: boolean;
    reloadDelay?: number; // milliseconds, default 5000
    disableAutoFocus?: boolean; // prevent scroll jump on load
}

export type AnswerValue = string | number | boolean | string[] | number[];

export interface FormState {
    answers: Record<string, AnswerValue>;
    currentStepId: string;
    history: string[]; // Stack of visited question IDs for back navigation
    isSubmitting: boolean;
    errors: Record<string, string>;
    isCompleted: boolean;
}

export interface FormContextType extends FormState {
    schema: FormSchema;
    setAnswer: (questionId: string, value: AnswerValue) => void;
    nextStep: () => void;
    prevStep: () => void;
    jumpToStep: (stepId: string) => void;
    submitForm: () => void;
    resetForm: () => void;
    registerError: (questionId: string, error: string | null) => void;
}
