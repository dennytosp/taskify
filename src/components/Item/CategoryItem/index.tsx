import React from 'react';
import { TouchableOpacity } from 'react-native';

import { CategoryResponseModel } from '@/api/types';
import { Image } from '@/components/Image';
import ScrollModalContainer from '@/components/ScrollModalContainer';
import { RegularText } from '@/components/Text';
import { useAppDispatch } from '@/stores/types';
import { moderateScale } from '@/utils/scale';
import { styles } from './style';

interface Props {
  onPress: (label: string) => void;
  onPressLeftHeader: () => void;
  category: CategoryResponseModel[];
}

const CategoryItem = (props: Props) => {
  const { category, onPress, onPressLeftHeader } = props;
  const dispatch = useAppDispatch();

  return (
    <ScrollModalContainer onPressLeftHeader={onPressLeftHeader}>
      {category.map(
        (categoryItem: CategoryResponseModel, categoryIndex: number) => {
          return (
            <TouchableOpacity
              key={'category-' + categoryItem.id}
              style={[styles.wrapContent]}
              onPress={() => onPress(categoryItem.name)}>
              <Image
                source={{ uri: categoryItem.image }}
                customStyle={[
                  { marginRight: moderateScale(8), borderRadius: 8 },
                ]}
              />
              <RegularText
                children={categoryItem.name}
                style={[styles.textContent]}
              />
            </TouchableOpacity>
          );
        },
      )}
    </ScrollModalContainer>
  );
};

export default CategoryItem;
