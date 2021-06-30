import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, } from 'react-native';

import { Input } from 'react-native-elements';

import Colors from '../../../../constants/Colors';

const ParaInputTile = props => {
    return (
        <View style={styles.root}>
            <View style={{...styles.container, height: props.height}}>
                <Input
                    placeholder={props.placeholder}
                    placeholderTextColor={Colors.lightGrey}
                    multiline
                    inputStyle={styles.input} 
                    inputContainerStyle={styles.inputContainer}
                    value={props.value}
                    onChangeText={props.setValue}
                    errorMessage={props.error}
                    errorStyle={styles.error}
                />
            </View>
        </View>
    );
}

ParaInputTile.propTypes = {
    height: PropTypes.number,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func,
    error: PropTypes.string,
}

const styles = StyleSheet.create({
    root: {

    },
    container: {
        borderRadius: 5,
        backgroundColor: Colors.milk,
        height: 400,
        width: "100%",
        marginVertical: 20,
        padding: 10,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    input: {
        backgroundColor: Colors.milk,
        borderBottomWidth: 0,
    },
    inputContainer: {
        borderBottomWidth: 0,
    },
    error: {
        color: Colors.danger,
        fontSize: 15,
    }
});

export default ParaInputTile;