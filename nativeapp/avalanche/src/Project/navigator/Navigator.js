import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from 'react-navigation-stack';

import ExploreScreen from '../screens/ExploreScreen';
import ProjectDetailScreen from '../screens/ProjectDetailScreen';
import AddContentScreen from '../screens/AddContentScreen';
import AddMediaScreen from '../screens/AddMediaScreen';
import CreateProjectScreen from '../screens/CreateProjectScreen';
import ProjectChooseScreen from '../screens/ProjectChooseScreen';
import ProjectSuccessScreen from '../screens/ProjectSuccessScreen';
import DescriptionScreen from '../screens/DescriptionScreen';
import CreateOptionScreen from '../../common/screens/CreateOptionScreen';
import AddThemeScreen from '../screens/AddThemeScreen';

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


const ExploreStackNavigator = createStackNavigator({
    explore: ExploreScreen,
}, stackConfig);

export { ExploreStackNavigator };