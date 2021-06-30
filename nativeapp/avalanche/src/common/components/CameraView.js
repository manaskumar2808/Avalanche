import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';

import CircularProfileItem from './CircularProfileItem';

import * as authActions from '../../Auth/store/index';
import * as feedActions from '../../Feed/store/index';
import * as chatActions from '../../Chat/store/index';
import * as userActions from '../../User/store/index';
import * as storyActions from '../../Story/store/index';

import { Ionicons, AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import CameraIcon from '../../../Icons/CameraIcon';
import VideoIcon from '../../../Icons/VideoIcon';

import Colors from '../../../constants/Colors';
import baseUrl from '../../../constants/API';


const CameraView = props => {
    const dispatch = useDispatch();

    const iconSize = 30;
    
    const token = useSelector(state => state.ath.token);
    const currentUser = useSelector(state => state.usr.currentUser);
    
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [videoMode, setVideoMode] = useState(false);
    const [capturing, setCapturing] = useState(false);
    const cameraRef = useRef(null);

    const [hasPermission, setHasPermission] = useState(null);
    const [hasAudioPermission, setHasAudioPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        (async () => {
            const { status } = await Audio.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const toggleType = () => {
        setType(prevState => prevState === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
        console.log(Camera.Constants.Type);
    }

    const toggleFlash = () => {
        setFlash(prevState => prevState === Camera.Constants.FlashMode.on ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.on);
    }

    const getFileName = (fileUri) => {
        const uriArray = fileUri.split('/');
        return uriArray.slice(-1)[0];
    }

    const toggleVideoMode = () => {
        setVideoMode(prevState => !prevState);
    }

    const takePicture = async () => {
        const photo = await cameraRef.current.takePictureAsync({
            quality: 1,
        });

        const configuredPhoto = {
            uri: photo.uri,
            name: getFileName(photo.uri),
            type: 'image/png',
        };
        let galleryItem;
        let mediaItem;
        switch (props.type) {
            case "profileMedia":
                dispatch(authActions.setProfileImage(configuredPhoto));
                break;
            case "themeMedia":
                dispatch(authActions.setThemeImage(configuredPhoto));
                dispatch(authActions.setThemeIndex(-1));
                break;
            case "chatMedia":
                mediaItem = {
                    type: 'image',
                    parent: 'chat',
                    image: configuredPhoto,
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
                    image: configuredPhoto,
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
            case "feedMedia":
                galleryItem = {
                    type: 'image',
                    parent: 'feed',
                    image: configuredPhoto,
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
                    image: configuredPhoto,
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
        props.goBack();
    }

    const stopVideo = async () => {
        await cameraRef.current.stopRecording();
    }

    const captureVideo = async () => {
        const video = await cameraRef.current.recordAsync({
            quality: Camera.Constants.VideoQuality['720p'],
            maxDuration: 60,
        });

        console.log(video);

        const configuredVideo = {
            uri: video.uri,
            name: getFileName(video.uri),
            type: 'video/mp4',
        };
        let galleryItem;
        let mediaItem;
        switch (props.type) {
            case "chatMedia":
                mediaItem = {
                    type: 'video',
                    parent: 'chat',
                    video: configuredVideo,
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
                    video: configuredVideo,
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
            case "feedMedia":
                galleryItem = {
                    type: 'video',
                    parent: 'feed',
                    image: configuredVideo,
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
                    image: configuredVideo,
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
        props.goBack();

        console.log(video);
    }

    const handleCreation = async () => {
        if (videoMode) {
            if (capturing) {
                setCapturing(false);
                await stopVideo();
            } else {
                setCapturing(true);
                await captureVideo();
            }
        } else {
            await takePicture();
        }
    }

    return (
        <View style={styles.root}>
            <Camera 
                type={type}
                flashMode={flash}
                ref={cameraRef}
                style={styles.camera}
            >
                <View style={styles.cameraHeader}>
                    <AntDesign name="close" size={iconSize} color="#fff" onPress={props.goBacke} />
                    <CircularProfileItem 
                        imageUrl={baseUrl + currentUser.profileImageUrl}
                        radius={20}
                    />
                </View>
                <View style={styles.cameraBody}></View>
                <View style={styles.cameraFooter}>
                    <View style={styles.icon}>
                        <Ionicons name="flash" size={iconSize} color="#fff" onPress={toggleFlash} />
                    </View>
                    <TouchableWithoutFeedback onPress={handleCreation} onLongPress={toggleVideoMode}>
                        {
                            videoMode ? 
                            <View style={styles.outerCircle}>
                                <View style={styles.videoCircle}>
                                    {
                                        capturing ?
                                        <FontAwesome name="stop" size={24} color="#fff" />
                                        :
                                        <VideoIcon 
                                            color="#fff"
                                        />
                                    }
                                </View>
                            </View>
                                :
                            <View style={styles.photoCircle}>
                                <CameraIcon 
                                    color={Colors.secondary}
                                />
                            </View>
                        }
                    </TouchableWithoutFeedback>
                    <View style={styles.icon}>
                        <MaterialIcons name="loop" size={iconSize} color="#fff" onPress={toggleType} />
                    </View>
                </View>
            </Camera>
        </View>
    );
}

CameraView.propTypes = {
    type: PropTypes.string,
    goBack: PropTypes.func,
    setShowErrorModal: PropTypes.func,
    setErrorMessage: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
        backgroundColor: "#000",
    },
    camera: {
        width: "100%",
        // flex: 1,
        height: "100%",
        paddingVertical: 40,
    },
    cameraHeader: {
        width: "100%",
        padding: 20,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    cameraBody: {
        flex: 1,
    },
    cameraFooter: {
        justifyContent: "space-evenly",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    photoCircle: {
        borderRadius: 40,
        width: 70,
        height: 70,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    outerCircle: {
        borderRadius: 35,
        width: 70,
        height: 70,
        borderWidth: 2,
        borderColor: Colors.primary,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    videoCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CameraView;