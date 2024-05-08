import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RoutesRootStack } from '@/navigators/routes';
import { styles } from './style';

type NavigationProps =
  ReactNavigation.RootStackScreenProps<RoutesRootStack.AUTH_STACK>;

const SignUp = () => {
  const navigation = useNavigation<NavigationProps['navigation']>();

  return (
    <View style={[styles.container]}>
      <Text>Sign up</Text>
    </View>
  );
};

export default SignUp;
