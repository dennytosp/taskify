import { faker } from '@faker-js/faker';
import React, { FC, useCallback, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

import { putUpdateTask } from '@/api/services/task';
import { TaskResponseModel } from '@/api/types';
import { CheckBox } from '@/components';
import Icon from '@/components/Icon';
import { RegularText } from '@/components/Text';
import { useAppDispatch } from '@/stores/types';
import { AppStyles } from '@/styles';
import { COLORS, FONTS } from '@/theme';
import { translate } from '@/translations/translate';
import { moderateScale } from '@/utils/scale';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { styles } from './style';

interface ITaskItemProps {
  item: TaskResponseModel;
  index: number;
  onEdit?: () => void;
  onDelete?: () => void;
  style?: StyleProp<ViewStyle>;
}

const TaskItem: FC<ITaskItemProps> = ({
  item,
  index,
  onEdit,
  onDelete,
  style,
}) => {
  const dispatch = useAppDispatch();
  const defaultValueCheckBox = Boolean(item?.isChecked);
  const [isCheck, setIsCheck] = useState<boolean>(defaultValueCheckBox);

  const DATA_DROP_DOWN = [
    {
      key: faker.string.uuid(),
      name: translate('system.edit'),
      onSelect: onEdit,
    },
    {
      key: faker.string.uuid(),
      name: translate('system.delete'),
      onSelect: onDelete,
    },
  ];

  const handleCheckBox = useCallback(async () => {
    setIsCheck(prev => {
      dispatch(putUpdateTask({ id: item.id, isChecked: !prev }));
      return !prev;
    });
  }, [isCheck]);

  const DropDown = () => (
    <Icon type={'Feather'} name={'more-vertical'} size={moderateScale(16)} />
  );

  const MenuItem = useCallback(
    () => (
      <>
        {DATA_DROP_DOWN.map((dropDownItem, dropDownIndex) => (
          <MenuOption
            key={`drop-down-${dropDownItem.key}${item.name}`}
            onSelect={dropDownItem.onSelect}
            text={dropDownItem.name}
          />
        ))}
      </>
    ),
    [item],
  );

  return (
    <Animated.View
      entering={FadeIn.delay(index * 100)}
      exiting={FadeOut.delay(index * 100)}
      style={[styles.wrapperTaskifyItem, style]}>
      <View style={[AppStyles.rowVCenter]}>
        <View style={[styles.checkBox]}>
          <CheckBox isChecked={isCheck} onChange={handleCheckBox} />
        </View>
        <RegularText
          style={[
            styles.textLabelTaskify,
            isCheck && { textDecorationLine: 'line-through' },
          ]}>
          {item.name}
        </RegularText>
      </View>

      <Menu renderer={renderers.ContextMenu}>
        <MenuTrigger children={<DropDown />} />
        <MenuOptions
          customStyles={{
            optionsContainer: { borderRadius: 16 },
            optionsWrapper: { padding: moderateScale(8) },
            optionWrapper: { padding: moderateScale(8) },
            optionText: {
              fontFamily: FONTS.regular,
              color: COLORS.text,
              fontSize: moderateScale(12),
            },
          }}>
          <MenuItem />
        </MenuOptions>
      </Menu>
    </Animated.View>
  );
};

export default TaskItem;
