import React from 'react';
import { Text, View } from 'react-native';
import { RoutesRootStack } from '@/navigators/routes';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';

type NavigationProps =
  ReactNavigation.RootStackScreenProps<RoutesRootStack.AUTH_STACK>;

const SignIn = () => {
  const navigation = useNavigation<NavigationProps['navigation']>();

  return (
    <View style={[styles.container]}>
      <Text>Sign in</Text>
    </View>
  );
};

export default SignIn;
