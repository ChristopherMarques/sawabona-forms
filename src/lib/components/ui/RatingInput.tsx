
import type { Question } from '../../core/types';
import { useFormContext } from '../../core/FormContext';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function RatingInput({ question }: { question: Question }) {
    const { answers, setAnswer } = useFormContext();
    const value = (answers[question.id] as number) || 0;
    const max = Math.min(question.validation?.max || 5, 20); // Security cap to prevent DoS

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-4 flex-wrap">
                {Array.from({ length: max }).map((_, i) => {
                    const ratingValue = i + 1;
                    const isActive = ratingValue <= value;

                    return (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => setAnswer(question.id, ratingValue)}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="focus:outline-none"
                        >
                            <Star
                                className={`w-12 h-12 md:w-16 md:h-16 transition-all duration-300 ${isActive
                                    ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]"
                                    : "text-zinc-600 hover:text-yellow-400/50"
                                    }`}
                                strokeWidth={1.5}
                            />
                        </motion.button>
                    );
                })}
            </div>
            <div className="flex justify-between w-full max-w-[300px] md:max-w-[400px] px-2 items-center">
                <span className="text-sm md:text-base font-medium text-sw-text-secondary/50 uppercase tracking-wide">{question.minLabel || 'Poor'}</span>

                {/* Visual Feedback for Rating */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: value ? 1 : 0, scale: value ? 1 : 0.8 }}
                    className="font-bold text-primary text-xl"
                >
                    {value ? `${value} / ${max}` : ''}
                </motion.div>

                <span className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wide">{question.maxLabel || 'Excellent'}</span>
            </div>
        </div>
    );
}
