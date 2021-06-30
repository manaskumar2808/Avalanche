import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
} from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Colors from '../constants/Colors';
import HomeFillIcon from '../Icons/HomeFillIcon';
import HomeOpenIcon from '../Icons/HomeOpenIcon';
import ExploreFillIcon from '../Icons/ExploreFillIcon';
import ExploreOpenIcon from '../Icons/ExploreOpenIcon';
import MessageIcon from '../Icons/MessageIcon';
import NotificationIcon from '../Icons/NotificationIcon';
import ProfileFillIcon from '../Icons/ProfileFillIcon';
import ProfileOpenIcon from '../Icons/ProfileOpenIcon';

import { FeedStackNavigator } from '../src/Feed/navigator/Navigator';
import { ExploreStackNavigator } from '../src/Project/navigator/Navigator';
import { MessageStackNavigator } from '../src/Chat/navigator/Navigator';
import { NotificationStackNavigator } from '../src/Notification/navigator/Navigator';
import { ProfileStackNavigator } from '../src/User/navigator/Navigator';

const tabBarConfig = {
    homeTab: {
        screen: FeedStackNavigator,
        navigationOptions: ({navigation}) =>  {
            let tabBarVisible = true;
            if(navigation.state.index > 0) {
                tabBarVisible = false;
            }
            return {
                tabBarVisible: tabBarVisible,
                tabBarIcon: tabInfo => {
                    return (
                        <View style={tabStyles.root}>
                            {
                                tabInfo.focused ? 
                                <HomeFillIcon color={Colors.primary} />
                                    :
                                <HomeOpenIcon color={Colors.secondary} />
                            }
                        </View>
                    );
                },
            }
        }
    },
    exploreTab: {
        screen: ExploreStackNavigator,
        navigationOptions: ({navigation}) =>  {
            let tabBarVisible = true;
            if(navigation.state.index > 0) {
                tabBarVisible = false;
            }
            return {
                tabBarVisible: tabBarVisible,
                tabBarIcon: tabInfo => {
                    return (
                        <View style={tabStyles.root}>
                            {
                                tabInfo.focused ? 
                                <ExploreFillIcon color={Colors.primary} />
                                    :
                                <ExploreOpenIcon color={Colors.secondary} />
                            }
                        </View>
                    )
                },
            }
        }
    },
    messageTab: {
        screen: MessageStackNavigator,
        navigationOptions: ({navigation}) =>  {
            let tabBarVisible = true;
            if(navigation.state.index > 0) {
                tabBarVisible = false;
            }
            return {
                tabBarVisible: tabBarVisible,
                tabBarIcon: tabInfo => {
                    return (
                        <View style={tabStyles.root}>
                            {
                                tabInfo.focused ? 
                                <MessageIcon color={Colors.primary} />
                                    :
                                <MessageIcon color={Colors.secondary} />
                            }
                        </View>
                    )
                },
            }
        }
    },
    notificationTab: {
        screen: NotificationStackNavigator,
        navigationOptions: ({navigation}) =>  {
            let tabBarVisible = true;
            if(navigation.state.index > 0) {
                tabBarVisible = false;
            }
            return {
                tabBarVisible: tabBarVisible,
                tabBarIcon: tabInfo => {
                    return (
                        <View style={tabStyles.root}>
                            <NotificationIcon color={tabInfo.focused ? Colors.primary : Colors.secondary} />
                        </View>
                    )
                },
            }
        }
    },
    profileTab: {
        screen: ProfileStackNavigator,
        navigationOptions: ({navigation}) => {
            let tabBarVisible = true;
            if(navigation.state.index > 0) {
                tabBarVisible = false;
            }
            return {
                tabBarVisible: tabBarVisible,
                tabBarIcon: tabInfo => {
                    return (
                        <View style={tabStyles.root}>
                            {
                                tabInfo.focused ? 
                                <ProfileFillIcon color={Colors.primary} />
                                    :
                                <ProfileOpenIcon color={Colors.secondary} />
                            }
                        </View>
                    )
                },
            }
        }
    },
};


const tabStyles = StyleSheet.create({
    root: {
        width: 50,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
});


const TabNavigator = Platform.OS === "ios" ? 
    createBottomTabNavigator(
        tabBarConfig, {
           tabBarOptions: {
               activeTintColor: Colors.primary,
               inactiveTintColor: Colors.secondary,
               showLabel: false,
               tabStyle: {
                   backgroundColor: Colors.blackish,
                   borderBottomColor: "#fff",
                   borderBottomWidth: 0,
               },
           }
        },
    ) 
        : 
    createMaterialBottomTabNavigator(
        tabBarConfig, {
            defaultNavigationOptions: {
                tabBarColor: Colors.blackish,
            },
            activeColorLight: Colors.primary,
            inactiveColorLight: Colors.secondary,
            inactiveColor: Colors.secondary,
            barStyleLight: {
                backgroundColor: Colors.background,
                borderTopColor: Colors.lightGrey,
                borderTopWidth: 0,
            },
            labeled: false,     
        },
    );

export { TabNavigator };