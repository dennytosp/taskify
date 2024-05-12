import { StyleSheet } from 'react-native';
import { AppStyles } from '@/styles';
import { moderateScale } from '@/utils/scale';

export const styles = StyleSheet.create({
  container: {
    ...AppStyles.fillAbsolute,
    ...AppStyles.fullSize,
    ...AppStyles.columnCenter,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  wrapper: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
