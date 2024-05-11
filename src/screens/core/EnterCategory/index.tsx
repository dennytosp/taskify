import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { Button, Header, Input } from '@/components';
import { InputRef } from '@/components/Input/type';
import { RegularText, SemiBoldText } from '@/components/Text';
import { RoutesRootStack } from '@/navigators/routes';
import { AppStyles } from '@/styles';
import { translate } from '@/translations/translate';
import { styles } from './style';

type NavigationProps =
  ReactNavigation.RootStackScreenProps<RoutesRootStack.MAIN_STACK>;

const EnterCategory = () => {
  const navigation = useNavigation<NavigationProps['navigation']>();

  const nameTaskRef = useRef<InputRef>(null);

  const handleButton = () => {
    console.log('Pressed Button');
  };

  const onNavigateSignIn = () => {
    navigation.goBack();
  };

  const renderHeader = () => (
    <View style={[styles.wrapHeader]}>
      <RegularText style={[styles.textContent]}>
        {translate('taskify.categories.enterSubtitle')}
      </RegularText>
    </View>
  );

  const renderForm = () => (
    <View style={[]}>
      <Input
        ref={nameTaskRef}
        isRequired={true}
        placeHolder={translate('taskify.random.work')}
        inputProps={{ maxLength: 200 }}
        title={translate('taskify.categories.nameCategory')}
        containerStyle={[{ marginBottom: 0 }]}
      />
    </View>
  );

  const renderButton = () => (
    <Button
      title={translate('system.create')}
      style={[styles.button]}
      onPress={handleButton}
    />
  );

  const renderFooter = () => (
    <View style={[AppStyles.rowCenter, { flex: 1 }]}>
      <RegularText style={[styles.textDidYouRemember]}>
        {translate('taskify.enterTaskify.createTaskSuggest')}
      </RegularText>
      <TouchableOpacity onPress={onNavigateSignIn}>
        <SemiBoldText style={[styles.textSignIn]}>
          {` ${translate('taskify.bottomTab.tab1')}`}
        </SemiBoldText>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container]}>
      <Header title={translate('taskify.categories.createCategory')} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}>
        {renderHeader()}
        {renderForm()}
        {renderButton()}
        {renderFooter()}
      </ScrollView>
    </View>
  );
};

export default EnterCategory;
