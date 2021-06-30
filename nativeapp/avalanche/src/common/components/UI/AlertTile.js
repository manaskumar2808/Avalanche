import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import Colors from '../../../../constants/Colors';

const AlertTile = props => {
    return (
        <View style={styles.root}>
            <Overlay isVisible={true} onBackdropPress={props.close} overlayStyle={styles.overlay}>
                <View style={styles.alert}>
                    <View style={styles.alertHeader}>
                        <Text style={styles.title}>
                            {props.title}
                        </Text>
                    </View>
                    <View style={styles.alertBody}>
                        <Text style={styles.message}>
                            {props.message}
                        </Text>
                    </View>
                    <View style={styles.alertFooter}>
                        <View style={styles.buttonContainer}>
                            <Button 
                                title={props.buttonText}
                                onPress={props.onPress}
                                type="clear"
                                titleStyle={{color: Colors.primary}}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button 
                                title={props.closeText}
                                onPress={props.close}
                                type="clear"
                                titleStyle={{color: Colors.blue}}
                            />
                        </View>
                    </View>
                </View>
            </Overlay>
        </View>
    );
}

AlertTile.defaultProps = {
    title: "An error occured",
    message: "Not able to complete the process at the moment. Please try after some time.",
    closeText: "Close",
}

AlertTile.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    buttonText: PropTypes.string,
    closeText: PropTypes.string,
    onPress: PropTypes.func,
    close: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
    },
    overlay: {
        borderRadius: 20,
        padding: 0,
        overflow: "hidden",
    },
    alert: {
        width: 300,
        color: Colors.primary,
    },
    alertHeader: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 20,
        color: Colors.dark,
    },
    alertBody: {
        borderBottomWidth: 0.5,
        // borderBottomColor: Colors.secondary,
        paddingVertical: 20,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.milk,
    },
    alertFooter: {
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 5,
        backgroundColor: Colors.background,
    },
    message: {
        textAlign: "center",
        fontSize: 17,
        color: Colors.dark,
    },  
    button1: {

    },
    button2: {

    },
});

export default AlertTile;