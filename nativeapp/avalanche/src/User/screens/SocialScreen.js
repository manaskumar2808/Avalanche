import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Feather } from '@expo/vector-icons';
import { UIActivityIndicator } from 'react-native-indicators';

import Colors from '../../../constants/Colors';

import ProfileTile from '../../User/components/UI/ProfileTile';
import AlertTile from '../../common/components/UI/AlertTile';

import * as actions from '../store/index';
import * as friendActions from '../../Friend/store/index';
import * as followActions from '../../Follow/store/index';
import * as requestActions from '../../Request/store/index';


const SocialScreen = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const userId = useSelector(state => state.ath.userId);
    const friends = useSelector(state => state.frd.friends);
    const receivedRequests = useSelector(state => state.rqst.receivedRequests);
    const sentRequests = useSelector(state => state.rqst.sentRequests);
    const followers = useSelector(state => state.flw.followers);
    const followeds = useSelector(state => state.flw.followeds);

    const [friendList, setFriendList] = useState([]);
    const [followerList, setFollowerList] = useState([]);
    const [followedList, setFollowedList] = useState([]);

    // utility
    const [tabIndex, setTabIndex] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetchSentRequests();
        fetchReceivedRequests();
        fetchFriends();
        fetchFollowers();
        fetchFolloweds();
    }, []);

    useEffect(() => {
        setFriendList([...sentRequests, ...receivedRequests, ...friends]);
    }, [receivedRequests, sentRequests, friends]);

    useEffect(() => {
        setFollowerList(followers);
    }, [followers]);

    useEffect(() => {
        setFollowedList(followeds);
    }, [followeds]);

    const refreshList = () => {
        setIsRefreshing(true);
        fetchReceivedRequests();
        fetchSentRequests();
        fetchFriends();
        fetchFollowers();
        fetchFolloweds();
    }

    const fetchReceivedRequests = () => {
        dispatch(requestActions.fetchReceivedRequests(token))
        .then(result => {
            setShowErrorModal(false);
            setErrorMessage(null);
        })
        .catch(error => {
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }

    const fetchSentRequests = () => {
        dispatch(requestActions.fetchSentRequests(token))
        .then(result => {
            setShowErrorModal(false);
            setErrorMessage(null);
        })
        .catch(error => {
            setIsLoading(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }

    const fetchFriends = () => {
        dispatch(friendActions.fetchFriends(token, userId))
        .then(result => {
            setIsLoading(false);
            setShowErrorModal(false);
            setErrorMessage(null);
        })
        .catch(error => {
            setIsLoading(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }


    const fetchFollowers = () => {
        setIsLoading(true);
        dispatch(followActions.fetchFollowers(token, userId))
        .then(result => {
            setIsLoading(false);
            setShowErrorModal(false);
            setErrorMessage(null);
        })
        .catch(error => {
            setIsLoading(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }

    const fetchFolloweds = () => {
        setIsLoading(true);
        dispatch(followActions.fetchFolloweds(token, userId))
        .then(result => {
            setIsRefreshing(false);
            setIsLoading(false);
            setShowErrorModal(false);
            setErrorMessage(null);
        })
        .catch(error => {
            setIsLoading(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }

    const tab1ContainerStyles = [styles.tabContainer];
    const tab2ContainerStyles = [styles.tabContainer];
    const tab3ContainerStyles = [styles.tabContainer];

    const tab1Styles = [styles.tab];
    const tab2Styles = [styles.tab];
    const tab3Styles = [styles.tab];

    let list;

    switch(tabIndex) {
        case 0:
            list = friendList;
            tab1ContainerStyles.push(styles.activeContainer);
            tab1Styles.push(styles.active);
            break;
        case 1:
            list = followerList;
            tab2ContainerStyles.push(styles.activeContainer);
            tab2Styles.push(styles.active);
            break;
        case 2:
            list = followedList;
            tab3ContainerStyles.push(styles.activeContainer);
            tab3Styles.push(styles.active);
            break;
        default: 
            break;
    }

    if(isLoading) {
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
            <View style={styles.tabSection}>
                <TouchableWithoutFeedback onPress={() => setTabIndex(0)}>
                    <View style={tab1ContainerStyles}>
                        <Text style={tab1Styles}>
                            Friends
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setTabIndex(1)}>
                    <View style={tab2ContainerStyles}>
                        <Text style={tab2Styles}>
                            Followers
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setTabIndex(2)}>
                    <View style={tab3ContainerStyles}>
                        <Text style={tab3Styles}>
                            Following
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    refreshing={isRefreshing}
                    onRefresh={refreshList} 
                    data={list}
                    keyExtractor={item => item.id}
                    renderItem={({item, index}) => (
                        <ProfileTile 
                            user={item.user}
                            type={tabIndex === 0 ? 'friend' : 'follow'}
                        />
                    )}
                />
            </View>
            {
                showErrorModal &&
                <AlertTile 
                    title="Social Error"
                    message={errorMessage}
                    buttonText="Okay"
                    onPress={() => setShowErrorModal(false)}
                    close={() => setShowErrorModal(false)}
                />
            }
        </View>
    );
}

SocialScreen.navigationOptions = navData => {
    return {
        headerTitle: "Social",
        headerRight: () => (
            <Feather name="more-horizontal" size={28} color={Colors.secondary} />
        ),
        headerRightContainerStyle: {
            marginHorizontal: 20,
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
    tabSection: {
        flexDirection: "row",
    },
    tabContainer: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    tab: {
        fontSize: 17,
        color: Colors.secondary,
    },
    activeContainer: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
    },
    active: {
        color: Colors.primary,
    },
    listContainer: {
        width: "100%",
        padding: 20,
    },
});

export default SocialScreen;