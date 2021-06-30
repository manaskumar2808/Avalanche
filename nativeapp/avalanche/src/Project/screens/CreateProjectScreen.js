import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

import Colors from '../../../constants/Colors';

import ParaInputTile from '../../common/components/UI/ParaInputTile';
import BottomButtonTile from '../../common/components/UI/BottomButtonTile';

const CreateProjectScreen = props => {
    const goToAddMedia = () => {
        props.navigation.navigate('addMedia');
    }

    return (
        <View style={styles.root}>
            <View style={styles.titleContainer}>
                <Input 
                    placeholder="Set Title..."
                    placeholderTextColor={Colors.lightGrey}
                    inputStyle={styles.titleInput}
                    inputContainerStyle={styles.titleInputContainer}
                />
            </View>
            <View style={{padding: 20}}>
                <ParaInputTile 
                    placeholder="Description ..."
                    height={300}
                />
            </View>
            <View style={{flex: 1}}></View>
            <BottomButtonTile 
                title="Next"
                onPress={goToAddMedia}
            />
        </View>
    );
}


CreateProjectScreen.navigationOptions = navData => {
    return {
        headerTitle: "Create Project",
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    titleContainer: {
        padding: 10,
    },
    titleInput: {
        paddingVertical: 10,
    },
    titleInputContainer: {
        borderBottomColor: Colors.lightGrey,
    },
    mediaContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    media: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.milk,
        width: 80,
        height: 80,
        borderRadius: 15,
    },
    buttonContainer: {
        borderTopWidth: 0.5,
        borderColor: Colors.secondary,
        alignItems: "center",
        paddingVertical: 10,
    },
});

export default CreateProjectScreen;