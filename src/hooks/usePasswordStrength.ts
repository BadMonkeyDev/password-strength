import {useMemo} from 'react';
import {calculatePasswordStrength, PasswordPolicy} from '../utils/passwordStrengthCalculator';

export interface PasswordStrengthResult {
    score: number;
    type: 'empty' | 'weak' | 'easy' | 'medium' | 'strong';
}

const scoreThresholds = {
    empty: 1,
    weak: 3,
    easy: 6,
    medium: 9,
} as const;

export function usePasswordStrength(password: string, policy: PasswordPolicy): PasswordStrengthResult {
    const result = useMemo(() => {
        const {score} = calculatePasswordStrength(password, policy);
        const type = password.length < scoreThresholds.empty ? 'empty'
            : score < scoreThresholds.weak ? 'weak'
                : score < scoreThresholds.easy ? 'easy'
                    : score < scoreThresholds.medium ? 'medium'
                        : 'strong';

        return {score, type} as PasswordStrengthResult;
    }, [password, policy]);

    return result;
}