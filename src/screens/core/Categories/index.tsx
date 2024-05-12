import React, { useState } from 'react';
import { FlatList, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { faker } from '@faker-js/faker';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@/components';
import { TaskItem } from '@/components/Item';
import { RoutesMainStack, RoutesRootStack } from '@/navigators/routes';
import { translate } from '@/translations/translate';
import { getGreeting } from '@/utils/helper';
import { moderateScale, moderateVerticalScale } from '@/utils/scale';
import { styles } from './style';

type NavigationProps =
  ReactNavigation.RootStackScreenProps<RoutesRootStack.BOTTOM_TAB_STACK>;

faker.seed(20);

const DATA = [...Array(15).keys()].map((_, i) => {
  return {
    key: faker.string.uuid(),
    image: faker.image.urlLoremFlickr(),
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
  };
});

const Categories = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps['navigation']>();
  const greeting = getGreeting('Mad Dinh');

  const [searchKey, setSearchKey] = useState<string>();

  const onSearch = (text: string) => {
    setSearchKey(text);
  };

  const onCreateTask = () => {
    navigation.navigate(RoutesRootStack.MAIN_STACK, {
      screen: RoutesMainStack.ENTER_CATEGORY,
      params: { isEdit: false },
    });
  };

  const renderItem = (item: (typeof DATA)[0], index: number) => {
    const onEdit = () => {
      navigation.navigate(RoutesRootStack.MAIN_STACK, {
        screen: RoutesMainStack.ENTER_CATEGORY,
        params: { isEdit: true, item },
      });
    };

    const onDelete = () => {};

    return (
      <TaskItem item={item} index={index} onDelete={onDelete} onEdit={onEdit} />
    );
  };

  return (
    <View style={[styles.container]}>
      <Header
        hideLeftIcon
        title={translate('taskify.bottomTab.tab3')}
        containerStyle={[{ paddingBottom: moderateVerticalScale(8) }]}
        onPressRight={onCreateTask}
      />

      <View style={[styles.wrapperSearchInput]}>
        <TextInput
          style={[styles.searchInput]}
          placeholder={translate('taskify.categories.searchPlaceHolder')}
          onChangeText={onSearch}
          value={searchKey}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        data={DATA}
        renderItem={({ item, index }) => <>{renderItem(item, index)}</>}
        ItemSeparatorComponent={() => (
          <View style={[{ marginTop: moderateVerticalScale(8) }]} />
        )}
        style={[{ marginTop: moderateScale(16) }]}
        contentContainerStyle={[{ paddingBottom: insets.bottom * 4 }]}
        keyExtractor={(item, index) => `home-tasks-${index}`}
      />
    </View>
  );
};

export default Categories;
