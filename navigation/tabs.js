import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens';
import { COLORS, icons } from '../constants';
import { HomeScreen } from '../components/HomeScreen';
import { ScheduleScreen } from '../components/ScheduleScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import Profile from '../components/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductsList } from '../screens/ProductsList';
import { ProductDetails } from '../screens/ProductDetails';
import { Cart } from '../screens/Cart';
import { CartProvider } from "../CartContext.js";
import { CartIcon } from "../components/CartIcon.js";
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const BlogStack = createNativeStackNavigator();

const Blog = () => {
	return (
		<CartProvider>
			<NavigationContainer independent={true}>
			<BlogStack.Navigator screenOptions={{ headerShown: false }} independent={true} >
				<BlogStack.Screen name="Products" component={ProductsList} options={({ navigation }) => ({ title: 'Products', headerRight: () => <CartIcon navigation={navigation} /> })} />
				<BlogStack.Screen name="ProductDetails" component={ProductDetails} options={({ navigation }) => ({ title: 'Products', headerRight: () => <CartIcon navigation={navigation} /> })} />
				<BlogStack.Screen name="Cart" component={Cart} options={({ navigation }) => ({ title: 'Products', headerRight: () => <CartIcon navigation={navigation} /> })} />
			</BlogStack.Navigator>
			</NavigationContainer>
		</CartProvider>
	);
};


const Tabs = () => {
	return (
		<Tab.Navigator independent={true}
			tabBarOptions={{
				showLabel: false,
				style: {
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					elevation: 0,
					backgroundColor: COLORS.black,
					borderTopColor: 'transparent',
					height: 50,
				},
			}}>
			<Tab.Screen
				name='Dashboard'
				component={Dashboard}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Image
								source={icons.maps}
								resizeMode='contain'
								style={{
									width: 30,
									height: 30,
									tintColor: focused ? COLORS.blue : COLORS.gray,
								}}
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name='VR'
				component={Profile}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Image
								source={icons.bookmark}
								resizeMode='contain'
								style={{
									width: 30,
									height: 30,
									tintColor: focused ? COLORS.blue : COLORS.gray,
								}}
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name='Explore'
				component={ExploreScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Image
								source={icons.calendar}
								resizeMode='contain'
								style={{
									width: 30,
									height: 30,
									tintColor: focused ? COLORS.blue : COLORS.gray,
								}}
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name='Packages'
				component={Blog}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Image
								source={icons.plane}
								resizeMode='contain'
								style={{
									width: 30,
									height: 30,
									tintColor: focused ? COLORS.blue : COLORS.gray,
								}}
							/>
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	shadow: {
		shadowColor: COLORS.blue,
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
});

export default Tabs;
