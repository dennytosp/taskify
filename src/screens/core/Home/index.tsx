import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RoutesMainStack, RoutesRootStack } from '@/navigators/routes';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { deleteTask } from '@/api/services/task';
import { getTasks } from '@/api/services/task/get-tasks';
import { TaskResponseModel } from '@/api/types';
import { Header, Icon, Indicator } from '@/components';
import { TaskItem } from '@/components/Item';
import { RegularText, SemiBoldText } from '@/components/Text';
import { useStateWhenMounted } from '@/hooks';
import { getTaskState } from '@/stores/slices';
import { useAppDispatch, useAppSelector } from '@/stores/types';
import { AppStyles } from '@/styles';
import { translate } from '@/translations/translate';
import { convertToUnsignedString, getGreeting } from '@/utils/helper';
import { moderateScale, moderateVerticalScale } from '@/utils/scale';
import { debounce } from 'lodash';
import { styles } from './style';

type NavigationProps =
  ReactNavigation.RootStackScreenProps<RoutesRootStack.BOTTOM_TAB_STACK>;

const Home = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps['navigation']>();
  const dispatch = useAppDispatch();

  const { task } = useAppSelector(getTaskState);
  const greeting = getGreeting('Mad Dinh');
  const isFocused = useIsFocused();

  const [searchKey, setSearchKey] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useStateWhenMounted(true);

  const myTasks = useMemo(() => {
    const keySearch = convertToUnsignedString(searchKey?.toUpperCase());
    return task.filter(i => {
      const taskName = convertToUnsignedString(i?.name?.toUpperCase());
      return taskName?.includes(keySearch);
    });
  }, [searchKey, task]);

  useEffect(() => {
    onGetAPIs();
  }, []);

  const onGetAPIs = async () => {
    await dispatch(getTasks());
    setIsLoading(false);
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

  const onCreateTask = () => {
    navigation.navigate(RoutesRootStack.MAIN_STACK, {
      screen: RoutesMainStack.ENTER_TASKIFY,
      params: { isEdit: false },
    });
  };

  const keyExtractor = (item: TaskResponseModel, index: number) =>
    `home-tab-${item.id}`;

  const Item = ({
    item,
    index,
  }: {
    item: TaskResponseModel;
    index: number;
  }) => {
    console.log({ myTasks });

    const onEdit = () => {
      navigation.navigate(RoutesRootStack.MAIN_STACK, {
        screen: RoutesMainStack.ENTER_TASKIFY,
        params: { isEdit: true, item },
      });
    };

    const onDelete = async () => {
      await dispatch(deleteTask({ id: item?.id }));
    };

    return (
      <TaskItem item={item} index={index} onDelete={onDelete} onEdit={onEdit} />
    );
  };

  return (
    <View style={[styles.container]}>
      <Header
        hideLeftIcon
        title={greeting}
        containerStyle={[{ paddingBottom: moderateVerticalScale(8) }]}
        onPressRight={onCreateTask}
      />
      <SemiBoldText style={[styles.textCurrentTime]}>
        {`${translate('taskify.home.itsTime', {
          time: moment().format('dddd, MMMM D YYYY'),
          countTasks: task.length,
        })}`}
      </SemiBoldText>

      <View style={[styles.wrapperSearchInput]}>
        <TextInput
          style={[styles.searchInput]}
          placeholder={translate('taskify.home.searchPlaceHolder')}
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

      <Indicator visible={isLoading}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          data={myTasks}
          // renderItem={({ item, index }) => <Item item={item} index={index} />}
          renderItem={Item}
          ItemSeparatorComponent={() => (
            <View style={[{ marginTop: moderateVerticalScale(8) }]} />
          )}
          ListEmptyComponent={() => (
            <View style={[AppStyles.columnCenter]}>
              <RegularText style={[{ fontSize: 14 }]}>
                {translate('taskify.common.dataIsEmpty')}
              </RegularText>
            </View>
          )}
          style={[{ marginTop: moderateScale(16) }]}
          contentContainerStyle={[{ paddingBottom: insets.bottom * 4 }]}
          keyExtractor={keyExtractor}
        />
      </Indicator>
    </View>
  );
};

export default Home;
