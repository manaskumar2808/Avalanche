import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';

import Colors from '../../../../constants/Colors';

const BottomButtonTile = props => {
    return (
        <View style={styles.buttonContainer}>
            <Button 
                title={props.title}
                type={props.type}
                titleStyle={{color: props.titleColor, fontSize: 18}}
                onPress={props.onPress}
            />
        </View>
    );
}

BottomButtonTile.defaultProps = {
    type: "clear",
    titleColor: Colors.primary,
    titleSize: 18
}

BottomButtonTile.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    titleColor: PropTypes.string,
    titleSize: PropTypes.number,
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderTopWidth: 0.2,
        borderColor: Colors.secondary,
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: Colors.background,
    },
});

export default BottomButtonTile;