import React, { useEffect, useState } from 'react';
import axios from '../../../../axios-config';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import CircularProfileItem from '../../../common/components/CircularProfileItem';

import FORMATTER from '../../utility/Formatter';
import Colors from '../../../../constants/Colors';
import baseUrl from '../../../../constants/API';
import header from '../../../../constants/Header';
import { useSelector } from 'react-redux';


const ReplyTile = props => {
    const token = useSelector(state => state.ath.token);

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        fetchLike();
    }, []);

    const formatTimestamp = () => {
        const formattedText = moment(props.timestamp).fromNow();
        const words = formattedText.split(' ');
        return words[0] + '' + words[1][0];
    }

    const fetchLike = () => {
        axios.get('like/likes/reply/'+props.replyId, header(token))
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setLikeCount(response.data.count);
            return axios.get('like/isliked/reply/'+props.replyId, header(token));
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
            axios.delete('like/unlike/reply/'+props.replyId, header(token))
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
                replyId: props.replyId,
                parent: "reply",
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

    return (
        <View style={styles.root}>
            <View style={styles.main}>
                <CircularProfileItem 
                    imageUrl={baseUrl + props.replier.profileImageUrl}
                    radius={20}
                />
                <View style={styles.body}>
                    <Text style={styles.userName}>
                        {props.replier.userName}
                    </Text>
                    <Text style={styles.comment}>
                        {FORMATTER(props.reply)}
                    </Text>
                    <View style={styles.replyOptions}>
                        <TouchableWithoutFeedback onPress={like}>
                            <Text style={{...styles.replyOption, color: isLiked ? Colors.blue : Colors.secondary}}>
                                Like { likeCount > 0 && likeCount }
                            </Text>
                        </TouchableWithoutFeedback>
                        {/* <Entypo name="dot-single" size={24} color={Colors.secondary} />
                        <Text style={styles.replyOption}>
                            Reply
                        </Text> */}
                        <Entypo name="dot-single" size={24} color={Colors.secondary} />
                        <Text style={styles.replyOption}>
                            Report
                        </Text>
                    </View>
                </View>
                <View style={styles.timestampContainer}>
                   <Text style={styles.timestamp}>{formatTimestamp()}</Text>
                </View>
            </View>
        </View>
    );
}

ReplyTile.propTypes = {
    replyId: PropTypes.string,
    replier: PropTypes.object.isRequired,
    reply: PropTypes.string.isRequired,
    timestamp: PropTypes.string,
}

const styles = StyleSheet.create({
    root: {

    },
    main: {
        flexDirection: "row",
        paddingVertical: 10,
    },
    replyOptions: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    replyOption: {
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
    }
});

export default ReplyTile;