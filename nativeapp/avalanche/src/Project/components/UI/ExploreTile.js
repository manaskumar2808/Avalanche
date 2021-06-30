import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import ScalableImage from 'react-native-scalable-image';

import Colors from '../../../../constants/Colors';

import CircularProfileItem from '../../../common/components/CircularProfileItem';

const WIDTH = Dimensions.get('window').width/2 - 20;

const ExploreTile = props => {
    return (
        <View style={styles.root}>
            <TouchableWithoutFeedback onPress={props.onPress}>
                <View style={styles.imageContainer}>
                    <ScalableImage 
                        source={{uri: props.imageUrl}}
                        style={styles.image}
                        width={WIDTH}
                    />
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
            </View>
            <View style={styles.creatorContainer}>
                <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>
                        {props.creator.userName}
                    </Text>
                    <Text style={styles.timestamp}>
                        {props.timestamp} mins ago
                    </Text>
                </View>
                <CircularProfileItem 
                    imageUrl={props.creator.profileImageUrl}
                    radius={20}
                />
            </View>
        </View> 
    );
}

ExploreTile.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    creator: PropTypes.object,
    timestamp: PropTypes.number,  
    onPress: PropTypes.func, 
}

const styles = StyleSheet.create({
    root: {
        width: WIDTH,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: Colors.secondary,
        overflow: "hidden",
        marginVertical: 5,
        marginHorizontal: 10,
    },
    imageContainer: {

    },
    image: {

    },
    titleContainer: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    title: {
        fontSize: 16,
        color: Colors.dark,
    },
    creatorContainer: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    userNameContainer: {
        flex: 1,
    },
    userName: {
        fontSize: 15,
        fontWeight: "700",
        color: Colors.secondary,
    },
    timestamp: {
        fontSize: 12,
        color: Colors.secondary,
    },
});

export default ExploreTile;