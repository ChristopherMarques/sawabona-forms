import type { Question } from '../core/types';
import { useFormContext } from '../core/FormContext';
import { TextInput } from './ui/TextInput';
import { SelectInput } from './ui/SelectInput';
import { RatingInput } from './ui/RatingInput';
import { motion } from 'framer-motion';
import { cn } from '../utils';

export function QuestionRenderer({ question }: { question: Question }) {
    const { schema } = useFormContext();
    const currentStepIndex = schema.questions.findIndex(q => q.id === question.id) + 1;
    const totalSteps = schema.questions.length;

    // Child animation variants
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
    };

    // Logic to replace {{variable}} with answer values
    const replaceVariables = (text: string) => {
        if (!text) return text;
        return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
            const answer = formContext.answers[key];
            return answer !== undefined && answer !== null ? String(answer) : '';
        });
    };

    // We need the full context for answers
    const formContext = useFormContext();

    return (
        <motion.div
            className="flex flex-col gap-8 w-full max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
        >
            <div className="flex flex-col gap-2">
                <motion.div variants={itemVariants} className="flex gap-4 items-baseline">
                    <span className="flex items-center gap-2 text-sm md:text-base font-medium text-sw-primary/90 bg-sw-primary/10 px-3 py-1 rounded-full border border-sw-primary/20 backdrop-blur-sm">
                        <span>{currentStepIndex}</span>
                        <span className="opacity-40 text-xs">/</span>
                        <span className="opacity-60">{totalSteps}</span>
                    </span>
                </motion.div>

                <motion.h2
                    variants={itemVariants}
                    className={cn(
                        "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-pretty mt-2 font-sw-heading",
                        schema.theme?.customClasses?.title
                    )}
                    style={{
                        ...(schema.theme?.titleFont && { fontFamily: 'var(--font-sw-title)' }),
                        ...(schema.theme?.titleFontSize && { fontSize: 'var(--size-sw-title)' })
                    }}
                >
                    {replaceVariables(question.title)} {question.validation?.required && <span className="text-sw-primary">*</span>}
                </motion.h2>

                {question.description && (
                    <motion.p
                        variants={itemVariants}
                        className={cn(
                            "text-lg md:text-xl text-muted-foreground font-normal leading-relaxed max-w-2xl mt-2",
                            schema.theme?.customClasses?.description
                        )}
                        style={{
                            ...(schema.theme?.descriptionFont && { fontFamily: 'var(--font-sw-description)' }),
                            ...(schema.theme?.descriptionFontSize && { fontSize: 'var(--size-sw-description)' })
                        }}
                    >
                        {replaceVariables(question.description)}
                    </motion.p>
                )}
            </div>

            <motion.div variants={itemVariants} className="w-full mt-6">
                {question.type === 'text' || question.type === 'email' || question.type === 'number' || question.type === 'url' ? (
                    <TextInput question={question} />
                ) : question.type === 'select' || question.type === 'multi-select' ? (
                    <SelectInput question={question} />
                ) : question.type === 'rating' ? (
                    <RatingInput question={question} />
                ) : (
                    <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded">
                        Unsupported question type: {question.type} (ID: {question.id})
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
