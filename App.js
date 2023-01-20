import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Home from './components/Home';
import Details from './components/Details';
import Liked from './components/Liked';
import Profile from './components/Profile';
import colors from './assets/colors/colors';
import { Place } from './screens';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Tabs from './navigation/tabs';
// import OnboardingScreen from './screens/OnboardingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import AuthStack from './navigation/AuthStack';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				style: styles.tabBar,
				activeTintColor: colors.orange,
				inactiveTintColor: colors.gray,
				showLabel: false,
			}}>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<Entypo name="home" size={32} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Liked"
				component={Liked}
				options={{
					tabBarIcon: ({ color }) => (
						<Entypo name="heart" size={32} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="account" size={32} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const App = () => {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName={'LoginScreen'}>
					<Stack.Screen name="AuthStack" component={AuthStack} />
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
				<Stack.Screen name='Dashboard' component={Tabs} />

				<Stack.Screen name='Place' component={Place} />
				<Stack.Screen
					name="TabNavigator"
					component={TabNavigator}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Details"
					component={Details}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: colors.white,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
});


export default App;
