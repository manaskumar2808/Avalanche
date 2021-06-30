import React from 'react';
import { View, StyleSheet } from 'react-native';

import BottomButtonTile from '../../common/components/UI/BottomButtonTile';
import ParaInputTile from '../../common/components/UI/ParaInputTile';

import Colors from '../../../constants/Colors';

const AddContentScreen = props => {
    const goToAddTheme = () => {
        props.navigation.navigate('addTheme');
    }

    return ( 
        <View style={styles.root}>
            <View style={{padding: 20}}>
                <ParaInputTile 
                    placeholder="Content..."
                    height={500}
                />
            </View>
            <View style={{flex: 1}}></View>
            <BottomButtonTile 
                title="Next"
                onPress={goToAddTheme}
            />
        </View>
    )
}

AddContentScreen.navigationOptions = navData => {
    return {
        headerTitle: "Add Content",
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});

export default AddContentScreen;