import { createRef } from 'react';
import { AppLoaderRef } from '@/components/Loader';

const appLoaderHolder = createRef<AppLoaderRef>();

const showAppLoader = () => {
  appLoaderHolder.current?.show();
};

const hideAppLoader = () => {
  appLoaderHolder.current?.hide();
};

export { appLoaderHolder, hideAppLoader, showAppLoader };
