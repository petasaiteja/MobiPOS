import { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native'

import colors from '../config/appcolors'
import Gap from '../components/Gap'
import { Context } from '../config/Context'
import Button from '../components/Button'

export default function AdminScreen({ navigation }) {
    const [totalSales, setTotalSales] = useState('0')
    const state = useContext(Context)

    useEffect(()=>{
        let total = 0, million = 1000000, billion = 1000000000
        state.sales.forEach(item=>{
            total += item.total
        })
        if(total < 1000){
            setTotalSales(`$${total.toFixed(1)}`)
        }else if (total >= 1000 && total < million ){
            total = (total / million).toFixed(1)
            total = `$${total}K`
            setTotalSales(total)
        }else if(total >= million && total < billion){
            total = (total / billion).toFixed(1)
            total = `$${total}M`
            setTotalSales(total)
        }
    }, [])

    const addProd = () => navigation.navigate('AddProduct')
    const viewProd = () => navigation.navigate('ViewProduct')
    const saleScreen = () => navigation.navigate('SalesScreen')

  return (
    <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
            <Gap />
            <View style={styles.salesview}>
                <Text style={styles.sales}>{totalSales}</Text>
                <Text style={styles.salesTitle}>Total Sales</Text>
            </View>
            <Gap height={50} />
            <View style={styles.salesview}>
                <Button name="Add Products" onPress={addProd} />
                <Gap />
                <Button name="View Products" onPress={viewProd} />
                <Gap />
                <Button name="Sales" onPress={saleScreen} />
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
    sales: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    salesview: {
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    salesTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.tomato
    }
})