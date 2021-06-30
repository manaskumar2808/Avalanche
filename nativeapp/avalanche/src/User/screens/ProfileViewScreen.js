import React, { useState, useEffect } from 'react';
import axios from '../../../axios-config';
import { withNavigationFocus } from 'react-navigation';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { UIActivityIndicator } from 'react-native-indicators';

import CircularProfileItem from '../../common/components/CircularProfileItem';
import AlertTile from '../../common/components/UI/AlertTile';
import FeedTile from '../../Feed/components/UI/FeedTile';
import FlatButtonTile from '../../common/components/UI/FlatButtonTile';

import ImageIcon from '../../../Icons/ImageIcon';
import BackIcon from '../../../Icons/BackIcon';
import RecordIcon from '../../../Icons/RecordIcon';

import ThemeData from '../../Auth/data/ThemeData';

import * as actions from '../store/index';
import * as userActions from '../../User/store/index';
import * as feedActions from '../../Feed/store/index';
import * as requestActions from '../../Request/store/index';
import * as friendActions from '../../Friend/store/index';
import * as followActions from '../../Follow/store/index';

import Colors from '../../../constants/Colors';
import baseUrl from '../../../constants/API';
import header from '../../../constants/Header';
import itemIndex from '../utility/ItemIndex';

const ProfileViewScreen = props => {
    const dispatch = useDispatch();
    const userId = props.navigation.getParam('userId');
    
    const token = useSelector(state => state.ath.token);
    const currentUser = useSelector(state => state.usr.currentUser);
    const user = useSelector(state => state.usr.user);
    const userFeeds = useSelector(state => state.feed.userFeeds);

    const [friendsCount, setFriendsCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isFriend, setIsFriend] = useState(false);
    const [isRequested, setIsRequested] = useState(false);
    const [hasRequested, setHasRequested] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollower, setIsFollower] = useState(false);
    
    // utility
    const [tabIndex, setTabIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [userFetched, setUserFetched] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        setIsLoading(true);
        fetchProfile();
        fetchIsFollowing();
        fetchFriendsCount();
        fetchFollowersCount();
        fetchFollowingCount();
    }, []);

    const fetchProfile = () => {
        dispatch(userActions.fetchUser(token, userId))
        .then(result => {
            return dispatch(feedActions.fetchUserFeeds(token, userId));
        })
        .then(result => {
            setShowErrorModal(false);
            setErrorMessage(null);
            fetchIsFriend();
        })
        .catch(error => {
            setIsLoading(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }

    const fetchIsRequested = () => {
        axios.get('request/is-requested/'+userId, header(token))
        .then(response => {
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setShowErrorModal(false);
            setErrorMessage(null);
            setIsRequested(response.data.isrequested);
            fetchHasRequested();
        })
        .catch(error => {
            setIsLoading(false);
            setIsRequested(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }

    const fetchHasRequested = () => {
        axios.get('request/has-requested/'+userId, header(token))
        .then(response => {
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setShowErrorModal(false);
            setErrorMessage(null);
            setHasRequested(response.data.hasrequested);
            setIsLoading(false);
        })
        .catch(error => {
            setIsLoading(false);
            setHasRequested(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }

    const fetchIsFriend = () => {
        axios.get('friend/is-friend/'+userId, header(token))
        .then(response => {
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setShowErrorModal(false);
            setErrorMessage(null);
            setIsFriend(response.data.isfriend);
            fetchIsRequested();
        })
        .catch(error => {
            setIsLoading(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
            setIsFriend(false);
        });
    }

    const fetchIsFollower = () => {
        axios.get('follow/is-follower/'+userId, header(token))
        .then(response => {
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setIsFollower(response.data.isfollower);
        })
        .catch(error => {
            setIsFollower(false);
        })
    }

    const fetchIsFollowing = () => {
        axios.get('follow/is-following/'+userId, header(token))
        .then(response => {
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setIsFollowing(response.data.isfollowing);
        })
        .catch(error => {
            setIsFollowing(false);
        })
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


    let source;
    if(user) {
        if(user.themeImageUrl && user.themeImageUrl.length !== 0) {
            source = {
                uri: baseUrl + user.themeImageUrl,
            };
        } else if(user.themeIndex && user.themeIndex !== -1) {
            source = ThemeData[user.themeIndex].source;
        }
    }

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
        console.log('goToSettings');
        props.navigation.navigate('setting');
    }

    const accept = () => {
        if(hasRequested) {
            setIsFriend(true);
            dispatch(requestActions.acceptRequest(token, userId))
            .then(result => {
                setShowErrorModal(false);
                setErrorMessage(null);
            })
            .catch(error => {
                setIsFriend(false);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
        }
    }

    const request = () => {
        if(!isRequested) {
            setIsRequested(true);
            dispatch(requestActions.sendRequest(token, userId))
            .then(result => {
                setShowErrorModal(false);
                setErrorMessage(null);
            })
            .catch(error => {
                setIsRequested(false);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
        } else {
            setIsRequested(false);
            dispatch(requestActions.deleteRequest(token, userId))
            .then(result => {
                setShowErrorModal(false);
                setErrorMessage(null);
            })
            .catch(error => {
                setIsRequested(true);                
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
        }
    }

    const friend = () => {
        if(isFriend) {
            setIsFriend(false);
            dispatch(friendActions.unfriend(token, userId))
            .then(result => {
                setShowErrorModal(false);
                setErrorMessage(null);
            })
            .catch(error => {
                setIsFriend(true);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
        } else {
            setIsFriend(true);
            dispatch(friendActions.friend(token, userId))
            .then(result => {
                setShowErrorModal(false);
                setErrorMessage(null);
            })
            .catch(error => {
                setIsFriend(false);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
        }
    }


    const follow = () => {
        if(isFollowing) {
            setIsFollowing(false);
            dispatch(followActions.unfollow(token, userId))
            .then(result => {   
                fetchFollowersCount();         
                setShowErrorModal(false);
                setErrorMessage(null);
            })
            .catch(error => {
                setIsFollowing(true);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            })
        } else {
            setIsFollowing(true);
            dispatch(followActions.follow(token, userId))
            .then(result => {
                fetchFollowersCount();
                setShowErrorModal(false);
                setErrorMessage(null);
            })
            .catch(error => {
                setIsFollowing(false);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
        }
    }

    const goToSocial = () => {
        props.navigation.navigate('social');
    }


    const tab1Styles = [styles.tabContainer];
    const tab2Styles = [styles.tabContainer];

    let listData = [];

    switch(tabIndex) {
        case 0:
            listData = [];
            tab1Styles.push(styles.active);
            for(let key in userFeeds) {
                const gallery = userFeeds[key].gallery;
                let valid = false;
                for(let i in gallery) {
                    if(gallery[i].type === 'video') {
                        valid = true;
                        break;
                    }
                }

                if(valid) {
                    listData.push(userFeeds[key]);
                }
            }
            break;
        case 1:
            listData = [];
            tab2Styles.push(styles.active);
            for(let key in userFeeds) {
                const gallery = userFeeds[key].gallery;
                let valid = true;
                for(let i in gallery) {
                    if(gallery[i].type === 'video') {
                        valid = false;
                        break;
                    }
                }

                if(valid) {
                    listData.push(userFeeds[key]);
                }
            }
            break;
        default: 
            break;
    }

    if(isLoading || !user) {
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
                        userName={item.creator.userName}
                        profileImageUrl={item.creator.profileImageUrl}
                        gallery={item.gallery}
                        description={item.description}
                        goToComments={() => goToComments(item.id)}
                        goToDetail={() => goToDetail(item.id)}
                        feedId={item.id}
                        timestamp={item.createdAt}
                    />
                )}
                ListHeaderComponent={() => (
                    <View>
                        <View style={styles.themeContainer}>
                            <ImageBackground style={styles.theme} resizeMode="cover" source={source}>
                                <View style={{height: 140, justifyContent: "flex-end", alignItems: "flex-end"}}>
                                    {/* <View style={styles.moreContainer}>
                                        <Feather name="more-horizontal" size={28} color="#fff" onPress={goToSettings} />
                                    </View> */}
                                </View>
                                <View style={styles.profileSection}>
                                    <View style={styles.profileImageContainer}>
                                        <CircularProfileItem 
                                            imageUrl={baseUrl + user.profileImageUrl}
                                            radius={45}
                                        />
                                    </View>
                                    <View style={styles.profileData}>
                                        <View style={styles.profileInfo}>
                                            <View style={styles.userNameContainer}>
                                                <Text style={styles.Name}>
                                                    {user.firstName}{' '}{user.lastName}
                                                </Text>
                                                <Text style={styles.userName}>
                                                    @{user.userName}
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
                        </View>
                        <View style={styles.buttonSection}>
                            <FlatButtonTile 
                                title={isFriend ? "Friended" : isRequested ? "Requested" : hasRequested ? "accept" : "Friend"}
                                onPress={isFriend ? friend : isRequested ? request : hasRequested ? accept : request}
                                color={isFriend ? Colors.blue : isRequested ? Colors.blue : hasRequested ? Colors.green : Colors.blue}
                            />
                            <FlatButtonTile 
                                title={isFollowing ? "Following" : "Follow"}
                                onPress={follow}
                                color={"#000"}
                            />
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
                        </View>
                    </View>
                )}
            />
            {
                showErrorModal &&
                <AlertTile 
                    title="Profile Fetch Error"
                    message={errorMessage}
                    buttonText="Okay"
                    close={() => setShowErrorModal(false)}
                    onPress={() => setShowErrorModal(false)}
                />
            }
        </View>
    );
}

ProfileViewScreen.navigationOptions = navData => {
    return {
        headerTitle: () => null,
        headerTransparent: true,
        headerLeft: ({canGoBack, onPress}) => !canGoBack ? null : (
            <BackIcon color="#fff" onPress={onPress} />
        ),
        headerLeftContainerStyle: {
            marginLeft: 20,
        },
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    loaderContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    themeContainer: {
        height: 310,
    },
    theme: {
        height: 170,
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
    buttonSection: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },  
});

export default withNavigationFocus(ProfileViewScreen);