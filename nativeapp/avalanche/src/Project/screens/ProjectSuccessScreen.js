import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import ButtonTile from '../../common/components/UI/ButtonTile';

import Colors from '../../../constants/Colors';

import FrontIcon from '../../../Icons/FrontIcon';
import CheckIcon from '../../../Icons/CheckIcon';

const ProjectSuccessScreen = props => {

    const goToExplore = () => {
        props.navigation.popToTop();
    }

    return (
        <View style={styles.root}>
            <View style={styles.main}>
                <View style={styles.legendContainer}>
                    <Text style={styles.legend}>
                        Successfull!
                    </Text>
                </View>
                <View style={styles.iconContainer}>
                    <CheckIcon 
                        color={Colors.green}
                    />
                </View>
                <Text style={styles.subLegend}>Posted the project</Text>
            </View>
            <View style={{height: 300}}>

            </View>
            <ButtonTile 
                title="Go To Explore"
                iconRight={() => (<FrontIcon color="#fff"/>)}
                onPress={goToExplore}
            />
        </View>
    );
}

ProjectSuccessScreen.navigationOptions = navData => {
    return {
        headerShown: false,
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    main: {
        flex: 1,
        marginVertical: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    legendContainer: {
        marginBottom: 10,
    },
    legend: {
        fontSize: 30,
        fontWeight: "700",
        textAlign: "center",
        color: Colors.primary,
    },
    subLegend: {
        fontSize: 21,
        fontWeight: "700",
        color: Colors.secondary,
        textAlign: "center",
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ProjectSuccessScreen;