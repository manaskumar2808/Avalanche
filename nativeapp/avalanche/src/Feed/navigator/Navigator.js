import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from 'react-navigation-stack';
import Colors from '../../../constants/Colors';
import CreatePostScreen from '../screens/CreatePostScreen';
import DescriptionScreen from '../screens/DescriptionScreen';

import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import PostChooseScreen from '../screens/PostChooseScreen';
import PostSuccessScreen from '../screens/PostSuccessScreen';
import CreateOptionScreen from '../../common/screens/CreateOptionScreen';
import CameraScreen from '../../common/screens/CameraScreen';
import GalleryScreen from '../../common/screens/GalleryScreen';
import CommentScreen from '../../Comment/screens/CommentScreen';
import StoryScreen from '../../Story/screens/StoryScreen';
import ProfileViewScreen from '../../User/screens/ProfileViewScreen';
import BackIcon from '../../../Icons/BackIcon';
import CreateStoryScreen from '../../Story/screens/CreateStoryScreen';

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


const FeedStackNavigator = createStackNavigator({
    home: HomeScreen,
    // detail: DetailScreen,
    // comment: CommentScreen,
    // story: StoryScreen,
    // createPost: CreatePostScreen,
    // createStory: CreateStoryScreen,
    // profileView: ProfileViewScreen,
    // description: DescriptionScreen,
    // postChoose: PostChooseScreen,
    // postSuccess: PostSuccessScreen,
    // createOption: CreateOptionScreen,
    // camera: CameraScreen,
    // gallery: GalleryScreen,
}, stackConfig);

export { FeedStackNavigator };