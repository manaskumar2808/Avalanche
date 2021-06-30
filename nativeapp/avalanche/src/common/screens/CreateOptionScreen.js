import React from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Image, TouchableWithoutFeedback } from 'react-native';

import Colors from '../../../constants/Colors';

import FeedData from '../../Feed/data/FeedData';

const CreateOptionScreen = props => {
    const type = props.navigation.getParam('type');
    let backgroundSource;
    switch(type) {
        case 'feedMedia':
            backgroundSource = require('../../../assets/images/photoes/andre-benz-PpsgIw3iWZ4-unsplash.jpg');
            break;
        case 'projectMedia':
            break;
        case "chatMedia":
            backgroundSource = require('../../../assets/images/photoes/saffu-IwLV8c2XwVw-unsplash.jpg');
            break;
        case 'themeMedia':
            backgroundSource = require('../../../assets/images/photoes/jordan-steranka-64LL2fP9uXM-unsplash.jpg');
            break;
        case 'profileMedia':
            backgroundSource = require('../../../assets/images/photoes/neil-rosenstech-OxnhDqLcjU4-unsplash.jpg');
            break;
        case 'storyMedia':
            backgroundSource = require('../../../assets/images/photoes/jordan-steranka-64LL2fP9uXM-unsplash.jpg');
            break;
        default:
            backgroundSource = require('../../../assets/images/photoes/andre-benz-PpsgIw3iWZ4-unsplash.jpg');
            break;
    }

    const goToCamera = () => {
        props.navigation.replace('camera', {
            type: type,
        });
    }

    const goToGallery = () => {
        props.navigation.replace('gallery', {
            type: type,
        });
    }

    return (
        <View style={styles.root}>
            <ImageBackground 
                style={styles.backgroundImage}
                source={backgroundSource} 
                resizeMode="cover"
                blurRadius={3}
            >
                <View style={styles.optionContainer}>
                    <TouchableWithoutFeedback onPress={goToCamera}>
                        <Text style={styles.option}>Take photo</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Text style={styles.option}>Capture video</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={goToGallery}>
                        <Text style={styles.option}>Choose from gallery</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.previousUploadsContainer}>
                    <Text style={styles.legend}>Previous Uploads</Text>
                    <FlatList 
                        data={FeedData}
                        horizontal
                        keyExtractor={item => item.id}
                        renderItem={({item, index}) => (
                            <View style={styles.uploadContainer}>
                                <Image 
                                    source={{uri: item.imageUrl}}
                                    style={{width: "100%", height: "100%"}}
                                    resizeMode="cover"
                                />
                            </View>
                        )}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}


CreateOptionScreen.navigationOptions = navData => {
    return {
        headerTitle: () => null,
        headerTransparent: true,
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.dark,
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
    },
    optionContainer: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    option: {
        color: Colors.milk,
        fontSize: 18,
        marginVertical: 10,
    },
    uploadContainer: {
        borderRadius: 15,
        height: 70,
        width: 70,
        marginHorizontal: 10,
        overflow: "hidden",
    },
    previousUploadsContainer: {
        padding: 20,
        width: "100%",
    },
    legend: {
        fontSize: 18,
        color: "#fff",
        marginVertical: 10,
        marginHorizontal: 10,
    },
});

export default CreateOptionScreen;