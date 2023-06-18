import {View, SafeAreaView, Text, StyleSheet, StatusBar} from 'react-native'
import Button from '../components/Button'
import colors from '../config/appcolors'
import Gap from '../components/Gap'

export default function HomeScreen({ navigation }) {
    const shop = () => navigation.navigate('ShopScreen')
    const admin = () => navigation.navigate('AdminScreen')
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={styles.container}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', textTransform: 'uppercase' }}>Welcome To MobiPOS</Text>
            <Gap height={50} />

            <View style={{ width: '80%', alignSelf: 'center' }}>
            <Button name="Shop" onPress={shop} />
            <Gap height={30} />
            <Button name="Admin" onPress={admin} />
            </View>
        </View>
        <StatusBar backgroundColor={colors.appbg} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})