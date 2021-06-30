import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';

import LanguageTile from '../components/UI/LanguageTile';

import LanguageData from '../data/LanguageData';

import Colors from '../../../constants/Colors';

const LanguageScreen = props => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <View style={styles.root}>
            <FlatList 
                data={LanguageData}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                    <LanguageTile 
                        title={item.title}
                        active={index === activeIndex}
                        onPress={() => setActiveIndex(index)}
                    />
                )}
            />
        </View>
    );
}

LanguageScreen.navigationOptions = navData => {
    return {
        headerTitle: "Language",
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
    },
});

export default LanguageScreen;