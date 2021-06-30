import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { UIActivityIndicator } from 'react-native-indicators';

import AlertTile from '../../common/components/UI/AlertTile';
import FeedTile from '../components/UI/FeedTile';
import Colors from '../../../constants/Colors';

import CameraIcon from '../../../Icons/CameraIcon';
import PostIcon from '../../../Icons/PostIcon';
import SearchIcon from '../../../Icons/SearchIcon';

import * as actions from '../store/index';
import * as authActions from '../../User/store/index';

import SuggestionContainer from '../../Follow/components/SuggestionContainer';

const HomeScreen = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const userId = useSelector(state => state.ath.userId);
    const feeds = useSelector(state => state.feed.feeds);

    // utility
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [randomIndex, setRandomIndex] = useState(0);

    useEffect(() => {
        let isMounted = false;

        if (!isMounted) {
            setIsLoading(true);
            fetchCurrentUser();
            fetchFeeds();
            getRandomIndex();
        }

        return () => {
            isMounted = true;
        }
    }, [token]);

    const fetchCurrentUser = () => {
        dispatch(authActions.fetchCurrentUser(token))
        .then(result => {
            
        }).catch(error => {
            setShowErrorModal(true);
            setErrorMessage('Cannot fetch current user details!');
        });
    }


    const fetchFeeds = () => {
        dispatch(actions.fetchFeeds(token))
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


    const goToDetail = (feedId) => {
        props.navigation.navigate('detail', {
            feedId,
        });
    }

    const goToProfileView = (uid) => {
        props.navigation.navigate('profileView', {
            userId: uid,
        })
    }

    const goToComments = (feedId) => {
        props.navigation.navigate('comment', {
            feedId: feedId,
            parent: 'feed',
        });
    }

    const getRandomIndex = () => {
        const min = 0;
        const max = feeds.length;
        const index = Math.random() * (max - min) + min;
        setRandomIndex(index);
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
            <FlatList
                onRefresh={fetchFeeds}
                refreshing={isRefreshing}
                keyExtractor={item => item.id} 
                data={feeds}
                renderItem={({item, index}) => (
                    <View>
                        <FeedTile 
                            feedId={item.id}
                            userName={item.creator.userName}
                            profileImageUrl={item.creator.profileImageUrl}
                            title={item.title}
                            description={item.description}
                            gallery={item.gallery}
                            timestamp={item.createdAt}
                            goToDetail={() => goToDetail(item.id)}
                            goToComments={() => goToComments(item.id)}
                            goToProfileView={() => goToProfileView(item.creator.id)}
                        />
                        {
                           index === randomIndex &&
                           <SuggestionContainer /> 
                        }
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
            {
                showErrorModal &&
                <AlertTile 
                    title="Feed Error"
                    message={errorMessage}
                    buttonText="Okay"
                    close={() => setShowErrorModal(false)}
                    onPress={() => setShowErrorModal(false)}
                />
            }
        </View>
    );
}

HomeScreen.navigationOptions = navData => {
    return {
        headerTitle: "Feeds",
        headerLeft: () => (
            <CameraIcon 
                color={Colors.secondary}
                onPress={() => navData.navigation.navigate('story')}
            />
        ),
        headerRight: () => (
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <PostIcon 
                    color={Colors.secondary}
                    onPress={() => navData.navigation.navigate('createPost')}
                />
                <SearchIcon 
                    color={Colors.secondary}
                />
            </View>
        ),
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
});

export default HomeScreen;