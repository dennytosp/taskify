import React, { Ref, memo, useCallback, useEffect, useRef } from 'react';
import equals from 'react-fast-compare';
import {
  Animated,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { AppStyles } from '@/styles';
import { COLORS, Icons } from '@/theme';
import { MetricsSizes } from '@/utils/scale';
import { Image } from '../Image';
import { styles } from './styles';

interface Props {
  disable?: boolean;
  isChecked: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  renderCustom?: () => JSX.Element;
  onChange?: () => void;
}

const CheckBoxComponent = (props: Props) => {
  const { disable, isChecked, containerStyle, renderCustom, onChange } = props;

  const focusedAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isChecked) {
      focusedAnim.setValue(1);
    }
  }, []);

  const onPress = useCallback(() => {
    onChange?.();
    onProgressAnimation();
  }, [focusedAnim, isChecked]);

  const onProgressAnimation = () => {
    Animated.spring(focusedAnim, {
      toValue: isChecked ? 0 : 1,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = focusedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.gray300, COLORS.text],
    extrapolate: 'clamp',
  });

  const scale = focusedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const opacity = focusedAnim.interpolate({
    inputRange: [0, MetricsSizes.large],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <>
      <View style={[containerStyle]}>
        <Animated.View style={[styles.container, { backgroundColor, opacity }]}>
          <TouchableOpacity
            disabled={disable}
            activeOpacity={1}
            onPress={onPress}
            style={[AppStyles.fill, AppStyles.columnCenter]}>
            <Animated.View
              style={[
                {
                  transform: [{ scaleX: scale }, { scaleY: scale }],
                },
              ]}>
              <Image source={Icons.tick} style={[styles.icon]} />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        {renderCustom && renderCustom()}
      </View>
    </>
  );
};

export const CheckBox = memo(CheckBoxComponent, equals);
