import React, { useState, } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../../constants/Colors';

import InputTile from '../../common/components/UI/InputTile';
import AlertTile from '../../common/components/UI/AlertTile';
import ButtonTile from '../../common/components/UI/ButtonTile';

import * as authValidators from '../validators/AuthValidators';

import * as actions from '../store/index';

const LoginScreen = props => {
    const dispatch = useDispatch();

    // input handlers
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // error handlers
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    // utility handlers
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const goToSignup = () => {
        props.navigation.replace('signup');
    }

    const goToForgotPassword = () => {
        props.navigation.navigate('forgotPassword');
    }

    const checkValidity = () => {
        let valid = true;
        const _emailError = authValidators.emailValidator(email);
        const _passwordError =  authValidators.passwordValidator(password);
        if(_emailError) {
            valid = false;
            setEmailError(_emailError);
        }  
        if(_passwordError)  {
            valid = false;
            setPasswordError(_passwordError);
        }
        return valid;
    }

    const login = () => {
        setIsLoading(true);
        const isValid = checkValidity();
        if(isValid) {
            const authData = {
                email,
                password,
            }
            dispatch(actions.login(authData))
            .then(result => {
                setIsLoading(false);
                props.navigation.navigate('app');
            })
            .catch(error => {
                setIsLoading(false);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
        } else {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.root}>
            <View style={styles.legendContainer}>
                <Text style={styles.legend}>Log in</Text>
            </View>
            <InputTile 
                placeholder="Your Email"
                value={email}
                setValue={setEmail}
                error={emailError}
                keyboardType="email-address"
            />
            <InputTile 
                placeholder="Password"
                obscureText
                value={password}
                setValue={setPassword}
                showForgotPassword
                onForgotPasswordPress={goToForgotPassword}
                error={passwordError}
            />
            <View style={styles.buttonContainer}>
                <ButtonTile 
                    title="Login"
                    onPress={login}
                    isLoading={isLoading}
                />
            </View>
            {/* <View style={styles.socialContainer}>
                <Text style={styles.socialText}>
                    Or log in with social account
                </Text>
            </View> */}
            <View style={{flex: 1}}></View>

            <View style={styles.changeAuthModeContainer}>
                <Text style={styles.changeAuthModeText}>
                    Don't have an account?
                </Text>
                <TouchableWithoutFeedback onPress={goToSignup}>
                    <Text style={styles.changeAuthMode}>
                        Sign up
                    </Text>
                </TouchableWithoutFeedback>
            </View>
            {
                showErrorModal &&
                <AlertTile 
                    title="Login Error"
                    message={errorMessage}
                    buttonText="Okay"
                    close={() => setShowErrorModal(false)}
                    onPress={() => setShowErrorModal(false)}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background,
    },
    legendContainer: {
        marginVertical: 20,
        marginHorizontal: 10,
    },
    legend: {
        fontSize: 30,
        fontWeight: "700",
        color: Colors.dark,
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
    },
    socialContainer: {
        marginVertical: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    socialText: {
        fontSize: 15,
        color: Colors.secondary,
    },
    changeAuthModeContainer: {
        marginVertical: 40,
        justifyContent: "center",
        alignItems: "center", 
        flexDirection: "row",
    },
    changeAuthModeText: {
        fontSize: 16,
        color: Colors.secondary,
    },
    changeAuthMode: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "700",
        color: Colors.secondary,
    },
});

export default LoginScreen;