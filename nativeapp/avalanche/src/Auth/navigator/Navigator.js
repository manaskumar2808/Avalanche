import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from 'react-navigation-stack';

import GuestScreen from '../screens/GuestScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import PersonalDetailScreen from '../screens/PersonalDetailScreen';
import ThemeScreen from '../screens/ThemeScreen';
import BioScreen from '../screens/BioScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen';
import SignupSuccessScreen from '../screens/SignupSuccessScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SetNewPasswordScreen from '../screens/SetNewPasswordScreen';
import ThemeSelectionScreen from '../screens/ThemeSelectionScreen';
import CreateOptionScreen from '../../common/screens/CreateOptionScreen';
import CameraScreen from '../../common/screens/CameraScreen';
import GalleryScreen from '../../common/screens/GalleryScreen';

import BackIcon from '../../../Icons/BackIcon';
import Colors from '../../../constants/Colors';

const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
};

const AuthStackNavigator = createStackNavigator({
    guest: GuestScreen,
    login: LoginScreen,
    signup: SignupScreen,
    personalDetail: PersonalDetailScreen,
    theme: ThemeScreen,
    bio: BioScreen,
    setPassword: SetPasswordScreen,
    signupSuccess: SignupSuccessScreen,
    forgotPassword: ForgotPasswordScreen,
    setNewPassword: SetNewPasswordScreen,
    themeSelection: ThemeSelectionScreen,
    createOption: CreateOptionScreen,
    camera: CameraScreen,
    gallery: GalleryScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            elevation: 0,
            backgroundColor: Colors.navBar,
        },
        headerTitle: () => null,
        headerLeft: ({canGoBack, onPress}) => !canGoBack ? null : (
            <BackIcon color={Colors.secondary} onPress={onPress} />
        ),
        headerLeftContainerStyle: {
            marginLeft: 20,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
            open: config,
            close: config,
        }
    },
});


export { AuthStackNavigator };