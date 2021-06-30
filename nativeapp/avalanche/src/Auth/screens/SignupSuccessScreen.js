import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Colors from '../../../constants/Colors';

import CheckIcon from '../../../Icons/CheckIcon';
import FrontIcon from '../../../Icons/FrontIcon';

import ButtonTile from '../../common/components/UI/ButtonTile';
import PointTile from '../../common/components/UI/PointTile';

const SignupSuccessScreen = props => {

    const goToHome = () => {
        props.navigation.navigate('app');
    }

    return (
        <View style={styles.root}>
            <View style={styles.legendContainer}>
                <Text style={styles.legend}>
                    Congratulations!!
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <CheckIcon 
                    color={Colors.green}
                />
            </View>
            <PointTile 
                text="You have successfully signed up."
            />
            <PointTile 
                text="Your profile has been created successfully."
            />
            <PointTile 
                text="Please maintain the dignity of the application. In case you find any inapropriate content/language pleace report them."
            />
            <PointTile 
                text=" Enjoy the benefits of the application and be motivated to create projects."
            />
            <PointTile 
                text="Thanks for joining the application :)"
            />
            <View style={{height: 40}}></View>
            <ButtonTile 
                title="Let's get inside"
                iconRight={() => (<FrontIcon color="#fff"/>)}
                onPress={goToHome}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    legendContainer: {
        marginBottom: 30,
    },
    legend: {
        fontSize: 40,
        textAlign: "center",
        color: Colors.primary,
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    point: {
        flexDirection: "row",
        alignItems: "center",
    },
    bullet: {
        marginRight: 10,
    },
    pointText: {
        color: Colors.secondary,
        fontSize: 16,
    },
});

export default SignupSuccessScreen;