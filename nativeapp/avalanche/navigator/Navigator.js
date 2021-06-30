import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SplashScreen from '../src/Auth/screens/SplashScreen';

import { AuthStackNavigator } from '../src/Auth/navigator/Navigator';
import { TabNavigator } from './TabNavigator';
import { CardStyleInterpolators, createStackNavigator } from 'react-navigation-stack';

import DetailScreen from '../src/Feed/screens/DetailScreen';
import Colors from '../constants/Colors';
import BackIcon from '../Icons/BackIcon';
import CommentScreen from '../src/Comment/screens/CommentScreen';
import StoryScreen from '../src/Story/screens/StoryScreen';
import CreatePostScreen from '../src/Feed/screens/CreatePostScreen';
import CreateStoryScreen from '../src/Story/screens/CreateStoryScreen';
import ProfileViewScreen from '../src/User/screens/ProfileViewScreen';
import DescriptionScreen from '../src/Feed/screens/DescriptionScreen';
import PostChooseScreen from '../src/Feed/screens/PostChooseScreen';
import PostSuccessScreen from '../src/Feed/screens/PostSuccessScreen';
import CreateOptionScreen from '../src/common/screens/CreateOptionScreen';
import CameraScreen from '../src/common/screens/CameraScreen';
import GalleryScreen from '../src/common/screens/GalleryScreen';
import ChatScreen from '../src/Chat/screens/ChatScreen';
import MediaScreen from '../src/Chat/screens/MediaScreen';
import SearchScreen from '../src/Chat/screens/SearchScreen';
import FindFriendScreen from '../src/Friend/screens/FindFriendScreen';
import SocialScreen from '../src/User/screens/SocialScreen';
import ProjectDetailScreen from '../src/Project/screens/ProjectDetailScreen';
import CreateProjectScreen from '../src/Project/screens/CreateProjectScreen';
import AddMediaScreen from '../src/Project/screens/AddMediaScreen';
import AddContentScreen from '../src/Project/screens/AddContentScreen';
import AddThemeScreen from '../src/Project/screens/AddThemeScreen';
import ProjectChooseScreen from '../src/Project/screens/ProjectChooseScreen';
import ProjectSuccessScreen from '../src/Project/screens/ProjectSuccessScreen';
import SettingScreen from '../src/User/screens/SettingScreen';
import EditProfileScreen from '../src/User/screens/EditProfileScreen';
import EditOptionScreen from '../src/User/screens/EditOptionScreen';
import BioScreen from '../src/Auth/screens/BioScreen';
import ThemeScreen from '../src/Auth/screens/ThemeScreen';
import ChangePasswordScreen from '../src/User/screens/ChangePasswordScreen';
import NotificationScreen from '../src/Notification/screens/NotificationScreen';
import LanguageScreen from '../src/User/screens/LanguageScreen';
import ReportScreen from '../src/User/screens/ReportScreen';
import LogoutScreen from '../src/Auth/screens/LogoutScreen';
import NotificationSettingScreen from '../src/User/screens/NotificationSettingScreen';

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

const HomeStackNavigator = createStackNavigator({
    tabs: {
        screen: TabNavigator,
        navigationOptions: {
            headerShown: false,
        }
    },

    chat: ChatScreen,
    media: MediaScreen,
    search: SearchScreen,
    findFriend: FindFriendScreen,
    setting: SettingScreen,

    editProfile: EditProfileScreen,
    editOption: EditOptionScreen,
    social: SocialScreen,
    bioUpdate: BioScreen,
    themeUpdate: ThemeScreen,
    changePassword: ChangePasswordScreen,
    notification: NotificationScreen,
    notificationSetting: NotificationSettingScreen,
    language: LanguageScreen,
    report: ReportScreen,
    logout: LogoutScreen,
    media: MediaScreen,

    detail: DetailScreen,
    comment: CommentScreen,
    story: StoryScreen,
    createPost: CreatePostScreen,
    createStory: CreateStoryScreen,
    profileView: ProfileViewScreen,
    description: DescriptionScreen,
    postChoose: PostChooseScreen,
    postSuccess: PostSuccessScreen,

    projectDetail: ProjectDetailScreen,
    createProject: CreateProjectScreen,
    addMedia: AddMediaScreen,
    addContent: AddContentScreen,
    addTheme: AddThemeScreen,
    projectChoose: ProjectChooseScreen,
    projectSuccess: ProjectSuccessScreen,

    createOption: CreateOptionScreen,
    camera: CameraScreen,
    gallery: GalleryScreen,
}, stackConfig);

const AppNavigator = createSwitchNavigator({
    splash: SplashScreen,
    auth: AuthStackNavigator,
    app: HomeStackNavigator,
});

export default createAppContainer(AppNavigator);