import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { faker } from '@faker-js/faker';

import Header from '@/components/Header';
import { Image } from '@/components/Image';
import { RegularText } from '@/components/Text';
import { translate } from '@/translations/translate';
import { moderateScale } from '@/utils/scale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';

interface Props {
  onPress: (label: string) => void;
  onPressLeftHeader: () => void;
}

faker.seed(50);

const DATA = [...Array(66).keys()].map((_, i) => {
  return {
    key: faker.string.uuid(),
    name: faker.animal.bird(),
    image: faker.image.urlLoremFlickr(),
    description: faker.lorem.paragraph(),
  };
});

const CategoryItem = (props: Props) => {
  const { onPress, onPressLeftHeader } = props;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container]}>
      <Header
        title={translate('taskify.common.chooseCategory')}
        style={[{ paddingHorizontal: moderateScale(16) }]}
        onPressLeft={onPressLeftHeader}
      />
      <ScrollView
        contentContainerStyle={[
          {
            paddingHorizontal: moderateScale(16),
            paddingBottom: insets.bottom,
          },
        ]}
        style={[{}]}>
        {DATA.map((categoryItem: (typeof DATA)[0], categoryIndex: number) => {
          return (
            <TouchableOpacity
              key={'category-' + categoryItem.key}
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
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryItem;
