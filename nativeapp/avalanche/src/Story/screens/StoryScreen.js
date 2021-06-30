import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';

import StoryTile from '../components/UI/StoryTile';

import Colors from '../../../constants/Colors';
import { Fontisto } from '@expo/vector-icons';
import StoryData from '../data/StoryData';

import PostIcon from '../../../Icons/PostIcon';

import * as actions from '../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { UIActivityIndicator } from 'react-native-indicators';
import AlertTile from '../../common/components/UI/AlertTile';

const StoryScreen = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const stories = useSelector(state => state.sty.stories);

    // utility
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        props.navigation.setParams({
            goToCreateStory,
        });

        fetchStories();
    }, []);

    const refreshPage = () => {
        setIsRefreshing(true);
        fetchStories();
    }

    const fetchStories = () => {
        dispatch(actions.fetchStories(token))
            .then(result => {
                setIsRefreshing(false);
                setIsLoading(false);
                setShowErrorModal(false);
                setErrorMessage(false);
            })
            .catch(error => {
                setIsRefreshing(false);
                setIsLoading(false);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
    }

    const goToCreateStory = () => {
        props.navigation.navigate('createStory');
    }

    const goToComments = (storyId) => {
        props.navigation.navigate('comment', {
            storyId,
            parent: 'story',
        });
    }

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <UIActivityIndicator
                    color={Colors.primary}
                    size={27}
                />
            </View>
        );
    }

    if (stories.length == 0) {
        return (
            <View style={styles.fallBackContainer}>
                <Fontisto name="photograph" size={45} color="black" />
                <Text style={styles.fallBackText}>No Active Stories</Text>
            </View>
        );
    }


    return (
        <View style={styles.root}>
            <FlatList
                refreshing={isRefreshing}
                onRefresh={refreshPage}
                data={stories}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                    <StoryTile
                        storyId={item.id}
                        media={item.media}
                        maker={item.maker}
                        timestamp={item.createdAt}
                        goToComments={() => goToComments(item.id)}
                    />
                )}
            />

            {
                showErrorModal &&
                <AlertTile
                    title="Story Error"
                    message={errorMessage}
                    close={() => setShowErrorModal(false)}
                    onPress={() => setShowErrorModal(false)}
                />
            }
        </View>
    );
}

StoryScreen.navigationOptions = navData => {
    return {
        headerTitle: "Story",
        headerRight: () => (
            <PostIcon 
                color={Colors.secondary}
                onPress={navData.navigation.getParam('goToCreateStory')}
            />
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
    fallBackContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    fallBackText: {
        fontSize: 20,
    },
    loaderContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default StoryScreen;