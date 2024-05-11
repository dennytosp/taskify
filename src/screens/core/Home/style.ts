import { StyleSheet } from 'react-native';
import { AppStyles } from '@/styles';
import { COLORS } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    ...AppStyles.fill,
    ...AppStyles.columnCenter,
  },
});
