import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements';

import Colors from '../../../../constants/Colors';

const FlatButtonTile = props => {
    let buttonStyles = {...styles.button, backgroundColor: props.color};
    if(props.pilled) {
        buttonStyles = {...styles.button, ...styles.pilled, backgroundColor: props.color};
    } else if(props.outlined) {
        buttonStyles = {...styles.button, ...styles.outlined, borderColor: props.color};
    }

    let titleStyles = {...styles.title};
    if(props.outlined) {
        titleStyles = {...styles.title, color: props.color}
    }

    return (
        <View style={styles.root}>
            <Button 
                type={props.outlined ? "outline" : "solid"}
                title={props.title}
                buttonStyle={buttonStyles}
                titleStyle={titleStyles}
                onPress={props.onPress}
            />
        </View>
    );
}

FlatButtonTile.defaultProps = {
    color: Colors.blue,
    outlined: false,
}

FlatButtonTile.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    outlined: PropTypes.bool,
    pilled: PropTypes.bool,
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        width: 120,
        marginHorizontal: 8,
    },
    button: {
        borderRadius: 5,
        paddingVertical: 4,
    },
    title: {
        fontSize: 15,
    },
    pilled: {
        borderRadius: 20,
    },
    outlined: {
        backgroundColor: Colors.background,
        borderWidth: 1,
    },  
});

export default FlatButtonTile;