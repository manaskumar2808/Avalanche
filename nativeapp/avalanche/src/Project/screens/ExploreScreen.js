import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
} from 'react-native';

import ExploreTile from '../components/UI/ExploreTile';
import PillTile from '../components/UI/PillTile';

import Colors from '../../../constants/Colors';
import ExploreData from '../data/ExploreData';

import CameraIcon from '../../../Icons/CameraIcon';
import PostIcon from '../../../Icons/PostIcon';
import SearchIcon from '../../../Icons/SearchIcon';

const ExploreScreen = props => {
    const [pillIndex, setPillIndex] = useState(0);

    const list1 = [];
    const list2 = [];

    const pills = [
        {
            id: "p1",
            index: 0,
            title: 'Travel',
        },
        {
            id: "p2",
            index: 1,
            title: 'Food',
        },
        {
            id: "p3",
            index: 2,
            title: 'Fashion',
        },
        {
            id: "p4",
            index: 3,
            title: 'Gaming',
        },
        {
            id: "p5",
            index: 5,
            title: 'Music',
        },
    ];

    const n = Math.ceil(ExploreData.length/2);

    for(let i=0; i<n; i++) {
        list1.push(ExploreData[i]);
    }

    for(let i=n; i<ExploreData.length; i++) {
        list2.push(ExploreData[i]);
    }


    const goToProjectDetail = (id) => {
        props.navigation.navigate('projectDetail', {
            projectId: id,
        });
    }

    return (
        <View style={styles.root}>
            <ScrollView>
                <View style={styles.pillContainer}>
                    <FlatList 
                        horizontal
                        data={pills}
                        renderItem={({item, index}) => (
                            <PillTile 
                                title={item.title}
                                active={index === pillIndex}
                                onPress={() => setPillIndex(index)}
                            />
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={styles.listSection}>
                    <View style={styles.listLeft}>
                        {list1.map(exp => (
                            <ExploreTile
                                key={exp.id}
                                id={exp.id}
                                title={exp.title}
                                imageUrl={exp.imageUrl}
                                creator={exp.creator}
                                timestamp={exp.timestamp}
                                onPress={() => goToProjectDetail(exp.id)}
                            />
                        ))}
                    </View>
                    <View style={styles.listRight}>
                        {list2.map(exp => (
                            <ExploreTile
                                key={exp.id}
                                id={exp.id}
                                title={exp.title}
                                imageUrl={exp.imageUrl}
                                creator={exp.creator}
                                timestamp={exp.timestamp}
                                onPress={() => goToProjectDetail(exp.id)}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}



ExploreScreen.navigationOptions = navData => {
    return {
        headerTitle: "Explore",
        headerLeft: () => (
            <CameraIcon 
                color={Colors.secondary}
                onPress={() => navData.navigation.navigate('story')}
            />
        ),
        headerRight: () => (
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <PostIcon 
                    color={Colors.secondary}
                    onPress={() => navData.navigation.navigate('createProject')}
                />
                <SearchIcon 
                    color={Colors.secondary}
                />
            </View>
        ),
    }
}



const styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.background,
        flex: 1,
    },
    pillContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    listSection: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
    },
});

export default ExploreScreen;