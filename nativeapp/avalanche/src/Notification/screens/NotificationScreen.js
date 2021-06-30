import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { Ionicons, Feather } from '@expo/vector-icons';

import Colors from '../../../constants/Colors';

import CameraIcon from '../../../Icons/CameraIcon';

const NotificationScreen = props => {
    const notifications = [];

    if(notifications.length == 0) {
        return (
            <View style={styles.layoverContainer}>
                <Ionicons name="notifications" size={24} color="black" />
                <Text>
                    No notifications yet
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.root}>
            
        </View>
    );
}

NotificationScreen.navigationOptions = navData => {
    return {
        headerTitle: "Notifications",
        headerLeft: () => (
            <CameraIcon 
                color={Colors.secondary}
                onPress={() => navData.navigation.navigate('story')}
            />
        ),
        headerRight: () => (
            <Feather name="more-horizontal" size={28} color={Colors.secondary} />
        ),
        headerRightContainerStyle: {
            marginHorizontal: 20,
        }
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    layoverContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default NotificationScreen;