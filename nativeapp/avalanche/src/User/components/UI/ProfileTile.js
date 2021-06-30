import React, { useEffect, useState } from 'react';
import axios from '../../../../axios-config';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CircularProfileItem from '../../../common/components/CircularProfileItem';
import FlatButtonTile from '../../../common/components/UI/FlatButtonTile';

import * as actions from '../../store/index';

import Colors from '../../../../constants/Colors';
import header from '../../../../constants/Header';
import baseUrl from '../../../../constants/API';

const ProfileTile = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const currentUserId = useSelector(state => state.ath.userId);

    const userId = props.user.id;

    const [isFriend, setIsFriend] = useState(false);
    const [isFollower, setIsFollower] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isRequested, setIsRequested] = useState(false);
    const [hasRequested, setHasRequested] = useState(false);

    // utility
    const [isLoading, setIsLoading] = useState(false);

    const {type} = props;

    useEffect(() => {
        if(type === 'friend') {
            fetchIsFriend();
        } else if(type === 'follow') {
            fetchIsFollowed();
        }
    }, [type]);

    const fetchIsRequested = () => {
        axios.get('request/is-requested/'+userId, header(token))
        .then(response => {
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setIsRequested(response.data.isrequested);
            fetchHasRequested();
        })
        .catch(error => {
            setIsRequested(false);
        });
    }

    const fetchHasRequested = () => {
        axios.get('request/has-requested/'+userId, header(token))
        .then(response => {
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setHasRequested(response.data.hasrequested);
        })
        .catch(error => {
            setHasRequested(false);
        });
    }

    const fetchIsFriend = () => {
        axios.get('friend/is-friend/'+userId, header(token))
        .then(response => {
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setIsFriend(response.data.isfriend);
            fetchIsRequested();
        })
        .catch(error => {
            setIsFriend(false);
        });
    }


    const fetchIsFollower = () => {
        axios.get('follow/is-follower/'+userId, header(token))
        .then(response => {
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setIsFollower(response.data.isfollower);
        })
        .catch(error => {
            setIsFollower(false);
        })
    }

    const fetchIsFollowed = () => {
        axios.get('follow/is-following/'+userId, header(token))
        .then(response => {
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setIsFollowing(response.data.isfollowing);
        })
        .catch(error => {
            setIsFollowing(false);
        })
    }

    const accept = () => {
        if(hasRequested) {
            setIsFriend(true);
            dispatch(actions.acceptRequest(token, userId))
            .then(result => {

            })
            .catch(error => {
                console.log(error.message);
                setIsFriend(false);
            });
        }
    }

    const request = () => {
        if(!isRequested) {
            setIsRequested(true);
            dispatch(actions.sendRequest(token, userId))
            .then(result => {

            })
            .catch(error => {
                setIsFriend(false);
            });
        } else {
            setIsRequested(false);
            dispatch(actions.deleteRequest(token, userId))
            .then(result => {

            })
            .catch(error => {
                setIsFriend(true);
            });
        }
    }

    const friend = () => {
        if(isFriend) {
            setIsFriend(false);
            dispatch(actions.unfriend(token, userId))
            .then(result => {

            })
            .catch(error => {
                setIsFriend(true);
            });
        } else {
            setIsFriend(true);
            dispatch(actions.friend(token, userId))
            .then(result => {

            })
            .catch(error => {
                setIsFriend(false);
            });
        }
    }

    const follow = () => {
        if(isFollowing) {
            setIsFollowing(false);
            dispatch(actions.unfollow(token, userId))
            .then(result => {            
                dispatch(actions.fetchFollowers(token, currentUserId));
            })
            .catch(error => {
                setIsFollowing(true);
            })
        } else {
            setIsFollowing(true);
            dispatch(actions.follow(token, userId))
            .then(result => {
                dispatch(actions.fetchFollowers(token, currentUserId));
            })
            .catch(error => {
                setIsFollowing(false);
            });
        }
    }

    let flatButton;

    switch(props.type) {
        case 'follow':
            flatButton = (
                <FlatButtonTile 
                    title={isFollowing ? "Following" : "Follow"}
                    onPress={follow}
                    color={isFollowing ? "#000" : Colors.blue}
                />
            );
            break;
        case 'friend':
            flatButton = (
                <FlatButtonTile 
                    title={isFriend ? "Friended" : isRequested ? "Requested" : hasRequested ? "accept" : "Friend"}
                    onPress={isFriend ? friend : isRequested ? request : hasRequested ? accept : request}
                    color={isFriend ? Colors.blue : isRequested ? Colors.primary : hasRequested ? Colors.green : Colors.blue}
                    outlined={isRequested}
                />
            );
            break;
        default:
            flatButton = null;
            break;
    }   


    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.root}>
                <CircularProfileItem 
                    imageUrl={baseUrl + props.user.profileImageUrl}
                    radius={27}
                />
                <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>
                        {props.user.firstName}{' '}{props.user.lastName}
                    </Text>
                    {
                        props.subTitle && 
                        <Text style={styles.subTitle}>
                            {props.subTitle}
                        </Text>
                    }
                </View>
                {
                    props.type && 
                    <View style={styles.tailContainer}>
                        {flatButton}
                    </View>
                }
            </View>
        </TouchableWithoutFeedback>
    );
}

ProfileTile.defaultProps = {
    type: 'friend',
}

ProfileTile.propTypes = {
    user: PropTypes.object,
    subTitle: PropTypes.string,
    buttonTitle: PropTypes.string,
    buttonColor: PropTypes.string,
    onButtonPress: PropTypes.func,
    onPress: PropTypes.func,
    isFriend: PropTypes.bool,
    type: PropTypes.string,
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        width: "100%",
        paddingVertical: 20,
        paddingHorizontal: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.lightGrey,
        alignItems: "center",
    },
    userNameContainer: {
        flex: 1,
        marginHorizontal: 10,
        justifyContent: "center",
    },
    userName: {
        fontSize: 16,
        color: Colors.secondary,
        alignItems: "center",
    },
    subTitle: {
        fontSize: 16,
        color: Colors.secondary,
    },
    tailContainer: {     
        justifyContent: "flex-start",
        alignItems: "center"
    },
});

export default ProfileTile;