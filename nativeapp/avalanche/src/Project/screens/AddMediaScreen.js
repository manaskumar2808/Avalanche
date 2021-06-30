import React from 'react';
import { View, StyleSheet } from 'react-native';

import AddMediaTile from '../../Auth/components/UI/AddMediaTile';
import BottomButtonTile from '../../common/components/UI/BottomButtonTile';
import Colors from '../../../constants/Colors';

const AddMediaScreen = props => {
    const goToMediaOptions = () => {
        props.navigation.navigate('createOption');
    }

    const goToAddContent = () => {
        props.navigation.navigate('addContent');
    }

    return (
        <View style={styles.root}>
            <View style={styles.mediaContainer}>
                <AddMediaTile onPress={goToMediaOptions} />
            </View>
            <BottomButtonTile 
                title="Next"
                onPress={goToAddContent}
            />
        </View>
    );
}

AddMediaScreen.navigationOptions = navData => {
    return {
        headerTitle: "Add Media",
    }   
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    mediaContainer: {
        flex: 1,
        padding: 20,
    },
});

export default AddMediaScreen;