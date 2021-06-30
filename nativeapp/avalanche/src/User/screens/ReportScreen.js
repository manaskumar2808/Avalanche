import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';

import ButtonTile from '../../common/components/UI/ButtonTile';
import ParaInputTile from '../../common/components/UI/ParaInputTile';

import Colors from '../../../constants/Colors';

const ReportScreen = props => {
    const report = () => {
        
    }

    return (
        <View style={styles.root}>
            <ScrollView>
                <View style={styles.subjectContainer}>
                    <ParaInputTile 
                        placeholder="Subject"
                        height={60}
                    />
                </View>
                <View style={styles.descriptionContainer}>
                    <ParaInputTile 
                        placeholder="Report description ..."
                        height={300}
                    />
                </View> 
                <View style={{ height: 100 }}></View>
                <View style={{ alignItems: "center" }}>
                    <ButtonTile 
                        title="Report"
                        onPress={report}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

ReportScreen.navigationOptions = navData => {
    return {
        headerTitle: "Report",
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    subjectContainer: {
        marginBottom: 20,
    },  
});

export default ReportScreen;