import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RoutesMainStack } from '../routes';
import { EditTaskify, Home } from '@/screens';

export type MainStackParamsList = {
  [RoutesMainStack.HOME]: undefined;
  [RoutesMainStack.EDIT_TASKIFY]: undefined;
};

const Main = createNativeStackNavigator<MainStackParamsList>();

const MainStack = () => {
  return (
    <Main.Navigator screenOptions={{ headerShown: false }}>
      <Main.Screen name={RoutesMainStack.HOME} component={Home} />
      <Main.Screen
        name={RoutesMainStack.EDIT_TASKIFY}
        component={EditTaskify}
      />
    </Main.Navigator>
  );
};

export default MainStack;
