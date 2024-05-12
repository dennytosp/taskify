import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

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

const CategoryImagesItem = (props: Props) => {
  const { onPress, onPressLeftHeader } = props;
  const dispatch = useAppDispatch();
  const { category } = useAppSelector(getCategoryState);
  const numColumns = 2;

  useEffect(() => {
    if (category.length === 0) {
      dispatch(getCategories());
    }
  }, []);

  const uniqueCategoryImages = category.filter((item, index, self) => {
    const findIndexObject = self.findIndex(obj => obj.image === item.image);
    return findIndexObject === index;
  });

  return (
    <ScrollModalContainer onPressLeftHeader={onPressLeftHeader}>
      <FlatList
        data={uniqueCategoryImages}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item, index) => `catalog-image-${item.id}`}
        contentContainerStyle={{ alignSelf: 'center' }}
        columnWrapperStyle={[{ gap: moderateScale(8) }]}
        ItemSeparatorComponent={() => (
          <View style={[{ marginBottom: moderateScale(8) }]} />
        )}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={'category-' + item.id}
              style={[styles.wrapContent]}
              onPress={() => onPress(item.image)}>
              <Image
                resizeMode="cover"
                source={{ uri: item.image }}
                style={[styles.image]}
              />
            </TouchableOpacity>
          );
        }}
      />
    </ScrollModalContainer>
  );
};

export default CategoryImagesItem;
