import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../../../../constants/Colors';

const AddMediaTile = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.media}>
                <Ionicons name="add-sharp" size={30} color={Colors.lightGrey} />
            </View>
        </TouchableWithoutFeedback>
    );
}

AddMediaTile.propTypes = {
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    mediaContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    media: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.milk,
        width: 80,
        height: 80,
        borderRadius: 15,
    },
});

export default AddMediaTile;