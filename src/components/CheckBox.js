import React from 'react'
import {View,TouchableOpacity} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const CheckBox = ({value,onValueChange,style})=>{

    return <View>
        <TouchableOpacity onPress={onValueChange} style={style}>
            {value
            ? <MaterialCommunityIcons size={27} name="checkbox-marked-circle-outline"/>
            : <MaterialCommunityIcons size={27} name="checkbox-blank-circle-outline"/>
            }
        </TouchableOpacity>
    </View>
}

export default CheckBox