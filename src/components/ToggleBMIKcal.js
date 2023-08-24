import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {fonts, colors} from '../constants';
import {moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

export default function ToggleBMIKcal({activeTab, onSelectTab}) {
  const handleTabPress = tabName => {
    onSelectTab(tabName);
  };

  return (
    <View style={styles.logButton}>
      <TouchableOpacity onPress={() => handleTabPress('BMI')}>
        {activeTab === 'BMI' ? (
          <LinearGradient
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            colors={[colors.danger, colors.danger2]}
            style={styles.linearGradient}>
            <Text style={{...fonts.toggle, color: colors.white}}>BMI</Text>
          </LinearGradient>
        ) : (
          <LinearGradient
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            colors={['#F4F4F4', '#F4F4F4']}
            style={styles.linearGradient}>
            <Text style={{...fonts.toggle, color: colors.primary}}>BMI</Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('Kcal')}>
        {activeTab === 'Kcal' ? (
          <LinearGradient
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            colors={[colors.danger, colors.danger2]}
            style={styles.linearGradient}>
            <Text style={{...fonts.toggle, color: colors.white}}>Kcal</Text>
          </LinearGradient>
        ) : (
          <LinearGradient
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            colors={['#F4F4F4', '#F4F4F4']}
            style={styles.linearGradient}>
            <Text style={{...fonts.toggle, color: colors.primary}}>Kcal</Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logButton: {
    backgroundColor: colors.grey4,
    padding: moderateScale(6),
    borderRadius: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: moderateScale(20),
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(135),
    padding: moderateScale(12),
    borderRadius: 20,
  },
});
