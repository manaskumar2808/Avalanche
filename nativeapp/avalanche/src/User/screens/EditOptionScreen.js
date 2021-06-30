import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import BottomButtonTile from '../../common/components/UI/BottomButtonTile';
import SettingTile from '../components/UI/SettingTile';

import Colors from '../../../constants/Colors';

const EditOptionScreen = props => {

    const goBack = () => {
        props.navigation.goBack();
    }

    const goToBio = () => {
        props.navigation.navigate('bioUpdate');
    }

    const goToTheme = () => {
        props.navigation.navigate('themeUpdate');
    }

    return (
        <View style={styles.root}>
            <View style={styles.optionContainer}>
                <SettingTile 
                    title="Update Bio"
                    onPress={goToBio}
                />
                <SettingTile 
                    title="Update Theme"
                    onPress={goToTheme}
                />
            </View>
            <View style={{flex: 1}}></View>
            <BottomButtonTile 
                title="done"
                onPress={goBack}
            />
        </View>
    );
}

EditOptionScreen.navigationOptions = navData => {
    return {
        headerTitle: "Edit Options",
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        width: "100%",
    },
    optionContainer: {
        padding: 10,
    },
});

export default EditOptionScreen;