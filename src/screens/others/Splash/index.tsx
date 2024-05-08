import { useCallback, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import AnimatedBootSplash from 'react-native-bootsplash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './style';
import { translate } from '@/translations/translate';

type Props = {
  onAnimationEnd: () => void;
};

const Splash = ({ onAnimationEnd }: Props) => {
  const { bottom } = useSafeAreaInsets();
  const [opacity] = useState(() => new Animated.Value(1));
  const [translateY] = useState(() => new Animated.Value(0));

  const { container, logo } = AnimatedBootSplash.useHideAnimation({
    manifest: require('@/assets/icons/bootsplash_logo/bootsplash_manifest.json'),
    logo: require('@/assets/icons/bootsplash_logo/bootsplash_logo.png'),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      onRunAnimation();
    },
  });

  const onRunAnimation = useCallback(() => {
    Animated.timing(opacity, {
      useNativeDriver: true,
      toValue: 0,
      duration: 150,
      delay: 1000,
    }).start(() => onAnimationEnd());
  }, []);

  return (
    <Animated.View
      {...container}
      style={[container.style, { opacity, flex: 1 }]}>
      <Animated.Image
        {...logo}
        style={[logo.style, { transform: [{ translateY }] }]}
      />

      <View style={[{ position: 'absolute', bottom }]}>
        <Text style={[styles.textLogo]}>
          {translate('app.name').toUpperCase()}
        </Text>
      </View>
    </Animated.View>
  );
};

export default Splash;
