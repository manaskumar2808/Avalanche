import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';

import { UIActivityIndicator } from 'react-native-indicators';
import { Button } from 'react-native-elements';

import Colors from '../../../../constants/Colors';

const ButtonTile = props => {
    let buttonStyle = styles.buttonStyle;
    if(props.outlined) {
        buttonStyle = styles.outlineStyle;
    }

    let titleStyle = styles.titleStyle;
    if(props.outlined) {
        titleStyle = styles.outlineTitleStyle;
    }

    if(props.isLoading) {
        return (
            <View style={styles.root}>
                <View style={buttonStyle}>
                    <UIActivityIndicator 
                        color={titleStyle.color}
                        size={titleStyle.fontSize}
                    />
                </View>
            </View>
        );
    }
    

    return (
        <View style={styles.root}>
            <Button 
                buttonStyle={buttonStyle}
                onPress={props.onPress}
                title={props.title}
                titleStyle={titleStyle}
                type="solid"
                iconRight={true}
                icon={props.iconRight}
                TouchableComponent={TouchableWithoutFeedback}
            />
        </View>
    );
}

ButtonTile.propTypes = {
    title: PropTypes.string,
    outlined: PropTypes.bool,
    onPress: PropTypes.func,
    isLoading: PropTypes.bool,
}

const styles = StyleSheet.create({
    root: {
        width: "95%",
        justifyContent: "center",
    },
    buttonStyle: {
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    outlineStyle: {
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",
    },
    titleStyle: {
        color: "#fff",
        fontSize: 18,
    },
    outlineTitleStyle: {
        color: Colors.primary,
        fontSize: 18,
    },
});

export default ButtonTile;