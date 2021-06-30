import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';

import Colors from '../../../constants/Colors';

import * as actions from '../store/index';
import * as userActions from '../../User/store/index';

const LogoutScreen = props => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(userActions.resetUserParameters());
        dispatch(actions.resetAuthParameters());
        dispatch(actions.logout());
        props.navigation.navigate('auth');
    }

    const goBack = () => {
        props.navigation.goBack();
    }

    return (
        <View style={styles.root}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Are you sure you want to log out ?
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Yes"
                    type="clear"
                    titleStyle={{color: Colors.dark, fontSize: 19}}
                    onPress={logout}
                />
                <Button
                    title="No"
                    type="clear"
                    titleStyle={{color: Colors.primary, fontSize: 19}}
                    onPress={goBack}
                />
            </View>
        </View>
    );
}

LogoutScreen.navigationOptions = navData => {
    return {
        headerTitle: "Logout",
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    textContainer: {
        marginVertical: 20,
    },
    text: {
        color: Colors.secondary,
        fontSize: 17,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default LogoutScreen;