import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Colors from '../../../constants/Colors';

import InputTile from '../../common/components/UI/InputTile';
import ButtonTile from '../../common/components/UI/ButtonTile';

const SetNewPasswordScreen = props => {
    const setNewPassword = () => {

    }

    return (
        <View style={styles.root}>
            <View style={styles.legendContainer}>
                <Text style={styles.legend}>New Password</Text>
            </View>
            <InputTile 
                placeholder="New Password"
                obscureText
            />
            <InputTile 
                placeholder="Confirm New Password"
                obscureText
            />
            <View style={styles.buttonContainer}>
                <ButtonTile 
                    title="Set new Password"
                    onPress={setNewPassword}
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

export default SetNewPasswordScreen;