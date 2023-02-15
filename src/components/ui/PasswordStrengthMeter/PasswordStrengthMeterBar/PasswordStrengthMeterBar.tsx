import React from 'react';
import './PasswordStrengthMeterBar.css'
import {PasswordStrengthResult} from "../../../../hooks/usePasswordStrength";

interface PasswordStrengthMeterBarProps {
    defaultColor: string;
    weakColor: string;
    easyColor: string;
    mediumColor: string;
    strongColor: string;
    passwordStrength: PasswordStrengthResult['type'];
}

interface BgColorMapping {
    [key: string]: string;
}

const PasswordStrengthMeterBar = (props:PasswordStrengthMeterBarProps) => {
    const {
        defaultColor,
        weakColor,
        easyColor,
        mediumColor,
        strongColor,
        passwordStrength
    } = props

    const bgColorMapping: BgColorMapping = {
        weak: weakColor,
        easy: easyColor,
        medium: mediumColor,
        strong: strongColor,
    };

    const bgColor = bgColorMapping[passwordStrength] || defaultColor;

    return (
        <div className="strength-bar" style={{backgroundColor: bgColor}}></div>
    );
};

export default PasswordStrengthMeterBar;