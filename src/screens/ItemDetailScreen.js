import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Share } from "react-native";
import { Card, Button, Divider, Avatar } from "react-native-elements";
import ItemService from "../services/ItemService";
import { theme } from "../config/theme";

const ItemDetailScreen = ({ route, navigation }) => {
	const { item } = route.params;
	const [loading, setLoading] = useState(false);

	const handleEdit = () => {
		navigation.navigate("EditItem", { item });
	};

	const handleDelete = () => {
		Alert.alert(
			"Delete Item",
			`Are you sure you want to delete "${item.title}"?`,
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: deleteItem,
				},
			]
		);
	};

	const deleteItem = async () => {
		setLoading(true);
		try {
			await ItemService.deleteItem(item.id);
			Alert.alert("Success", "Item deleted successfully", [
				{
					text: "OK",
					onPress: () => navigation.navigate("ItemList"),
				},
			]);
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleShare = async () => {
		try {
			const result = await Share.share({
				message: `${item.title}\n\n${item.body}`,
				title: item.title,
			});
		} catch (error) {
			Alert.alert("Error", "Failed to share item");
		}
	};

	const formatDate = (dateString) => {
		// This is a mock function since JSONPlaceholder doesn't provide dates
		// Replace with actual date formatting based on your API
		return new Date().toLocaleDateString();
	};

	return (
		<ScrollView style={styles.container}>
			{/* Header Card */}
			<Card containerStyle={styles.headerCard}>
				<View style={styles.headerContent}>
					<Avatar
						rounded
						title={item.title?.charAt(0)?.toUpperCase() || "?"}
						size="large"
						backgroundColor={theme.colors.primary}
						containerStyle={styles.avatar}
					/>
					<View style={styles.headerText}>
						<Text style={styles.itemId}>ID: {item.id}</Text>
						<Text style={styles.userInfo}>
							User ID: {item.userId}
						</Text>
					</View>
				</View>
			</Card>

			{/* Content Card */}
			<Card containerStyle={styles.contentCard}>
				<Text style={styles.sectionTitle}>Title</Text>
				<Text style={styles.title}>{item.title || "No Title"}</Text>

				<Divider style={styles.divider} />

				<Text style={styles.sectionTitle}>Description</Text>
				<Text style={styles.description}>
					{item.body || "No description available"}
				</Text>

				<Divider style={styles.divider} />

				<View style={styles.metaInfo}>
					<View style={styles.metaItem}>
						<Text style={styles.metaLabel}>Created:</Text>
						<Text style={styles.metaValue}>{formatDate()}</Text>
					</View>
					<View style={styles.metaItem}>
						<Text style={styles.metaLabel}>Status:</Text>
						<Text style={[styles.metaValue, styles.statusActive]}>
							Active
						</Text>
					</View>
				</View>
			</Card>

			{/* Action Buttons Card */}
			<Card containerStyle={styles.actionsCard}>
				<Text style={styles.sectionTitle}>Actions</Text>

				<View style={styles.actionButtons}>
					<Button
						title="✏️ Edit"
						onPress={handleEdit}
						buttonStyle={[styles.actionButton, styles.editButton]}
						titleStyle={styles.actionButtonText}
					/>

					<Button
						title="🗑️ Delete"
						onPress={handleDelete}
						loading={loading}
						disabled={loading}
						buttonStyle={[styles.actionButton, styles.deleteButton]}
						titleStyle={styles.actionButtonText}
					/>
				</View>

				<View style={styles.actionButtons}>
					<Button
						title="📤 Share"
						onPress={handleShare}
						buttonStyle={[styles.actionButton, styles.shareButton]}
						titleStyle={styles.actionButtonText}
						type="outline"
					/>

					<Button
						title="📋 View List"
						onPress={() => navigation.navigate("ItemList")}
						buttonStyle={[styles.actionButton, styles.listButton]}
						titleStyle={styles.actionButtonText}
						type="outline"
					/>
				</View>
			</Card>

			{/* Info Card */}
			<Card containerStyle={styles.infoCard}>
				<Text style={styles.infoTitle}>💡 Quick Tips</Text>
				<Text style={styles.infoText}>
					• Use the Edit button to modify this item{"\n"}• Share
					button lets you share item details{"\n"}• Delete action
					cannot be undone{"\n"}• Navigate back to see all items
				</Text>
			</Card>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	headerCard: {
		margin: theme.spacing.md,
		marginBottom: theme.spacing.sm,
		borderRadius: theme.borderRadius.md,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
	},
	headerContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	avatar: {
		marginRight: theme.spacing.md,
	},
	headerText: {
		flex: 1,
	},
	itemId: {
		fontSize: 18,
		fontWeight: "bold",
		color: theme.colors.primary,
		marginBottom: theme.spacing.xs,
	},
	userInfo: {
		fontSize: 14,
		color: theme.colors.textSecondary,
	},
	contentCard: {
		margin: theme.spacing.md,
		marginBottom: theme.spacing.sm,
		borderRadius: theme.borderRadius.md,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: theme.colors.primary,
		marginBottom: theme.spacing.sm,
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		color: theme.colors.text,
		lineHeight: 28,
		marginBottom: theme.spacing.md,
	},
	description: {
		fontSize: 16,
		color: theme.colors.textSecondary,
		lineHeight: 24,
		marginBottom: theme.spacing.md,
	},
	divider: {
		backgroundColor: theme.colors.border,
		marginVertical: theme.spacing.md,
	},
	metaInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	metaItem: {
		flex: 1,
	},
	metaLabel: {
		fontSize: 14,
		color: theme.colors.textSecondary,
		marginBottom: theme.spacing.xs,
	},
	metaValue: {
		fontSize: 14,
		fontWeight: "600",
		color: theme.colors.text,
	},
	statusActive: {
		color: theme.colors.success,
	},
	actionsCard: {
		margin: theme.spacing.md,
		marginBottom: theme.spacing.sm,
		borderRadius: theme.borderRadius.md,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
	},
	actionButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: theme.spacing.md,
	},
	actionButton: {
		flex: 1,
		marginHorizontal: theme.spacing.xs,
		paddingVertical: theme.spacing.sm,
		borderRadius: theme.borderRadius.sm,
	},
	editButton: {
		backgroundColor: theme.colors.warning,
	},
	deleteButton: {
		backgroundColor: theme.colors.error,
	},
	shareButton: {
		borderColor: theme.colors.primary,
	},
	listButton: {
		borderColor: theme.colors.textSecondary,
	},
	actionButtonText: {
		fontSize: 14,
		fontWeight: "600",
	},
	infoCard: {
		margin: theme.spacing.md,
		marginBottom: theme.spacing.xl,
		borderRadius: theme.borderRadius.md,
		elevation: 1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.05,
		shadowRadius: 2,
	},
	infoTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: theme.colors.text,
		marginBottom: theme.spacing.sm,
	},
	infoText: {
		fontSize: 14,
		color: theme.colors.textSecondary,
		lineHeight: 20,
	},
});

export default ItemDetailScreen;
