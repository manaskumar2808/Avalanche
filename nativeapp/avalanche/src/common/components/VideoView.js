import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { Video } from 'expo-av';

import { BlurView } from 'expo-blur';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../../constants/Colors';

const BORDER_RADIUS = 0;
const BORDER_CONTROLLER_RADIUS = 20;

const VideoView = props => {
    let ref = null;
    const video = useRef(null);
    const [videoStatus, setVideoStatus] = useState(null);
    const [juiceWidth, setJuiceWidth] = useState(0);
    const [showController, setShowController] = useState(false);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        video.current.getStatusAsync();
    }, []);

    useEffect(() => {
        if(videoStatus) {
            setJuiceWidth((videoStatus.positionMillis/videoStatus.playableDurationMillis)*100);
        }
    }, [videoStatus]);

    const togglePlay = () => {
        if(play) {
            setPlay(false);
            video.current.pauseAsync();
        } else {
            setPlay(true);
            video.current.playAsync();
        }
    }


    const toggleController = () => {
        setShowController(prevState => !prevState);
    }


    // UI elements
    const iconSize = 24;


    const controlButton = (
        play ? 
        <Ionicons name="pause-circle" size={iconSize} color="#fff" onPress={togglePlay} />
            :
        <Ionicons name="play-circle" size={iconSize} color="#fff" onPress={togglePlay} />
    );

    const fullScreenButton = (
        <MaterialCommunityIcons name="arrow-expand" size={23} color="#fff" />
    );

    return (
        <TouchableWithoutFeedback onLongPress={toggleController}>
            <View style={{ ...styles.root, ...props.styles }}>
                <Video 
                    ref={video}
                    source={props.source}
                    isLooping={true}
                    isMuted={props.isMuted}
                    shouldPlay={props.shouldPlay}
                    style={styles.video}
                    resizeMode={props.resizeMode}
                    onPlaybackStatusUpdate={e => setVideoStatus(e)}
                    status={{
                        progressUpdateIntervalMillis: 50,
                    }}
                />
            
                {
                    showController && <BlurView
                        intensity={100}
                        tint="dark"
                        style={styles.body}
                    >
                    <View style={styles.controls}>
                        {controlButton}
                        <View style={styles.videoJuiceContainer}>
                            <View style={{...styles.videoJuice, width: juiceWidth.toString()+'%'}}></View>
                        </View> 
                        {fullScreenButton}
                    </View>
                    </BlurView>
                }

            </View>
        </TouchableWithoutFeedback>
    );
}

VideoView.defaultProps = {
    isLooping: false,
    shouldPlay: false,
    isMuted: true,
    resizeMode: "cover",
}

VideoView.propTypes = {
    source: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    isLooping: PropTypes.bool,
    shouldPlay: PropTypes.bool,
    isMuted: PropTypes.bool,
    resizeMode: PropTypes.string,
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        height: 500,
        position: "relative",
    },
    video: {
        borderRadius: BORDER_RADIUS,
        width: "100%",
        flex: 1,
    },
    body: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        height: 60,
        borderBottomLeftRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS,
    },
    controls: {
        height: "100%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    videoJuiceContainer: {
        backgroundColor: "#fff",
        borderRadius: BORDER_CONTROLLER_RADIUS,
        flex: 1,
        height: 3,
        marginHorizontal: 10,
    },
    videoJuice: {
        backgroundColor: Colors.primary,
        borderRadius: BORDER_CONTROLLER_RADIUS,
        height: "100%",
        width: "60%",
    },
});

export default VideoView;