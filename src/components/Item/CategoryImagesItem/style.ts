import { AppStyles } from '@/styles';
import { height, MetricsSizes, moderateScale, width } from '@/utils/scale';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  wrapContent: {
    ...AppStyles.rowVCenter,
    // paddingVertical: MetricsSizes.regular,
    width: (width - moderateScale(40)) / 2,
  },
  textContent: {
    fontSize: moderateScale(12),
  },
  image: {
    width: (width - moderateScale(40)) / 2,
    height: height / 5,
    borderRadius: 6,
  },
});
