import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { deleteCategory, getCategories } from '@/api/services/category';
import { CategoryResponseModel } from '@/api/types';
import { Header, Icon } from '@/components';
import { TaskItem } from '@/components/Item';
import { RoutesMainStack, RoutesRootStack } from '@/navigators/routes';
import { getCategoryState } from '@/stores/slices/categorySlice';
import { useAppDispatch, useAppSelector } from '@/stores/types';
import { translate } from '@/translations/translate';
import { convertToUnsignedString } from '@/utils/helper';
import { moderateScale, moderateVerticalScale } from '@/utils/scale';
import { debounce } from 'lodash';
import { styles } from './style';

type NavigationProps =
  ReactNavigation.RootStackScreenProps<RoutesRootStack.BOTTOM_TAB_STACK>;

const Categories = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps['navigation']>();
  const dispatch = useAppDispatch();

  const { category } = useAppSelector(getCategoryState);
  const [searchKey, setSearchKey] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const myCategories = useMemo(() => {
    const keySearch = convertToUnsignedString(searchKey?.toUpperCase());
    return category.filter(i => {
      const taskName = convertToUnsignedString(i?.name?.toUpperCase());
      return taskName?.includes(keySearch);
    });
  }, [searchKey, category]);

  useEffect(() => {
    onGetAPIs();
  }, []);

  const onGetAPIs = async () => {
    if (category.length === 0) {
      await dispatch(getCategories());
    }
  };

  const onChangeSearch = useCallback((text: string) => {
    setSearchValue(text);
    onSearch(text);
  }, []);

  const onSearch = useCallback(
    debounce((text: string) => {
      setSearchKey(text);
    }, 500),
    [],
  );

  const onCreateCategory = () => {
    navigation.navigate(RoutesRootStack.MAIN_STACK, {
      screen: RoutesMainStack.ENTER_CATEGORY,
      params: { isEdit: false },
    });
  };

  const renderItem = (item: CategoryResponseModel, index: number) => {
    const onEdit = () => {
      navigation.navigate(RoutesRootStack.MAIN_STACK, {
        screen: RoutesMainStack.ENTER_CATEGORY,
        params: { isEdit: true, item },
      });
    };

    const onDelete = () => {
      dispatch(deleteCategory({ id: item?.id }));
    };

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
        onPressRight={onCreateCategory}
      />

      <View style={[styles.wrapperSearchInput]}>
        <TextInput
          style={[styles.searchInput]}
          placeholder={translate('taskify.categories.searchPlaceHolder')}
          onChangeText={onChangeSearch}
          value={searchValue}
        />
        {searchValue.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setSearchValue('');
              setSearchKey('');
            }}>
            <Icon
              type={'Ionicons'}
              name={'close-outline'}
              size={moderateScale(16)}
            />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        data={myCategories}
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
