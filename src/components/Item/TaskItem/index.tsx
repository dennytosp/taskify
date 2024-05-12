import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, { FC, useState } from 'react';
import { styles } from './style';
import { CheckBox } from '@/components/CheckBox';
import { RegularText } from '@/components/Text';
import { Image } from '@/components/Image';
import { moderateScale } from '@/utils/scale';

interface ITaskItemProps {
  item: {
    name: string;
    description: string;
    image?: string;
  };
  index: number;
  onChangeCheckBox?: (isChecked: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

const TaskItem: FC<ITaskItemProps> = ({ item, onChangeCheckBox, style }) => {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <View style={[styles.wrapperTaskifyItem, style]}>
      <TouchableOpacity
        onPress={() => setIsCheck(!isCheck)}
        style={[styles.checkBox]}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            customStyle={[{ marginRight: moderateScale(8), borderRadius: 8 }]}
          />
        ) : (
          <CheckBox onChange={onChangeCheckBox} />
        )}
      </TouchableOpacity>
      <RegularText style={[styles.textLabelTaskify]}>{item.name}</RegularText>
    </View>
  );
};

export default TaskItem;
