import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'react-native-elements';

import { Feather, SimpleLineIcons } from '@expo/vector-icons';

import Colors from '../../../constants/Colors';

import ChatTile from '../components/UI/ChatTile';
import AlertTile from '../../common/components/UI/AlertTile';
import CircularProfileItem from '../../common/components/CircularProfileItem';
import VideoView from '../../common/components/VideoView';

import CameraIcon from '../../../Icons/CameraIcon';
import SendIcon from '../../../Icons/SendIcon';

import baseUrl from '../../../constants/API';

import { UIActivityIndicator } from 'react-native-indicators';

import * as actions from '../store/index';

const ChatScreen = props => {
    const socket = io(baseUrl);
    const dispatch = useDispatch();
    
    const userId = props.navigation.getParam('userId');
    const roomId = props.navigation.getParam('roomId');
    
    const currentUser = useSelector(state => state.usr.currentUser);
    const token = useSelector(state => state.ath.token);
    const currentUserId = useSelector(state => state.ath.userId);
    const roomChats = useSelector(state => state.cht.chats);
    const chatMedia = useSelector(state => state.cht.chatMedia);
    const chatMediaIds = useSelector(state => state.cht.chatMediaIds);
    
    const [chats, setChats] = useState([]);
    const [text, setText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [partialTypedMsg, setPartialTypedMsg] = useState("");
    
    // utility
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    
    let chatList;
    
    useEffect(() => {
        socket.emit('join', {
            userId: currentUserId,
            message: `${currentUser.firstName} online`,
        });

        socket.on('join', (data) => {
            console.log(data);
        });


        socket.on('add', (data) => {
            console.log('chat added : ', data);
            if(data.error) {
                setShowErrorModal(true);
                setErrorMessage(data.error);
            } else if(data.chat.room === roomId) {
                setChats(prevState => {
                    const chatList = [data.chat,...prevState];
                    return chatList;
                });
            }
        });

        
        return () => {
            socket.emit('leave', {
                userId: currentUserId,
                message: `${currentUser.firstName} offline`,
            });
        }
    }, []);
    
    useEffect(() => {
        setIsLoading(true);
        fetchChats();
    }, [dispatch]);
    
    useEffect(() => {
        setChats(roomChats);
    }, [roomChats]);
    
    socket.on('partialTyping', (data) => {
        setIsTyping(data.text.trim().length > 0 && userId === data.userId.toString());
        console.log(`${currentUser.firstName} : `,data);
    });

    const fetchChats = () => {
        dispatch(actions.fetchChats(token, roomId))
        .then(response => {
            setIsLoading(false);
            setShowErrorModal(false);
            setErrorMessage(null);
        })
        .catch(error => {
            setIsLoading(false);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        });
    }

    const typeMessage = (msg) => {
        socket.emit('typing', {
            roomId: roomId,
            userId: currentUser.id,
            firstName: currentUser.firstName,
            text: msg,
        });
        setText(msg);
    }

    const addChat = () => {
        if(text.trim().length > 0 || chatMedia.length > 0) {
            const chatData = {
                text: text,
                mediaIds: chatMediaIds,
                receiverId: userId,
                roomId: roomId,
            }
            
            setText("");
            dispatch(actions.addChat(token, chatData))
            .then(response => {
                dispatch(actions.resetMedia());
            })
            .catch(error => {
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
        }
    }


    const goToMedia = (imageUrl, videoUrl, type, timestamp) => {
        props.navigation.navigate('media', {
            imageUrl,
            videoUrl,
            type,
            timestamp,
        });
    }

    const goToCreateOptions = () => {
        props.navigation.navigate('createOption', {
            type: "chatMedia",
        });
    }

    const goToFeedDetail = (feedId) => {
        props.navigation.navigate('detail', {
            feedId,
        })
    }

    if(isLoading || !roomChats) {
        return (
            <View style={styles.loaderContainer}>
                <UIActivityIndicator 
                    size={30}
                    color={Colors.primary}
                />
            </View>
        );
    }

    return (
        <View style={styles.root}>

            <View style={styles.chatArea}>
                <FlatList
                    ref={ref => chatList = ref}
                    data={chats}
                    keyExtractor={item => item.id}
                    renderItem={({item, index}) => (
                        <ChatTile 
                            sender={item.sender}
                            text={item.text}
                            imageUrl={item.media[0] && item.media[0].imageUrl}
                            videoUrl={item.media[0] && item.media[0].videoUrl}
                            type={item.media[0] && item.media[0].type}
                            timestamp={item.createdAt}
                            isSelf={item.sender.id.toString() === currentUserId.toString()}
                            feedId={item.feedId}
                            status={item.status}
                            goToMedia={() => item.media[0] && goToMedia(baseUrl+item.media[0].imageUrl, baseUrl+item.media[0].videoUrl, item.media[0].type, item.createdAt)}
                            goToFeedDetail={() => goToFeedDetail(item.feedId)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    inverted
                    ListHeaderComponent={() => isTyping && (
                        <ChatTile 
                            timestamp={null}
                            isSelf={false}
                            text={"typing"}
                        />
                    )}
                />
            </View>
            <View style={styles.inputSection}>
                <View style={styles.cameraContainer}>
                    {
                        chatMedia.length > 0 ?
                            chatMedia[0].type === 'image' ?  
                            <CircularProfileItem 
                                haveBorder={true}
                                imageUrl={chatMedia[0].image.uri}
                                radius={20}
                            />
                                :
                            <VideoView
                                source={{ uri: chatMedia[0].video.uri }}
                                height={40}
                                width={40}
                                shouldPlay
                            />
                        :
                        <CameraIcon color={Colors.secondary} onPress={goToCreateOptions} />
                    }
                </View>
                <View style={{flex: 1}}>
                    <Input 
                        placeholder="Write your message..."
                        inputContainerStyle={styles.chatInputContainer}
                        inputStyle={styles.chatInput}
                        leftIcon={() => (
                            <SimpleLineIcons name="emotsmile" size={25} color={Colors.lightGrey} />
                        )}
                        value={text}
                        onChangeText={typeMessage}
                    />
                </View>
                <View style={styles.sendContainer}>
                    <SendIcon 
                        color={Colors.secondary} 
                        onPress={addChat}              
                    />
                </View>
            </View>
            {
                showErrorModal &&
                <AlertTile 
                    title="Chat Error"
                    message={errorMessage}
                    buttonText="Okay"
                    onPress={() => setShowErrorModal(false)}
                    close={() => setShowErrorModal(false)}
                />
            }
        </View>
    );
}

ChatScreen.navigationOptions = navData => {
    const userName = navData.navigation.getParam('userName');
    const firstName = navData.navigation.getParam('firstName');
    const lastName = navData.navigation.getParam('lastName');

    let headerTitle;
    if(firstName) {
        headerTitle = firstName + ' ' + lastName;
    } else {
        headerTitle = userName;
    }

    return {
        headerTitle: () => (
            <View style={{alignItems: "flex-start", justifyContent: "flex-start"}}>
                <Text style={{fontSize: 18, color: Colors.dark}}>
                    {headerTitle}
                </Text>
                <Text style={{fontSize: 14, color: Colors.secondary}}>
                    Online
                </Text>
            </View>
        ), 
        headerTitleAlign: "left",
        headerTitleStyle: {
            fontSize: 17,
            alignItems: "center",
        },
        headerRight: () => (
            <Feather name="more-horizontal" size={27} color={Colors.secondary} />
        ),
        headerRightContainerStyle: {
            marginRight: 20,
        }
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    loaderContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    chatArea: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: Colors.background
    },
    inputSection: {
        height: 70,
        backgroundColor: Colors.milk,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    cameraContainer: {
        marginHorizontal: 10,
    },
    chatInputContainer: {
        borderBottomWidth: 0.5,
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: Colors.secondary,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
        paddingVertical: 0,
        marginTop: 25,
    },
    chatInput: {
        fontSize: 16,
    },
    sendContainer: {
        alignItems: "flex-start",
        height: 70,
        justifyContent: "center",
        paddingTop: 5,
    },  
});

export default ChatScreen;