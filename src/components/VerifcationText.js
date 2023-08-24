import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {colors} from '../constants';

const VerificationText = ({onNext, onPrev, ...rest}, ref) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      setText('');
    },
  }));

  const handleTextChange = inputText => {
    setText(inputText);

    if (inputText !== '') {
      if (inputText.length === 1 && onNext) {
        onNext();
      }
    } else if (onPrev) {
      onPrev();
    }
  };

  const handleKeyPress = ({nativeEvent}) => {
    if (nativeEvent.key === 'Backspace' && text === '' && onPrev) {
      onPrev();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.text}
        value={text}
        onChangeText={handleTextChange}
        onKeyPress={handleKeyPress}
        maxLength={1}
        keyboardType="numeric"
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '16.8%',
    height: 54,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.lightBlack,
    textAlign: 'center',
  },
});

export default forwardRef(VerificationText);
