import React, { useEffect, useState } from 'react';
import axios from '../../../../axios-config';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';
import { UIActivityIndicator } from 'react-native-indicators';
import { Entypo } from '@expo/vector-icons';

import CircularProfileItem from '../../../common/components/CircularProfileItem';
import ReplyTile from './ReplyTile';

import FORMATTER from '../../utility/Formatter';

import baseUrl from '../../../../constants/API';
import header from '../../../../constants/Header';
import Colors from '../../../../constants/Colors';


const CommentTile = props => {
    const token = useSelector(state => state.ath.token);

    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState(null);

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    // utility
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const { doFetchReply, setDoFetchReply } = props;
    
    useEffect(() => {
        fetchLike();
    }, []);

    useEffect(() => {
        if(doFetchReply) {
            fetchReplies();
            setDoFetchReply(false);
        }
    }, [doFetchReply]);

    useEffect(() => {
        if(!replies  || replies.length === 0) {
            setShowReplies(false);
        } else {
            setShowReplies(true);
        }
    }, [replies]);

    const formatTimestamp = () => {
        const formattedText = moment(props.timestamp).fromNow();
        const words = formattedText.split(' ');
        return words[0] + '' + words[1][0];
    }

    const fetchReplies = () => {
        setIsLoading(true);
        axios.get('reply/comment/'+props.commentId, header(token))
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            const loadedReplies = [];
            for(let key in response.data.replies) {
                loadedReplies.push(response.data.replies[key]);
            }
            
            setReplies(loadedReplies);
            setIsLoading(false);
        })
        .catch(error => {
            setIsLoading(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }

    const fetchLike = () => {
        axios.get('like/likes/comment/'+props.commentId, header(token))
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setLikeCount(response.data.count);
            return axios.get('like/isliked/comment/'+props.commentId, header(token));
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

    const like = () => {
        if(isLiked) {
            setIsLiked(false);
            setLikeCount(prevState => prevState - 1);
            axios.delete('like/unlike/comment/'+props.commentId, header(token))
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
                commentId: props.commentId,
                parent: "comment",
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

    const toggleShowReplies = () => {
        if(!showReplies) {
            fetchReplies();
            setShowReplies(true);
        } else {
            setShowReplies(false);
        }
    }

    const reply = () => {
        props.replyToComment(props.commentId, props.commentor.userName);
    }

    return (
        <View style={styles.root}>
            <View style={styles.main}>
                <CircularProfileItem 
                    imageUrl={baseUrl + props.commentor.profileImageUrl}
                    radius={20}
                />
                <View style={styles.body}>
                    <Text style={styles.userName}>
                        {props.commentor.userName}
                    </Text>
                    <Text style={styles.comment}>
                        {FORMATTER(props.comment)}
                    </Text>
                    <View style={styles.commentOptions}>
                        <TouchableWithoutFeedback onPress={like}>
                            <Text style={{...styles.commentOption, color: isLiked ? Colors.blue : Colors.secondary}}>
                                Like {likeCount > 0 && <Text>{likeCount}</Text>}
                            </Text>
                        </TouchableWithoutFeedback>
                        <Entypo name="dot-single" size={24} color={Colors.secondary} />
                        <TouchableWithoutFeedback onPress={reply}>
                            <Text style={styles.commentOption}>
                                Reply
                            </Text>
                        </TouchableWithoutFeedback>
                        <Entypo name="dot-single" size={24} color={Colors.secondary} />
                        <TouchableWithoutFeedback onPress={toggleShowReplies}>
                            <Text style={styles.commentOption}>
                                { showReplies ? "Hide" : "Show" } Replies
                            </Text>
                        </TouchableWithoutFeedback>
                        <Entypo name="dot-single" size={24} color={Colors.secondary} />
                        <TouchableWithoutFeedback>
                            <Text style={styles.commentOption}>
                                Report
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={styles.timestampContainer}>
                    <Text style={styles.timestamp}>{formatTimestamp()}</Text>
                </View>
            </View>
            {
                showReplies &&
                <View style={styles.replySection}>
                    <View style={styles.replyIndent}></View>
                    <View style={styles.replyContainer}>
                        {
                            isLoading || !replies ? 
                            <UIActivityIndicator 
                                color={Colors.primary}
                                size={25}
                            />
                            :
                            <FlatList 
                                keyExtractor={item => item.id}
                                data={replies}
                                renderItem={({item, index}) => (
                                    <ReplyTile
                                        replyId={item.id}    
                                        replier={item.replier}
                                        reply={item.text}
                                        timestamp={item.createdAt.toString()}
                                    />
                                )}
                            />
                        }
                    </View>
                </View>
            }
        </View>
    );
}

CommentTile.propTypes = {
    commentId: PropTypes.string,
    commentor: PropTypes.object.isRequired,
    comment: PropTypes.string.isRequired,
    timestamp: PropTypes.string,
    replyToComment: PropTypes.func,
    doFetchReply: PropTypes.bool,
    setDoFetchReply: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        borderBottomWidth: 0.5,
        marginHorizontal: 20,
    },
    main: {
        flexDirection: "row",
        paddingVertical: 10,
    },
    commentOptions: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    commentOption: {
        color: Colors.secondary,
    },
    body: {
        flex: 1,
        marginHorizontal: 10,
    },
    userName: {
        color: Colors.dark,
        fontWeight: "700",
        fontSize: 17,
    },
    comment: {
        fontSize: 15,
    },
    timestamp: {
        fontSize: 13,
        color: Colors.secondary,
    },
    replySection: {
        flexDirection: "row",
        paddingVertical: 10,
    },
    replyIndent: {
        flex: 1,
    },
    replyContainer: {
        flex: 8,
    },

});

export default CommentTile;