import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthStack } from '.';
import { RoutesRootStack } from '../routes';
import { AuthStackParamsList } from './auth';
import MainStack, { MainStackParamsList } from './main';

export type RootStackParamList = {
  [RoutesRootStack.AUTH_STACK]:
    | NavigatorScreenParams<AuthStackParamsList>
    | undefined;
  [RoutesRootStack.MAIN_STACK]:
    | NavigatorScreenParams<MainStackParamsList>
    | undefined;
};

const Root = createNativeStackNavigator<ReactNavigation.RootParamList>();
const routeName = RoutesRootStack.AUTH_STACK;

const RootStack = () => {
  return (
    <>
      <Root.Navigator
        initialRouteName={routeName}
        screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Root.Screen name={RoutesRootStack.AUTH_STACK} component={AuthStack} />
        <Root.Screen name={RoutesRootStack.MAIN_STACK} component={MainStack} />
      </Root.Navigator>
    </>
  );
};
export default RootStack;
