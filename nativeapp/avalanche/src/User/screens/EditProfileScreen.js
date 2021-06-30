import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Feather } from '@expo/vector-icons';

import CircularProfileItem from '../../common/components/CircularProfileItem';
import AlertTile from '../../common/components/UI/AlertTile';
import InputTile from '../../common/components/UI/InputTile';
import ButtonTile from '../../common/components/UI/ButtonTile';

import EditIcon from '../../../Icons/EditIcon';

import baseUrl from '../../../constants/API';
import Colors from '../../../constants/Colors';

import * as actions from '../store/index';

import * as authValidators from '../../Auth/validators/AuthValidators';

const EditProfileScreen = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const currentUser = useSelector(state => state.usr.currentUser);

    const authProfileImage = useSelector(state => state.ath.authProfileImage);
    const authThemeImage = useSelector(state => state.ath.authThemeImage);
    const authThemeIndex = useSelector(state => state.ath.authThemeIndex);

    const [userName, setUserName] = useState(currentUser.userName);
    const [email, setEmail] = useState(currentUser.email);
    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [phoneNo, setPhoneNo] = useState(currentUser.phoneNo);
    const [age, setAge] = useState(currentUser.age);
    const [profileImageUrl, setProfileImageUrl] = useState(currentUser.profileImageUrl && baseUrl + currentUser.profileImageUrl);
    const [themeImageUrl, setThemeImageUrl] = useState(currentUser.themeImageUrl);
    const [themeIndex, setThemeIndex] = useState(currentUser.themeIndex);

    // error
    const [emailError, setEmailError] = useState(null);
    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);
    const [phoneNoError, setPhoneNoError] = useState(null);
    const [ageError, setAgeError] = useState(null);

    // utility
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if(authProfileImage) {
            setProfileImageUrl(authProfileImage.uri)
        }
        if(authThemeImage) {
            setThemeImageUrl(authThemeImage.uri);
        }
        if(authThemeIndex) {
            setThemeIndex(authThemeIndex)
        }
    }, [authProfileImage, authThemeImage, authThemeIndex]);

    const checkValidity = () => {
        let valid = true;

        const _emailError = authValidators.emailValidator(email);
        const _firstNameError = authValidators.firstNameValidator(firstName);
        const _lastNameError = authValidators.lastNameValidator(lastName);
        const _phoneNoError = authValidators.phoneNoValidator(phoneNo);
        const _ageError = authValidators.ageValidator(age);
        
        if(_emailError) {
            valid = false;
            setEmailError(_emailError);
        } 
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

        return valid;
    }

    const goToProfilePic = () => {
        props.navigation.navigate('createOption', {
            type: 'profileMedia',
        });
    }

    const editProfile = () => {
        const isValid = checkValidity();
        if(isValid) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('userName', userName);
            formData.append('email', email);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('phoneNo', phoneNo);
            formData.append('age', age);
            formData.append('profileImage', authProfileImage);
            formData.append('themeImage', authThemeImage);
            formData.append('themeIndex', themeIndex);
    
            dispatch(actions.updateUser(token, formData))
            .then(result => {
                setIsLoading(false);
                dispatch(actions.resetAuthParameters());
            })
            .catch(error => {
                setIsLoading(false);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            });
        }
    }

    return (
        <View style={styles.root}>
            <ScrollView>
                <View style={styles.form}>
                    <View style={styles.profileImageContainer}>
                        <CircularProfileItem 
                            imageUrl={profileImageUrl}
                            radius={70}
                        />
                        <View style={styles.editIconContainer}>
                            <EditIcon 
                                color={Colors.primary}
                                onPress={goToProfilePic}
                            />
                        </View>
                    </View>
                    <InputTile 
                        placeholder="Your email"
                        value={email}
                        setValue={setEmail}
                    />
                    <View style={styles.inputSection}>
                        <View style={styles.inputContainer}>
                            <InputTile 
                                placeholder="First Name"
                                value={firstName}
                                setValue={setFirstName}
                                error={firstNameError}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <InputTile 
                                placeholder="Last Name"
                                value={lastName}
                                setValue={setLastName}
                                error={lastNameError}
                            />
                        </View>
                    </View>
                    <InputTile 
                        placeholder="Phone No."
                        value={phoneNo}
                        setValue={setPhoneNo}
                        error={phoneNoError}
                    />
                    <InputTile 
                        placeholder="Age"
                        value={age.toString()}
                        setValue={setAge}
                        error={ageError}
                    />
                    <View style={{height: 20}}></View>
                    <ButtonTile 
                        title="Save Changes"
                        onPress={editProfile}
                        isLoading={isLoading}
                    />
                </View>
            </ScrollView>
            {
                showErrorModal &&
                <AlertTile 
                    title="Update User Error"
                    message={errorMessage}
                    buttonText="Okay"
                    onPress={() => setShowErrorModal(false)}
                    close={() => setShowErrorModal(false)}
                />
            }
        </View>
    );
}

EditProfileScreen.navigationOptions = navData => {
    return {
        headerTitle: "Edit Profile",
        headerRight: () => (
            <Feather name="more-horizontal" size={28} color={Colors.secondary} onPress={() => navData.navigation.navigate('editOption')} />
        ),
        headerRightContainerStyle: {
            marginHorizontal: 20,
        },
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    form: {
        alignItems: "center",
    },
    profileImageContainer: {
        position: "relative",
        marginBottom: 20,
    },
    editIconContainer: {
        position: "absolute",
        bottom: -5,
        right: -5,
    },
    inputSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    inputContainer: {
        width: "49%",
    },
});

export default EditProfileScreen;