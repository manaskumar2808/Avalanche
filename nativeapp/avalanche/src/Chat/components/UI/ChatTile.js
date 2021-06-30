import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import ScalableImage from 'react-native-scalable-image';

import SingleCheckIcon from '../../../../Icons/SingleCheckIcon';
import DoubleCheckIcon from '../../../../Icons/DoubleCheckIcon';

import FORMATTER from '../../utility/Formatter';

import VideoView from '../../../common/components/VideoView';

import Colors from '../../../../constants/Colors';
import baseUrl from '../../../../constants/API';

const ChatTile = props => {

    const bubbleStyles = [styles.bubble];
    const textStyles = [styles.text];
    const infoContainerStyles = [styles.infoContainer];

    if(props.isSelf) {
        bubbleStyles.push(styles.selfBubble);
        textStyles.push(styles.selfText);
        infoContainerStyles.push(styles.selfInfoContainer);
    } else {
        bubbleStyles.push(styles.otherBubble);
        textStyles.push(styles.otherText);
        infoContainerStyles.push(styles.otherInfoContainer);
    }

    let status;
    switch(props.status) {
        case "sent":
            status = (
                <SingleCheckIcon 
                    color={Colors.primary}
                />
            );
            break;
        case "seen":
            status = (
                <DoubleCheckIcon 
                    color={Colors.primary}
                />
            );
            break;
        default: 
            status = (
                <SingleCheckIcon 
                    color={Colors.primary}
                />
            );  
            break;  
    }

    let media;

    if (props.feedId && props.feedId.trim().length > 0) {
        media = (
            <TouchableWithoutFeedback onPress={props.goToFeedDetail}>
                <ScalableImage 
                    source={{uri: baseUrl + props.imageUrl}}
                    width={300}
                    style={styles.image}
                />
            </TouchableWithoutFeedback>
        );
    } else  {
        switch (props.type) {
            case 'image':
                media = (
                    <TouchableWithoutFeedback onPress={props.goToMedia}>
                        <ScalableImage 
                            source={{uri: baseUrl + props.imageUrl}}
                            width={300}
                            style={styles.image}
                        />
                    </TouchableWithoutFeedback>
                );
                break;
            case 'video':
                media = (
                    <TouchableWithoutFeedback onPress={props.goToMedia}>
                        <View style={{ width: 300, height: 400 }}>
                            <VideoView 
                                source={{uri: baseUrl + props.videoUrl}}
                                width={300}
                                height={400}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                );
                break;
            default:
                break;
        }
    }


    return (
        <View style={styles.root}>
            <View style={bubbleStyles}>
                {
                    (
                        (props.imageUrl && props.imageUrl.trim().length > 0)  ||
                        (props.videoUrl && props.videoUrl.trim().length > 0)
                    ) && media
                }
                {
                    props.text.trim().length > 0 && 
                    <View style={styles.textContainer}>
                        <Text style={textStyles}>
                            {FORMATTER(props.text)}
                        </Text>
                    </View>
                }
            </View>
            <View style={infoContainerStyles}>
                {
                    props.timestamp &&
                    <Text style={styles.timestamp}>
                        {Moment(props.timestamp).format("hh:mm")}
                    </Text>
                }
                {
                    props.isSelf && 
                    status
                }
            </View>
        </View>
    );
}

ChatTile.propTypes = {
    text: PropTypes.string,
    imageUrl: PropTypes.string,
    videoUrl: PropTypes.string,
    type: PropTypes.string,
    sender: PropTypes.object,
    isSelf: PropTypes.bool,
    feedId: PropTypes.string,
    timestamp: PropTypes.string,
    status: PropTypes.string,
    goToMedia: PropTypes.func,
    goToFeedDetail: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        marginVertical: 10,
    },
    bubble: {
        maxWidth: "70%",
        borderRadius: 10,
        overflow: "hidden",
        elevation: 5
    },
    selfBubble: {
        backgroundColor: Colors.background,
        // borderWidth: 0.5,
        borderBottomRightRadius: 0,
        alignSelf: "flex-end"
    }, 
    otherBubble: {
        backgroundColor: Colors.milk,
        borderBottomLeftRadius: 0,
        alignSelf: "flex-start",
    }, 
    textContainer: {
        padding: 10,
    },
    text: {
        fontSize: 16,
    },
    selfText: {
        color: "#000",
    },
    otherText: {
        color: Colors.secondary,
    },
    image: {
        height: 100,
        backgroundColor: Colors.secondary
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    selfInfoContainer: {
        justifyContent: "flex-end",
    },
    otherInfoContainer: {
        justifyContent: "flex-start",
        marginLeft: 10,
        marginTop: 10,
    },
    timestamp: {
        fontSize: 12,
        color: Colors.secondary,
    },
    status: {
        color: Colors.primary,
    },
});

export default ChatTile;