import {
    View, Text, TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native'
import colors from '../config/appcolors'

export default function Button({name, onPress, loading, bgColor, textColor}) {
  return (
    <TouchableOpacity style={{ width: '100%' }} onPress={()=> onPress ? onPress() : null }>
        <View style={[styles.container, {backgroundColor: bgColor ?? styles.container.backgroundColor}]}>
            { 
                loading && loading === true
                ?
                <ActivityIndicator color="white" size="large" />
                :
                <Text style={[styles.text, {color: textColor ?? styles.text.color}]}>{name ?? 'Button'}</Text>
            }
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 12,
        borderRadius: 3,
        backgroundColor: colors.appbg,
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})