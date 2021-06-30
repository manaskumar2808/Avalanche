import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

import ExploreData from '../data/ExploreData';

import CircularProfileItem from '../../common/components/CircularProfileItem';

import Colors from '../../../constants/Colors';
import BackIcon from '../../../Icons/BackIcon';

const ProjectDetailScreen = props => {
    const projectId = props.navigation.getParam('projectId');
    const project = ExploreData.find(p => p.id === projectId);

    return (
        <View style={styles.root}>
            <View style={styles.themeContainer}>
                <ImageBackground source={{uri: project.imageUrl}} style={styles.theme} resizeMode="cover">
                    <View style={styles.overlay}>
                        <View style={{flex: 1}}></View>
                        <View style={styles.creatorContainer}>
                            <View style={styles.userNameContainer}>
                                <Text style={styles.userName}>
                                    {project.creator.userName}
                                </Text>
                                <Text style={styles.timestamp}>
                                    {project.timestamp} mins ago
                                </Text>
                            </View>
                            <CircularProfileItem 
                                imageUrl={project.creator.profileImageUrl}
                                radius={25}
                            />
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {project.title}
                    </Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionLegend}>
                        Description
                    </Text>
                    <Text style={styles.description}>
                        {project.description}
                    </Text>
                </View>
            </View>
        </View>
    );
}

ProjectDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: () => null,
        headerTransparent: true,
        headerLeft: ({canGoBack, onPress}) => !canGoBack ? null : (
            <BackIcon color={Colors.lightGrey} onPress={onPress} />
        ),
        headerLeftContainerStyle: {
            marginLeft: 20,
        },
    }
}

const styles = StyleSheet.create({
    root: {

    },
    themeContainer: {
        width: "100%",
        height: 300,
    },
    theme: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    creatorContainer: {
        width: "100%",
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    userNameContainer: {
        
    },
    userName: {
        fontSize: 23,
        color: "#fff",
    },
    timestamp: {
        fontSize: 15,
        color: Colors.lightGrey,
    },
    titleContainer: {
        padding: 20,
    },
    title: {
        fontSize: 23,
        fontWeight: "700"
    },
    descriptionContainer: {
        marginHorizontal: 20,
        borderBottomWidth: 0.5,
        paddingBottom: 20,
        borderBottomColor: Colors.secondary,
        justifyContent: "space-evenly"
    },
    descriptionLegend: {
        fontSize: 23,
    },
    description: {
        color: Colors.secondary,
        fontSize: 16,
    },
});

export default ProjectDetailScreen;