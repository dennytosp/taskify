import React, {
  Ref,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from 'react';
import equals from 'react-fast-compare';
import { ActivityIndicator, View } from 'react-native';
import { WaveIndicator } from 'react-native-indicators';

import { AppStyles } from '@/styles';
import { COLORS } from '@/theme';
import { isIos } from '@/utils/device';
import { moderateScale } from '@/utils/scale';
import { styles } from './style';

export interface AppLoaderRef {
  show: () => void;
  hide: () => void;
}

interface AppLoaderProps {
  isShowLoader?: boolean;
}

const AppLoaderComponent = forwardRef(
  (props: AppLoaderProps, ref: Ref<AppLoaderRef>) => {
    const { isShowLoader = false } = props;
    const [visible, setVisible] = useState<boolean>(isShowLoader);

    useImperativeHandle(
      ref,
      () => ({
        show: showLoader,
        hide: hideLoader,
      }),
      [],
    );

    const showLoader = () => {
      setVisible(true);
    };

    const hideLoader = () => {
      setVisible(false);
    };

    return (
      <>
        {visible && (
          <View style={[styles.container]}>
            <View
              style={[
                AppStyles.boxShadow,
                styles.wrapper,
                { backgroundColor: COLORS.background },
              ]}>
              {isIos ? (
                <WaveIndicator
                  size={moderateScale(30)}
                  color={COLORS.primary}
                />
              ) : (
                <ActivityIndicator color={COLORS.primary} size="large" />
              )}
            </View>
          </View>
        )}
      </>
    );
  },
);

export const AppLoader = memo(AppLoaderComponent, equals);
