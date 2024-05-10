import { Icons } from '@/theme';
import { isAndroid } from '@/utils/device';
import { moderateScale, moderateVerticalScale } from '@/utils/scale';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import {
  ColorValue,
  DimensionValue,
  ImageRequireSource,
  Pressable,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Source } from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from '../Image';
import { SemiBoldText } from '../Text';
import { styles } from './style';

type HeaderProps = {
  title?: string;
  leftIcon?: Source | ImageRequireSource;
  rightIcon?: Source | ImageRequireSource;
  onPressRight?: () => void;
  hideLeftIcon?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

type NavigationProps = ReactNavigation.RootStackNavigationProps;

const Header: FC<HeaderProps> = ({
  containerStyle,
  style,
  title,
  leftIcon,
  hideLeftIcon,
  rightIcon,
  onPressRight,
}) => {
  const navigation = useNavigation<NavigationProps['navigation']>();

  const onGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.wrapperFullHeader, containerStyle]}>
      <SafeAreaView
        edges={['top']}
        style={[
          isAndroid && { marginTop: moderateVerticalScale(16) },
          styles.wrapperHeader,
          style,
        ]}>
        <View style={[styles.wrapperLeft]}>
          {!hideLeftIcon && (
            <TouchableOpacity
              style={[styles.wrapperLeftIcon]}
              onPress={onGoBack}>
              <Image source={leftIcon ?? Icons.forwardLeft} />
            </TouchableOpacity>
          )}

          {title && (
            <SemiBoldText
              children={title}
              style={[!rightIcon && !hideLeftIcon && styles.textCenterHeader]}
            />
          )}
        </View>

        <View style={[styles.wrapperRight]}>
          {rightIcon && (
            <Pressable
              onPress={onPressRight}
              style={{ marginLeft: moderateScale(16) }}>
              <Image source={rightIcon} />
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;
