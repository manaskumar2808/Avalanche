import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../../../constants/Colors';

import * as actions from '../store/index';

import ThemeData from '../data/ThemeData';

const WIDTH = Dimensions.get('window').width/3;
const HEIGHT = WIDTH;
const MARGIN = 2;

const ThemeSelectionScreen = props => {
    const dispatch = useDispatch();

    const setThemeIndex = (index) => {
        dispatch(actions.setThemeIndex(index));
        dispatch(actions.setThemeImage(null));
        props.navigation.goBack();
    }
    
    return (
        <View style={styles.root}>
            <FlatList 
                data={ThemeData}
                numColumns={3}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                    const themeContainerStyles = [styles.themeContainer];
                    if((index+1)%3 === 0) {
                        themeContainerStyles.push(styles.rightContainer);
                    } else if(index%3 === 0) {
                        themeContainerStyles.push(styles.leftContainer);
                    }
                    return (
                    <TouchableWithoutFeedback onPress={() => setThemeIndex(index)}>
                        <View style={themeContainerStyles}>
                            <Image 
                                source={item.source}
                                style={styles.theme}
                                resizeMode="cover"
                            />
                        </View>
                    </TouchableWithoutFeedback>
                )}}
            />
        </View>
    );
}

ThemeSelectionScreen.navigationOptions = navData => {
    return {
        headerShown: true,
        headerTitle: "Choose Theme",
        headerTitleStyle: {
            color: Colors.dark,
        },
        headerTitleAlign: "center",
        headerStyle: {
            backgroundColor: Colors.navBar,
        }
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.background,
        justifyContent: "space-between",
    },
    themeContainer: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: Colors.lightGrey,
        marginBottom: MARGIN,
    },
    leftContainer: {
        marginRight: MARGIN,
    },
    rightContainer: {
        marginLeft: MARGIN,
    },
    theme: {
        width: "100%",
        height: "100%",
    },
});

export default ThemeSelectionScreen;