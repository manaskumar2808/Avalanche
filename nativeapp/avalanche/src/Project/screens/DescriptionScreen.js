import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import BottomButtonTile from '../../common/components/UI/BottomButtonTile';
import ParaInputTile from '../../common/components/UI/ParaInputTile';

import Colors from '../../../constants/Colors';

import * as actions from '../store/index';

const DescriptionScreen = props => {
    const dispatch = useDispatch();

    const [description, setDescription] = useState("");

    const goToPostChoose = () => {
        dispatch(actions.addDescription(description));
        props.navigation.navigate('postChoose');
    }

    return ( 
        <View style={styles.root}>
            <View style={{padding: 20}}>
                <ParaInputTile 
                    placeholder="Add description ..."
                    height={400}
                    value={description}
                    setValue={setDescription}
                />
            </View>
            <View style={{flex: 1}}></View>
            <BottomButtonTile 
                title="done"
                onPress={goToPostChoose}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    buttonContainer: {
        borderTopWidth: 0.5,
        borderColor: Colors.secondary,
        alignItems: "center",
        paddingVertical: 10,
    },
});

export default DescriptionScreen;