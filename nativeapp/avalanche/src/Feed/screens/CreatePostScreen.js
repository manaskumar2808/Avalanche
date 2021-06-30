import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

import BottomButtonTile from '../../common/components/UI/BottomButtonTile';

import * as actions from '../store/index';
import Colors from '../../../constants/Colors';

const CreatePostScreen = props => {
    const dispatch = useDispatch();
    
    const postGallery = useSelector(state => state.feed.postGallery);
    const postGalleryIds = useSelector(state => state.feed.postGalleryIds);
    const postTitle = useSelector(state => state.feed.postTitle);

    const [title, setTitle] = useState("");
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        setGallery(postGallery);
    }, [postGallery, postGalleryIds]);

    const goToCreateOption = () => {
        props.navigation.navigate('createOption', {
            type: 'feedMedia',
        });
    }

    const goToDescription = () => {
        dispatch(actions.addTitle(title));
        props.navigation.navigate('description');
    }

    return (
        <View style={styles.root}>
            <View style={styles.titleContainer}>
                <Input 
                    placeholder="Set Title..."
                    placeholderTextColor={Colors.lightGrey}
                    inputStyle={styles.titleInput}
                    inputContainerStyle={styles.titleInputContainer}
                    value={title}
                    onChangeText={setTitle}
                />
            </View>
            <View style={styles.mediaContainer}>
                {
                    gallery.map((item, index) => {
                        return (
                            <View style={styles.media} key={index}>
                                {
                                    item.type === "video" ?
                                    <Video 
                                        source={{uri: item.video.uri}}
                                        resizeMode="cover"
                                        style={styles.galleryItem}
                                        isMuted
                                        shouldPlay
                                    />
                                        :
                                    <Image 
                                        source={{uri: item.image.uri}}
                                        resizeMode="cover"
                                        style={styles.galleryItem}
                                    />
                                }
                            </View>
                        );
                    })
                }
                <TouchableWithoutFeedback onPress={goToCreateOption}>
                    <View style={styles.media}>
                        <Ionicons name="add-sharp" size={30} color={Colors.lightGrey} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <BottomButtonTile 
                title="Next"
                onPress={goToDescription}
            />
        </View>
    );
}


CreatePostScreen.navigationOptions = navData => {
    return {
        headerTitle: "Create Post",
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    titleContainer: {
        padding: 10,
    },
    titleInput: {
        paddingVertical: 10,
    },
    titleInputContainer: {
        borderBottomColor: Colors.lightGrey,
    },
    mediaContainer: {
        flex: 1,
        // paddingHorizontal: 10,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    media: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.milk,
        width: 80,
        height: 80,
        borderRadius: 15,
        overflow: "hidden",
        marginHorizontal: 20,
        marginBottom: 30,
    },
    galleryItem: {
        width: "100%",
        height: "100%",
    },  
});

export default CreatePostScreen;