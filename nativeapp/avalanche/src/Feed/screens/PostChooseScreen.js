import React, { useState } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import AlertTile from '../../common/components/UI/AlertTile';
import ButtonTile from '../../common/components/UI/ButtonTile';
import PointTile from '../../common/components/UI/PointTile';

import Colors from '../../../constants/Colors';

import * as actions from '../store/index';

const PostChooseScreen = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const postTitle = useSelector(state => state.feed.postTitle);
    const postGalleryIds = useSelector(state => state.feed.postGalleryIds);
    const postDescription = useSelector(state => state.feed.postDescription); 

    // utility
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const goToPostSuccess = () => {
        setIsLoading(true);
        const feedData = {
            title: postTitle,
            description: postDescription,
            gallery: postGalleryIds,
        }
        dispatch(actions.addFeed(token, feedData))
        .then(result => {
            setIsLoading(false);
            dispatch(actions.resetFeed());
            props.navigation.navigate('postSuccess');
        })
        .catch(error => {
            setIsLoading(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }

    return (
        <View style={styles.root}>
            <View style={styles.legendContainer}>
                <Text style={styles.legend}>
                    Your post is ready to proceed
                </Text>
            </View>
            <View style={styles.pointsContainer}>
                <PointTile 
                    text="You have successfully created the post."
                />
                <PointTile 
                    text="Now you have 2 options, either post the feed right now or add the post to your dashboard."
                />
                <PointTile 
                    text="If you somehow not sure to finalise the feed content or you may have a thought to add something before making it visible to other users, you should definitely add the created feed to the dashboard."
                />
                <PointTile 
                    text="Only you do have access to your dashboard. However you can give access to any user in case you want."
                />
                <PointTile 
                    text="If you are good to good to go and post the feed. Then surely proceed to post it :)"
                />
            </View>
            <View style={{height: 50,}}></View>
            <View style={styles.buttonSection}>
                <ButtonTile 
                    title="Add to dashboard"
                    outlined
                    onPress={goToPostSuccess}
                />
                <View style={{height: 10}}></View>
                <ButtonTile 
                    title="Post"
                    onPress={goToPostSuccess}
                    isLoading={isLoading}
                />
            </View>
            {
                showErrorModal && 
                <AlertTile 
                    title="Post Error"
                    message={errorMessage}
                    onPress={() => setShowErrorModal(false)}
                    close={() => setShowErrorModal(false)}
                    buttonText="Okay"
                />
            }
        </View>
    );
}

PostChooseScreen.navigationOptions = navData => {
    return {
        headerTitle: () => null,
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    legendContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
    },
    legend: {
        fontSize: 28,
        color: Colors.primary,
        textAlign: "center",
        fontWeight: "700",
    },
    pointsContainer: {
        padding: 20,
    },
    buttonSection: {
        padding: 20,
        height: 120,
    },
});

export default PostChooseScreen;