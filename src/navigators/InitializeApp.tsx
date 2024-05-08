import React, { useEffect, useRef, useState } from 'react';
import { AppState, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Splash } from '@/screens/others';
import { useAppDispatch } from '@/stores/types';
import { connectToRemoteDebugger } from '../utils/helper';

type InitializeAppType = {};

const InitializeApp = (props: InitializeAppType) => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const [visibleBootSplash, setVisibleBootSplash] = useState(true);

  const appState = useRef(AppState.currentState);
  const isDebugging = false;

  useEffect(() => {
    if (isDebugging) {
      connectToRemoteDebugger(isDebugging);
    }
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        onAppState();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  const onAppState = () => {};

  const onBootSplashCompleted = async () => {
    setVisibleBootSplash(false);
  };

  return (
    <>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
        showHideTransition={'fade'}
      />

      {visibleBootSplash && <Splash onAnimationEnd={onBootSplashCompleted} />}

      {/* <AppLoader ref={appLoaderHolder} /> */}
    </>
  );
};

export default InitializeApp;
