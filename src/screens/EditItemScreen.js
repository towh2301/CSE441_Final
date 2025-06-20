import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Alert,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { Input, Button, Card } from "react-native-elements";
import ItemService from "../services/ItemService";
import { theme } from "../config/theme";

const EditItemScreen = ({ route, navigation }) => {
	const { item } = route.params;

	const [formData, setFormData] = useState({
		title: item.title || "",
		body: item.body || "",
		userId: item.userId || 1,
	});
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));

		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({
				...prev,
				[field]: null,
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.title.trim()) {
			newErrors.title = "Title is required";
		} else if (formData.title.length < 3) {
			newErrors.title = "Title must be at least 3 characters";
		}

		if (!formData.body.trim()) {
			newErrors.body = "Description is required";
		} else if (formData.body.length < 10) {
			newErrors.body = "Description must be at least 10 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) {
			return;
		}

		setLoading(true);
		try {
			const updatedItem = await ItemService.updateItem(item.id, formData);
			Alert.alert("Success", "Item updated successfully!", [
				{
					text: "OK",
					onPress: () => navigation.goBack(),
				},
			]);
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleReset = () => {
		setFormData({
			title: item.title || "",
			body: item.body || "",
			userId: item.userId || 1,
		});
		setErrors({});
	};

	const hasChanges = () => {
		return (
			formData.title !== (item.title || "") ||
			formData.body !== (item.body || "") ||
			formData.userId !== (item.userId || 1)
		);
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
			>
				<Card containerStyle={styles.formCard}>
					<Text style={styles.formTitle}>Edit Item</Text>
					<Text style={styles.formSubtitle}>
						Update the details below to modify the item
					</Text>

					<View style={styles.itemInfo}>
						<Text style={styles.itemInfoLabel}>
							Item ID: {item.id}
						</Text>
					</View>

					<Input
						label="Title"
						placeholder="Enter item title"
						value={formData.title}
						onChangeText={(value) =>
							handleInputChange("title", value)
						}
						errorMessage={errors.title}
						containerStyle={styles.inputContainer}
						leftIcon={{
							type: "material",
							name: "title",
							color: theme.colors.primary,
						}}
					/>

					<Input
						label="Description"
						placeholder="Enter item description"
						value={formData.body}
						onChangeText={(value) =>
							handleInputChange("body", value)
						}
						errorMessage={errors.body}
						multiline
						numberOfLines={4}
						containerStyle={styles.inputContainer}
						inputStyle={styles.multilineInput}
						leftIcon={{
							type: "material",
							name: "description",
							color: theme.colors.primary,
						}}
					/>

					<Input
						label="User ID"
						placeholder="Enter user ID"
						value={formData.userId.toString()}
						onChangeText={(value) =>
							handleInputChange("userId", parseInt(value) || 1)
						}
						keyboardType="numeric"
						containerStyle={styles.inputContainer}
						leftIcon={{
							type: "material",
							name: "person",
							color: theme.colors.primary,
						}}
					/>

					<View style={styles.buttonContainer}>
						<Button
							title="Update Item"
							onPress={handleSubmit}
							loading={loading}
							disabled={loading || !hasChanges()}
							buttonStyle={[
								styles.button,
								styles.submitButton,
								!hasChanges() && !loading
									? styles.disabledButton
									: null,
							]}
							titleStyle={styles.buttonText}
						/>

						<Button
							title="Reset Changes"
							onPress={handleReset}
							disabled={loading || !hasChanges()}
							buttonStyle={[styles.button, styles.resetButton]}
							titleStyle={[
								styles.buttonText,
								styles.resetButtonText,
							]}
							type="outline"
						/>
					</View>

					{!hasChanges() && (
						<Text style={styles.noChangesText}>
							No changes detected. Modify the fields above to
							enable update.
						</Text>
					)}
				</Card>

				<Card containerStyle={styles.helpCard}>
					<Text style={styles.helpTitle}>ℹ️ Edit Information</Text>
					<Text style={styles.helpText}>
						• Make changes to any field you want to update{"\n"}•
						The update button will be enabled when changes are
						detected{"\n"}• Use "Reset Changes" to revert to
						original values{"\n"}• All fields are required for
						successful update
					</Text>
				</Card>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: theme.spacing.xl,
	},
	formCard: {
		margin: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
	},
	formTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: theme.colors.text,
		textAlign: "center",
		marginBottom: theme.spacing.sm,
	},
	formSubtitle: {
		fontSize: 16,
		color: theme.colors.textSecondary,
		textAlign: "center",
		marginBottom: theme.spacing.md,
		lineHeight: 22,
	},
	itemInfo: {
		backgroundColor: theme.colors.background,
		padding: theme.spacing.md,
		borderRadius: theme.borderRadius.sm,
		marginBottom: theme.spacing.lg,
	},
	itemInfoLabel: {
		fontSize: 14,
		color: theme.colors.textSecondary,
		fontWeight: "600",
		textAlign: "center",
	},
	inputContainer: {
		marginBottom: theme.spacing.md,
	},
	multilineInput: {
		textAlignVertical: "top",
		paddingTop: theme.spacing.sm,
	},
	buttonContainer: {
		marginTop: theme.spacing.md,
	},
	button: {
		borderRadius: theme.borderRadius.sm,
		paddingVertical: theme.spacing.md,
		marginBottom: theme.spacing.md,
	},
	submitButton: {
		backgroundColor: theme.colors.warning,
	},
	disabledButton: {
		backgroundColor: theme.colors.textSecondary,
	},
	resetButton: {
		borderColor: theme.colors.textSecondary,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "600",
	},
	resetButtonText: {
		color: theme.colors.textSecondary,
	},
	noChangesText: {
		fontSize: 14,
		color: theme.colors.textSecondary,
		textAlign: "center",
		fontStyle: "italic",
		marginTop: theme.spacing.sm,
	},
	helpCard: {
		margin: theme.spacing.md,
		marginTop: 0,
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
	helpTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: theme.colors.text,
		marginBottom: theme.spacing.sm,
	},
	helpText: {
		fontSize: 14,
		color: theme.colors.textSecondary,
		lineHeight: 20,
	},
});

export default EditItemScreen;
