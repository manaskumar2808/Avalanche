import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch } from 'react-redux'; 

import Colors from '../../../constants/Colors';

import InputTile from '../../common/components/UI/InputTile';
import ButtonTile from '../../common/components/UI/ButtonTile';

import * as authValidators from '../validators/AuthValidators';

import * as actions from '../store/index';

const SignupScreen = props => {
    const dispatch = useDispatch();

    // input handlers
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    // error handlers
    const [userNameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);

    // utility handlers
    const [isLoading, setIsLoading] = useState(false);

    const goToLogin = () => {
        props.navigation.replace('login');
    }

    const checkValidity = () => {
        let valid = true;
        const _userNameError = authValidators.userNameValidator(userName);
        const _emailError = authValidators.emailValidator(email);
        if(_userNameError) {
            valid = false;
            setUsernameError(_userNameError);
        }
        if(_emailError) {
            valid = false;
            setEmailError(_emailError);
        }

        return valid;
    }

    const goToPersonalDetails = () => {
        setIsLoading(true);
        const isValid = checkValidity();
        if(isValid) {
            dispatch(actions.setUserNameAndEmail(userName, email));
            props.navigation.navigate('personalDetail');
        }
        setIsLoading(false);
    }

    return (
        <View style={styles.root}>
            <View style={styles.legendContainer}>
                <Text style={styles.legend}>Sign up</Text>
            </View>
            <InputTile 
                placeholder="Your Email"
                value={email}
                setValue={setEmail}
                error={emailError}
                keyboardType="email-address"
            />
            <InputTile 
                placeholder="Username"
                value={userName}
                setValue={setUserName}
                error={userNameError}
            />

            <View style={styles.buttonContainer}>
                <ButtonTile 
                    title="Next"
                    onPress={goToPersonalDetails}
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
                    Already have an account?
                </Text>
                <TouchableWithoutFeedback onPress={goToLogin}>
                    <Text style={styles.changeAuthMode}>
                        Log in
                    </Text>
                </TouchableWithoutFeedback>
            </View>
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
        marginTop: 30,
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

export default SignupScreen;