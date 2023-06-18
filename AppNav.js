import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen'
import AdminScreen from './screens/AdminScreen'
import AddProduct from './screens/AddProduct'
import ViewProduct from './screens/ViewProduct'
import EditProduct from './screens/EditProduct'
import ShopScreen from './screens/ShopScreen'
import Scanner from './screens/Scanner'
import SalesScreen from './screens/SalesScreen'

import colors from './config/appcolors'

const Stack = createNativeStackNavigator();

export default function AppNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Scanner" component={Scanner} options={{ headerShown: false }} />
        <Stack.Screen 
            name="AdminScreen" 
            component={AdminScreen} 
            options={{
                title: 'Dashboard',
                headerStyle: {
                  backgroundColor: colors.dash,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }} 
        />
        <Stack.Screen 
            name="AddProduct" 
            component={AddProduct} 
            options={{
                title: 'Add Product',
                headerStyle: {
                  backgroundColor: colors.dash,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }} 
        />
        <Stack.Screen 
            name="ViewProduct" 
            component={ViewProduct} 
            options={{
                title: 'Product List',
                headerStyle: {
                  backgroundColor: colors.dash,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }} 
        />
        <Stack.Screen 
            name="EditProduct" 
            component={EditProduct} 
            options={{
                title: 'Edit Product Item',
                headerStyle: {
                  backgroundColor: colors.dash,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }} 
        />
        <Stack.Screen 
            name="ShopScreen" 
            component={ShopScreen} 
            options={{
                title: 'Sales Transactions',
                headerStyle: {
                  backgroundColor: colors.dash,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }} 
        />
        <Stack.Screen 
            name="SalesScreen" 
            component={SalesScreen} 
            options={{
                title: 'Sales History',
                headerStyle: {
                  backgroundColor: colors.dash,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
            }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
