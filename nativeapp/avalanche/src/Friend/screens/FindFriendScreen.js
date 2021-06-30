import * as React from 'react';
import {
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';

import { UIActivityIndicator } from 'react-native-indicators';
import { Feather, AntDesign } from '@expo/vector-icons';

import Colors from '../../../constants/Colors';
import axios from '../../../axios-config';
import header from '../../../constants/Header';
import baseUrl from '../../../constants/API';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.86;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const FindFriendScreen = props => {
  const token = useSelector(state => state.ath.token);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [suggestions, setSuggestions] = React.useState([]);

  // utility
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    axios.get('suggestion/friend', header(token))
    .then(response => {
      setSuggestions(response.data.suggestions);
      setIsLoading(false);
    })
    .catch(error => {
      console.log('suggestion error  : ',error.message);
      setIsLoading(false);
    });
  }, []);

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
    <View style={styles.container}>
      <Animated.FlatList 
        data={suggestions}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{
            nativeEvent: {
              contentOffset: {
                x: scrollX,
              }
            }
          }], 
          {
            useNativeDriver: true,
          }
        )}
        renderItem={(itemData) => {
          const inputRange = [
            (itemData.index - 1)*width,
            itemData.index*width,
            (itemData.index+1)*width,
          ];

          const translateX = scrollX.interpolate({
            inputRange: inputRange,
            outputRange: [
              -width*0.7, 0, width*0.7,
            ]
          });
          return (
            <View style={{ width, justifyContent: "center", alignItems: "center" }}>
              <View style={{
                borderRadius: 18,
                borderColor: "#fff",
                shadowColor: "#000",
                shadowOpacity: 1,
                shadowRadius: 20,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                elevation: 12,
                backgroundColor: "#fff",
              }} >
                <View style={{
                    position: "relative",
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    overflow: "hidden",
                    alignItems: "center",
                    borderRadius: 18,
                }}>
                  <Animated.Image 
                    source={{uri: baseUrl + itemData.item.profileImageUrl}}
                    style={{
                      width: ITEM_WIDTH*1.4,
                      height: ITEM_HEIGHT,
                      resizeMode: "cover",
                      transform: [
                        {
                          translateX: translateX,
                        },
                      ]
                    }}
                  />
                    <View style={styles.profileInfo}>
                        <BlurView intensity={75} tint="dark" blueRadius={1} style={{width: "100%", flexDirection: "row", padding: 20}}>
                            <View style={styles.userNameContainer}>
                                <Text style={styles.name}>
                                    {itemData.item.firstName}{' '}{itemData.item.lastName}
                                </Text>
                                <Text style={styles.userName}>
                                    @{itemData.item.userName}
                                </Text>
                            </View>
                            <View style={styles.infoSection}>
                                <View style={{...styles.infoContainer, borderRightWidth: 0.5, borderRightColor: "#fff"}}>
                                    <Text style={styles.profileCount}>120</Text>
                                    <Text style={styles.profileCountLabel}>Friends</Text>
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.profileCount}>570</Text>
                                    <Text style={styles.profileCountLabel}>Followers</Text>
                                </View>
                            </View> 
                        </BlurView>
                    </View>
                </View>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.buttonSection}>
           <View style={styles.checkButton}>
                <Feather name="check" size={24} color="#fff" />
           </View>
           <View style={styles.crossButton}>
                <AntDesign name="close" size={24} color="#fff" />
           </View>
      </View>
    </View>
  );
}


FindFriendScreen.navigationOptions = navData => {
    return {
        headerTitle: "Find Friends",
        headerRight: () => (
            <Feather name="more-horizontal" size={28} color={Colors.secondary} />
        ),
        headerRightContainerStyle: {
            marginHorizontal: 20,
        }
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.background,
  },
  loaderContainer: {
      flex: 1,
      backgroundColor: Colors.background,
      justifyContent: "center",
      alignItems: "center",
  },
  profileInfo: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,.5)",
  },
  userNameContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    color: "#fff",
  },
  name: {
    fontSize: 18,
    color: "#fff",
  },
  infoSection: {
    flexDirection: "row",
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  profileCount: {
    color: "#fff",
    fontSize: 16,
  },
  profileCountLabel: {
    color: "#fff",
    fontSize: 14,
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 30,
  },
  checkButton: {
    borderRadius: 30,
    height: 60,
    width: 60,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  crossButton: {
    borderRadius: 30,
    height: 60,
    width: 60,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});

export default FindFriendScreen;