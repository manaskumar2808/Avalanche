import React, { useEffect, useState } from 'react';
import axios from '../../../../axios-config';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import moment from 'moment';
import CircularProfileItem from '../../../common/components/CircularProfileItem';

import HeartOpenIcon from '../../../../Icons/HeartOpenIcon'; 
import HeartFillIcon from '../../../../Icons/HeartFillIcon';
import CommentIcon from '../../../../Icons/CommentIcon';

import Colors from '../../../../constants/Colors';
import VideoView from '../../../common/components/VideoView';
import baseUrl from '../../../../constants/API';
import { useDispatch, useSelector } from 'react-redux';
import header from '../../../../constants/Header';

const MEDIA_HEIGHT = 270;
const MEDIA_WIDTH = Dimensions.get('window').width * (18 / 20);

const StoryTile = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const userId = useSelector(state => state.ath.userId);

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    const [bottomModalError, setBottomModalError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetchLike();
        fetchCommentsCount();
    }, []);


    const fetchLike = () => {
        axios.get('like/likes/story/'+props.storyId, header(token))
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setLikeCount(response.data.count);
            return axios.get('like/isliked/story/'+props.storyId, header(token));
        })
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setIsLiked(response.data.isliked);
        })
        .catch(error => {
            setShowError(true);
            setErrorMessage(error.message);
        });
    }

    const fetchCommentsCount = () => {
        axios.get('comment/'+props.storyId+'/parent/story/count', header(token))
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setCommentCount(response.data.count);
        })
        .catch(error => {
            setShowError(true);
            setErrorMessage(error.message);
        });
    }


    const like = () => {
        if(isLiked) {
            setIsLiked(false);
            setLikeCount(prevState => prevState - 1);
            axios.delete('like/unlike/story/'+props.storyId, header(token))
            .then(response => {
                console.log(response.data);
            }) 
            .catch(error => {
                setIsLiked(true);
                setLikeCount(prevState => prevState + 1);
            });
        } else {
            setIsLiked(true);
            setLikeCount(prevState => prevState + 1);
            const likeData = {
                storyId: props.storyId,
                parent: "story",
            }
            axios.post('like/like', likeData, header(token))
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                setIsLiked(false);
                setLikeCount(prevState => prevState - 1);
            });
        }
    }



    let media;
    switch (props.media.type) {
        case 'image':
            media = (
                <Image
                    source={{ uri: baseUrl + props.media.imageUrl }}
                    resizeMode="cover"
                    style={styles.media}
                />
            );
            break;
        case 'video':
            media = (
                <VideoView
                    source={{ uri: baseUrl + props.media.videoUrl }}
                    resizeMode="cover"
                    height={MEDIA_HEIGHT}
                    width={MEDIA_WIDTH}
                />
            );
            break;
        default:
            break;
    }

    return (
        <View style={styles.root}>
            <View style={styles.storyHeader}>
                <CircularProfileItem 
                    imageUrl={baseUrl + props.maker.profileImageUrl}
                    radius={20}
                />
                <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>
                        {props.maker.userName}
                    </Text>
                    <Text style={styles.timestamp}>
                        {moment(props.timestamp).fromNow()}
                    </Text>
                </View>
                <View style={styles.actionContainer}>
                    <View style={styles.iconContainer}>
                        {
                            isLiked ? 
                            <HeartFillIcon color={Colors.danger} onPress={like} />
                            :
                            <HeartOpenIcon color={Colors.secondary} onPress={like} />
                        }
                        <Text style={styles.iconCount}>{likeCount}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <CommentIcon color={Colors.secondary} onPress={props.goToComments} />
                        <Text style={styles.iconCount}>{commentCount}</Text>
                    </View>
                </View>
            </View>  
            <View style={styles.mediaContainer}>
                {media}
            </View>
        </View>
    );
}

StoryTile.propTypes = {
    storyId: PropTypes.string,
    media: PropTypes.object,
    timestamp: PropTypes.string,
    maker: PropTypes.object,
    goToDetail: PropTypes.func,
    goToComments: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    storyHeader: {
        padding: 5,
        marginVertical: 5,
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
    },
    userNameContainer: {
        flex: 1,
        marginLeft: 10,
    },
    userName: {
        fontSize: 18,
        color: Colors.dark,
    },
    mediaContainer: {
        height: MEDIA_HEIGHT,
        width: MEDIA_WIDTH,
        borderRadius: 30,
        overflow: "hidden",
    },
    media: {
        height: "100%",
        width: "100%",
    },
    actionContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        marginHorizontal: 5,
    },
    iconCount: {
        color: Colors.secondary,
        fontSize: 15,
        marginBottom: 5,
        fontWeight: "700"
    },
    timestamp: {
        color: Colors.secondary,
    },
});

export default StoryTile;