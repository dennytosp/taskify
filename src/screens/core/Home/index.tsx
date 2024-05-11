import { RoutesMainStack, RoutesRootStack } from '@/navigators/routes';
import { faker } from '@faker-js/faker';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components';
import { TaskItem } from '@/components/Item';
import { SemiBoldText } from '@/components/Text';
import { translate } from '@/translations/translate';
import { getGreeting } from '@/utils/helper';
import { moderateScale, moderateVerticalScale } from '@/utils/scale';
import { styles } from './style';

type NavigationProps =
  ReactNavigation.RootStackScreenProps<RoutesRootStack.BOTTOM_TAB_STACK>;

const DATA = [...Array(15).keys()].map((_, i) => {
  return {
    key: faker.string.uuid(),
    name: faker.person.jobTitle(),
    description: faker.lorem.paragraph(),
  };
});

const Home = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps['navigation']>();
  const greeting = getGreeting('Mad Dinh');

  const [searchKey, setSearchKey] = useState<string>();

  const onSearch = (text: string) => {
    setSearchKey(text);
  };

  const onCreateTask = () => {
    navigation.navigate(RoutesRootStack.MAIN_STACK, {
      screen: RoutesMainStack.ENTER_TASKIFY,
    });
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
        {`It's ${moment().format('dddd, MMMM D YYYY')} - 5 tasks`}
      </SemiBoldText>

      <View style={[styles.wrapperSearchInput]}>
        <TextInput
          style={[styles.searchInput]}
          placeholder={translate('taskify.home.searchPlaceHolder')}
          onChangeText={onSearch}
          value={searchKey}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        data={DATA}
        renderItem={({ item, index }) => <TaskItem item={item} index={index} />}
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

export default Home;
