import React, { memo } from 'react';
import equals from 'react-fast-compare';
import { StyleProp } from 'react-native';
import FastImage, { FastImageProps, ImageStyle } from 'react-native-fast-image';
import { MetricVariables } from '@/theme/theme';
import { MetricsSizes } from '@/utils/scale';

interface ImageProps extends FastImageProps {
  imageType?: MetricVariables;
  customStyle?: StyleProp<ImageStyle>;
}

export const Image = memo((props: ImageProps) => {
  const { imageType, customStyle } = props;
  const imageSize = imageType ?? 'icon';

  return (
    <FastImage
      style={[{ width: MetricsSizes[imageSize], aspectRatio: 1 }, customStyle]}
      resizeMode={'contain'}
      {...props}>
      {props.children}
    </FastImage>
  );
}, equals);
