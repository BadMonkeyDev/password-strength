import React, {useState} from 'react';
import './PasswordPage.css'
import PasswordInput from "../../ui/PasswordInput/PasswordInput";
import PasswordStrengthMeter from "../../ui/PasswordStrengthMeter/PasswordStrengthMeter";
import {PasswordPolicy} from "../../../utils/passwordStrengthCalculator";

const PasswordPage = () => {
    const [password, setPassword] = useState('');
    function handlePasswordChange (value: string) {
        setPassword(value)
    }
    const policy: PasswordPolicy = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minDigits: 1,
        minSpecialChars: 1
    }

    return (
        <div className="password-page">
            <div className="password-card">
                <PasswordInput value={password} onChange={handlePasswordChange} />
                <PasswordStrengthMeter password={password} policy={policy} />
            </div>
        </div>
    );
};

export default PasswordPage;