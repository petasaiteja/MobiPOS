import { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, Pressable, SafeAreaView, StatusBar, Alert } from 'react-native'

import { Context } from '../config/Context'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../config/appcolors'
import Gap from '../components/Gap';
import Button from '../components/Button';
import QRCode from 'react-native-qrcode-svg';

export default function EditProduct({ navigation, route }) {
    const [obj, setObj] = useState(route.params.item)
    const [toggle, setToggle] = useState(false)
    const [values, setValues] = useState({price: route.params.item.price, qty: route.params.item.qty})
    const [loading, setLoading] = useState(false)
    const onChange = obj => setValues({...values, ...obj})

    const state = useContext(Context)

    const onToggle = () => setToggle(!toggle)

    const submit = () => {
        setLoading(true)
        const d = new Date()
        const item = {
            ...obj, 
            ['price']: values.price, 
            ['qty']: values.qty, 
            ['date']: d.toDateString(),
            ['time']: d.toLocaleTimeString()
        }
        state.setProduct(item)
        setLoading(false)
        navigation.goBack()
    }

    const proceedDeletion = id => {
        state.deleteProd(id)
        navigation.goBack()
    }

    const deleteItem = id => {
        Alert.alert("Delete Product", "Do you want to delete Product?", [
            {text: "YES", onPress: ()=>proceedDeletion(id)},
            {text: "NO"}
        ])
    }

    useEffect(()=>{
        navigation.setOptions({
            headerRight: ()=> (
                <Pressable onPress={()=>deleteItem(route.params.item.id)}>
                    <MaterialIcons name="delete" size={24} color={colors.white} />
                </Pressable>
            )
        })
    })
  return (
    <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
            <Gap />
            <View style={{ width: '80%', alignSelf: 'center' }}>
                <Pressable onPress={onToggle}>
                <FontAwesome 
                    name={toggle ? "toggle-on" : "toggle-off"} 
                    size={24} 
                    color={toggle ? colors.appbg : 'black'} 
                />
                </Pressable>
            </View>
            <Gap />
            <View style={styles.form}>
                {
                toggle
                ?
                <View>
                    <Gap height={50} />
                    <View style={{ alignItems: 'center' }}>
                        <QRCode value={JSON.stringify(obj)} />
                    </View>
                </View>
                :
                <View>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Product Name</Text>
                        <TextInput 
                            value={route.params.item.name ?? ''}  
                            style={styles.textinput}  
                            editable={false}
                        />
                    </View>
                    <Gap />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Product Price</Text>
                        <TextInput 
                            value={values.price} 
                            onChangeText={text=>onChange({price: text})} 
                            style={styles.textinput} 
                            placeholder="Price" 
                        />
                    </View>
                    <Gap />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Product Qty</Text>
                        <TextInput 
                            value={values.qty} 
                            onChangeText={text=>onChange({qty: text})} 
                            style={styles.textinput} 
                            placeholder="Quantity" 
                        />
                    </View>
                    <Gap height={50} />
                    <Button name="Edit Product" loading={loading} onPress={submit} />
                </View>
                }
            </View>
        </View>
        <StatusBar backgroundColor={colors.appbg} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    form: {
        width: '80%',
        alignSelf: 'center',
    },
    textinput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10
    }
})