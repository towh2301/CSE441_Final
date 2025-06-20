import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Card } from "react-native-elements";
import { theme } from "../config/theme";

const HomeScreen = ({ navigation }) => {
	const features = [
		{
			title: "View Items",
			description: "Browse all items in the database",
			action: () => navigation.navigate("ItemList"),
			color: theme.colors.primary,
		},
		{
			title: "Add New Item",
			description: "Create a new item",
			action: () => navigation.navigate("AddItem"),
			color: theme.colors.success,
		},
	];

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Welcome to CRUD App</Text>
				<Text style={styles.subtitle}>
					A simple template for Create, Read, Update, Delete
					operations
				</Text>
			</View>

			<View style={styles.featuresContainer}>
				{features.map((feature, index) => (
					<Card key={index} containerStyle={styles.featureCard}>
						<Text style={styles.featureTitle}>{feature.title}</Text>
						<Text style={styles.featureDescription}>
							{feature.description}
						</Text>
						<Button
							title="Go"
							buttonStyle={[
								styles.featureButton,
								{ backgroundColor: feature.color },
							]}
							onPress={feature.action}
						/>
					</Card>
				))}
			</View>

			<View style={styles.infoContainer}>
				<Card containerStyle={styles.infoCard}>
					<Text style={styles.infoTitle}>🔧 Easy to Customize</Text>
					<Text style={styles.infoText}>
						• Update API endpoints in src/config/api.js{"\n"}•
						Modify data models in src/services/ItemService.js{"\n"}•
						Change theme colors in src/config/theme.js{"\n"}• Add
						new screens in src/screens/
					</Text>
				</Card>

				<Card containerStyle={styles.infoCard}>
					<Text style={styles.infoTitle}>
						📱 Snack Expo Compatible
					</Text>
					<Text style={styles.infoText}>
						This template is optimized for Snack Expo. Just copy the
						code and run!
					</Text>
				</Card>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	header: {
		padding: theme.spacing.lg,
		alignItems: "center",
		backgroundColor: theme.colors.surface,
		marginBottom: theme.spacing.md,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: theme.colors.primary,
		textAlign: "center",
		marginBottom: theme.spacing.sm,
	},
	subtitle: {
		fontSize: 16,
		color: theme.colors.textSecondary,
		textAlign: "center",
		lineHeight: 22,
	},
	featuresContainer: {
		paddingHorizontal: theme.spacing.md,
		marginBottom: theme.spacing.lg,
	},
	featureCard: {
		borderRadius: theme.borderRadius.md,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		marginBottom: theme.spacing.md,
	},
	featureTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: theme.colors.text,
		marginBottom: theme.spacing.sm,
	},
	featureDescription: {
		fontSize: 16,
		color: theme.colors.textSecondary,
		marginBottom: theme.spacing.md,
		lineHeight: 22,
	},
	featureButton: {
		borderRadius: theme.borderRadius.sm,
		paddingVertical: theme.spacing.sm,
	},
	infoContainer: {
		paddingHorizontal: theme.spacing.md,
		paddingBottom: theme.spacing.xl,
	},
	infoCard: {
		borderRadius: theme.borderRadius.md,
		elevation: 1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.08,
		shadowRadius: 2,
		marginBottom: theme.spacing.md,
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

export default HomeScreen;
