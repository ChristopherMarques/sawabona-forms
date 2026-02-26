

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
    mask?: string;
    maskType?: 'phone' | 'cellphone' | 'cpf' | 'cnpj' | 'cep' | 'custom';
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
    multiple?: boolean;
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
    poweredByUrl?: string; // Link when clicking the badge
    brandColor?: string; // Specific color for the brand name in badge

    // Controls
    submitText?: string; // Custom text for submit button
    buttonVariant?: 'solid' | 'outline';

    // Fonts & Sizing
    titleFont?: string;
    descriptionFont?: string;
    labelFont?: string;
    titleFontSize?: string;
    descriptionFontSize?: string;
    labelFontSize?: string;

    // Options Styling
    optionPadding?: string;
    optionBorderRadius?: string;
    optionBorderWidth?: string;
    optionActiveColor?: string;
    optionGap?: string;

    // Tailwind Overrides
    customClasses?: {
        container?: string;
        title?: string;
        description?: string;
        input?: string;
        option?: string;
        optionActive?: string;
        buttonContainer?: string;
        buttonPrimary?: string;
        buttonSecondary?: string;
    };
}

export interface FormSchema {
    id: string;
    title: string;
    questions: Question[];
    theme?: FormTheme;
    i18n?: {
        next?: string;
        back?: string;
        submit?: string;
        required?: string;
        optional?: string;
        stepInfo?: string; // e.g., "Question {{current}} of {{total}}"
        pressEnter?: string; // e.g., "Press Enter to continue"
        selectKey?: string; // e.g., "Press" or "Selecionar"
        hideSelectText?: boolean; // Hides the "Select Key X" entirely
    };
    // Behaviors
    autoReload?: boolean;
    reloadDelay?: number; // milliseconds, default 5000
    disableAutoFocus?: boolean; // prevent scroll jump on load
    layoutSettings?: {
        internalScroll?: boolean; // Default true. Sets h-full overflow-hidden vs min-h-screen
    };
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
