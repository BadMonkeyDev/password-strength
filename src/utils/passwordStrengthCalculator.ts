export interface PasswordPolicy {
    minLength: number;
    minUppercase: number;
    minLowercase: number;
    minDigits: number;
    minSpecialChars: number;
}

interface PasswordStrength {
    score: number;
    feedback: string[];
}

export function calculatePasswordStrength(password: string, policy: PasswordPolicy): PasswordStrength {
    let score = 0;
    let feedback = [''];

    const lengthScoreResult = calculateLengthScore(password.length, policy.minLength)

    if (!lengthScoreResult.score) {
        return {score, feedback}
    } else {
        const characterTypesScore = calculateCharacterTypesScore(password, policy)

        // Calculate the final score
        score += lengthScoreResult.score + characterTypesScore.score;
        feedback.push(...lengthScoreResult.feedback, ...characterTypesScore.feedback)

        return {score, feedback};
    }
}

function calculateLengthScore(passwordLength: number, minLength: number): PasswordStrength {
    let score = 0;
    let feedback = ['']
    if (passwordLength < minLength) {
        feedback.push(`Your password must be at least ${minLength} characters long.`)
    } else if (passwordLength === minLength){
        score += 1
    } else {
        score += 2
    }
    return {score, feedback}
}

function calculateCharacterTypesScore (password: string, policy: PasswordPolicy): PasswordStrength {
    let score = 0;
    let feedback = ['']

    if (policy.minLowercase) {
        const lowercaseChars = (password.match(/[a-z]/g) || []).length;
        if(lowercaseChars < policy.minLowercase) {
            feedback.push(`Your password must be at least ${policy.minLowercase} lowercase characters long.`)
        } else {
            score += 2
        }
    }

    if (policy.minUppercase) {
        const uppercaseChars = (password.match(/[A-Z]/g) || []).length;
        if(uppercaseChars < policy.minUppercase) {
            feedback.push(`Your password must be at least ${policy.minUppercase} uppercase characters long.`)
        } else {
            score += 2
        }
    }

    if (policy.minDigits) {
        const digitChars = (password.match(/\d/g) || []).length;
        if(digitChars < policy.minDigits) {
            feedback.push(`Your password must be at least ${policy.minDigits} digits characters long.`)
        } else {
            score += 3
        }
    }

    if (policy.minSpecialChars) {
        const specialChars = (password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g) || []).length;
        if(specialChars < policy.minSpecialChars) {
            feedback.push(`Your password must be at least ${policy.minSpecialChars} special chars characters long.`)
        } else {
            score += 3
        }
    }

    return {score, feedback}
}