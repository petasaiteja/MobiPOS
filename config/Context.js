import { createContext, useState, useEffect } from 'react'
import { Alert } from 'react-native'
import config from './config'

const { getProdRef, inventoryRef, prodRef, onValue, push, salesRef, set } = config

export const Context = createContext({
    total: 0,
    cart: [],
    inventory: [],
    products: [],
    sales: [],
    deleteProd: (id) =>{},
    setCart: (item) =>{},
    resetCart: () =>{},
    removeItem: (id) =>{},
    setProduct: (item) =>{},
    pushProd: (item) =>{},
    upProd: (item) =>{},
    upSales: (item) =>{},
})

export default function Provider({ children }){
    const [total, setTotal] = useState(0)
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])
    const [inventory, setInventory] = useState([])
    const [sales, setSales] = useState([])

    const setBag = item => {
        if(cart.length === 0){
            setCart([item])
            let t = item.qty * item.price
            setTotal(t)
        }else{
            const findItem = cart.find(prod=>prod.prodId === item.prodId)
            if(findItem){
                let c = cart.map(prod=>{
                    if(prod.prodId === item.prodId){
                        prod['qty'] = item.qty
                    }
                    return prod
                })
                let t = 0
                c.forEach(prod=>t+= (prod.qty * prod.price))
                setCart(c)
                setTotal(t)
            }else{
                let t = 0
                setCart([...cart, item])
                const c = [...cart, item]
                c.forEach(prod=>t+= (prod.qty * prod.price))
                setTotal(t)
            }
        }
    }
    const resetCart = () => {
        setCart([])
        setTotal(0)
    }
    const removeItem = id => {
        const c = cart.filter(item => item.prodId !== id)
        setCart(c)
        if(c.length === 0){
            setTotal(0)
        }else{
            let t = 0
            c.forEach(prod=>t+= (prod.qty * prod.price))
            setTotal(t)
        }
    }
    const pushProd = item => {
        push(prodRef, item)
        .then(()=>{
            Alert.alert("Add Product Success", "Product Added successfully", [{text: "OK"}])
        })
        .catch(()=>{
            Alert.alert("Add Product Error", "Failed to add product", [{text: "OK"}])
        })
    }
    const setProduct = item => {
        const findProd = products.find(prod=>prod.prodId === item.prodId)
        if(findProd){
            set(getProdRef(item.id), item)
            .then(()=>{
                const obj = {
                    id: findProd.id,
                    prodId: findProd.prodId, 
                    name: findProd.name, 
                    oldPrice: findProd.price, 
                    newPrice: item.price,
                    oldQty: findProd.qty,
                    newQty: item.qty,
                    oldTime: findProd.time,
                    oldDate: findProd.date,
                    date: item.date, 
                    time: item.time
                }
                push(inventoryRef, obj)
                .then(()=>{
                    Alert.alert("Success", "Update successful", [
                        {text: "OK"}
                    ])
                })
                .catch(()=>{
                    Alert.alert("Error", "Failed to save updated inventory", [
                        {text: "OK"}
                    ])
                })
            })
            .catch(()=>{
                Alert.alert("Error", "Unable to update prodcut", [
                    {text: "OK"}
                ])
            })
        }else{
            Alert.alert("Error", "Unable to find product", [
                {text: "OK"}
            ])
        }
    }
    const upProd = item => {
        set(getProdRef(item.id), item)
    }
    const deleteProd = id => {
        set(getProdRef(id), null)
        .then(()=>{
            Alert.alert("Delete Product Success", "Product successfully deleted", [{text: "OK"}])
        })
        .catch(()=>{
            Alert.alert("Delete Product Error", "Failed to delete product", [{text: "OK"}])
        })
    }
    const upSales = item => push(salesRef, item)


    useEffect(()=>{
        onValue(prodRef, snapshot=>{
            if(snapshot.exists()){
                const data = snapshot.val()
                const keys = Object.keys(data)
                const arr = []
                keys.forEach(key => arr.push({...data[key], id: key}))
                setProducts(arr)
            }else{
                setProducts([])
            }
        })

        onValue(inventoryRef, snapshot=>{
            if(snapshot.exists()){
                const data = snapshot.val()
                const keys = Object.keys(data)
                const arr = []
                keys.forEach(key => arr.push({...data[key], id: key}))
                setInventory(arr)
            }else{
                setInventory([])
            }
        })

        onValue(salesRef, snapshot=>{
            if(snapshot.exists()){
                const data = snapshot.val()
                const keys = Object.keys(data)
                const arr = []
                keys.forEach(key => arr.push({...data[key], id: key}))
                setSales(arr)
            }else{
                setSales([])
            }
        })
    }, [])

    return <Context.Provider value={{
        total,
        cart,
        inventory,
        products,
        sales,
        deleteProd,
        setCart: setBag,
        resetCart,
        removeItem,
        pushProd,
        setProduct,
        upProd,
        upSales
    }}>{children}</Context.Provider>
}