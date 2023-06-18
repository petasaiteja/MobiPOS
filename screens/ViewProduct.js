import { useContext } from 'react'
import { 
    View, SafeAreaView, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity 
} from 'react-native'
import { Context } from '../config/Context'

import colors from '../config/appcolors'
import Gap from '../components/Gap'

export default function ViewProduct({ navigation }) {
    const state = useContext(Context)

    const editItem = item => navigation.navigate('EditProduct', {item})

    const renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={()=>editItem(item)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{ width: '80%' }}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text style={{ fontWeight: 'bold' }}>
                                Price: <Text style={styles.price}>{item.price}</Text>
                            </Text>
                        </View>
                        <View style={{ width: '20%' }}>
                            <Text style={{ fontWeight: 'bold' }}>Qty: {item.qty}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
  return (
    <SafeAreaView style={styles.container}>
        <Gap />
        <View style={{ flex: 1, padding: 10 }}>
            <FlatList data={state.products} renderItem={renderItem} keyExtractor={item=>item?.prodId} />
        </View>
        <Gap />
        <StatusBar backgroundColor={colors.appbg} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    item: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10
    },
    itemText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    price: { 
        color: colors.tomato, 
        fontWeight: 'bold' 
    }
})