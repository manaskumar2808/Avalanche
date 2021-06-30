import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from 'react-navigation-stack';
import Colors from '../../../constants/Colors';

import BioScreen from '../../Auth/screens/BioScreen';
import ThemeScreen from '../../Auth/screens/ThemeScreen';
import MediaScreen from '../../Chat/screens/MediaScreen';
import CommentScreen from '../../Comment/screens/CommentScreen';
import CameraScreen from '../../common/screens/CameraScreen';
import CreateOptionScreen from '../../common/screens/CreateOptionScreen';
import GalleryScreen from '../../common/screens/GalleryScreen';
import DetailScreen from '../../Feed/screens/DetailScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import EditOptionScreen from '../screens/EditOptionScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import LanguageScreen from '../screens/LanguageScreen';
import NotificationSettingScreen from '../screens/NotificationSettingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReportScreen from '../screens/ReportScreen';
import SettingScreen from '../screens/SettingScreen';
import SocialScreen from '../screens/SocialScreen';
import LogoutScreen from '../../Auth/screens/LogoutScreen';
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


const ProfileStackNavigator = createStackNavigator({
    profile: ProfileScreen,
}, stackConfig);

export { ProfileStackNavigator };