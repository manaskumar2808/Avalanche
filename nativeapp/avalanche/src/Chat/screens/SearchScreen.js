import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Input } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { UIActivityIndicator } from 'react-native-indicators';

import SearchIcon from '../../../Icons/SearchIcon';

import AlertTile from '../../common/components/UI/AlertTile';
import ProfileTile from '../../User/components/UI/ProfileTile';

import * as actions from '../store/index';
import * as userActions from '../../User/store/index';

import Colors from '../../../constants/Colors';

const SearchScreen = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const userId = useSelector(state => state.ath.userId);

    const users = useSelector(state => state.usr.users);

    //  utility
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const goToProfileView = (userId) => {
        props.navigation.navigate('profileView', {
            userId,
        });
    }

    const fetchUsers = () => {
        dispatch(userActions.fetchUsers(token, userId))
        .then(result => {
            setIsLoading(false);
            setErrorMessage(null);
            setShowErrorModal(false);
        })
        .catch(error => {
            setIsLoading(false);
            setErrorMessage(error.message);
            setShowErrorModal(true);
        });
    }

    if(isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <UIActivityIndicator 
                    color={Colors.primary}
                    size={30}
                />
            </View>
        );
    }


    return (
        <View style={styles.root}>
            <FlatList 
                data={users}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                    <ProfileTile 
                        user={item}
                        onPress={() => goToProfileView(item.id)}
                    />
                )}
                ListHeaderComponent={() => (
                    <View style={styles.searchContainer}>
                        <Input 
                            placeholder="People"
                            inputStyle={styles.searchInput}
                            inputContainerStyle={styles.searchInputContainer}
                            placeholderTextColor={Colors.secondary}
                            leftIcon={() => (
                                <SearchIcon 
                                    color={Colors.secondary}
                                />
                            )}
                        />
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
            {
                showErrorModal &&
                <AlertTile 
                    title="Search Error"
                    message={errorMessage}
                    buttonText="Okay"
                    close={() => setShowErrorModal(false)}
                    onPress={() => setShowErrorModal(false)}
                />
            }
        </View>
    );
}

SearchScreen.navigationOptions = navData => {
    return {
        headerTitle: "Search",
        headerRight: () => (
            <Feather name="more-horizontal" size={27} color={Colors.secondary} />
        ),
        headerRightContainerStyle: {
            marginRight: 20,
        },
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 10,
    },
    loaderContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    searchContainer: {
        width: "100%",
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    searchInput: {

    },
    searchInputContainer: {
        backgroundColor: Colors.milk,
        borderRadius: 10,
        borderBottomWidth: 0,
    },
});

export default SearchScreen;