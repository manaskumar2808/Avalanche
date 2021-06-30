import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from 'react-navigation-stack';
import Colors from '../../../constants/Colors';
import NotificationScreen from '../screens/NotificationScreen';

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

const stackConfig = {
    defaultNavigationOptions: {
        headerTitleAlign: "center",
        headerTitleStyle: {
            fontSize: 25,
            color: Colors.dark,
        },
        headerStyle: {
            elevation: 0,
            backgroundColor: Colors.background,
            // borderBottomWidth: 0.5,
        },
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
    }
};


const NotificationStackNavigator = createStackNavigator({
    notification: NotificationScreen,
}, stackConfig);


export { NotificationStackNavigator };