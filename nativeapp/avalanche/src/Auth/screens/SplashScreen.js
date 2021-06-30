import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

import { useDispatch } from 'react-redux';

import Colors from '../../../constants/Colors';

import * as actions from '../store/index';

const SplashScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.autoLogin())
        .then(isAuth => {
            if(isAuth) {
                props.navigation.navigate('app');
            } else {
                props.navigation.navigate('auth');
            }
        })
        .catch(error => {

        });
    }, [dispatch]);

    return (
        <View style={styles.root}>
            <Image 
                source={require('../../../assets/logo/logo.png')}
                resizeMode="cover"
            />
            <View style={styles.appNameContainer}>
                <Text style={styles.appName}><Text style={{color: Colors.primary, fontFamily: 'handlee', fontSize: 50}}>A</Text>valanche</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    appNameContainer: {
        marginVertical: 20,
    },
    appName: {
        fontSize: 50,
        fontFamily: 'handlee',
        color: Colors.dark,
    }
});

export default SplashScreen;