import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import AlertTile from '../../common/components/UI/AlertTile';
import ContactTile from '../components/UI/ContactTile';

import Colors from '../../../constants/Colors';

import CameraIcon from '../../../Icons/CameraIcon';
import SearchIcon from '../../../Icons/SearchIcon';
import SocialIcon from '../../../Icons/SocialIcon';

import * as actions from '../store/index';
import * as userActions from '../../User/store/index';
import * as friendActions from '../../Friend/store/index';

const MessageScreen = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const userId = useSelector(state => state.ath.userId);
    const friends = useSelector(state => state.frd.friends);

    // utility
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetchCurrentUser();
        fetchFriends();
    }, []);

    const fetchCurrentUser = () => {
        dispatch(userActions.fetchCurrentUser(token))
        .then(result => {
            
        }).catch(error => {

        });
    }

    const fetchFriends = () => {
        dispatch(friendActions.fetchFriends(token, userId))
        .then(result => {
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

    const goToChat = (roomId, uid, userName, firstName, lastName) => {
        props.navigation.navigate('chat', {
            roomId: roomId,
            userName: userName,
            userId: uid,
            firstName: firstName,
            lastName: lastName,
        });
    }


    if(isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <UIActivityIndicator 
                    color={Colors.primary}
                    size={30}
                />
            </View>
        );
    }


    if(friends.length == 0) {
        return (
            <View style={styles.layoverContainer}>
                <FontAwesome5 name="user-friends" size={40} color="black" />
                <Text>
                    No friends yet
                </Text>
            </View>
        );
    }


    return (
        <View style={styles.root}>
            <FlatList 
                data={friends}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                    <ContactTile 
                        user={item.user}
                        lastMessage={item.lastMessage}
                        unread={item.unread}
                        timestamp={item.timestamp}
                        onPress={() => goToChat(item.id, item.user.id, item.user.userName, item.user.firstName, item.user.lastName)}
                    />
                )}
            />
            {
                showErrorModal && 
                <AlertTile 
                    title="Message Error"
                    message={errorMessage}
                    buttonText="Okay"
                    close={() => setShowErrorModal(false)}
                    onPress={() => setShowErrorModal(false)}
                />
            }
        </View>
    );
}


MessageScreen.navigationOptions = navData => {
    return {
        headerTitle: "Message",
        headerLeft: () => (
            <CameraIcon 
                color={Colors.secondary}
                onPress={() => navData.navigation.navigate('story')}
            />
        ),
        headerRight: () => (
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <SocialIcon 
                    color={Colors.secondary}
                    onPress={() => navData.navigation.navigate('findFriend')}
                />
                <SearchIcon 
                    color={Colors.secondary}
                    onPress={() => navData.navigation.navigate('search')}
                />
            </View>
        ),
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 10,
    },
    loaderContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    layoverContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default MessageScreen;