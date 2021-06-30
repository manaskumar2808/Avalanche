import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

import Colors from '../../../constants/Colors';

const CircularProfileItem = props => {
    return (
        <View style={styles.root}>
            <TouchableWithoutFeedback onPress={props.onPress}>
                <Image 
                    source={{uri: props.imageUrl}}
                    resizeMode="cover"
                    style={{...styles.image, width: props.radius*2, height: props.radius*2, borderRadius: props.radius}}
                />
            </TouchableWithoutFeedback>
        </View>
    );
}

CircularProfileItem.defaultProps = {
    haveBorder: false,
    onPress: PropTypes.func,
}

CircularProfileItem.propTypes = {
    imageUrl: PropTypes.string,
    radius: PropTypes.number.isRequired,
    haveBorder: PropTypes.bool,
}

const styles = StyleSheet.create({
    root: {
        overflow: "hidden",
    },
    image: {
        backgroundColor: Colors.lightGrey,
    },
});

export default CircularProfileItem;