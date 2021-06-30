import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UIActivityIndicator } from 'react-native-indicators';
import { Feather } from '@expo/vector-icons';

import FeedTile from '../components/UI/FeedTile';
import AlertTile from '../../common/components/UI/AlertTile';

import Colors from '../../../constants/Colors';

import * as actions from '../store/index';

const DetailScreen = props => {
    const feedId = props.navigation.getParam('feedId');
    
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const feed = useSelector(state => state.feed.feed);

    // utility
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        setIsLoading(true);
        dispatch(actions.fetchFeed(token, feedId))
        .then(result => {
            setIsLoading(false);
        })
        .catch(error => {
            setIsLoading(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }, [dispatch]);

    const goToComments = () => {
        props.navigation.navigate('comment', {
            feedId: feed.id, 
        });
    }

    const goToProfileView = (uid) => {
        props.navigation.navigate('profileView', {
            userId: uid,
        })
    }

    if(isLoading || !feed) {
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
            <ScrollView>
                <FeedTile
                    feedId={feedId} 
                    userName={feed.creator.userName}
                    profileImageUrl={feed.creator.profileImageUrl}
                    description={feed.description}
                    gallery={feed.gallery}
                    timestamp={feed.createdAt}
                    isDetail
                    goToComments={goToComments}
                    goToProfileView={() => goToProfileView(feed.creator.id)}
                />
            </ScrollView>
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

DetailScreen.navigationOptions = navData => {
    return {
        headerTitle:() => null,
        headerRight: () => (
            <Feather name="more-horizontal" size={28} color={Colors.secondary} />
        ),
        headerRightContainerStyle: {
            marginHorizontal: 20,
        }
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

export default DetailScreen;