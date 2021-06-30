import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ButtonTile from '../../common/components/UI/ButtonTile';
import ParaInputTile from '../../common/components/UI/ParaInputTile';

import Colors from '../../../constants/Colors';

import * as actions from '../store/index';
import * as authValidators from '../validators/AuthValidators';

const BioScreen = props => {
    const dispatch = useDispatch();

    const authBio = useSelector(state => state.ath.authBio);

    // input handlers
    const [bio, setBio] = useState("");

    // error handlers
    const [bioError, setBioError] = useState(null);

    const checkValidity = () => {
        let valid = true;
        const _bioError = authValidators.bioValidator(bio);
        if(_bioError) {
            valid = false;
            setBioError(_bioError);
        }
        return valid;
    }

    const goToSetPassword = () => {
        const isValid = checkValidity();
        if(isValid) {
            dispatch(actions.setBio(bio));
            props.navigation.navigate('setPassword');
        }
    }

    const skip = () => {
        props.navigation.navigate('setPassword');
    }

    return (
        <View style={styles.root}>
            <View style={styles.legendContainer}>
                <Text style={styles.legend}>Personal Bio</Text>
            </View>
            <ParaInputTile
                height={300}
                placeholder="Add your bio ..."
                value={bio}
                setValue={setBio}
                error={bioError}
            />
            <View style={styles.helperContainer}>
                <Text style={styles.helperText}>
                    You can add any personal informations and details in the bio section that you want to share with other people.
                </Text>
            </View>
            <View style={{height: 50}}></View>
            <View style={styles.buttonContainer}>
                <ButtonTile 
                    title="done"
                    outlined
                    onPress={goToSetPassword}
                />
            </View>
            <View style={styles.skipContainer}>
                <TouchableWithoutFeedback onPress={skip}>
                    <Text style={styles.skip}>
                        Skip
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

BioScreen.navigationOptions = navData => {
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
    bioContainer: {
        borderRadius: 5,
        backgroundColor: Colors.milk,
        height: 300,
        width: "100%",
        marginVertical: 20,
        padding: 10,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    bioInput: {
        backgroundColor: Colors.milk,
        borderBottomWidth: 0,
    },
    bioInputContainer: {
        borderBottomWidth: 0,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    helperContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    helperText: {
        fontSize: 16,
        textAlign: "center",
        color: Colors.secondary,
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

export default BioScreen;