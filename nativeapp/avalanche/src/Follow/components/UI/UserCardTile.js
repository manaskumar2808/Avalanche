import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CircularProfileItem from '../../../common/components/CircularProfileItem';

import FlatButtonTile from '../../../common/components/UI/FlatButtonTile';

import Colors from '../../../../constants/Colors';
import baseUrl from '../../../../constants/API';

import * as actions from '../../store/index';

const UserCardTile = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);;
    const [isFollowing, setIsFollowing] = useState(false);

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const { user } = props;

    const follow = () => {
        if(isFollowing) {
            setIsFollowing(false);
            dispatch(actions.unfollow(token, user.id))
            .then(result => {          
                setShowErrorModal(false);
                setErrorMessage(null);
            })
            .catch(error => {
                setIsFollowing(true);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            })
        } else {
            setIsFollowing(true);
            dispatch(actions.follow(token, user.id))
            .then(result => {
                setShowErrorModal(false);
                setErrorMessage(null);
            })
            .catch(error => {
                setIsFollowing(false);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
        }
    }


    return (
        <View style={styles.root}>
            <CircularProfileItem 
                imageUrl={baseUrl + user.profileImageUrl}
                radius={40}
            />
            <View style={styles.userNameContainer}>
                <Text style={styles.userName}>
                    {user.userName}
                </Text>
            </View>
            <FlatButtonTile 
                title={isFollowing ? "Unfollow" : "Follow"}
                color={isFollowing ? Colors.dark : Colors.blue}
                onPress={follow}
            />
        </View>
    );
}

UserCardTile.propTypes = {
    user: PropTypes.object,
}

const styles = StyleSheet.create({
    root: {
        justifyContent: "center",
        padding: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.secondary,
        backgroundColor: Colors.background,
        marginHorizontal: 10,
        alignItems: "center",
    },
    userNameContainer: {
        alignItems: "center",
        marginVertical: 10,
    },
    userName: {
        fontSize: 17,
        color: Colors.dark,
    },
});

export default UserCardTile;