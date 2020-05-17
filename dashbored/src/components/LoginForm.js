import React, { useState, useEffect } from 'react'
import './LoginForm.scss'
import { fauth, firebase } from '../Store';
import useForm from '../hooks/useForm'
import validateEmail from '../Store/utils'
import SigninProviders from './SigninProviders'


const LoginForm = () => {
    const [usernameErr, setUsernameErr] = useState('')
    const [pwdErr, setPwdErr] = useState('')
    const [fields, setFields, reset, isNew] = useForm({ username: '', password: '', confirmPassword: '', isNew: false })
    const [islocal, setIslocal] = useState(true);
    const newAccount = () => {
        isNew(!fields.isNew);
    }
    const login = () => {

        if (validateEmail(fields.username) && fields.password !== "") {
            fauth.signInWithEmailAndPassword(fields.username, fields.password).then(r => {

                setPwdErr("")
                setUsernameErr("")
            }).catch(err => {

            });
        }
        else if (!validateEmail(fields.username)) {
            setUsernameErr("not a valid email")
            setPwdErr("")
        }
        else if (fields.password === "") {
            setPwdErr("enter a password")
            setUsernameErr("")
        }
    }
    const signinwith = () => {

    }
    const create = () => {
        if (fields.password === fields.confirmPassword) {
            fauth.createUserWithEmailAndPassword(fields.username, fields.password).then(r => {
                console.log("signedIn " + r.additionalUserInfo)
            });
        }
    }
    return (
        <div className="LoginForm">
            {(islocal) ?
                (<>
                    <div>Username</div>
                    <div>
                        <input type="email" name="username" value={fields.username} onChange={setFields} />
                        <div className="loginerror" style={{ color: 'red' }}>{usernameErr}</div>
                    </div>
                    <div>Password</div>
                    <div>
                        <input type="password" name="password" value={fields.password} onChange={setFields} />
                        <div className="loginerror" style={{ color: 'red' }}>{pwdErr}</div>
                    </div>
                    {fields.isNew && (<div>Confirm Password</div>)}
                    {fields.isNew && (<div><input type="password" name="confirmPassword" value={fields.confirmPassword} onChange={setFields} /></div>)}
                    <div className="Loginbtns">
                        <button onClick={newAccount}>{!fields.isNew ? "New" : "I have one"}</button>
                        <button onClick={!fields.isNew ? login : create}>{!fields.isNew ? "Login" : "create one"}</button>
                    </div>
                </>) :
                (<>
                    <SigninProviders />
                </>)}
            <div className="Loginbtns">
                <button onClick={e => setIslocal(prv => !prv)}>{islocal ? "Signin with..." : "switch back"}</button>
            </div>
        </div>
    );
}

export default LoginForm;