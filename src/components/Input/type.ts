import {
  ImageRequireSource,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Source } from 'react-native-fast-image';

interface InputProps {
  title?: string;
  inputProps?: TextInputProps;
  placeHolder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  defaultValue?: string;
  isRequired?: boolean;
  isDisableInput?: boolean;
  isUsingModal?: boolean;
  isPassword?: boolean;
  leftIcon?: Source | ImageRequireSource;
  rightIcon?: Source | ImageRequireSource;
  hintError?: string;
  hintErrorEmpty?: string;
  handleChangeText?: (text: string) => void;
  onBlurInput?: () => void;
  onSubmit?: () => void;
  onPressInput?: () => void;
  onPressLeftInput?: () => void;
  onPressRightInput?: () => void;
  renderCustom?: () => JSX.Element;
}

interface InputRef {
  getErrorStatus: () => boolean;
  changeErrorStatus: (status: boolean) => void;
  changeValue: (val: string) => void;
  getValue: () => string;
  clearValue: () => void;
  getLengthCharacter: () => number;
  focus: () => void;
}

export type { InputProps, InputRef };
