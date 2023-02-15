import React from 'react';
import './PasswordStrengthMeter.css'
import {PasswordPolicy} from "../../../utils/passwordStrengthCalculator";
import PasswordStrengthMeterBar from "./PasswordStrengthMeterBar/PasswordStrengthMeterBar";
import {usePasswordStrength} from "../../../hooks/usePasswordStrength";

interface PasswordProps {
    password: string;
    policy: PasswordPolicy
}

const PasswordStrengthMeter = ({password, policy}: PasswordProps) => {

    const pwdStrength = usePasswordStrength(password, policy)
    if (!pwdStrength) {
        return <div>Error calculating password strength</div>
    }

    const pwdType = pwdStrength.type;

    const Colors = {
        gray: '#C9C9C9',
        red: '#FF7676',
        yellow: '#FFCB6B',
        green: '#5CE27E'
    }

    return (

        <div className="password-strength">
            <div className="password-bars">
                <PasswordStrengthMeterBar defaultColor={Colors.gray} weakColor={Colors.red} easyColor={Colors.red} mediumColor={Colors.yellow}
                                          strongColor={Colors.green} passwordStrength={pwdType}/>
                <PasswordStrengthMeterBar defaultColor={Colors.gray} weakColor={Colors.red} easyColor={Colors.gray} mediumColor={Colors.yellow}
                                          strongColor={Colors.green} passwordStrength={pwdType}/>
                <PasswordStrengthMeterBar defaultColor={Colors.gray} weakColor={Colors.red} easyColor={Colors.gray} mediumColor={Colors.gray}
                                          strongColor={Colors.green} passwordStrength={pwdType}/>
            </div>
            {pwdType !== "empty" ? <div className="password-type">Your password is {pwdType}</div> : ''}
        </div>

    );
};

export default PasswordStrengthMeter;