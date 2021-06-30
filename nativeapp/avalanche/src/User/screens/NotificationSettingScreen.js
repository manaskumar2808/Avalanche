import React, { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { CheckBox } from 'react-native-elements';

import Colors from '../../../constants/Colors';

const NotificationSettingScreen = props => {
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);

    return (
        <View style={styles.root}>
            <View style={styles.checkContainer}>
                <View style={styles.checkTextContainer}>
                    <Text style={styles.checkText}>
                        Notify if any user likes my content
                    </Text>
                </View>
                <View style={styles.check}>
                    <CheckBox 
                        checked={check1}
                        checkedColor={Colors.primary}
                        onPress={() => setCheck1(prevState => !prevState)}
                    />
                </View>
            </View>
            <View style={styles.checkContainer}>
                <View style={styles.checkTextContainer}>
                    <Text style={styles.checkText}>
                        Notify if any user comments on my content
                    </Text>
                </View>
                <View style={styles.check}>
                    <CheckBox 
                        checked={check2}
                        checkedColor={Colors.primary}
                        onPress={() => setCheck2(prevState => !prevState)}
                    />
                </View>
            </View>
            <View style={styles.checkContainer}>
                <View style={styles.checkTextContainer}>
                    <Text style={styles.checkText}>
                        Notify if any user follows me
                    </Text>
                </View>
                <View style={styles.check}>
                    <CheckBox 
                        checked={check3}
                        checkedColor={Colors.primary}
                        onPress={() => setCheck3(prevState => !prevState)}
                    />
                </View>
            </View>
            <View style={styles.checkContainer}>
                <View style={styles.checkTextContainer}>
                    <Text style={styles.checkText}>
                        Notify if any user sends me a friend request
                    </Text>
                </View>
                <View style={styles.check}>
                    <CheckBox 
                        checked={check4}
                        checkedColor={Colors.primary}
                        onPress={() => setCheck4(prevState => !prevState)}
                    />
                </View>
            </View>
        </View>
    );
}

NotificationSettingScreen.navigationOptions = navData => {
    return {
        headerTitle: "Notifications",
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 10,
    },
    checkContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15,
    },
    checkTextContainer: {
        width: "70%",
    },
    check: {
        width: "30%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 0,
    },
    checkText: {
        fontSize: 17,
        color: Colors.secondary,
    },
    checkIcon: {
        backgroundColor: Colors.milk,
        borderWidth: 0.5,
    },
});

export default NotificationSettingScreen;