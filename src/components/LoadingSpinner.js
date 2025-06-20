import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { theme } from "../config/theme";

const LoadingSpinner = ({
	size = "large",
	color = theme.colors.primary,
	text = "Loading...",
	showText = true,
}) => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={size} color={color} />
			{showText && <Text style={styles.text}>{text}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing.lg,
	},
	text: {
		marginTop: theme.spacing.md,
		fontSize: 16,
		color: theme.colors.textSecondary,
		textAlign: "center",
	},
});

export default LoadingSpinner;
