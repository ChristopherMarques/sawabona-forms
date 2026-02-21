import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function applyMask(value: string, maskType?: string, customPattern?: string): string {
    if (!value) return '';

    // Default to a string type checking
    const cleanValue = value.replace(/\D/g, ''); // assume numeric masks for standard types

    if (maskType === 'phone') {
        return cleanValue
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .slice(0, 14); // (XX) XXXX-XXXX
    }

    if (maskType === 'cellphone') {
        return cleanValue
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15); // (XX) XXXXX-XXXX
    }

    if (maskType === 'cpf') {
        return cleanValue
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    }

    if (maskType === 'cnpj') {
        return cleanValue
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    }

    if (maskType === 'cep') {
        return cleanValue
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 9);
    }

    if (maskType === 'custom' && customPattern) {
        let i = 0;
        const masked = customPattern.replace(/[#X0]/g, () => cleanValue[i++] || '');
        // Trim trailing non-alphanumeric characters if value is shorter than mask
        return masked.replace(/[^0-9a-zA-Z]+$/, '');
    }

    return value;
}
