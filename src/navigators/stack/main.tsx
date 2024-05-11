import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RoutesMainStack } from '../routes';
import { EditTaskify, Taskify } from '@/screens';

export type MainStackParamsList = {
  [RoutesMainStack.TASKIFY]: undefined;
  [RoutesMainStack.EDIT_TASKIFY]: undefined;
};

const Main = createNativeStackNavigator<MainStackParamsList>();

const MainStack = () => {
  return (
    <Main.Navigator screenOptions={{ headerShown: false }}>
      <Main.Screen name={RoutesMainStack.TASKIFY} component={Taskify} />
      <Main.Screen
        name={RoutesMainStack.EDIT_TASKIFY}
        component={EditTaskify}
      />
    </Main.Navigator>
  );
};

export default MainStack;
