import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    ImageBackground,
} from 'react-native';

import ButtonTile from '../../common/components/UI/ButtonTile';
import CarouselIndicatorTile from '../components/UI/CarouselIndicatorTile';


const GuestScreen = props => {
    const [carouselIndex, setCarouselIndex] = useState(0);

    useEffect(() => {
        changeCarousel();
    }, [carouselIndex]);

    const goToLogin = () => {
        props.navigation.navigate('login');
    }

    const goToSignup = () => {
        props.navigation.navigate('signup');
    }

    const background = [
        {
            id: "b1",
            index: 0,
            imageBackground: require('../../../assets/images/guest-screen/dan-silva-PxX9ssopXtI-unsplash.jpg'),
        },
        {
            id: "b2",
            index: 1,
            imageBackground: require('../../../assets/images/guest-screen/success-846055_1920.jpg'),
        },
        {
            id: "b3",
            index: 2,
            imageBackground: require('../../../assets/images/guest-screen/ted-bryan-yu-5mezpWin6T8-unsplash.jpg'),
        },
        {
            id: "b4",
            index: 3,
            imageBackground: require('../../../assets/images/guest-screen/matthieu-petiard-Pf6e3o0GL4M-unsplash.jpg'),
        },
    ];

    const changeCarousel = () => {
        setTimeout(() => {
            if(carouselIndex < 3) {
                setCarouselIndex(prevState => prevState + 1);
            } else {
                setCarouselIndex(0);
            }
        }, 5000);
    }

    return (
        <View style={styles.root}>
            <ImageBackground source={background[carouselIndex].imageBackground} fadeDuration={1000} resizeMode="cover" style={styles.content} imageStyle={styles.imageStyle}>
                <View style={styles.loginButtonContainer}>
                    <TouchableWithoutFeedback onPress={goToLogin}>
                        <Text style={styles.loginButton}>Log in</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.mainSection}>

                </View>
                <View style={styles.getStartedContainer}>
                    <ButtonTile 
                        title="Get Started"
                        onPress={goToSignup}
                    />
                </View>
                <View style={styles.carouselIndicatorContainer}>
                    <CarouselIndicatorTile 
                        index={carouselIndex}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}


GuestScreen.navigationOptions = navData => {
    return {
        headerShown: false,
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
    },
    content: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#000",
        padding: 20,
    },
    imageStyle: {

    },
    loginButtonContainer: {
        flex: 4,
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    loginButton: {
        color: "#fff",
        fontSize: 17,
        marginLeft: 20,
    },
    mainSection: {
        flex: 14,
    },
    getStartedContainer: {
        flex: 2,
    },
    carouselIndicatorContainer: {
        flex: 2,
        justifyContent: "center",
    },
});

export default GuestScreen;