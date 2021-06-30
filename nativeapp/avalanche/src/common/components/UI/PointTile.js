import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Colors from '../../../../constants/Colors';

import { FontAwesome } from '@expo/vector-icons';


const PointTile = props => {
    return (
        <View style={styles.root}>
            <View style={styles.pointContainer}>
                <View style={styles.point}>
                    <FontAwesome name="circle" size={15} color={Colors.primary} style={styles.bullet} />
                    <Text style={styles.pointText}>
                        {props.text}
                    </Text>
                </View>
            </View>
        </View>
    );
}

PointTile.propTypes = {
    text: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
    root: {
        marginVertical: 5,
        paddingHorizontal: 10,
        width: "100%",
        paddingRight: 20,
    },
    pointContainer: {
        width: "100%",
    },
    point: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    bullet: {
        marginRight: 10,
        marginTop: 5,
    },
    pointText: {
        color: Colors.secondary,
        fontSize: 16,
    },
});

export default PointTile;