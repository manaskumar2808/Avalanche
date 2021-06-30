import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Colors from '../../../../constants/Colors';

const PillTile = props => {
    const rootStyles = [styles.root];
    const titleStyles = [styles.title];

    if(props.active) {
        rootStyles.push(styles.active);
        titleStyles.push(styles.activeTitle);
    }

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={rootStyles}>
                <Text style={titleStyles}>
                    #{props.title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

PillTile.propTypes = {
    title: PropTypes.string,
    active: PropTypes.bool,
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        width: 110,
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: Colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginVertical: 10,
        alignItems: "center",
    },
    active: {
        backgroundColor: Colors.primary,
        borderWidth: 0,
    },
    title: {
        color: Colors.secondary,
        fontSize: 16,
    },
    activeTitle: {
        color: "#fff",
    },
});

export default PillTile;