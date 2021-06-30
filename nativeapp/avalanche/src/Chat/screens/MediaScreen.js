import React from 'react';
import Moment from 'moment';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ScalableImage from 'react-native-scalable-image';
import { Feather } from '@expo/vector-icons';

import BackIcon from '../../../Icons/BackIcon';
import Colors from '../../../constants/Colors';

import VideoView from '../../common/components/VideoView';



const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const MediaScreen = props => {
    const imageUrl = props.navigation.getParam('imageUrl');
    const videoUrl = props.navigation.getParam('videoUrl');
    const type = props.navigation.getParam('type') || 'image';

    console.log(type, videoUrl);

    let media;
    switch (type) {
        case "image":
            media = (
                <ScalableImage
                    source={{ uri: imageUrl }}
                    resizeMode="cover"
                    style={styles.image}
                    width={WIDTH}
                />
            );
            break;
        case "video":
            media = (
                <View style={{ width: WIDTH }}>
                    <VideoView
                        source={{ uri: videoUrl }}
                        width={WIDTH}
                        height={HEIGHT}
                    />
                </View>
            );
            break;
        default:
            break;
    }
    
    return (
        <View style={styles.root}>
            {/* <ImageBackground source={{uri: imageUrl}} blurRadius={4} resizeMode="cover" style={styles.backgroundImage}> */}
                {media}
            {/* </ImageBackground> */}
        </View>
    );
}

MediaScreen.navigationOptions = navData => {
    return {
        headerTitle: () => (
            <View style={{alignItems: "flex-start", justifyContent: "flex-start"}}>
                <Text style={{fontSize: 18, color: "#fff"}}>
                    Media
                </Text>
                <Text style={{fontSize: 14, color: Colors.lightGrey}}>
                    {Moment(navData.navigation.getParam('timestamp')).format("hh:mm")}
                </Text>
            </View>
        ), 
        headerTransparent: true,
        headerTitleAlign: "left",
        headerTitleStyle: {
            fontSize: 17,
            alignItems: "center",
            color: Colors.dark,
        },
        headerLeft: ({canGoBack, onPress}) => !canGoBack ? null : (
            <BackIcon color="#fff" onPress={onPress} />
        ),
        headerLeftContainerStyle: {
            marginLeft: 20,
        },
        headerRight: () => (
            <Feather name="more-horizontal" size={27} color="#fff" />
        ),
        headerRightContainerStyle: {
            marginRight: 20,
        }
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        flex: 1,
        width: WIDTH,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
    },
});

export default MediaScreen;