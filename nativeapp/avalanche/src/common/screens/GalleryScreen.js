import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import GalleryView from '../components/GalleryView';
import AlertTile from '../components/UI/AlertTile';

import Colors from '../../../constants/Colors';

const GalleryScreen = props => {
    const type = props.navigation.getParam('type');

    // utility 
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const goBack = () => {
        props.navigation.goBack();
    }

    return (
        <View style={styles.root}>
            <GalleryView goBack={goBack} type={type} setShowErrorModal={setShowErrorModal} setErrorMessage={setErrorMessage} />
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

GalleryScreen.navigationOptions = navData => {
    return {
        headerShown: true,
        headerTitle: "Gallery",
        headerTitleAlign: "center",
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        backgroundColor: Colors.dark,
    },
});

export default GalleryScreen;