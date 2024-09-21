import { createRef } from 'react';
import { ShowHideRef } from '@/types';

const bottomTabHolder = createRef<ShowHideRef>();

const showBottomTab = () => {
  bottomTabHolder.current?.show();
};

const hideBottomTab = () => {
  bottomTabHolder.current?.hide();
};

export { bottomTabHolder, showBottomTab, hideBottomTab };
