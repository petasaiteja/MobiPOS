import { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Text, SafeAreaView, ScrollView, FlatList, Pressable } from 'react-native'
import { Context } from '../config/Context'

import colors from '../config/appcolors'
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const names = {jan: 'January', feb: 'February', mar: 'March', apr: 'April', may: 'May', jun: 'June', 
jul: 'July', aug: 'August', sep: 'September', oct: 'October', nov: 'November', dec: 'December'}

const monthColors = {jan: '#AF3800', feb: '#00B04C', mar: '#0093B0', apr: '#FE621D', may: '#004FB0', 
jun: '#B000A4', jul: '#B00029', aug: '#00CFC1', sep: '#B00000', 
oct: '#00B06A', nov: '#FFA81C', dec: '#1C8AFF'}

export default function SalesScreen({ navigation }) {
    const state = useContext(Context)
    const [month, setMonth] = useState({jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, 
        jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0})
    const [sales, setSales] = useState([])
    const [saved, setSaved] = useState([])
    const [total, setTotal] = useState(0)
    const [isDate, setIsDate] = useState(false)
    const yy = new Date().getFullYear()

    const toggleDate = () => setIsDate(!isDate)

    const handleConfirm = (date) => {
        let new_d = new Date(date).toLocaleDateString()
        const arr = saved.filter(item=>item.date === new_d)
        setSales(arr)
        toggleDate()
    };

    useEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>(
                <Pressable onPress={toggleDate}>
                    <AntDesign name="calendar" size={24} color="#fff" />
                </Pressable>
            )
        })
    })

    useEffect(()=>{
        let t = 0
        const sales_array = []
        let jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jun = 0, jul = 0, 
        aug = 0, sep = 0, oct = 0, nov = 0, dec = 0, million = 1000000, billion = 1000000000
        state.sales.forEach(item=>{
            let d_s = item.date.split('/')
            let m = Number(d_s[0])
            let y = Number(d_s[2])
            if(y === yy){
                sales_array.push(item)
                t += item.total
                if(m === 1) jan += item.total
                if(m === 2) feb += item.total
                if(m === 3) mar += item.total
                if(m === 4) apr += item.total
                if(m === 5) may += item.total
                if(m === 6) jun += item.total
                if(m === 7) jul += item.total
                if(m === 8) aug += item.total
                if(m === 9) sep += item.total
                if(m === 10) oct += item.total
                if(m === 11) nov += item.total
                if(m === 12) dec += item.total
            }
        })
        if(t < 1000){
            setTotal(`$${t.toFixed(1)}`)
            setMonth({jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec})
        }else if (t >= 1000 && t < million ){
            t = (t / million).toFixed(1)
            t = `$${t}K`
            setTotal(t)
            jan = (jan/million).toFixed(1)
            feb = (feb/million).toFixed(1)
            mar = (mar/million).toFixed(1)
            apr = (apr/million).toFixed(1)
            may = (may/million).toFixed(1)
            jun = (jun/million).toFixed(1)
            jul = (jul/million).toFixed(1)
            aug = (aug/million).toFixed(1)
            sep = (sep/million).toFixed(1)
            oct = (oct/million).toFixed(1)
            nov = (nov/million).toFixed(1)
            dec = (dec/million).toFixed(1)
            setMonth({jan: `${jan}K`, feb: `${feb}K`, mar: `${mar}K`, apr: `${apr}K`, may: `${may}K`, 
            jun: `${jun}K`, jul: `${jul}K`, aug: `${aug}K`, sep: `${sep}K`, oct: `${oct}K`, 
            nov: `${nov}K`, dec: `${dec}K`})
        }else if(t >= million && t < billion){
            total = (t / billion).toFixed(1)
            total = `$${t}M`
            setTotal(t)
            jan = (jan/billion).toFixed(1)
            feb = (feb/billion).toFixed(1)
            mar = (mar/billion).toFixed(1)
            apr = (apr/billion).toFixed(1)
            may = (may/billion).toFixed(1)
            jun = (jun/billion).toFixed(1)
            jul = (jul/billion).toFixed(1)
            aug = (aug/billion).toFixed(1)
            sep = (sep/billion).toFixed(1)
            oct = (oct/billion).toFixed(1)
            nov = (nov/billion).toFixed(1)
            dec = (dec/billion).toFixed(1)
            setMonth({jan: `${jan}M`, feb: `${feb}M`, mar: `${mar}M`, apr: `${apr}M`, may: `${may}M`, 
            jun: `${jun}M`, jul: `${jul}M`, aug: `${aug}M`, sep: `${sep}M`, oct: `${oct}M`, 
            nov: `${nov}M`, dec: `${dec}M`})
        }
        setSales(sales_array)
        setSaved(sales_array)
    }, [])

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    const scrollList = months.map(m=>{
        return (
            <View style={[styles.scrollItem, {backgroundColor: monthColors[m]}]} key={m}>
                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>{names[m]}</Text>
                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>${month[m]}</Text>
            </View>
        )
    })

    const renderItem = ({item}) => {
        let t = 0
        item.cart.forEach(el=>t+= el.qty)
        return (
            <View style={styles.item}>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>Total Items:</Text> {t} - <Text style={{ fontWeight: 'bold' }}>Total Price:</Text> {item.total.toFixed(2)}
                </Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Purchased Date:</Text> {item.date} {item.time}</Text>
            </View>
        )
    }
  return (
    <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{width: '90%', alignSelf: 'center'}}>
                    <ScrollView horizontal={true}>
                        {scrollList}
                    </ScrollView>
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.salesview}>
                    <Text style={styles.sales}>{total}</Text>
                    <Text style={styles.salesTitle}>Total Sales of {yy}</Text>
                </View>
            </View>

            <View style={{ flex: 5, borderTopWidth: 1, borderTopColor: '#ccc', marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', margin: 5 }}>Sales Items</Text>
                <View style={{ flex: 1, width: '90%', alignSelf: 'center', padding: 10}}>
                    <FlatList 
                        data={sales}
                        renderItem={renderItem}
                        key={item=>item?.timeId} 
                    />
                </View>
            </View>
            <DateTimePickerModal
                isVisible={isDate}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={toggleDate}
            />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    item: { 
        backgroundColor: '#fff', 
        padding: 10, 
        borderWidth: 1, 
        borderColor: '#ccc',
        marginBottom: 10,
        borderRadius: 3 
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
    },
    scrollItem: {
        minWidth: 120,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 10,
        marginTop: 5,
        marginBottom: 15,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3
    } 
})