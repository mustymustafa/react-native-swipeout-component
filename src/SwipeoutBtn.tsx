import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

interface SwipeoutBtnProps {
  backgroundColor?: string;
  color?: string;
  component?: React.ReactNode;
  onPress?: () => void;
  text?: string;
  type?: string;
  underlayColor?: string;
  height?: number;
  width?: number;
  disabled?: boolean;
}

const SwipeoutBtn: React.FC<SwipeoutBtnProps> = ({
  backgroundColor,
  color,
  component,
  onPress,
  text,
  type,
  underlayColor,
  height = 0,
  width = 0,
  disabled = false,
}) => {
  const styleSwipeoutBtn = [styles.swipeoutBtn];

  if (type === 'delete') styleSwipeoutBtn.push(styles.colorDelete);
  else if (type === 'primary') styleSwipeoutBtn.push(styles.colorPrimary);
  else if (type === 'secondary') styleSwipeoutBtn.push(styles.colorSecondary);

  if (backgroundColor) styleSwipeoutBtn.push({ backgroundColor });

  styleSwipeoutBtn.push({
    height,
    width,
  });

  const styleSwipeoutBtnComponent = [{
    height,
    width,
  }];

  const styleSwipeoutBtnText = [styles.swipeoutBtnText];

  if (color) styleSwipeoutBtnText.push({ color });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.swipeoutBtnTouchable, styleSwipeoutBtn]}
      activeOpacity={underlayColor ? 1 : 0.85}
      underlayColor={underlayColor}
    >
      {
        component ?
          <View style={styleSwipeoutBtnComponent}>{component}</View> :
          <Text style={styleSwipeoutBtnText}>{text}</Text>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  swipeoutBtn: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  swipeoutBtnText: {
    color: '#ffffff'
  },
  swipeoutBtnTouchable: {
    flex: 1
  },
  colorDelete: {
    backgroundColor: 'red',
  },
  colorPrimary: {
    backgroundColor: 'blue',
  },
  colorSecondary: {
    backgroundColor: 'gray',
  },
});

export default SwipeoutBtn;
