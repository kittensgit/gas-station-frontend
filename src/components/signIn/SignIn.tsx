import { ChangeEvent, FC, useState } from 'react';
import { Link } from 'react-router-dom';

import emailIcon from 'assets/icons/email.png';
import passwordIcon from 'assets/icons/password.png';

import { ISignInData } from 'types/auth';

import styles from './SignIn.module.css';

interface SignInProps {
    signIn: (values: ISignInData) => void;
}

const SignIn: FC<SignInProps> = ({ signIn }) => {
    const [signInData, setSignInData] = useState<ISignInData>({
        email: '',
        password: '',
    });

    const handleChangeSignInData = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignInData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSignIn = async () => {
        signIn(signInData);
        setSignInData({
            email: '',
            password: '',
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.introducing}>
                <h1>Welcome Back!</h1>
                <p>
                    To keep connection with us. Please enter your personal info
                </p>
                <Link to={'/register'}>
                    <button className={styles.btn}>Sign Up</button>
                </Link>
            </div>
            <div className={styles.signin}>
                <h2>Log In</h2>
                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <img src={emailIcon} alt="email" />
                        <input
                            value={signInData.email}
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleChangeSignInData}
                        />
                    </div>
                    <div className={styles.input}>
                        <img src={passwordIcon} alt="password" />
                        <input
                            value={signInData.password}
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChangeSignInData}
                        />
                    </div>
                </div>
                <button
                    onClick={onSignIn}
                    className={styles.btn + ' ' + styles.btnFilled}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default SignIn;
