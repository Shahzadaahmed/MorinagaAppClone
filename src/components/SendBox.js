import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { colors, fonts } from '../constants';
import { Email } from '../asset/svg';

const { width } = Dimensions.get('window');

export default function SendBox({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <Email />
        <View style={styles.textContainer}>
          <View style={styles.textRow}>
            <Text style={{ ...fonts.sendEmail, color: colors.danger }}>
              Send to your email
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text
              style={{
                ...fonts.symptoms,
                color: colors.forgetDescription,
              }}
              numberOfLines={2}
              ellipsizeMode="tail">
              Link reset will be send to your email address registered
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 64,
    marginHorizontal: 32,
    padding: 16,
    height: 100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  row: {
    flexDirection: 'row',
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 10,
    flex: 1,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
