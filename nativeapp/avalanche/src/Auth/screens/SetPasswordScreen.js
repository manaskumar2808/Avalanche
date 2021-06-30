import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../../constants/Colors';

import AlertTile from '../../common/components/UI/AlertTile';
import ButtonTile from '../../common/components/UI/ButtonTile';
import InputTile from '../../common/components/UI/InputTile';

import * as actions from '../store/index';

import * as authValidators from '../validators/AuthValidators';

const SetPasswordScreen = props => {
    const dispatch = useDispatch();
    
    const userName = useSelector(state => state.ath.authUserName);
    const email = useSelector(state => state.ath.authEmail);
    const firstName = useSelector(state => state.ath.authFirstName);
    const lastName = useSelector(state => state.ath.authLastName);
    const profileImage = useSelector(state => state.ath.authProfileImage);
    const themeImage = useSelector(state => state.ath.authThemeImage);
    const themeIndex = useSelector(state => state.ath.authThemeIndex);
    const phoneNo = useSelector(state => state.ath.authPhoneNo);
    const age = useSelector(state => state.ath.authAge);

    // input handlers
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // error handlers
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    // utility handlers 
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const checkValidity = () => {
        let valid = true;
        const _passwordError = authValidators.passwordValidator(password);
        const _passwordConfirmError = authValidators.passwordConfirmValidator(confirmPassword, password);

        if(_passwordError) {
            valid = false;
            setPasswordError(_passwordError);
        } 
        if(_passwordConfirmError) {
            valid = false;
            setConfirmPasswordError(_passwordConfirmError);
        }

        return valid;
    }

    const signup = () => {
        setIsLoading(true);
        const isValid = checkValidity();
        if(isValid) {
            console.log('valid');
            const formData = new FormData();
            formData.append('userName', userName);
            formData.append('email', email);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('profileImage', profileImage);
            formData.append('themeImage', themeImage);
            formData.append('themeIndex', themeIndex);
            formData.append('phoneNo', phoneNo);
            formData.append('age', age);
            formData.append('password', password);

            dispatch(actions.signup(formData))
            .then(result => {
                setIsLoading(false);
                props.navigation.navigate('signupSuccess');
            })
            .catch(error => {
                setIsLoading(false);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
        } else {
            console.log('not valid');
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.root}>
            <ScrollView>
                <View style={styles.legendContainer}>
                    <Text style={styles.legend}>Set Password</Text>
                </View>
                <InputTile 
                    placeholder="Password"
                    obscureText
                    value={password}
                    setValue={setPassword}
                    error={passwordError}
                />
                <InputTile 
                    placeholder="Confirm Password"
                    obscureText
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    error={confirmPasswordError}
                />
                <View style={styles.helperContainer}>
                    <Text style={styles.helperText}>
                        By Signing up you agree to our Terms of User and Privacy Policy
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <ButtonTile 
                        title="Sign up"
                        onPress={signup}
                        isLoading={isLoading}
                    />
                </View>
            </ScrollView>
            {
                showErrorModal &&
                <AlertTile 
                    title="Signup Error"
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
        paddingHorizontal: 20,
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
        marginTop: 30,
        width: "100%",
        alignItems: "center",
    },
    helperContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    helperText: {
        fontSize: 16,
        textAlign: "center",
        color: Colors.secondary,
    },
});

export default SetPasswordScreen;