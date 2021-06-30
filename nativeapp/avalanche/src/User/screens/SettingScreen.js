import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import LogoutIcon from '../../../Icons/LogoutIcon';

import SettingTile from '../components/UI/SettingTile';

import Colors from '../../../constants/Colors';

const SettingScreen = props => {
    const goToEditProfile = () => {
        props.navigation.navigate('editProfile');
    }

    const goToChangePassword = () => {
        props.navigation.navigate('changePassword');
    }

    const goToNotificationSettings = () => {
        props.navigation.navigate('notificationSetting');
    }

    const goToLanguage = () => {
        props.navigation.navigate('language');
    }

    const goToHelps = () => {

    }

    const goToReportProblem = () => {
        props.navigation.navigate('report');
    }

    const goToTermsOfUse = () => {

    }

    const logout = () => {
        props.navigation.navigate('logout');
    }

    return (
        <View style={styles.root}>
            <SettingTile 
                title="Edit Profile"
                onPress={goToEditProfile}
            />
            <SettingTile 
                title="Change Password"
                onPress={goToChangePassword}
            />  
            <SettingTile 
                title="Notifications"
                onPress={goToNotificationSettings}
            />
            <SettingTile 
                title="Language"
                iconText="English"
                onPress={goToLanguage}
            />
            <SettingTile 
                title="Get Help"
                onPress={goToHelps}
            />
            <SettingTile 
                title="Report Problems"
                onPress={goToReportProblem}
            />
            <SettingTile 
                title="Terms of Use"
                onPress={goToTermsOfUse}
            />
            <SettingTile 
                title="Log out"
                icon={
                  <LogoutIcon 
                    color={Colors.lightGrey}
                  />  
                }
                onPress={logout}
            />
        </View>
    );
}

SettingScreen.navigationOptions = navData => {
    return {
        headerTitle: "Settings",
        headerRight: () => (
            <Feather name="more-horizontal" size={28} color={Colors.secondary} />
        ),
        headerRightContainerStyle: {
            marginHorizontal: 20,
        },
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
    },
});

export default SettingScreen;