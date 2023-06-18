import { useState, useEffect, useContext } from 'react'
import { 
  View, SafeAreaView, StyleSheet, TextInput, Pressable, FlatList, Text, Modal, Alert 
} from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import colors from '../config/appcolors'
import { Context } from '../config/Context'
import Button from '../components/Button';
import Gap from '../components/Gap';

import { printReceipt } from '../config/print'

export default function ShopScreen({ navigation }) {
  const [prodId, setProdId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [obj, setObj] = useState(null)
  const [mod, setMod] = useState(false)
  const toggleModal = () => setMod(!mod)

  const state = useContext(Context)

  const openScanner = () => navigation.navigate('Scanner')

  useEffect(()=>{
    navigation.setOptions({
      headerRight: ()=> (
        <Pressable onPress={openScanner}>
          <MaterialIcons name="qr-code-scanner" size={24} color={colors.white} />
        </Pressable>
      )
    })
  })

  const renderItem = ({item}) => {
    return (
      <View>
        <Pressable onLongPress={()=>removeItem(item)} onPress={()=>editQty(item)}>
          <View style={styles.item}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ width: '75%' }}>
                <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Unit Price:</Text> {item.price}</Text>
              </View>
              <View style={{ width: '20%' }}>
                <Text><Text style={{ fontWeight: 'bold' }}>Qty</Text>: {item.qty}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    )
  }

  const searchProd = () => {
    if(prodId){
      const findProd = state.products.find(prod=>Number(prodId) ? prod.prodId === Number(prodId) : prod.name.toLowerCase() === prodId.toLowerCase())
      if(findProd){
        const objItem = {
          id: findProd.id, 
          prodId: findProd.prodId, 
          name: findProd.name,
          price: Number(findProd.price),
          qty: 1
        }
        state.setCart(objItem)
      }
    }
  }

  const editQty = item => {
    toggleModal()
    setObj(item)
    setQuantity(item.qty.toString())
  }

  const saveEdit = () => {
    if(Number(quantity) && Number(quantity) > 0){
      const newItem = {...obj, ['qty']: Number(quantity)}
      state.setCart(newItem)
      setObj(null)
      setQuantity('')
      toggleModal()
    }
  }

  const proceedRemove = id => {
    state.removeItem(id)
  }

  const removeItem = item => {
    Alert.alert("Remove Item", `Do you want to remove ${item.name} from the cart?`, [
      {text: "YES", onPress: ()=>proceedRemove(item.prodId)},
      {text: "NO"}
    ])
  }

  const checkout = async() => {
    const d = new Date()
    const timeId = Math.random(Math.random() * 100000000)
    const saleItem = {cart: state.cart, date: d.toLocaleDateString(), time: d.toLocaleTimeString(), total: state.total, timeId}
    let names = []
    state.cart.forEach(item=>{
      const findP = state.products.find(p=>p.prodId === item.prodId)
      if(findP.qty < item.qty){
        names.push(item.name)
      }
    })
    if(names.length === 0){
      state.cart.forEach(item=>{
        let findP = state.products.find(p=>p.prodId === item.prodId)
        findP['qty'] = (Number(findP.qty) - Number(item.qty)).toString()
        state.upProd(findP)
      })
      state.upSales(saleItem)
      state.resetCart()
      setProdId('')
      printReceipt(saleItem.cart)
    }else{
      let string = ''
      names.forEach(n=>string += `${n},`)
      const message = `The following items ${string} have quantities greater than what is availabe in stock`
      Alert.alert("Cart Error", message, [{text: "OK"}])
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchView}>
          <View style={{ width: '70%' }}>
            <TextInput value={prodId} onChangeText={text=>setProdId(text)} 
              style={styles.textinput} placeholder="Search Product" 
            />
          </View>
          <View style={{ width: '20%' }}>
            <Button name="Go" bgColor="#8400FF" onPress={searchProd} />
          </View>
        </View>
      </View>

      <View style={{ flex: 6, borderWidth: 1, borderColor: '#ccc' }}>
        <Gap height={10} />
        <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
          <FlatList data={state.cart} renderItem={renderItem} keyExtractor={item=>item?.id} />
        </View>
        <Gap height={10} />
      </View>

      <View style={styles.header}>
        <View style={styles.searchView}>
          <View style={{ width: '60%' }}>
            <TextInput value={state.total.toString()} onChangeText={text=>setProdId(text)} editable={false}
              style={styles.textinput} 
            />
          </View>
          <View style={{ width: '30%' }}>
            <Button name="Checkout" bgColor="#8400FF" onPress={checkout} />
          </View>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={mod}
        animationType='slide'
      >
        <View style={styles.modalView}>
          <View style={{ position: 'absolute', right: 10, top: 10 }}>
            <Pressable onPress={toggleModal}>
              <Entypo name="cross" size={50} color="white" />
            </Pressable>
          </View>

          <View style={{ width: '80%' }}>
            <View>
              <TextInput value={obj?.name ?? ''} onChangeText={text=>setQuantity(text)}
                style={styles.textinput} editable={false}
              />
            </View>
            <Gap />
            <View>
              <TextInput value={quantity} onChangeText={text=>setQuantity(text)}
                style={styles.textinput} 
              />
            </View>
            <Gap />
            <Button name="Save" bgColor="#8400FF" onPress={saveEdit} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: colors.dashbg
  },
  form: {
    width: '80%',
    alignSelf: 'center',
  },
  header: { 
    flex: 1, 
    justifyContent: 'center' ,
    // backgroundColor: 'white', 
  },
  item: { 
    backgroundColor: colors.white, 
    padding: 10, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    marginBottom: 10
  },
  searchView: { 
    width: '90%', 
    alignSelf: 'center', 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  textinput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 8
  }
})