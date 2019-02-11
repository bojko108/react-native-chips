/**
 * @author Ramprasath R <ramprasath25@gmail.com>
 * @author bojko108 <bojko108@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const Chips = props => {
  const { chip, onPress, chipStyle } = props;
  const { text, finished } = chip;

  return (
    <TouchableOpacity style={[styles.chip, chipStyle]} onPress={onPress}>
      {finished ? (
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.chipCloseBtn, { backgroundColor: '#2ecc40' }]}>
            <IconButton icon="done" size={15} />
          </View>
          <Text style={[{ paddingHorizontal: 15, textDecorationLine: 'line-through' }]}>{text}</Text>
        </View>
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.chipCloseBtn}>
            <IconButton icon="clear" size={15} />
          </View>
          <Text style={[{ paddingHorizontal: 15 }]}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderColor: '#848787',
    borderWidth: 1,
    margin: 4,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 15
  },
  chipCloseBtn: {
    borderRadius: 8,
    width: 16,
    height: 16,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chipCloseBtnTxt: {
    color: '#555',
    paddingBottom: 3
  }
});

Chips.defaultProps = {
  chipStyle: {}
};

Chips.propTypes = {
  chip: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  chipStyle: PropTypes.object
};

export default Chips;
