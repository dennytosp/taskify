import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { getCategories } from '@/api/services/category';
import { CategoryResponseModel } from '@/api/types';
import { Image } from '@/components/Image';
import ScrollModalContainer from '@/components/ScrollModalContainer';
import { RegularText } from '@/components/Text';
import { getCategoryState } from '@/stores/slices/categorySlice';
import { useAppDispatch, useAppSelector } from '@/stores/types';
import { moderateScale } from '@/utils/scale';
import { styles } from './style';

interface Props {
  onPress: (label: string) => void;
  onPressLeftHeader: () => void;
}

const CategoryItem = (props: Props) => {
  const { onPress, onPressLeftHeader } = props;
  const dispatch = useAppDispatch();
  const { category } = useAppSelector(getCategoryState);

  useEffect(() => {
    if (category.length === 0) {
      dispatch(getCategories());
    }
  }, []);

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
