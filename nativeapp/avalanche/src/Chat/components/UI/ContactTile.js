import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';

import CircularProfileItem from '../../../common/components/CircularProfileItem';

import Colors from '../../../../constants/Colors';
import baseUrl from '../../../../constants/API';


const ContactTile = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.root}>
                <CircularProfileItem 
                    imageUrl={baseUrl + props.user.profileImageUrl}
                    radius={25}
                />
                <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>
                        {props.user.firstName}{' '}{props.user.lastName}
                    </Text>
                    {
                        props.lastMessage &&
                        <Text style={styles.lastMessage}>
                            {props.lastMessage}
                        </Text>
                    }
                </View>
                <View style={styles.tailContainer}>
                    {
                        props.timestamp && 
                        <Text style={styles.timestamp}>
                            {props.timestamp} mins
                        </Text>
                    }
                    
                    {
                        props.unread && props.unread !== 0 &&
                        <View style={styles.badgeContainer}>
                            <Text style={styles.badge}>
                                {props.unread}
                            </Text>
                        </View>
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}



ContactTile.propTypes = {
    user: PropTypes.object,
    lastMessage: PropTypes.string,
    timestamp: PropTypes.number,
    unread: PropTypes.number,
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        width: "100%",
        paddingVertical: 20,
        paddingHorizontal: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.lightGrey,
    },
    userNameContainer: {
        flex: 1,
        marginHorizontal: 10,
        justifyContent: "center",
    },
    userName: {
        fontSize: 18,
        // fontWeight: "700",
        color: Colors.dark,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    lastMessage: {
        fontSize: 16,
        color: Colors.secondary,
    },
    tailContainer: {
        width: 60,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    timestamp: {
        fontSize: 14,
        color: Colors.lightGrey,
    },
    badgeContainer: {
        borderRadius: 10,
        height: 20,
        width: 20,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0,
        marginTop: 5,
    },
    badge: {
        fontSize: 12,
        color: "#fff",
    },
});

export default ContactTile;