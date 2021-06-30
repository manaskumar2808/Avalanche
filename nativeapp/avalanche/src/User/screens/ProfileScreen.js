import React, { useState, useEffect } from 'react';
import axios from '../../../axios-config';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';

import { UIActivityIndicator } from 'react-native-indicators';

import FeedTile from '../../Feed/components/UI/FeedTile';
import AlertTile from '../../common/components/UI/AlertTile';
import CircularProfileItem from '../../common/components/CircularProfileItem';

import RecordIcon from '../../../Icons/RecordIcon';
import ImageIcon from '../../../Icons/ImageIcon';
import TagIcon from '../../../Icons/TagIcon';

import * as actions from '../store/index';
import * as feedActions from '../../Feed/store/index';

import ThemeData from '../../Auth/data/ThemeData';

import baseUrl from '../../../constants/API';
import header from '../../../constants/Header';
import Colors from '../../../constants/Colors';
import itemIndex from '../utility/ItemIndex';

const ProfileScreen = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const userId = useSelector(state => state.ath.userId);
    const currentUser = useSelector(state => state.usr.currentUser);
    const currentUserFeeds = useSelector(state => state.feed.currentUserFeeds);

    const [savedItems, setSavedItems] = useState([]);
    const [friendsCount, setFriendsCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    
    // utility
    const [tabIndex, setTabIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [userFetched, setUserFetched] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        dispatch(actions.fetchCurrentUser(token, userId))
        .then(result => {
            return dispatch(feedActions.fetchCurrentUserFeeds(token, userId));
        })
        .then(result => {
            fetchFriendsCount();
            fetchFollowersCount();
            fetchFollowingCount();
            fetchSavedItems();
            setIsLoading(false);
            setShowErrorModal(false);
            setErrorMessage(null);
        })
        .catch(error => {
            setIsLoading(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }, [dispatch]);

    useEffect(() => {
        setUserFetched(true);
    }, [currentUser]);

    const goToComments = (feedId) => {
        props.navigation.navigate('comment', {
            feedId,
        });
    }

    const goToDetail = (feedId) => {
        props.navigation.navigate('detail', {
            feedId,
        });
    }

    const goToSettings = () => {
        props.navigation.navigate('setting');
    }

    const goToSocial = () => {
        props.navigation.navigate('social');
    }

    const goToMedia = (imageUrl) => {
        props.navigation.navigate('media', {
            imageUrl,
        });
    }


    const fetchSavedItems = () => {
        axios.get('save/feed/saves', header(token))
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            const loadedSavedItems = [];
            for(let key in response.data.saves) {
                loadedSavedItems.push(response.data.saves[key].feed);
            }
            setSavedItems(loadedSavedItems);
            console.log('saved items : ', loadedSavedItems);
        })
        .catch(error => {
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }


    const fetchFriendsCount = () => {
        axios.get('friend/friends-count/'+userId, header(token))
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setFriendsCount(response.data.friendCount);
        })
        .catch(error => {
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }

    const fetchFollowersCount = () => {
        axios.get('follow/followers-count/'+userId, header(token))
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setFollowersCount(response.data.followersCount);
        })
        .catch(error => {
            setFollowersCount(0);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }

    const fetchFollowingCount = () => {
        axios.get('follow/followeds-count/'+userId, header(token))
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setFollowingCount(response.data.followedsCount);
        })
        .catch(error => {
            setFollowingCount(0);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }


    const tab1Styles = [styles.tabContainer];
    const tab2Styles = [styles.tabContainer];
    const tab3Styles = [styles.tabContainer];

    let listData = [];

    switch(tabIndex) {
        case 0:
            listData = [];
            tab1Styles.push(styles.active);
            for(let key in currentUserFeeds) {
                const gallery = currentUserFeeds[key].gallery;
                let valid = false;
                for(let i in gallery) {
                    if(gallery[i].type === 'video') {
                        valid = true;
                        break;
                    }
                }

                if(valid) {
                    listData.push(currentUserFeeds[key]);
                }
            }
            break;
        case 1:
            listData = [];
            tab2Styles.push(styles.active);
            for(let key in currentUserFeeds) {
                const gallery = currentUserFeeds[key].gallery;
                let valid = true;
                for(let i in gallery) {
                    if(gallery[i].type === 'video') {
                        valid = false;
                        break;
                    }
                }

                if(valid) {
                    listData.push(currentUserFeeds[key]);
                }
            }
            break;
        case 2:
            listData = [];
            tab3Styles.push(styles.active);
            console.log(savedItems.length);
            for (let key in savedItems) {
                listData.push(savedItems[key]);
            }
            break;
        default: 
            break;
    }

    if(isLoading || !userFetched) {
        return (
            <View style={styles.loaderContainer}>
                <UIActivityIndicator 
                    color={Colors.primary}
                    size={30}
                />
            </View>
        );
    }



    return (
        <View style={styles.root}>
            <FlatList 
                data={listData}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => tabIndex === itemIndex(item.gallery) && (
                    <FeedTile
                        feedId={item.id} 
                        userName={item.creator.userName}
                        profileImageUrl={item.creator.profileImageUrl}
                        title={item.title}
                        timestamp={item.createdAt}
                        gallery={item.gallery}
                        description={item.description}
                        goToComments={() => goToComments(item.id)}
                        goToDetail={() => goToDetail(item.id)}
                    />
                )}
                 ListHeaderComponent={() => (
                    <View>
                        <View style={styles.themeContainer}>
                            <TouchableWithoutFeedback onPress={goToSocial}>
                                <ImageBackground style={styles.theme} resizeMode="cover" source={currentUser.themeIndex !== -1 ? ThemeData[currentUser.themeIndex].source : {uri: baseUrl + currentUser.themeImageUrl}}>
                                    <View style={{height: 170, justifyContent: "flex-end", alignItems: "flex-end"}}>
                                        <View style={styles.moreContainer}>
                                            <Feather name="more-horizontal" size={28} color="#fff" onPress={goToSettings} />
                                        </View>
                                    </View>
                                    <View style={styles.profileSection}>
                                        <View style={styles.profileImageContainer}>
                                            <CircularProfileItem 
                                                imageUrl={baseUrl + currentUser.profileImageUrl}
                                                 radius={45}
                                                 onPress={() => goToMedia(baseUrl + currentUser.profileImageUrl)}
                                            />
                                        </View>
                                        <View style={styles.profileData}>
                                            <View style={styles.profileInfo}>
                                                <View style={styles.userNameContainer}>
                                                    <Text style={styles.Name}>
                                                        {currentUser.firstName}{' '}{currentUser.lastName}
                                                    </Text>
                                                    <Text style={styles.userName}>
                                                        @{currentUser.userName}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.profileCountSection}>
                                                <TouchableWithoutFeedback onPress={goToSocial}>
                                                    <View style={styles.profileCountContainer}>
                                                        <Text style={styles.profileCount}>
                                                            {friendsCount}
                                                        </Text>
                                                        <Text style={styles.profileCountLabel}>
                                                            Friends
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <TouchableWithoutFeedback onPress={goToSocial}>
                                                    <View style={styles.profileCountContainer}>
                                                        <Text style={styles.profileCount}>
                                                            {followersCount}
                                                        </Text>
                                                        <Text style={styles.profileCountLabel}>
                                                            Followers
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <TouchableWithoutFeedback onPress={goToSocial}>
                                                    <View style={styles.profileCountContainer}>
                                                        <Text style={styles.profileCount}>
                                                            {followingCount}
                                                        </Text>
                                                        <Text style={styles.profileCountLabel}>
                                                            Following
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.tabSection}>
                            <View style={tab1Styles}>
                                <RecordIcon 
                                    color={tabIndex === 0 ? Colors.primary : Colors.secondary}
                                    onPress={() => setTabIndex(0)}
                                />
                            </View>
                            <View style={tab2Styles}>
                                <ImageIcon 
                                    color={tabIndex === 1 ? Colors.primary : Colors.secondary}
                                    onPress={() => setTabIndex(1)}
                                />
                            </View>
                            <View style={tab3Styles}>
                                <TagIcon 
                                    color={tabIndex === 2 ? Colors.primary : Colors.secondary}
                                    onPress={() => setTabIndex(2)}
                                />
                            </View>
                        </View>
                    </View>
                )}
            />
            {
                showErrorModal && 
                <AlertTile 
                    message={errorMessage}
                    buttonText="Okay"
                    close={() => setShowErrorModal(false)}
                    onPress={() => setShowErrorModal(false)}
                    title="User Error"
                />
            }
        </View>
    );
}

ProfileScreen.navigationOptions = navData => {
    return {
        headerShown: false,
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    loaderContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    themeContainer: {
        height: 310,
    },
    theme: {
        height: 200,
        width: "100%",
        backgroundColor: Colors.lightGrey,
    },
    profileSection: {
        width: "100%",
        flexDirection: "row",
    },
    profileImageContainer: {
        margin: 10,
    },
    profileData: {
        marginTop: 35,
        flex: 1,
    },
    profileInfo: {
        flexDirection: "row",
    },
    userNameContainer: {
        marginBottom: 15,
        flex: 1,
    },
    Name: {
        fontSize: 22,
        color: Colors.dark,
    },
    userName: {
        fontSize: 17,
        color: Colors.secondary,
    },
    moreContainer: {
        marginHorizontal: 10,
        alignSelf: "flex-end",
    },
    profileCountSection: {
        flexDirection: "row",
    },
    profileCountContainer: {
        flex: 1,
    },
    profileCount: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.dark,
    },
    profileCountLabel: {
        fontSize: 15,
        color: Colors.secondary
    },
    moreContainer: {
        marginTop: 10,
        marginRight: 20,
    },
    tabSection: {
        marginVertical: 20,
        width: "100%",
        flexDirection: "row"
    },
    tabContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },  
    active: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
    },
});

export default ProfileScreen;