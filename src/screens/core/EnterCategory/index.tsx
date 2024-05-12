import React, { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button, Header, Input } from '@/components';
import { InputRef } from '@/components/Input/type';
import { CategoryItem } from '@/components/Item';
import { Modal, ModalRef } from '@/components/Modal';
import { RegularText } from '@/components/Text';
import { RoutesRootStack } from '@/navigators/routes';
import { EnterCategoryParams } from '@/navigators/stack/main';
import { AppStyles } from '@/styles';
import { translate } from '@/translations/translate';
import { styles } from './style';

type NavigationProps =
  ReactNavigation.RootStackScreenProps<RoutesRootStack.MAIN_STACK>;

const EnterCategory = () => {
  const navigation = useNavigation<NavigationProps['navigation']>();
  const route = useRoute<NavigationProps['route']>();
  const params = route.params as unknown as EnterCategoryParams;
  const { isEdit } = params;

  const nameCategoryRef = useRef<InputRef>(null);
  const listCategoriesModalRef = useRef<ModalRef>(null);

  useEffect(() => {
    if (isEdit && params?.item?.name) {
      nameCategoryRef.current?.changeValue(params.item.name);
    }
  }, []);

  const handleButton = () => {
    console.log('Pressed Button');
  };

  const onSelectCategory = (name: string) => {
    listCategoriesModalRef.current?.hideModal();
    nameCategoryRef.current?.changeValue(name);
  };

  const renderHeader = () => (
    <View style={[styles.wrapHeader]}>
      <RegularText style={[styles.textContent]}>
        {translate(
          isEdit
            ? 'taskify.categories.updateCategorySubtitle'
            : 'taskify.categories.createCategorySubtitle',
        )}
      </RegularText>
    </View>
  );

  const renderForm = () => (
    <View style={[]}>
      <Input
        ref={nameCategoryRef}
        isRequired={true}
        placeHolder={translate('taskify.random.work')}
        inputProps={{ maxLength: 200 }}
        title={translate('taskify.categories.nameCategory')}
        isUsingModal={true}
        onPressInput={() => listCategoriesModalRef.current?.showModal()}
        containerStyle={[{ marginBottom: 0 }]}
      />
    </View>
  );

  const renderButton = () => (
    <Button
      title={translate(isEdit ? 'system.edit' : 'system.create')}
      style={[styles.button]}
      onPress={handleButton}
    />
  );

  const renderFooter = () => (
    <View style={[AppStyles.rowCenter, { flex: 1 }]}>
      <RegularText style={[styles.textDidYouRemember]}>
        {translate('taskify.common.slogan')}
      </RegularText>
    </View>
  );

  return (
    <View style={[styles.container]}>
      <Header
        title={translate(
          isEdit
            ? 'taskify.categories.updateCategory'
            : 'taskify.categories.createCategory',
        )}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}>
        {renderHeader()}
        {renderForm()}
        {renderButton()}
        {renderFooter()}
      </ScrollView>

      <Modal
        ref={listCategoriesModalRef}
        children={() => (
          <CategoryItem
            onPress={onSelectCategory}
            onPressLeftHeader={() =>
              listCategoriesModalRef.current?.hideModal()
            }
          />
        )}
        isScroll={true}
        isFullScreen={true}
        style={[{ paddingVertical: 0 }]}
      />
    </View>
  );
};

export default EnterCategory;
