import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors, Input } from 'react-native-elements';
import Colors from '../../../constants/Colors';
import VideoView from '../../common/components/VideoView';

import * as actions from '../store/index';
import SendIcon from '../../../Icons/SendIcon';
import AlertTile from '../../common/components/UI/AlertTile';

const PREVIEW_HEIGHT = Dimensions.get('window').height * (3 / 4);
const PREVIEW_WIDTH = Dimensions.get('window').width * (9 / 10);

const CreateStoryScreen = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const media = useSelector(state => state.sty.media);
    const mediaId = useSelector(state => state.sty.mediaId);

    const [caption, setCaption] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const submitStory = () => {
        setIsLoading(true);
        const storyData = {
            caption,
            media: mediaId,
        }
        dispatch(actions.addStory(token, storyData))
            .then(result => {
                setCaption("");
                console.log('story posted');
                setIsLoading(false);
                setShowErrorModal(false);
                setErrorMessage(null);
                props.navigation.goBack();
            })
            .catch(error => {
                setIsLoading(false);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
    }

    const goToCreateOptions = () => {
        props.navigation.navigate('createOption', {
            type: 'storyMedia',
        });
    }

    let mediaItem;
    if (media) {
        switch (media.type) {
            case 'image':
                mediaItem = (
                    <Image
                        source={{ uri: media.image.uri }}
                        resizeMode='cover'
                        style={styles.preview}
                    />
                );
                break;
            case 'video':
                mediaItem = (
                    <VideoView
                        source={{ uri: media.video.uri }}
                        resizeMode='cover'
                    />
                );
                break;
            default:
                break;
        }
    }

    return (
        <View style={styles.root}>
            <View style={styles.previewSection}>
                <TouchableWithoutFeedback onPress={goToCreateOptions}>
                    <View style={styles.previewContainer}>
                        {mediaItem}
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.inputSection}>
                <View style={{flex: 1}}>
                    <Input 
                        placeholder="Add Caption ..."
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        value={caption}
                        onChangeText={setCaption}
                    />
                </View>
                <View style={styles.sendContainer}>
                    <SendIcon 
                        color={Colors.secondary}  
                        onPress={submitStory}             
                    />
                </View>
            </View>
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

CreateStoryScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Create Story',
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.background,
        alignItems: "center"
    },
    previewSection: {
        flex: 1,
        justifyContent: "center"
    },
    previewContainer: {
        height: PREVIEW_HEIGHT,
        width: PREVIEW_WIDTH,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: Colors.secondary,
        overflow: 'hidden',
        backgroundColor: Colors.lightGrey,
    },
    preview: {
        height: "100%",
        width: "100%",
    },
    inputSection: {
        height: 70,
        backgroundColor: Colors.milk,
        flexDirection: "row",
        width: "100%",
    },
    inputContainer: {
        height: 70,
        borderRadius: 20,
        borderBottomWidth: 0,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    input: {
        backgroundColor: Colors.background,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: Colors.secondary,
        paddingHorizontal: 20,
        fontSize: 16,
    },
    sendContainer: {
        alignItems: "flex-start",
        height: 70,
        justifyContent: "center",
        paddingTop: 5, 
    },  
});

export default CreateStoryScreen;