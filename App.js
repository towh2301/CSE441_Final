import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-elements";

// Import screens
import HomeScreen from "./src/screens/HomeScreen";
import ItemListScreen from "./src/screens/ItemListScreen";
import AddItemScreen from "./src/screens/AddItemScreen";
import EditItemScreen from "./src/screens/EditItemScreen";
import ItemDetailScreen from "./src/screens/ItemDetailScreen";

// Import theme
import { theme } from "./src/config/theme";

const Stack = createStackNavigator();

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Home"
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
						options={{ title: "CRUD App Template" }}
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
				<StatusBar style="light" />
			</NavigationContainer>
		</ThemeProvider>
	);
}
