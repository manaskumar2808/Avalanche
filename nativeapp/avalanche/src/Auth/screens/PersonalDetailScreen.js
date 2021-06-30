import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../../constants/Colors';

import UserAddIcon from '../../../Icons/UserAddIcon';

import InputTile from '../../common/components/UI/InputTile';
import CircularProfileItem from '../../common/components/CircularProfileItem';

import * as authValidators from '../validators/AuthValidators';
import * as actions from '../store/index';
import ButtonTile from '../../common/components/UI/ButtonTile';

const PersonalDetailScreen = props => {
    const dispatch = useDispatch();
    const authProfileImage = useSelector(state => state.ath.authProfileImage);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [age, setAge] = useState(null);
    const [profileImage, setProfileImage] = useState(null);


    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);
    const [phoneNoError, setPhoneNoError] = useState(null);
    const [ageError, setAgeError] = useState(null);
    const [profileImageError, setProfileImageError] = useState(null);

    useEffect(() => {
        if(authProfileImage) {
            setProfileImage(authProfileImage);
        }
    }, [authProfileImage]);


    const checkValidity = () => {
        let valid = true;
        const _firstNameError = authValidators.firstNameValidator(firstName);
        const _lastNameError = authValidators.lastNameValidator(lastName);
        const _phoneNoError = authValidators.phoneNoValidator(phoneNo);
        const _ageError = authValidators.ageValidator(age);
        const _profileImageError = authValidators.profileImageValidator(profileImage);

        if(_firstNameError) {
            valid = false;
            setFirstNameError(_firstNameError);
        }
        if(_lastNameError) {
            valid = false;
            setLastNameError(_lastNameError);
        }
        if(_phoneNoError) {
            valid = false;
            setPhoneNoError(_phoneNoError);
        }
        if(_ageError) {
            valid = false;
            setAgeError(_ageError);
        } 
        if(_profileImageError) {
            valid = false;
            setProfileImageError(_profileImageError);
        }

        return valid;
    }

    const goToTheme = () => {
        const isValid = checkValidity();
        if(isValid) {
            dispatch(actions.setProfileInfo(firstName, lastName, phoneNo, age));
            props.navigation.navigate('theme');
        }
    }

    const skip = () => {
        props.navigation.navigate('theme');
    }

    const goToCreateOption = () => {
        props.navigation.navigate('createOption', {
            type: "profileMedia",
        });
    }

    return (
        <View style={styles.root}>
            <ScrollView>
                <View style={styles.legendContainer}>
                    <Text style={styles.legend}>Personal Details</Text>
                </View>
                <View style={styles.profilePicSection}>
                    <View style={styles.profilePicContainer}>
                        {
                            profileImage ? 
                            <CircularProfileItem 
                                imageUrl={profileImage.uri}
                                radius={75}
                            /> :
                            <UserAddIcon color={Colors.secondary} onPress={goToCreateOption} />
                        }
                    </View>
                </View>
                <View style={styles.inlineInputContainer}>
                    <View style={styles.inlineInput}>
                        <InputTile 
                            placeholder="First Name"
                            value={firstName}
                            setValue={setFirstName}
                            error={firstNameError}
                        />
                    </View>
                    <View style={styles.inlineInput}>
                        <InputTile 
                            placeholder="Last Name"
                            value={lastName}
                            setValue={setLastName}
                            error={lastNameError}
                        />
                    </View>
                </View>
                <InputTile 
                    placeholder="Phone"
                    value={phoneNo}
                    setValue={setPhoneNo}
                    error={phoneNoError}
                    keyboardType="phone-pad"
                />
                <InputTile 
                    placeholder="Age"
                    value={age}
                    setValue={setAge}
                    error={ageError}
                    keyboardType="number-pad"
                />
                <View style={styles.buttonContainer}>
                    <ButtonTile 
                        title="done"
                        outlined
                        onPress={goToTheme}
                    />
                </View>
                <View style={styles.skipContainer}>
                    <TouchableWithoutFeedback onPress={skip}>
                        <Text style={styles.skip}>
                            Skip
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
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
    buttonContainer: {
        marginTop: 30,
        width: "100%",
        alignItems: "center",
    },
    profilePicSection: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    profilePicContainer: {
        borderRadius: 100,
        height: 150,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.milk,
        borderWidth: 0.5,
    },
    inlineInputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inlineInput: {
        width: "49%",
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

export default PersonalDetailScreen;