import { AppStyles } from '@/styles';
import { COLORS, Icons } from '@/theme';
import { MetricsSizes } from '@/utils/scale';
import React, {
  Ref,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import equals from 'react-fast-compare';
import {
  Animated,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Image } from '../Image';
import { RegularText } from '../Text';
import { styles } from './styles';

export interface CheckBoxRef {
  getStatus: () => boolean;
  changeStatus: (isChecked: boolean) => void;
  getErrorStatus: () => void;
  changeErrorStatus: (status: boolean) => void;
}

interface Props {
  disable?: boolean;
  messageError?: string;
  containerStyle?: StyleProp<ViewStyle>;
  isDefaultActive?: boolean;
  renderCustom?: () => JSX.Element;
  onChange?: (isChecked: boolean) => void;
}

const CheckBoxComponent = forwardRef((props: Props, ref: Ref<CheckBoxRef>) => {
  const {
    disable,
    messageError,
    isDefaultActive = false,
    containerStyle,
    renderCustom,
    onChange,
  } = props;

  const [isChecked, setIsChecked] = useState(isDefaultActive);
  const [isError, setIsError] = useState(false);
  const focusedAnim = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    getStatus,
    changeStatus,
    getErrorStatus,
    changeErrorStatus,
  }));

  useEffect(() => {
    if (isDefaultActive) {
      focusedAnim.setValue(1);
    }
  }, []);

  const getStatus = () => isChecked;

  const changeStatus = (status: boolean) => {
    onProgressAnimation();
    setIsChecked(status);
  };

  const changeErrorStatus = (status: boolean) => setIsError(status);

  const getErrorStatus = () => isError;

  const onPress = () => {
    if (isError && !isChecked) {
      setIsError(prev => !prev);
    }

    onProgressAnimation();
    setIsChecked(prev => !prev);
    onChange && onChange(!isChecked);
  };

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

  const renderError = () => {
    if (isError && messageError) {
      return (
        <>
          <RegularText
            children={messageError}
            style={[styles.textErrorWarning]}
          />
        </>
      );
    }
  };

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

      {renderError()}
    </>
  );
});

export const CheckBox = memo(CheckBoxComponent, equals);
