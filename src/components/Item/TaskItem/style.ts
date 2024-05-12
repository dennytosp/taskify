import { StyleSheet } from 'react-native';
import { AppStyles } from '@/styles';
import { COLORS } from '@/theme';
import { moderateScale } from '@/utils/scale';

export const styles = StyleSheet.create({
  container: {},
  wrapperTaskifyItem: {
    backgroundColor: COLORS.lightGray,
    ...AppStyles.rowCenterBetween,
    padding: moderateScale(16),
    borderRadius: 8,
  },
  checkBox: {},
  textLabelTaskify: {
    fontSize: moderateScale(12),
  },
  lineTaskDone: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
  },
});
