import React, { FC, useRef, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { faker } from '@faker-js/faker';

import { CheckBox, CheckBoxRef } from '@/components/CheckBox';
import Icon from '@/components/Icon';
import { Image } from '@/components/Image';
import { RegularText } from '@/components/Text';
import { AppStyles } from '@/styles';
import { COLORS, FONTS } from '@/theme';
import { translate } from '@/translations/translate';
import { moderateScale } from '@/utils/scale';
import { styles } from './style';

interface ITaskItemProps {
  item: {
    name: string;
    description: string;
    image?: string;
  };
  index: number;
  onChangeCheckBox?: (isChecked: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  style?: StyleProp<ViewStyle>;
}

faker.seed(50);

const TaskItem: FC<ITaskItemProps> = ({
  item,
  onChangeCheckBox,
  onEdit,
  onDelete,
  style,
}) => {
  const defaultValueCheckBox = false;
  const checkBoxRef = useRef<CheckBoxRef>(null);
  const [isCheck, setIsCheck] = useState(defaultValueCheckBox);

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

  const handleCheckBox = (value: boolean) => {
    setIsCheck(value);
    onChangeCheckBox?.(value);
  };

  const DropDown = () => (
    <Icon type={'Feather'} name={'more-vertical'} size={moderateScale(16)} />
  );

  return (
    <View style={[styles.wrapperTaskifyItem, style]}>
      <View style={[AppStyles.rowVCenter]}>
        <View style={[styles.checkBox]}>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              customStyle={[{ marginRight: moderateScale(8), borderRadius: 8 }]}
            />
          ) : (
            <CheckBox
              isDefaultActive={defaultValueCheckBox}
              ref={checkBoxRef}
              onChange={handleCheckBox}
            />
          )}
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
          {DATA_DROP_DOWN.map((dropDownItem, dropDownIndex) => (
            <MenuOption
              key={`drop-down-${dropDownItem.key}`}
              onSelect={dropDownItem.onSelect}
              text={dropDownItem.name}
            />
          ))}
        </MenuOptions>
      </Menu>
      {/* <View style={[styles.lineTaskDone]} /> */}
    </View>
  );
};

export default TaskItem;
