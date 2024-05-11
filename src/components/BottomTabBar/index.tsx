import React, { useMemo } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { RegularText, SemiBoldText } from '../Text';
import {
  MetricsSizes,
  moderateScale,
  moderateVerticalScale,
  width,
} from '@/utils/scale';
import { COLORS, Icons } from '@/theme';
import { isIos } from '@/utils/device';
import { Image } from '@/components';
import { AppStyles } from '@/styles';
import { translate } from '@/translations/translate';

const AnimatedBottomTabBar = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  const bottomSize = isIos ? insets.bottom : moderateVerticalScale(24);
  const pinchGesture = true;
  const isMaterial = false;
  const tabBarWidth = width - (isMaterial ? 0 : 48) - moderateScale(32);
  const tabBarItemWidth = tabBarWidth / state.routes.length;
  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            tabBarItemWidth * state.index +
              (isMaterial ? MetricsSizes.regular : MetricsSizes.big),
          ),
        },
      ],
    };
  });

  const animatedDefaultButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
      opacity: opacityValue.value,
    };
  });

  const TabItem = () => {
    return (
      <View
        style={[
          AppStyles.rowCenterBetween,
          { justifyContent: 'space-evenly' },
        ]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;
          const isLastIndex = Number(state.routes.length - 1) === index;

          const iconName = useMemo(() => {
            switch (label) {
              case translate('taskify.bottomTab.tab1'):
                return Icons.home;
              case translate('taskify.bottomTab.tab2'):
                return Icons.wallet;
              case translate('taskify.bottomTab.tab3'):
                return Icons.categories;
              case translate('taskify.bottomTab.tab4'):
                return Icons.profile;
              default:
                return Icons.wallet;
            }
          }, [label]);

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={'bottom-tab-' + route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.button,
                index === 0 && { marginLeft: MetricsSizes.regular },
                isLastIndex && { marginRight: MetricsSizes.regular },
              ]}>
              <Animated.View
                style={[animatedDefaultButtonStyle, AppStyles.columnCenter]}>
                <Image
                  source={iconName}
                  imageType={'large'}
                  tintColor={isFocused ? COLORS.white : '#8EDFEB'}
                />

                {/* <SemiBoldText
                  style={[
                    styles.textDefaultButton,
                    { color: isFocused ? COLORS.primary : COLOR_DEFAULT },
                  ]}>
                  {label}
                </SemiBoldText> */}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={[
        isMaterial ? styles.containerMaterial : styles.container,
        {
          bottom: isMaterial ? 0 : bottomSize,
          paddingVertical: isMaterial ? bottomSize : moderateVerticalScale(24),
          width: isMaterial ? '100%' : width - moderateScale(48),
        },
      ]}>
      {pinchGesture && (
        <Animated.View
          style={[
            styles.tabContainer,
            { justifyContent: isMaterial ? 'center' : 'flex-end' },
            animatedContainerStyle,
          ]}>
          <View
            style={[
              isMaterial ? styles.tabItemMaterial : styles.tabItem,
              {
                backgroundColor: COLORS.primary,
                width: isMaterial ? tabBarItemWidth : moderateScale(48),
              },
            ]}
          />
        </Animated.View>
      )}

      <TabItem />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  containerMaterial: {
    backgroundColor: COLORS.white,
    width: '100%',
  },
  tabContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  tabItem: {
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    height: '80%',
    // opacity: 0.7,
  },
  tabItemMaterial: {
    borderRadius: 12,
    height: moderateVerticalScale(44),
    // opacity: 0.7,
  },
  button: {
    flex: 1,
  },
  textDefaultButton: {
    marginTop: moderateVerticalScale(6),
    fontSize: moderateScale(12),
  },
});

export default AnimatedBottomTabBar;
