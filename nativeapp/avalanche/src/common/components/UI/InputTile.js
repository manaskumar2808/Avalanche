import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';

import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../../../constants/Colors';


const InputTile = props => {
    const [hideText, setHideText] = useState(props.obscureText || false);

    const inputContainerStyles = [styles.inputContainerStyle];
    if(props.error) {
        inputContainerStyles.push(styles.errorInputContainer);
    }

    const toggleHideText = () => {
        setHideText(prevState => !prevState);
    }

    const setInputFocused = (e) => {
        inputContainerStyles.push(styles.focusedInput);
    }

    return (
        <View style={styles.root}>
            <Input 
                style={styles.input}
                placeholder={props.placeholder}
                placeholderTextColor={Colors.lightGrey}
                value={props.value}
                label={props.label}
                keyboardType={props.keyboardType}
                inputStyle={styles.inputStyle}
                inputContainerStyle={inputContainerStyles}
                secureTextEntry={hideText}
                onChangeText={props.setValue}
                errorMessage={props.error}
                errorStyle={styles.error}
                errorProps={{
                    selectionColor: Colors.danger,
                }}
                returnKeyType={props.returnKeyType}
                rightIcon={ !props.obscureText ? null : () => hideText ? <Ionicons name="eye-off" size={28} color={Colors.secondary} onPress={toggleHideText} /> : <Ionicons name="eye" size={28} color={Colors.secondary} onPress={toggleHideText} />}
            />
            {
                props.showForgotPassword ? 
                <View style={styles.forgotPasswordContainer}>
                    <TouchableWithoutFeedback onPress={props.onForgotPasswordPress}>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableWithoutFeedback>
                </View>
                    :  null
            }
        </View>
    );
}

InputTile.propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.string,
    obscureText: PropTypes.bool,
    value: PropTypes.string,
    setValue: PropTypes.func,
    error: PropTypes.string,
    showForgotPassword: PropTypes.bool,
    onForgotPasswordPress: PropTypes.func,
    keyboardType: PropTypes.string,
    returnKeyType: PropTypes.string,
}


const styles = StyleSheet.create({
    root: {

    },
    inputContainerStyle: {
        width: "100%",
    },
    errorInputContainer: {
        borderBottomColor: Colors.danger,
    },
    labelStyle: {

    },
    inputStyle: {
        alignItems: "center",
        paddingVertical: 20,
        color: Colors.dark,
    },
    focusedInput: {
        borderBottomColor: Colors.primary,
    },
    placeholderStyle: {

    },
    forgotPasswordContainer: {
        alignItems: "flex-end",
        marginBottom: 40,
        marginRight: 10,
    },
    forgotPassword: {
        fontSize: 16,
        color: Colors.secondary,
    },
    error: {
        color: Colors.danger,
        fontSize: 15,
    },  
});

export default InputTile;