import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	RefreshControl,
	Alert,
	TouchableOpacity,
} from "react-native";
import { SearchBar, ListItem, FAB, Avatar } from "react-native-elements";
import ItemService from "../services/ItemService";
import { theme } from "../config/theme";

const ItemListScreen = ({ navigation }) => {
	const [items, setItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		loadItems();
	}, []);

	useEffect(() => {
		// Filter items based on search query
		if (searchQuery.trim() === "") {
			setFilteredItems(items);
		} else {
			const filtered = items.filter(
				(item) =>
					item.title
						?.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					item.body?.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredItems(filtered);
		}
	}, [searchQuery, items]);

	const loadItems = async () => {
		try {
			setLoading(true);
			const data = await ItemService.getAllItems();
			setItems(data);
			setFilteredItems(data);
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setLoading(false);
		}
	};

	const onRefresh = async () => {
		setRefreshing(true);
		await loadItems();
		setRefreshing(false);
	};

	const handleDelete = (item) => {
		Alert.alert(
			"Delete Item",
			`Are you sure you want to delete "${item.title}"?`,
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: () => deleteItem(item.id),
				},
			]
		);
	};

	const deleteItem = async (id) => {
		try {
			await ItemService.deleteItem(id);
			setItems(items.filter((item) => item.id !== id));
			Alert.alert("Success", "Item deleted successfully");
		} catch (error) {
			Alert.alert("Error", error.message);
		}
	};

	const renderItem = ({ item }) => (
		<ListItem
			bottomDivider
			onPress={() => navigation.navigate("ItemDetail", { item })}
			containerStyle={styles.listItem}
		>
			<Avatar
				rounded
				title={item.title?.charAt(0)?.toUpperCase() || "?"}
				size="medium"
				backgroundColor={theme.colors.primary}
			/>
			<ListItem.Content>
				<ListItem.Title style={styles.itemTitle} numberOfLines={1}>
					{item.title || "No Title"}
				</ListItem.Title>
				<ListItem.Subtitle
					style={styles.itemSubtitle}
					numberOfLines={2}
				>
					{item.body || "No description available"}
				</ListItem.Subtitle>
			</ListItem.Content>
			<View style={styles.actionButtons}>
				<TouchableOpacity
					style={[styles.actionButton, styles.editButton]}
					onPress={() => navigation.navigate("EditItem", { item })}
				>
					<Text style={styles.actionButtonText}>✏️</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.actionButton, styles.deleteButton]}
					onPress={() => handleDelete(item)}
				>
					<Text style={styles.actionButtonText}>🗑️</Text>
				</TouchableOpacity>
			</View>
		</ListItem>
	);

	const renderEmptyComponent = () => (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyTitle}>No Items Found</Text>
			<Text style={styles.emptySubtitle}>
				{searchQuery
					? "Try adjusting your search terms"
					: "Tap the + button to add your first item"}
			</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<SearchBar
				placeholder="Search items..."
				onChangeText={setSearchQuery}
				value={searchQuery}
				containerStyle={styles.searchContainer}
				inputContainerStyle={styles.searchInputContainer}
				lightTheme
				round
			/>

			<FlatList
				data={filteredItems}
				keyExtractor={(item) =>
					item.id?.toString() || Math.random().toString()
				}
				renderItem={renderItem}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				ListEmptyComponent={!loading ? renderEmptyComponent : null}
				contentContainerStyle={
					filteredItems.length === 0 ? styles.emptyList : null
				}
			/>

			<FAB
				icon={{ name: "add", color: "white" }}
				color={theme.colors.success}
				placement="bottomRight"
				onPress={() => navigation.navigate("AddItem")}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	searchContainer: {
		backgroundColor: theme.colors.surface,
		borderBottomColor: theme.colors.border,
		borderTopColor: theme.colors.border,
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
	},
	searchInputContainer: {
		backgroundColor: theme.colors.background,
	},
	listItem: {
		paddingVertical: theme.spacing.md,
		paddingHorizontal: theme.spacing.md,
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: theme.colors.text,
		marginBottom: theme.spacing.xs,
	},
	itemSubtitle: {
		fontSize: 14,
		color: theme.colors.textSecondary,
		lineHeight: 18,
	},
	actionButtons: {
		flexDirection: "row",
		alignItems: "center",
	},
	actionButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: theme.spacing.xs,
	},
	editButton: {
		backgroundColor: theme.colors.warning,
	},
	deleteButton: {
		backgroundColor: theme.colors.error,
	},
	actionButtonText: {
		fontSize: 16,
	},
	emptyList: {
		flexGrow: 1,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: theme.spacing.xl,
	},
	emptyTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: theme.colors.textSecondary,
		marginBottom: theme.spacing.sm,
	},
	emptySubtitle: {
		fontSize: 16,
		color: theme.colors.textSecondary,
		textAlign: "center",
		lineHeight: 22,
	},
});

export default ItemListScreen;
