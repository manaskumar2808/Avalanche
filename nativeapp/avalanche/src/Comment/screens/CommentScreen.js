import React, { useEffect, useState } from 'react';
import axios from '../../../axios-config';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Keyboard,
    Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Input } from 'react-native-elements';

import { UIActivityIndicator } from 'react-native-indicators';

import { Feather } from '@expo/vector-icons';

import CommentTile from '../components/UI/CommentTile';
import AlertTile from '../../common/components/UI/AlertTile';

import FORMATTER from '../utility/Formatter';

import SendIcon from '../../../Icons/SendIcon';
import header from '../../../constants/Header';
import Colors from '../../../constants/Colors';
import baseUrl from '../../../constants/API';


const CommentScreen = props => {
    const parent = props.navigation.getParam('parent') || 'feed';
    const feedId = props.navigation.getParam('feedId');
    const storyId = props.navigation.getParam('storyId');

    const token = useSelector(state => state.ath.token);
    const feeds = useSelector(state => state.feed.feeds);
    const stories = useSelector(state => state.sty.stories);
    
    const feed = feeds.find(f => f.id === feedId);
    const story = stories.find(s => s.id === storyId);

    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [replyMode, setReplyMode] = useState(false);
    const [replyCommentId, setReplyCommentId] = useState(null);
    const [doFetchReply, setDoFetchReply] = useState(false);

    // utility
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [autoFocus, setAutoFocus] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchComments();
    }, []);


    useEffect(() => {
        if(text.trim().length === 0) {
            setReplyMode(false);
            setReplyCommentId(null);
        }
    }, [text]);

    useEffect(() => {
        console.log(stories);
    }, [stories]);

    let author;
    let content;
    switch (parent) {
        case 'feed':
            author = feed.creator;
            content = feed.description;
            break;
        case 'story':
            author = story.maker;
            content = story.caption;
            break;
        default:
            break;
    }

    const refreshComments = () => {
        setIsRefreshing(true);
        fetchComments();
    }
    
    const fetchComments = () => {
        let id;
        switch (parent) {
            case 'feed':
                id = feedId;
                break;
            case 'story':
                id = storyId;
                break;
            default:
                id = feedId;
                break;
        }

        axios.get('comment/'+id+'/parent/'+parent, header(token))
        .then(response => {
            const loadedComments = [];
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
    
            for(let key in response.data.comments) {
                loadedComments.push(response.data.comments[key]);   
            }
    
            setComments(loadedComments);
            setIsLoading(false);
            setIsRefreshing(false);
        })
        .catch(error => {
            setIsLoading(false);
            setIsRefreshing(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }

    const submit = () => {
        if(text.trim().length > 0) {
            let data;
            let url = 'comment/add';
            if(replyMode) {
                url = 'reply/add';
                data = {
                    text,
                    commentId: replyCommentId,
                }
            } else {
                data = {
                    text,
                    parent,
                    feedId: feedId != null ? feedId : null,
                    storyId,
                }
            }
            axios.post(url, data, header(token))
            .then(response => {
                if(response.data.error) {
                    const error = new Error(response.data.error);
                    throw error;
                }
                setText("");
                Keyboard.dismiss();
                if(!replyMode) {
                    fetchComments();
                } else {
                    setDoFetchReply(true);
                }
            })
            .catch(error => {
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
        }
    }

    const replyToComment = (commentId, userName) => {
        setAutoFocus(true);
        setText('@' + userName + ' ');
        setReplyMode(true);
        setReplyCommentId(commentId);
    }   


    const commentInput = (
        <View style={styles.inputSection}>
            <View style={{flex: 1}}>
                <Input 
                    placeholder="Add your comment..."
                    inputContainerStyle={styles.commentInputContainer}
                    inputStyle={styles.commentInput}
                    value={text}
                    onChangeText={setText}
                    autoFocus={autoFocus}
                />
            </View>
            <View style={styles.sendContainer}>
                <SendIcon 
                    color={Colors.secondary}  
                    onPress={submit}             
                />
            </View>
        </View>
    );

    if(isLoading) {
        return (
            <View style={styles.root}>
                <View style={styles.loaderContainer}>
                    <UIActivityIndicator 
                        color={Colors.primary}
                        size={30}
                    />
                </View>
                {commentInput}
            </View>
        );
    }

    return (
        <View style={styles.root}>
            <FlatList
                refreshing={isRefreshing}
                onRefresh={refreshComments}
                data={comments}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                    <CommentTile 
                        commentId={item.id}
                        comment={item.text}
                        commentor={item.commentor}
                        timestamp={item.createdAt.toString()}
                        replyToComment={replyToComment}
                        doFetchReply={doFetchReply}
                        setDoFetchReply={setDoFetchReply}
                    />
                )}
                ListHeaderComponent={() => (
                    <View style={styles.descriptionContainer}>
                        {parent === 'story' && <View style={styles.mediaContainer}>
                            <Image
                                source={{ uri: baseUrl + story.media.imageUrl }}
                                resizeMode="cover"
                                style={styles.media}
                            />
                        </View>}
                        <View style={{paddingHorizontal: 10,}}>
                            <Text style={styles.description}>
                                <Text style={styles.descriptor}>{author.userName}</Text>
                                {' '}{FORMATTER(content)}
                            </Text>
                        </View>
                    </View>
                )}
            />
            {
                showErrorModal &&
                <AlertTile 
                    title="Comment Error"
                    message={errorMessage}
                    buttonText="Okay"
                    close={() => setShowErrorModal(false)}
                    onPress={() => setShowErrorModal(false)}
                />
            }
            {commentInput}
        </View>
    );
}

CommentScreen.navigationOptions = navData => {
    return {
        headerTitle: "Comments",
        headerRight: () => (
            <Feather name="more-horizontal" size={28} color={Colors.secondary} />
        ),
        headerRightContainerStyle: {
            marginHorizontal: 20,
        },
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.background,
        flex: 1,
    },
    loaderContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    descriptionContainer: {
        paddingVertical: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        borderBottomWidth: 0.5,
    },
    mediaContainer: {
        height: 270,
        width: "100%",
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 20,
    },
    media: {
        height: "100%",
        width: "100%",
    },
    descriptor: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.dark,
    },
    description: {
        fontSize: 16,
    },
    inputSection: {
        height: 70,
        backgroundColor: Colors.milk,
        flexDirection: "row",
        width: "100%",
    },
    commentInputContainer: {
        height: 70,
        borderRadius: 20,
        borderBottomWidth: 0,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    commentInput: {
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

export default CommentScreen;