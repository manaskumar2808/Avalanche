import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Colors from '../../../constants/Colors';

import ButtonTile from '../../common/components/UI/ButtonTile';
import InputTile from '../../common/components/UI/InputTile';

const ForgotPasswordScreen = props => {

    const sendEmail = () => {
        props.navigation.navigate('setNewPassword');
    }

    return (
        <View style={styles.root}>
            <View style={styles.legendContainer}>
                <Text style={styles.legend}>Forgot Password?</Text>
            </View>
            <View style={styles.helperContainer}>
                <Text style={styles.helperText}>
                    Please enter your email to recieve instruction to reset your password.
                </Text>
            </View>
            <InputTile 
                placeholder="Your Email"
            />
            <View style={styles.buttonContainer}>
                <ButtonTile 
                    title="Send me now"
                    onPress={sendEmail}
                />
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
    helperContainer: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    helperText: {
        color: Colors.secondary,
        fontSize: 16,
    },
});

export default ForgotPasswordScreen;