import React from 'react';
import PropTypes from 'prop-types';
import { 
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';

import Colors from '../../../../constants/Colors';
import NextIcon from '../../../../Icons/NextIcon';

const SettingTile = props => {
    return (
        <View style={styles.root}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
            </View>
            {
                props.iconText && 
                <View style={styles.iconTextContainer}>
                    <Text style={styles.iconText}>
                        {props.iconText}
                    </Text>
                </View>
            }
            <TouchableWithoutFeedback onPress={props.onPress}>
                <View style={styles.iconContainer}>
                    {props.icon}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}


SettingTile.defaultProps = {
    icon:  (
        <NextIcon 
            color={Colors.lightGrey}
        />  
    ),
}


SettingTile.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.element,
    iconText: PropTypes.string,
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
        paddingVertical: 15,
        paddingLeft: 10,
        alignItems: "center",
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        color: Colors.secondary,
        fontSize: 17,
    },
    iconTextContainer: {
        marginHorizontal: 5,
    },
    iconText: {
        fontSize: 17,
        color: Colors.primary,
    },
    iconContainer: {
        marginLeft: 10,
    },
});

export default SettingTile;