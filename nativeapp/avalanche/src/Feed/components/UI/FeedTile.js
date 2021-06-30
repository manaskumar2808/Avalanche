import React, { useEffect, useState } from 'react';
import axios from '../../../../axios-config';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import { Input, Button, BottomSheet } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Video } from 'expo-av';
import { RFValue } from 'react-native-responsive-fontsize';
import Carousel from 'react-native-snap-carousel';
import ScalableImage from 'react-native-scalable-image';
import { Feather, FontAwesome } from '@expo/vector-icons';

import { UIActivityIndicator } from 'react-native-indicators';

import CircularProfileItem from '../../../common/components/CircularProfileItem';

import * as actions from '../../store/index';
import * as friendActions from '../../../Friend/store/index';

import CommentIcon from '../../../../Icons/CommentIcon';
import HeartOpenIcon from '../../../../Icons/HeartOpenIcon';
import HeartFillIcon from '../../../../Icons/HeartFillIcon';
import VisibleIcon from '../../../../Icons/VisibleIcon';

import FORMATTER from '../../utility/Formatter';

import baseUrl from '../../../../constants/API';
import header from '../../../../constants/Header';
import Colors from '../../../../constants/Colors';

import BottomButtonTile from '../../../common/components/UI/BottomButtonTile';
import VideoView from '../../../common/components/VideoView';
import ShareItemTile from './ShareItemTile';

const WIDTH = Dimensions.get('window').width;
const IMAGE_WIDTH = WIDTH * (20 / 20);
const BORDER_RADIUS = 0;

const FeedTile = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const userId = useSelector(state => state.ath.userId);
    const friends = useSelector(state => state.frd.friends);

    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    // utility
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [bottomModalIsLoading, setBottomModalIsLoading] = useState(false);
    const [bottomModalError, setBottomModalError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetchLike();
        fetchCommentsCount();
        fetchIsSaved();
    }, []);
    
    const fetchLike = () => {
        axios.get('like/likes/feed/'+props.feedId, header(token))
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setLikeCount(response.data.count);
            return axios.get('like/isliked/feed/'+props.feedId, header(token));
        })
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setIsLiked(response.data.isliked);
        })
        .catch(error => {
            setShowError(true);
            setErrorMessage(error.message);
        });
    }

    const fetchIsSaved = () => {
        axios.get('save/issaved/feed/'+props.feedId, header(token))
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setIsSaved(response.data.issaved);
        })
        .catch(error => {
            setShowError(true);
            setErrorMessage(error.message);
        });
    }

    const fetchCommentsCount = () => {
        axios.get('comment/'+props.feedId+'/parent/feed/count', header(token))
        .then(response => {
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            setCommentCount(response.data.count);
        })
        .catch(error => {
            setShowError(true);
            setErrorMessage(error.message);
        });
    }


    const fetchFriends = () => {
        setBottomModalIsLoading(true);
        dispatch(friendActions.fetchFriends(token, userId))
        .then(result => {
            setBottomModalIsLoading(false);
        })  
        .catch(error => {
            setBottomModalError(error.message);
            setBottomModalIsLoading(false);
        });
    }

    const like = () => {
        if(isLiked) {
            setIsLiked(false);
            setLikeCount(prevState => prevState - 1);
            axios.delete('like/unlike/feed/'+props.feedId, header(token))
            .then(response => {
                console.log(response.data);
            }) 
            .catch(error => {
                setIsLiked(true);
                setLikeCount(prevState => prevState + 1);
            });
        } else {
            setIsLiked(true);
            setLikeCount(prevState => prevState + 1);
            const likeData = {
                feedId: props.feedId,
                parent: "feed",
            }
            axios.post('like/like', likeData, header(token))
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                setIsLiked(false);
                setLikeCount(prevState => prevState - 1);
            });
        }
    }

    const save = () => {
        if(isSaved) {
            setIsSaved(false);
            axios.delete('save/unsave/feed/'+props.feedId, header(token))
            .then(response => {
                console.log(response.data);
            }) 
            .catch(error => {
                setIsSaved(true);
            });
        } else {
            setIsSaved(true);
            const saveData = {
                feedId: props.feedId,
                parent: "feed",
            }
            axios.post('save/save', saveData, header(token))
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                setIsSaved(false);
            });
        }
    }

    const openBottomSheet = () => {
        setBottomSheetVisible(true);
        fetchFriends();
    }

    let mediaContent = null;
    if(props.gallery.length > 1) {
        mediaContent = (
            <Carousel 
                data={props.gallery}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.feedMedia}>
                            {
                                item.type === 'video' ? 
                                <VideoView
                                    source={{uri: baseUrl + item.videoUrl}}
                                    style={styles.video}
                                    resizeMode="cover"
                                />
                                    :
                                <Image 
                                    source={{uri: baseUrl + item.imageUrl}}
                                    style={styles.image}
                                    width={IMAGE_WIDTH}
                                />
                            }
                        </View>
                    );
                }}
                sliderWidth={WIDTH}
                itemWidth={IMAGE_WIDTH}
            />
        );
    } else {
        mediaContent = (
            <View style={styles.feedMedia}>
                {
                    props.gallery[0].type === 'video' ? 
                    <VideoView
                        source={{uri: baseUrl + props.gallery[0].videoUrl}}
                        style={styles.video}
                        resizeMode="cover"
                    />
                        :
                    <ScalableImage
                        source={{uri: baseUrl + props.gallery[0].imageUrl}}
                        style={styles.image}
                        width={IMAGE_WIDTH}
                    />
                }
            </View>
        );
    }

    return (
        <View style={styles.root}>
            <View style={styles.feedHeader}>
                <CircularProfileItem 
                    imageUrl={baseUrl + props.profileImageUrl}
                    radius={20}
                    onPress={props.goToProfileView}
                />
                <View style={styles.userNameContainer}>
                    <TouchableWithoutFeedback onPress={props.goToProfileView}>
                        <View>
                            <Text style={styles.userName}>
                                {props.userName}
                            </Text>
                            <Text style={styles.title}>
                                {props.title}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {
                    props.isDetail ? 
                    <Button 
                        title="Following"
                        type="outline"
                        buttonStyle={styles.followButton}
                        titleStyle={{color: Colors.secondary}}
                    />
                     : 
                    <View style={styles.moreContainer}>
                        <Feather name="more-horizontal" size={24} color={Colors.secondary} onPress={openBottomSheet} />
                    </View>
                }
            </View>
            <View style={styles.feedMediaContainer}>
                {mediaContent}
            </View>
            <View style={styles.feedFooter}>
                <View style={styles.iconContainer}>
                    {
                        isLiked ? 
                        <HeartFillIcon color={Colors.danger} onPress={like} />
                        :
                        <HeartOpenIcon color={Colors.secondary} onPress={like} />
                    }
                    <Text style={styles.iconCount}>
                        {likeCount}
                    </Text>
                </View>
                <View style={styles.iconContainer}>
                    <CommentIcon color={Colors.secondary} onPress={props.goToComments} />
                    <Text style={styles.iconCount}>
                        {commentCount}
                    </Text>
                </View>
                <View style={styles.iconContainer}>
                    <VisibleIcon color={Colors.secondary} onPress={props.goToDetail} />
                    <Text style={styles.iconCount}>0</Text>
                </View>
                <View style={{flex: 1}}></View>
                <View style={styles.iconContainer}>
                    {
                        isSaved ? 
                        <FontAwesome name="bookmark" size={23} color={Colors.dark} onPress={save} style={{marginRight: 5}} />
                        :
                        <FontAwesome name="bookmark-o" size={23} color={Colors.secondary} onPress={save} style={{marginRight: 5}} />
                    }
                </View>
            </View>
            <View style={styles.timestampContainer}>
                <Text style={styles.timestamp}>
                    {moment(props.timestamp).fromNow()}
                </Text>
            </View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                    <Text style={styles.descriptor}>{props.userName}</Text>
                    {'  '}{FORMATTER(props.description)}
                </Text>
            </View>

            { props.isDetail && <Input 
                inputStyle={styles.commentInput}
                inputContainerStyle={styles.commentInputContainer}
                placeholder="Comment"
                placeholderTextColor={Colors.lightGrey}
            />}
            <BottomSheet isVisible={bottomSheetVisible}>
                {
                    bottomModalIsLoading ? 
                    <View style={styles.bottomModalLoaderContainer}>
                        <UIActivityIndicator 
                            size={25}
                            color={Colors.primary}
                        />
                    </View>
                    :
                    <View style={styles.bottomSheet}>
                        <View style={styles.bottomSheetFeedPreview}>
                            <View style={styles.feedPreviewContainer}>
                                {
                                    props.gallery[0].type == 'video' ? 
                                    <Video 
                                        source={{ uri: baseUrl + props.gallery[0].videoUrl }}
                                        style={styles.feedPreviewImage}
                                        resizeMode="cover"
                                        shouldPlay
                                    />
                                    :
                                    <Image 
                                        source={{uri: baseUrl + props.gallery[0].imageUrl}}
                                        style={styles.feedPreviewImage}
                                        resizeMode="cover"
                                    />
                                }
                            </View>
                            <View style={styles.shareLegendContainer}>
                                <Text style={styles.shareLegend}>
                                    Forward feed to ...
                                </Text>
                            </View>
                        </View>
                        <ScrollView>
                            {
                                friends.map((item, index) => {
                                    return (
                                        <ShareItemTile 
                                            key={item.id}
                                            item={item}
                                            gallery={props.gallery}
                                            feedId={props.feedId}
                                            creator={{
                                                userName: props.userName,
                                                profileImageUrl: props.profileImageUrl,
                                            }}
                                            description={props.description}
                                        />
                                    )
                                })
                            }
                        </ScrollView> 
                        <BottomButtonTile 
                            title="Done"
                            onPress={() => setBottomSheetVisible(false)}
                        />
                    </View>
                }
            </BottomSheet>
        </View>
    );
}


FeedTile.propTypes = {
    feedId: PropTypes.string,
    imageUrl: PropTypes.string,
    userName: PropTypes.string,
    profileImageUrl: PropTypes.string,
    title: PropTypes.string,
    gallery: PropTypes.array,
    description: PropTypes.string,
    timestamp: PropTypes.string,
    isDetail: PropTypes.bool,
    goToDetail: PropTypes.func,
    goToProfileView: PropTypes.func,
    goToComments: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: 0,
        width: "100%",
    },
    feedHeader: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
    },
    userNameContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    userName: {
        fontSize: RFValue(16),
        color: Colors.dark,
        fontWeight: "600"
    },
    moreContainer: {

    },
    feedMediaContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    feedMedia: {
        width: IMAGE_WIDTH,
    },
    image: {
        borderRadius: BORDER_RADIUS,
        height: 500,
        width: "100%",
        backgroundColor: Colors.lightGrey,
    },
    video: {
        borderRadius: BORDER_RADIUS,
        height: 500,
        width: "100%",
        backgroundColor: Colors.lightGrey,
    },
    feedFooter: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        paddingHorizontal: 7,
        marginVertical: 5,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 5,
    },
    iconCount: {
        color: Colors.secondary,
        fontSize: RFValue(14),
        marginBottom: 5,
        fontWeight: "700"
    },
    descriptionContainer: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    descriptor: {
        fontSize: RFValue(15),
        fontWeight: "700",
        color: Colors.dark,
    },
    description: {
        fontSize: RFValue(15),
    },
    commentInputContainer: {
        borderRadius: 10,
        backgroundColor: Colors.milk,
        paddingHorizontal: 20,
        borderBottomWidth: 0,
    },
    commentInput: {
        
    },
    title: {
        fontSize: 13,
        color: Colors.secondary,
    },
    timestampContainer: {
        marginHorizontal: 15,
        marginBottom: 5,
        justifyContent: "center",
    },
    timestamp: {
        color: Colors.secondary,
    },
    followButton: {
        borderRadius: 20,
        borderColor: Colors.secondary,
        paddingVertical: 5,
        paddingHorizontal: 25,
    },
    bottomSheet: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.background,
        overflow: "hidden",
    },
    bottomModalLoaderContainer: {
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    shareItem: {
        flexDirection: "row",
        marginVertical: 10,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    shareItemUserNameContainer: {
        flex: 1,
        justifyContent: "center",
    },
    shareItemUserName: {
        fontSize: RFValue(15),
    },
    bottomSheetFeedPreview: {
        flexDirection: "row",
        padding: 20,
        borderBottomWidth: 0.5,
        backgroundColor: Colors.milk,
    },
    feedPreviewContainer: {
        height: 40,
        width: 40,
        borderRadius: 5,
        alignItems: "center",
        overflow: "hidden",
    },
    feedPreviewImage: {
        width: "100%",
        height: "100%",
    },
    shareLegendContainer: {
        flex: 1,
        marginHorizontal: 10,
        justifyContent: "center",
    },
    shareLegend: {
        fontSize: RFValue(17),
        color: Colors.secondary,
    },
});

export default FeedTile;