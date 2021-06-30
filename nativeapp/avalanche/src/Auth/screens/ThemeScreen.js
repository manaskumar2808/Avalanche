import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import baseUrl from '../../../constants/API';

import ButtonTile from '../../common/components/UI/ButtonTile';

import * as authValidators from '../validators/AuthValidators';

import ThemeData from '../data/ThemeData';
import Colors from '../../../constants/Colors';


const ThemeScreen = props => {
    
    const dispatch = useDispatch();
    
    const isAuth = useSelector(state => state.ath.token !== null);
    const authThemeImage = useSelector(state => state.ath.authThemeImage);
    const authThemeIndex = useSelector(state => state.ath.authThemeIndex);

    const currentUser = useSelector(state => state.usr.currentUser);
    
    // input handlers
    const [themeImage, setThemeImage] = useState(currentUser !== null ? currentUser.themeImage : null);
    const [themeIndex, setThemeIndex] = useState(currentUser !== null ? currentUser.themeIndex : -1);
    const [themeImageUrl, setThemeImageUrl] = useState(currentUser !== null ? currentUser.themeImageUrl : null);

    // error handlers
    const [themeImageError, setThemeImageError] = useState(null);

    useEffect(() => {
        if(authThemeImage) {
            setThemeImage(authThemeImage);
        }

        if(authThemeIndex !== -1) {
            setThemeIndex(authThemeIndex);
        }
    }, [authThemeImage, authThemeIndex]);

    const checkValidity = () => {
        const valid = true;
        const _themeImageError = authValidators.themeImageValidator(themeImage);
        if(_themeImageError) {
            valid = false;
            setThemeImageError(_themeImageError);
        }
        return valid;
    }

    const chooseTheme = () => {
        props.navigation.navigate('themeSelection');
    }

    const selectCustomTheme = () => {
        props.navigation.navigate('createOption', {
            type: "themeMedia", 
        });
    }


    const goToBio = () => {
        if(checkValidity()) {
            props.navigation.navigate('bio');
        }
    }

    const goBack = () => {
        props.navigation.goBack();
    }

    const skip = () => {
        props.navigation.navigate('bio');
    }

    let theme;
    if(themeIndex !== -1) {
        theme = (
            <Image 
                source={ThemeData[themeIndex].source}
                style={styles.themeImage}
                resizeMode="cover"
            />
        );
    } else if(themeImage) {
        theme = (
            <Image 
                source={{uri: themeImage.uri}}
                style={styles.themeImage}
                resizeMode="cover"
            />
        );
    } else if(themeImageUrl) {
        theme = (
            <Image 
                source={{uri: baseUrl + themeImageUrl}}
                style={styles.themeImage}
                resizeMode="cover"
            />
        );
    } else {
        theme = (
            <Ionicons name="md-image" size={100} color={Colors.secondary} />
        );
    }

    return (
        <View style={styles.root}>
            <View style={styles.legendContainer}>
                <Text style={styles.legend}>Theme</Text>
            </View>
            <View style={styles.previewContainer}>
                {theme}
            </View>
            <View style={styles.buttonSection}>
                <TouchableWithoutFeedback onPress={chooseTheme}>
                    <Text style={styles.chooseThemeButton}>Choose Theme</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={selectCustomTheme}>
                    <Text style={styles.selectCustomThemeButton}>Select Custom Theme</Text>
                </TouchableWithoutFeedback>
            </View>
            <View style={{height: 50}}></View>
            <View style={styles.buttonContainer}>
                <ButtonTile 
                    title="done"
                    outlined
                    onPress={isAuth ? goBack : goToBio}
                />
            </View>
            {
                isAuth &&
                <View style={styles.skipContainer}>
                    <TouchableWithoutFeedback onPress={skip}>
                        <Text style={styles.skip}>
                            Skip
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            }
        </View>
    );
}

ThemeScreen.navigationOptions = navData => {
    return {
        headerTitle: () => null,
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    legendContainer: {
        marginBottom: 20,
        marginHorizontal: 10,
    },
    legend: {
        fontSize: 30,
        fontWeight: "700",
        color: Colors.dark,
    },
    previewContainer: {
        borderRadius: 5,
        borderWidth: 0.5,
        backgroundColor: Colors.milk,
        height: 250,
        width: "100%",
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    themeImage: {
        width: "100%",
        height: "100%",
    },
    buttonSection: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 40,
    },
    chooseThemeButton: {
        color: Colors.primary,
        fontSize: 17,
        marginBottom: 20,
    },
    selectCustomThemeButton: {
        color: Colors.blue,
        fontSize: 17,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    skipContainer: {
        marginVertical: 20,
        marginHorizontal: 40,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    skip: {
        fontSize: 16,
        color: Colors.blue,
    },
});

export default ThemeScreen;