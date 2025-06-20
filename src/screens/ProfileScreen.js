import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Alert,
	TouchableOpacity,
} from "react-native";
import { Avatar, Card, ListItem, Button, Input } from "react-native-elements";
import { theme } from "../config/theme";

const ProfileScreen = ({ navigation }) => {
	const [user, setUser] = useState({
		name: "John Doe",
		email: "john.doe@example.com",
		phone: "+1 (555) 123-4567",
		location: "New York, USA",
		bio: "Software Developer passionate about mobile app development",
		joinDate: "2024-01-15",
	});

	const [editMode, setEditMode] = useState(false);
	const [tempUser, setTempUser] = useState({ ...user });

	const handleEdit = () => {
		setEditMode(true);
		setTempUser({ ...user });
	};

	const handleSave = () => {
		setUser({ ...tempUser });
		setEditMode(false);
		Alert.alert("Success", "Profile updated successfully!");
	};

	const handleCancel = () => {
		setTempUser({ ...user });
		setEditMode(false);
	};

	const handleInputChange = (field, value) => {
		setTempUser((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const profileStats = [
		{ title: "Items Created", value: "24", icon: "add-circle-outline" },
		{ title: "Items Updated", value: "18", icon: "create-outline" },
		{ title: "Items Deleted", value: "6", icon: "trash-outline" },
	];

	const settingsItems = [
		{
			title: "Notifications",
			icon: "notifications-outline",
			hasSwitch: true,
		},
		{ title: "Dark Mode", icon: "moon-outline", hasSwitch: true },
		{ title: "Language", icon: "language-outline", subtitle: "English" },
		{ title: "Privacy Settings", icon: "shield-outline" },
		{ title: "Help & Support", icon: "help-circle-outline" },
		{ title: "About", icon: "information-circle-outline" },
	];

	return (
		<ScrollView style={styles.container}>
			{/* Profile Header */}
			<Card containerStyle={styles.profileCard}>
				<View style={styles.profileHeader}>
					<Avatar
						rounded
						size="large"
						source={{
							uri: "https://randomuser.me/api/portraits/men/1.jpg",
						}}
						title={user.name
							.split(" ")
							.map((n) => n[0])
							.join("")}
						containerStyle={styles.avatar}
					/>
					<View style={styles.profileInfo}>
						{editMode ? (
							<Input
								value={tempUser.name}
								onChangeText={(value) =>
									handleInputChange("name", value)
								}
								containerStyle={styles.editInput}
								inputStyle={styles.editInputText}
							/>
						) : (
							<Text style={styles.userName}>{user.name}</Text>
						)}
						{editMode ? (
							<Input
								value={tempUser.email}
								onChangeText={(value) =>
									handleInputChange("email", value)
								}
								containerStyle={styles.editInput}
								inputStyle={styles.editInputTextSmall}
							/>
						) : (
							<Text style={styles.userEmail}>{user.email}</Text>
						)}
					</View>
				</View>

				{editMode ? (
					<View style={styles.editButtons}>
						<Button
							title="Save"
							onPress={handleSave}
							buttonStyle={[styles.editButton, styles.saveButton]}
							titleStyle={styles.editButtonText}
						/>
						<Button
							title="Cancel"
							onPress={handleCancel}
							buttonStyle={[
								styles.editButton,
								styles.cancelButton,
							]}
							titleStyle={[
								styles.editButtonText,
								styles.cancelButtonText,
							]}
							type="outline"
						/>
					</View>
				) : (
					<Button
						title="Edit Profile"
						onPress={handleEdit}
						buttonStyle={styles.editProfileButton}
						titleStyle={styles.editProfileButtonText}
						type="outline"
					/>
				)}
			</Card>
			{/* Profile Details */}
			<Card containerStyle={styles.detailsCard}>
				<Text style={styles.sectionTitle}>Profile Details</Text>

				<View style={styles.detailItem}>
					<Text style={styles.detailLabel}>Phone:</Text>
					{editMode ? (
						<Input
							value={tempUser.phone}
							onChangeText={(value) =>
								handleInputChange("phone", value)
							}
							containerStyle={styles.detailEditInput}
							inputStyle={styles.detailEditInputText}
						/>
					) : (
						<Text style={styles.detailValue}>{user.phone}</Text>
					)}
				</View>

				<View style={styles.detailItem}>
					<Text style={styles.detailLabel}>Location:</Text>
					{editMode ? (
						<Input
							value={tempUser.location}
							onChangeText={(value) =>
								handleInputChange("location", value)
							}
							containerStyle={styles.detailEditInput}
							inputStyle={styles.detailEditInputText}
						/>
					) : (
						<Text style={styles.detailValue}>{user.location}</Text>
					)}
				</View>

				<View style={styles.detailItem}>
					<Text style={styles.detailLabel}>Bio:</Text>
					{editMode ? (
						<Input
							value={tempUser.bio}
							onChangeText={(value) =>
								handleInputChange("bio", value)
							}
							multiline
							numberOfLines={3}
							containerStyle={styles.detailEditInput}
							inputStyle={styles.detailEditInputText}
						/>
					) : (
						<Text style={styles.detailValue}>{user.bio}</Text>
					)}
				</View>

				<View style={styles.detailItem}>
					<Text style={styles.detailLabel}>Member Since:</Text>
					<Text style={styles.detailValue}>
						{new Date(user.joinDate).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</Text>
				</View>
			</Card>
			{/* Stats */}
			<Card containerStyle={styles.statsCard}>
				<Text style={styles.sectionTitle}>Activity Stats</Text>
				<View style={styles.statsContainer}>
					{profileStats.map((stat, index) => (
						<View key={index} style={styles.statItem}>
							<Text style={styles.statValue}>{stat.value}</Text>
							<Text style={styles.statTitle}>{stat.title}</Text>
						</View>
					))}
				</View>
			</Card>
			{/* Settings */}
			<Card containerStyle={styles.settingsCard}>
				<Text style={styles.sectionTitle}>Settings</Text>
				{settingsItems.map((item, index) => (
					<ListItem key={index} bottomDivider onPress={() => {}}>
						<ListItem.Content>
							<ListItem.Title style={styles.settingTitle}>
								{item.title}
							</ListItem.Title>
							{item.subtitle && (
								<ListItem.Subtitle
									style={styles.settingSubtitle}
								>
									{item.subtitle}
								</ListItem.Subtitle>
							)}
						</ListItem.Content>
						<ListItem.Chevron />
					</ListItem>
				))}
			</Card>{" "}
			{/* Action Buttons */}
			<Card containerStyle={styles.actionsCard}>
				<Button
					title="View My Items"
					onPress={() =>
						navigation.navigate("Items", { screen: "ItemList" })
					}
					buttonStyle={[styles.actionButton, styles.primaryButton]}
					titleStyle={styles.actionButtonText}
				/>

				<Button
					title="Create New Item"
					onPress={() =>
						navigation.navigate("Items", { screen: "AddItem" })
					}
					buttonStyle={[styles.actionButton, styles.secondaryButton]}
					titleStyle={styles.actionButtonText}
				/>

				<Button
					title="Sign Out"
					onPress={() =>
						Alert.alert(
							"Sign Out",
							"Are you sure you want to sign out?"
						)
					}
					buttonStyle={[styles.actionButton, styles.signOutButton]}
					titleStyle={styles.actionButtonText}
					type="outline"
				/>
			</Card>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	profileCard: {
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
	profileHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: theme.spacing.md,
	},
	avatar: {
		marginRight: theme.spacing.md,
	},
	profileInfo: {
		flex: 1,
	},
	userName: {
		fontSize: 24,
		fontWeight: "bold",
		color: theme.colors.text,
		marginBottom: theme.spacing.xs,
	},
	userEmail: {
		fontSize: 16,
		color: theme.colors.textSecondary,
	},
	editInput: {
		marginBottom: 0,
		paddingHorizontal: 0,
	},
	editInputText: {
		fontSize: 24,
		fontWeight: "bold",
		color: theme.colors.text,
	},
	editInputTextSmall: {
		fontSize: 16,
		color: theme.colors.textSecondary,
	},
	editButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	editButton: {
		flex: 1,
		marginHorizontal: theme.spacing.xs,
		paddingVertical: theme.spacing.sm,
		borderRadius: theme.borderRadius.sm,
	},
	saveButton: {
		backgroundColor: theme.colors.success,
	},
	cancelButton: {
		borderColor: theme.colors.textSecondary,
	},
	editButtonText: {
		fontSize: 14,
		fontWeight: "600",
	},
	cancelButtonText: {
		color: theme.colors.textSecondary,
	},
	editProfileButton: {
		borderColor: theme.colors.primary,
		paddingVertical: theme.spacing.sm,
		borderRadius: theme.borderRadius.sm,
	},
	editProfileButtonText: {
		color: theme.colors.primary,
		fontSize: 16,
		fontWeight: "600",
	},
	detailsCard: {
		margin: theme.spacing.md,
		marginTop: 0,
		borderRadius: theme.borderRadius.md,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.08,
		shadowRadius: 2,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: theme.colors.text,
		marginBottom: theme.spacing.md,
	},
	detailItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: theme.spacing.md,
	},
	detailLabel: {
		fontSize: 16,
		fontWeight: "600",
		color: theme.colors.text,
		width: 80,
	},
	detailValue: {
		flex: 1,
		fontSize: 16,
		color: theme.colors.textSecondary,
		lineHeight: 22,
	},
	detailEditInput: {
		flex: 1,
		marginBottom: 0,
		paddingHorizontal: 0,
	},
	detailEditInputText: {
		fontSize: 16,
		color: theme.colors.textSecondary,
	},
	statsCard: {
		margin: theme.spacing.md,
		marginTop: 0,
		borderRadius: theme.borderRadius.md,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.08,
		shadowRadius: 2,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	statItem: {
		alignItems: "center",
	},
	statValue: {
		fontSize: 28,
		fontWeight: "bold",
		color: theme.colors.primary,
		marginBottom: theme.spacing.xs,
	},
	statTitle: {
		fontSize: 12,
		color: theme.colors.textSecondary,
		textAlign: "center",
	},
	settingsCard: {
		margin: theme.spacing.md,
		marginTop: 0,
		borderRadius: theme.borderRadius.md,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.08,
		shadowRadius: 2,
	},
	settingTitle: {
		fontSize: 16,
		color: theme.colors.text,
	},
	settingSubtitle: {
		fontSize: 14,
		color: theme.colors.textSecondary,
	},
	actionsCard: {
		margin: theme.spacing.md,
		marginTop: 0,
		marginBottom: theme.spacing.xl,
		borderRadius: theme.borderRadius.md,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.08,
		shadowRadius: 2,
	},
	actionButton: {
		borderRadius: theme.borderRadius.sm,
		paddingVertical: theme.spacing.md,
		marginBottom: theme.spacing.md,
	},
	primaryButton: {
		backgroundColor: theme.colors.primary,
	},
	secondaryButton: {
		backgroundColor: theme.colors.success,
	},
	signOutButton: {
		borderColor: theme.colors.error,
		marginBottom: 0,
	},
	actionButtonText: {
		fontSize: 16,
		fontWeight: "600",
	},
});

export default ProfileScreen;
