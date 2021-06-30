import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Colors from '../../../constants/Colors';

import ButtonTile from '../../common/components/UI/ButtonTile';
import InputTile from '../../common/components/UI/InputTile';

const ChangePasswordScreen = props => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const changePassword = () => {

    }

    return (
        <View style={styles.root}>
            <View style={styles.legendContainer}>
                <Text style={styles.legend}>Change Password</Text>
            </View>
            <InputTile 
                placeholder="Old Password"
                obscureText
                value={oldPassword}
                setValue={setOldPassword}
            />
            <InputTile 
                placeholder="New Password"
                obscureText
                value={newPassword}
                setValue={setNewPassword}
            />
            <InputTile 
                placeholder="Confirm New Password"
                obscureText
                value={confirmNewPassword}
                setValue={setConfirmNewPassword}
            />
            <View style={styles.buttonContainer}>
                <ButtonTile 
                    title="Change Password"
                    onPress={changePassword}
                />
            </View>
        </View>
    );
}


ChangePasswordScreen.navigationOptions = navData => {
    return {
        headerTitle: () => null,
    }
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

export default ChangePasswordScreen;