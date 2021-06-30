import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from 'react-navigation-stack';

import CommentScreen from '../../Comment/screens/CommentScreen';
import CameraScreen from '../../common/screens/CameraScreen';
import CreateOptionScreen from '../../common/screens/CreateOptionScreen';
import GalleryScreen from '../../common/screens/GalleryScreen';
import DetailScreen from '../../Feed/screens/DetailScreen';
import FindFriendScreen from '../../Friend/screens/FindFriendScreen';
import ProfileViewScreen from '../../User/screens/ProfileViewScreen';
import SocialScreen from '../../User/screens/SocialScreen';
import ChatScreen from '../screens/ChatScreen';
import MediaScreen from '../screens/MediaScreen';
import MessageScreen from '../screens/MessageScreen';
import SearchScreen from '../screens/SearchScreen';

import Colors from '../../../constants/Colors';
import BackIcon from '../../../Icons/BackIcon';

const stackConfig = {
    defaultNavigationOptions: {
        headerTitleAlign: "center",
        headerTitleStyle: {
            fontSize: 25,
            color: Colors.dark,
        },
        headerStyle: {
            elevation: 0,
            backgroundColor: Colors.navBar,
            // borderBottomWidth: 0.5,
        },
        headerLeft: ({canGoBack, onPress}) => !canGoBack ? null : (
            <BackIcon color={Colors.secondary} onPress={onPress} />
        ),
        headerLeftContainerStyle: {
            marginLeft: 20,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
};


const MessageStackNavigator = createStackNavigator({
    message: MessageScreen,
}, stackConfig);

export { MessageStackNavigator };