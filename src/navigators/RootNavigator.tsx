import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';

import { AppStyles } from '@/styles';
import { navigationRef } from '@/utils/holder';
import { RootStack } from './stack';
import InitializeApp from './InitializeApp';

const RootNavigator = () => {
  return (
    <GestureHandlerRootView style={[AppStyles.fill]}>
      <BottomSheetModalProvider>
        <NavigationContainer ref={navigationRef}>
          <RootStack />
          <InitializeApp />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default RootNavigator;
