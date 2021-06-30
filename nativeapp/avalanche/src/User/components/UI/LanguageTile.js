import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';

import Colors from '../../../../constants/Colors';

const LanguageTile = props => {
    const titleStyles = [styles.title];

    if(props.active) {
        titleStyles.push(styles.active);
    }

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.root}>
                <Text style={titleStyles}>
                    {props.title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

LanguageTile.propTypes = {
    title: PropTypes.string,
    active: PropTypes.bool,
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        padding: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    title: {
        fontSize: 17,
        color: Colors.secondary,
    },
    active: {
        color: Colors.primary,
    },
});

export default LanguageTile;