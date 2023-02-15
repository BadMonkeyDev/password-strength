import React from 'react';
import './PasswordInput.css'

interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
}

function PasswordInput({ value, onChange }: PasswordInputProps) {
    return (
        <input
            className="password-input"
            type="password"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Enter password"
        />
    );
}

export default PasswordInput;