import React, { useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import CameraView from '../components/CameraView';
import AlertTile from '../components/UI/AlertTile';

import Colors from '../../../constants/Colors';

const CameraScreen = props => {
    const type = props.navigation.getParam('type');

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const goBack = () => {
        props.navigation.goBack();
    }

    const { isFocused } = props;

    return (
        <View style={styles.root}>
            {
                isFocused &&
                <CameraView goBack={goBack} type={type} setShowErrorModal={setShowErrorModal} setErrorMessage={setErrorMessage} />
            }
            {
                showErrorModal && 
                <AlertTile 
                    buttonText="Okay"
                    close={() => setShowErrorModal(false)}
                    onPress={() => setShowErrorModal(false)}
                    message={errorMessage}
                    title="Gallery Error"
                />
            }
        </View>
    );
}

CameraScreen.navigationOptions = navData => {
    return {
        headerShown: false,
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        backgroundColor: Colors.dark,
    },
});

export default withNavigationFocus(CameraScreen);