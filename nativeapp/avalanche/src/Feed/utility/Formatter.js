import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Colors from '../../../constants/Colors';

const FONT_SIZE = 15;

const FORMATTER = text => {
  const words = text.split(' ');
  const formattedText = [];

  for(let key in words) {
      const word = words[key];
      let formattedWord;
      if(word.startsWith('@')) {
        formattedWord = (
          <Text style={styles.userName} key={key}>
            {word}
          </Text>
        );
      } else if(word.startsWith('#')) {
        formattedWord = (
          <Text style={styles.hashTag} key={key}>
            {word}
          </Text>
        );
      } else {
        formattedWord = (
          <Text style={styles.normal} key={key}>
            {word}
          </Text>
        );
      }

      formattedText.push(formattedWord, ' ');
  }


  return formattedText;
}

const styles = StyleSheet.create({
  userName: {
    color: Colors.primary,
    fontSize: FONT_SIZE,
  },
  hashTag: {
    color: Colors.blue,
    fontSize: FONT_SIZE,
  },
  normal: {
    color: Colors.dark,
    fontSize: FONT_SIZE,
  }
});


export default FORMATTER;