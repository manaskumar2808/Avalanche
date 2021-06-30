import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CircularProfileItem from '../../../common/components/CircularProfileItem';
import FlatButtonTile from '../../../common/components/UI/FlatButtonTile';

import Colors from '../../../../constants/Colors';
import baseUrl from '../../../../constants/API';

import * as actions from '../../store/index';
import * as chatActions from '../../../Chat/store/index';

const ShareItemTile = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const userId = useSelector(state => state.ath.userId);


    const [sendText, setSendText] = useState("send");

    const share = () => {
        setSendText("sending");

        const galleryIds = [];
        for(let key in props.gallery) {
            galleryIds.push(props.gallery[key].id);
        }

        const chatData = {
            senderId: userId,
            receiverId: props.item.user.id,
            roomId: props.item.id,
            text: props.creator.userName + ' ' + props.description, 
            mediaIds: galleryIds,
            feedId: props.feedId,
        }
        dispatch(chatActions.addChat(token, chatData))
        .then(result => {
            setSendText("sent");
        })
        .catch(error => {
            setSendText("send");
        });
    }

    let buttonColor = Colors.primary;
    switch(sendText) {
        case "send":
            buttonColor = Colors.primary;
            break;
        case "sending":
            buttonColor = Colors.primaryLight;
            break;
        case "sent":
            buttonColor = Colors.dark;
            break;
        default:
            buttonColor = Colors.primary;
            break;
    }

    return (
        <View key={props.item.id} style={styles.root}>
            <CircularProfileItem 
                imageUrl={baseUrl + props.item.user.profileImageUrl}
                haveBorder
                radius={25}
            />
            <View style={{width: 10}}>

            </View>
            <View style={styles.shareItemUserNameContainer}>
                <Text style={styles.shareItemUserName}>
                    {props.item.user.firstName}{' '}{props.item.user.lastName}
                </Text>
            </View>
                <FlatButtonTile 
                    color={buttonColor}
                    title={sendText}
                    onPress={share}
                />
        </View>
    );
}

ShareItemTile.propTypes = {
    item: PropTypes.object,
    gallery: PropTypes.array,
    feedId: PropTypes.string,
    description: PropTypes.string,
    creator: PropTypes.object,
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        marginVertical: 10,
        padding: 10,
        alignItems: "center"
    },
    shareItemUserNameContainer: {
        flex: 1,
        justifyContent: "center",
    },
    shareItemUserName: {
        fontSize: 15,
        color: Colors.secondary,
    },
});


export default ShareItemTile;