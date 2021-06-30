import React, { useEffect, useState } from 'react';
import axios from '../../../axios-config';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';

import baseUrl from '../../../constants/API';
import Colors from '../../../constants/Colors';
import header from '../../../constants/Header';

import UserCardTile from './UI/UserCardTile';

const SuggestionContainer = props => {
    const token = useSelector(state => state.ath.token);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        axios.get(baseUrl + 'suggestion/follow', header(token))
        .then(response => {
            setSuggestions(response.data.suggestions);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    return suggestions.length === 0 ? null : (
        <View style={styles.root}>
            <View style={styles.legendContainer}>
                <Text style={styles.legend}>
                    Follow Suggestions for you
                </Text>
            </View>
            <FlatList 
                data={suggestions}
                keyExtractor={item => item.id}
                renderItem={({item ,index}) => {
                    return <UserCardTile 
                        user={item}
                    />
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.milk,
        paddingBottom: 10,
    },
    legendContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    legend: {
        fontWeight: "600",
        color: Colors.blue,
        fontSize: 17,
    },
});

export default SuggestionContainer;