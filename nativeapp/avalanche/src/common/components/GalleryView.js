import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';

import Colors from '../../../constants/Colors';
import BottomButtonTile from './UI/BottomButtonTile';
import VideoView from './VideoView';

import * as authActions from '../../Auth/store/index';
import * as feedActions from '../../Feed/store/index';
import * as chatActions from '../../Chat/store/index';
import * as userActions from '../../User/store/index';
import * as storyActions from '../../Story/store/index';

const WIDTH = Dimensions.get('window').width*(9/10);
const HEIGHT = WIDTH;

const GalleryView = props => {
    const token = useSelector(state => state.ath.token);

    const dispatch = useDispatch();

    const [mediaType, setMediaType] = useState("image");

    const [imageUrl, setImageUrl] = useState(null);
    const [image, setImage] = useState(null);

    const [videoUrl, setVideoUrl] = useState(null);
    const [video, setVideo] = useState(null);

    const getFileName = (fileUri) => {
        const uriArray = fileUri.split('/');
        return uriArray.slice(-1)[0];
    }

    const pickMedia = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1, 
            allowsMultipleSelection: false, 
        });

        if(!result.cancelled) {
            if(result.type === "image"){
                setMediaType("image")
                setImageUrl(result.uri);
                setImage({
                    uri: result.uri,
                    name: getFileName(result.uri),
                    type: 'image/jpeg',
                });
            } else if(result.type === "video") {
                setMediaType("video");
                setVideoUrl(result.uri);
                setVideo({
                    uri: result.uri,
                    name: getFileName(result.uri),
                    type: 'video/mp4',
                });
            }
        }
    }

    let galleryItem;
    let mediaItem;
    const chooseImage = () => {
        switch(props.type) {
            case 'themeMedia':
                dispatch(authActions.setThemeImage(image));
                // dispatch(actions.setThemeIndex(-1));
                break;
            case 'profileMedia':
                dispatch(authActions.setProfileImage(image));
                break;
            case "chatMedia":
                mediaItem = {
                    type: 'image',
                    parent: 'chat',
                    image: image,
                }
                dispatch(chatActions.addMedia(token, mediaItem))
                .then(result => {
                    console.log('media added');
                })
                .catch((error) => {
                    props.setShowErrorModal(true);
                    props.setErrorMessage(error.message);
                });
                break;
            case "storyMedia":
                mediaItem = {
                    type: 'image',
                    parent: 'story',
                    image: image,
                }
                dispatch(storyActions.addMedia(token, mediaItem))
                .then(result => {
                    console.log('media added');
                })
                .catch((error) => {
                    props.setShowErrorModal(true);
                    props.setErrorMessage(error.message);
                });
                break;
            case 'feedMedia':
                galleryItem = {
                    type: 'image',
                    parent: 'feed',
                    image: image,
                }
                dispatch(feedActions.addGallery(token, galleryItem))
                .then(result => {
                    console.log('gallery added');
                })
                .catch((error) => {
                    props.setShowErrorModal(true);
                    props.setErrorMessage(error.message);
                });
                break;
            default:
                galleryItem = {
                    type: 'image',
                    parent: 'feed',
                    image: image,
                }
                dispatch(feedActions.addGallery(token, galleryItem))
                .then(result => {
                    console.log('gallery added');
                })
                .catch((error) => {
                    props.setShowErrorModal(true);
                    props.setErrorMessage(error.message);
                });
                break;
        }
    }


    const chooseVideo = () => {
        switch(props.type) {
            case "chatMedia":
                mediaItem = {
                    type: 'video',
                    parent: 'chat',
                    video: video,
                }
                dispatch(chatActions.addMedia(token, mediaItem))
                .then(result => {
                    console.log('media added');
                })
                .catch((error) => {
                    props.setShowErrorModal(true);
                    props.setErrorMessage(error.message);
                });
                break;
            case "storyMedia":
                mediaItem = {
                    type: 'video',
                    parent: 'story',
                    video: video,
                }
                dispatch(storyActions.addMedia(token, mediaItem))
                .then(result => {
                    console.log('media added');
                })
                .catch((error) => {
                    props.setShowErrorModal(true);
                    props.setErrorMessage(error.message);
                });
                break;
            case 'feedMedia':
                galleryItem = {
                    type: 'video',
                    parent: 'feed',
                    video: video,
                }
                dispatch(feedActions.addGallery(token, galleryItem))
                .then(result => {
                    console.log('gallery added');
                })
                .catch((error) => {
                    props.setShowErrorModal(true);
                    props.setErrorMessage(error.message);
                });
                break;
            default:
                galleryItem = {
                    type: 'video',
                    parent: 'feed',
                    video: video,
                }
                dispatch(feedActions.addGallery(token, galleryItem))
                .then(result => {
                    console.log('gallery added');
                })
                .catch((error) => {
                    props.setShowErrorModal(true);
                    props.setErrorMessage(error.message);
                });
                break;
        }
    }

    const done = () => {
        if(mediaType === "image") {
            chooseImage();
        } else if(mediaType === "video") {
            chooseVideo();
        }
        props.goBack();
    }

    return (
        <View style={styles.root}>
            <View style={{alignItems: "center"}}>
                <View style={styles.previewImageContainer}>
                    {
                        mediaType === "video" ? 
                        <VideoView 
                            source={{uri: videoUrl}}
                            shouldPlay
                            style={styles.previewVideo}
                        />
                            :
                        <Image 
                            source={{uri: imageUrl}}
                            resizeMode="cover"
                            style={styles.previewImage}
                        />
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        title="choose media"
                        type="clear"
                        titleStyle={{color: Colors.blue, fontSize: 18}}
                        onPress={pickMedia}
                    />
                </View>
            </View>
            <View style={{flex: 1}}></View>
            <BottomButtonTile 
                title="done"
                titleColor={Colors.primary}
                onPress={done}
            />
        </View>
    );
}

GalleryView.propTypes = {
    type: PropTypes.string,
    goBack: PropTypes.func,
    setErrorMessage: PropTypes.func,
    setShowErrorModal: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.background,
    },
    previewImageContainer: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: Colors.milk,
        borderRadius: 15,
        overflow: "hidden",
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },
    previewVideo: {
        width: "100%",
        height: "100%",
    },
    buttonContainer: {
        marginVertical: 20,
    },
});

export default GalleryView;