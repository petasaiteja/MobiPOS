import { useState, useContext } from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar, TextInput, Alert } from 'react-native'

import colors from '../config/appcolors'
import Gap from '../components/Gap'
import Button from '../components/Button'
import { Context } from '../config/Context'

export default function AddProduct({navigation}) {
    const [values, setValues] = useState({name: '', price: '', qty: ''})
    const onChange = obj => setValues({...values, ...obj})
    const [loading, setLoading] = useState(false)
    const state = useContext(Context)

    const submit = () => {
        setLoading(true)
        const {name, price, qty} = values
        if(name && price && qty){
            if(Number(price) && Number(qty)){
                if(name.length > 1){
                    const id = Math.floor(Math.random() * 100000)
                    const d = new Date()
                    const obj = {name, price, qty, prodId: id, date: d.toDateString(), time: d.toLocaleTimeString()}
                    state.pushProd(obj)
                    setValues({name: '', price: '', qty: ''})
                    setLoading(false)
                }else{
                    Alert.alert("Add Product Error", "Product name must be more than one character", [{text: "OK"}])
                    setLoading(false)
                }
            }else{
                Alert.alert("Add Product Error", "Price and quantity must be a number character", [{text: "OK"}])
                setLoading(false)
            }
        }else{
            Alert.alert("Add Product Error", "All the fields are required", [{text: "OK"}])
            setLoading(false)
        }
    }
  return (
    <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
            <Gap />
            <View style={styles.form}>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Product Name</Text>
                    <TextInput 
                        value={values.name} 
                        onChangeText={text=>onChange({name: text})} 
                        style={styles.textinput} 
                        placeholder="Product Name" 
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
                <Button name="Add Product" loading={loading} onPress={submit} />
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