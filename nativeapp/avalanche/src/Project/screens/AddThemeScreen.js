import React from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

import PointTile from '../../common/components/UI/PointTile';
import BottomButtonTile from '../../common/components/UI/BottomButtonTile';


const AddThemeScreen = props => {
    const goToProjectChoose = () => {
        props.navigation.navigate('projectChoose');
    }

    return (
        <View style={styles.root}>
            <View style={styles.themeContainer}>
                <Ionicons name="add-sharp" size={90} color={Colors.lightGrey} />
            </View>
            <View style={styles.pointContainer}>
                <PointTile 
                    text="Its recommended that you should add themes to your project"
                />
                <PointTile 
                    text="Adding themes make it more attractive for the user to view your content"
                />
                <PointTile 
                    text="All you have to do is just upload it from your device or take it form your device camera."
                />
            </View>
            <View style={{flex: 1}}></View>
            <BottomButtonTile 
                title="Done"
                onPress={goToProjectChoose}
            />
        </View>
    );
}

AddThemeScreen.navigationOptions = navData => {
    return {
        headerTitle: "Add Theme",   
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    themeContainer: {
        backgroundColor: Colors.milk,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginVertical: 20,
        height: 250,
        marginHorizontal: 20,
    },
    pointContainer: {
        padding: 20,
    },
});

export default AddThemeScreen;