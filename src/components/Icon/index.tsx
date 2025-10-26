import React, { forwardRef } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Foundation from 'react-native-vector-icons/Foundation'
import { IconProps as VectorIconProps } from 'react-native-vector-icons/Icon'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

type VectorIcons =
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Ionicons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'AntDesign'
  | 'Entypo'
  | 'SimpleLineIcons'
  | 'Octicons'
  | 'Foundation'
  | 'EvilIcons'

export interface IconProps extends VectorIconProps {
  type?: VectorIcons
}

const Icons = (props: IconProps, ref: React.LegacyRef<AntDesign>) => {
  const { type, name } = props

  const renderIconSelected = () => {
    const Tag = { JSX: <></> }

    switch (type) {
      case 'AntDesign':
        Tag.JSX = <AntDesign {...props} ref={ref} />
        break
      case 'Entypo':
        Tag.JSX = <Entypo {...props} ref={ref} />
        break
      case 'EvilIcons':
        Tag.JSX = <EvilIcons {...props} ref={ref} />
        break
      case 'Feather':
        Tag.JSX = <Feather {...props} ref={ref} />
        break
      case 'FontAwesome':
        Tag.JSX = <FontAwesome {...props} ref={ref} />
        break
      case 'FontAwesome5':
        Tag.JSX = <FontAwesome5 {...props} ref={ref} />
        break
      case 'Foundation':
        Tag.JSX = <Foundation {...props} ref={ref} />
        break
      case 'Ionicons':
        Tag.JSX = <Ionicons {...props} ref={ref} />
        break
      case 'MaterialCommunityIcons':
        Tag.JSX = <MaterialCommunityIcons {...props} ref={ref} />
        break
      case 'MaterialIcons':
        Tag.JSX = <MaterialIcons {...props} ref={ref} />
        break
      case 'Octicons':
        Tag.JSX = <Octicons {...props} ref={ref} />
        break
      case 'SimpleLineIcons':
        Tag.JSX = <SimpleLineIcons {...props} ref={ref} />
        break

      default:
        Tag.JSX = <MaterialIcons {...props} ref={ref} />
        break
    }

    return Tag.JSX
  }

  return <>{renderIconSelected()}</>
}

export default forwardRef(Icons)
