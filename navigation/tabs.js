import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens';
import { COLORS, icons } from '../constants';
import { HomeScreen } from '../components/HomeScreen';
import { ScheduleScreen } from '../components/ScheduleScreen';
import { PaymentScreen } from '../components/PaymentScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
// import Maps from '../components/Maps';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export const Payscreens = () =>  {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Homescreen" component={HomeScreen} />
      <Stack.Screen name="schedule" component={ScheduleScreen} />
      <Stack.Screen name="payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
}

const Tabs = () => {
	return (
		<Tab.Navigator
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
				name='Bookmark'
				component={Payscreens}
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
				name='Calendar'
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
				name='Plane'
				component={Dashboard}
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
