import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

// Import screens
import HomeScreen from "./src/screens/HomeScreen";
import ItemListScreen from "./src/screens/ItemListScreen";
import AddItemScreen from "./src/screens/AddItemScreen";
import EditItemScreen from "./src/screens/EditItemScreen";
import ItemDetailScreen from "./src/screens/ItemDetailScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

// Import theme
import { theme } from "./src/config/theme";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for Items (Home, List, Details, Add, Edit)
function ItemsStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.colors.primary,
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					fontWeight: "bold",
				},
			}}
		>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{ title: "CRUD App" }}
			/>
			<Stack.Screen
				name="ItemList"
				component={ItemListScreen}
				options={{ title: "Items" }}
			/>
			<Stack.Screen
				name="AddItem"
				component={AddItemScreen}
				options={{ title: "Add Item" }}
			/>
			<Stack.Screen
				name="EditItem"
				component={EditItemScreen}
				options={{ title: "Edit Item" }}
			/>
			<Stack.Screen
				name="ItemDetail"
				component={ItemDetailScreen}
				options={{ title: "Item Details" }}
			/>
		</Stack.Navigator>
	);
}

// Stack Navigator for Profile
function ProfileStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.colors.primary,
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					fontWeight: "bold",
				},
			}}
		>
			<Stack.Screen
				name="ProfileMain"
				component={ProfileScreen}
				options={{ title: "Profile" }}
			/>
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => {
							let iconName;

							if (route.name === "Items") {
								iconName = focused ? "list" : "list";
							} else if (route.name === "Profile") {
								iconName = focused
									? "person"
									: "person-outline";
							}

							return (
								<Icon
									name={iconName}
									size={size}
									color={color}
								/>
							);
						},
						tabBarActiveTintColor: theme.colors.primary,
						tabBarInactiveTintColor: theme.colors.textSecondary,
						tabBarStyle: {
							paddingBottom: 5,
							paddingTop: 5,
							height: 60,
						},
						tabBarLabelStyle: {
							fontSize: 12,
							fontWeight: "600",
						},
						headerShown: false,
					})}
				>
					<Tab.Screen
						name="Items"
						component={ItemsStack}
						options={{
							tabBarLabel: "Items",
						}}
					/>
					<Tab.Screen
						name="Profile"
						component={ProfileStack}
						options={{
							tabBarLabel: "Profile",
						}}
					/>
				</Tab.Navigator>
				<StatusBar style="light" />
			</NavigationContainer>
		</ThemeProvider>
	);
}
