import { ChangeEvent, FC, useState } from 'react';
import { Link } from 'react-router-dom';

import userIcon from 'assets/icons/user.png';
import emailIcon from 'assets/icons/email.png';
import passwordIcon from 'assets/icons/password.png';

import { ISignUpData } from 'types/auth';

import styles from './SignUp.module.css';

interface SignUpProps {
    signUp: (values: ISignUpData) => void;
}

const SignUp: FC<SignUpProps> = ({ signUp }) => {
    const [signUpData, setSignUpData] = useState<ISignUpData>({
        email: '',
        fullName: '',
        password: '',
    });
    const onChangeSignUpData = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const onSignUp = () => {
        signUp(signUpData);
        setSignUpData({
            email: '',
            fullName: '',
            password: '',
        });
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.introducing}>
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <Link to={'/login'}>
                    <button className={styles.btn}>Sign In</button>
                </Link>
            </div>
            <div className={styles.signup}>
                <h2>Create Account</h2>
                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <img src={userIcon} alt="username" />
                        <input
                            value={signUpData.fullName}
                            name="fullName"
                            type="text"
                            placeholder="Name"
                            onChange={onChangeSignUpData}
                        />
                    </div>
                    <div className={styles.input}>
                        <img src={emailIcon} alt="email" />
                        <input
                            value={signUpData.email}
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={onChangeSignUpData}
                        />
                    </div>
                    <div className={styles.input}>
                        <img src={passwordIcon} alt="password" />
                        <input
                            value={signUpData.password}
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={onChangeSignUpData}
                        />
                    </div>
                </div>
                <button
                    onClick={onSignUp}
                    className={styles.btn + ' ' + styles.btnFilled}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignUp;
