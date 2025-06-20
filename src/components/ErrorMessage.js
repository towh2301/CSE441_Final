import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../config/theme";

const ErrorMessage = ({
	error,
	onRetry,
	showRetry = true,
	title = "Something went wrong",
}) => {
	const errorMessage = error?.message || "An unexpected error occurred";

	return (
		<View style={styles.container}>
			<Text style={styles.errorIcon}>⚠️</Text>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.message}>{errorMessage}</Text>

			{showRetry && onRetry && (
				<TouchableOpacity style={styles.retryButton} onPress={onRetry}>
					<Text style={styles.retryText}>Try Again</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing.xl,
	},
	errorIcon: {
		fontSize: 48,
		marginBottom: theme.spacing.md,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: theme.colors.error,
		textAlign: "center",
		marginBottom: theme.spacing.sm,
	},
	message: {
		fontSize: 16,
		color: theme.colors.textSecondary,
		textAlign: "center",
		lineHeight: 22,
		marginBottom: theme.spacing.lg,
	},
	retryButton: {
		backgroundColor: theme.colors.primary,
		paddingHorizontal: theme.spacing.lg,
		paddingVertical: theme.spacing.md,
		borderRadius: theme.borderRadius.sm,
	},
	retryText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
});

export default ErrorMessage;
