import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import CircularProfileItem from '../../../common/components/CircularProfileItem';

const NotificationTile = props => {
    return (
        <View style={styles.root}>
            <View style={styles.profileContainer}>
                <CircularProfileItem 
                    imageUrl={props.user.profileImageUrl}
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.userName}>{props.user.userName}</Text>
                <Text style={styles.description}>
                    {props.description}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
    },
});

export default NotificationTile;