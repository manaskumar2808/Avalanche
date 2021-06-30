import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Colors from '../../../../constants/Colors';

const INDICATOR_RADIUS = 5;
const MARGIN_HORIZONTAL = 5;

const CarouselIndicatorTile = props => {
    const Indicator = indicatorProps => (
        <View style={indicatorProps.active ? styles.activeIndicator : styles.indicator}>
            
        </View>
    );

    return (
        <View style={styles.root}>
            <Indicator active={props.index === 0} />
            <Indicator active={props.index === 1} />
            <Indicator active={props.index === 2} />
            <Indicator active={props.index === 3} />
        </View>
    );
}

CarouselIndicatorTile.defaultProps = {
    initialIndex: 0,
    index: 0,
}

CarouselIndicatorTile.propTypes = {
    count: PropTypes.number,
    index: PropTypes.number,
    initialIndex: PropTypes.number,
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    indicator: {
        borderRadius: INDICATOR_RADIUS,
        height: INDICATOR_RADIUS*2,
        width: INDICATOR_RADIUS*2,
        backgroundColor: "#fff",
        marginHorizontal: MARGIN_HORIZONTAL,
    }, 
    activeIndicator: {
        borderRadius: INDICATOR_RADIUS,
        height: INDICATOR_RADIUS*2,
        width: INDICATOR_RADIUS*2,
        backgroundColor: Colors.primary,
        marginHorizontal: MARGIN_HORIZONTAL,
    }, 
});

export default CarouselIndicatorTile;