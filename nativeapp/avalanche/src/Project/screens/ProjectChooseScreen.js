import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

import ButtonTile from '../../common/components/UI/ButtonTile';
import PointTile from '../../common/components/UI/PointTile';

import Colors from '../../../constants/Colors';

const ProjectChooseScreen = props => {
    
    const goToProjectSuccess = () => {
        props.navigation.navigate('projectSuccess');
    }

    return (
        <View style={styles.root}>
            <View style={styles.legendContainer}>
                <Text style={styles.legend}>
                    Your project is ready to proceed
                </Text>
            </View>
            <View style={styles.pointsContainer}>
                <PointTile 
                    text="You have successfully created your project."
                />
                <PointTile 
                    text="Now you have 2 options, either post the project right now or add it to your dashboard."
                />
                <PointTile 
                    text="If you somehow not sure to finalise the project or you may have a thought to add something before making it visible to other users, you should definitely add the created project to the dashboard."
                />
                <PointTile 
                    text="Only you do have access to your dashboard. However you can give access to any user in case you want."
                />
                <PointTile 
                    text="If you are good to good to go and post the project. Then surely proceed to post it :)"
                />
            </View>
            <View style={{height: 50,}}></View>
            <View style={styles.buttonSection}>
                <ButtonTile 
                    title="Add to dashboard"
                    outlined
                    onPress={goToProjectSuccess}
                />
                <View style={{height: 10}}></View>
                <ButtonTile 
                    title="Post"
                    onPress={goToProjectSuccess}
                />
            </View>
        </View>
    );
}

ProjectChooseScreen.navigationOptions = navData => {
    return {
        headerTitle: () => null,
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    legendContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
    },
    legend: {
        fontSize: 28,
        color: Colors.primary,
        textAlign: "center",
        fontWeight: "700",
    },
    pointsContainer: {
        padding: 20,
    },
    buttonSection: {
        padding: 20,
        height: 120,
    },
});

export default ProjectChooseScreen;