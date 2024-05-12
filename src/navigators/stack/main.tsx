import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RoutesMainStack } from '../routes';
import { EnterCategory, EnterTaskify, Taskify } from '@/screens';

export type MainStackParamsList = {
  [RoutesMainStack.TASKIFY]: undefined;
  [RoutesMainStack.ENTER_TASKIFY]: undefined;
  [RoutesMainStack.ENTER_CATEGORY]: undefined;
};

const Main = createNativeStackNavigator<MainStackParamsList>();

const MainStack = () => {
  return (
    <Main.Navigator screenOptions={{ headerShown: false }}>
      <Main.Screen name={RoutesMainStack.TASKIFY} component={Taskify} />
      <Main.Screen
        name={RoutesMainStack.ENTER_TASKIFY}
        component={EnterTaskify}
      />
      <Main.Screen
        name={RoutesMainStack.ENTER_CATEGORY}
        component={EnterCategory}
      />
    </Main.Navigator>
  );
};

export default MainStack;
