/**
 * Utility functions for the CRUD app
 */

// Date formatting utilities
export const formatDate = (dateString) => {
	if (!dateString) return "N/A";

	try {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	} catch (error) {
		return "Invalid Date";
	}
};

export const formatDateTime = (dateString) => {
	if (!dateString) return "N/A";

	try {
		const date = new Date(dateString);
		return date.toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	} catch (error) {
		return "Invalid Date";
	}
};

// String utilities
export const truncateText = (text, maxLength = 100) => {
	if (!text) return "";
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength).trim() + "...";
};

export const capitalizeFirstLetter = (string) => {
	if (!string) return "";
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getInitials = (name) => {
	if (!name) return "?";

	const words = name.split(" ");
	if (words.length === 1) {
		return words[0].charAt(0).toUpperCase();
	}

	return words
		.slice(0, 2)
		.map((word) => word.charAt(0).toUpperCase())
		.join("");
};

// Validation utilities
export const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const validateRequired = (value) => {
	return value && value.toString().trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
	return value && value.toString().trim().length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
	return !value || value.toString().length <= maxLength;
};

// Array utilities
export const sortByField = (array, field, ascending = true) => {
	return [...array].sort((a, b) => {
		const aValue = a[field] || "";
		const bValue = b[field] || "";

		if (ascending) {
			return aValue.toString().localeCompare(bValue.toString());
		} else {
			return bValue.toString().localeCompare(aValue.toString());
		}
	});
};

export const filterBySearch = (
	array,
	searchQuery,
	searchFields = ["title", "body"]
) => {
	if (!searchQuery.trim()) return array;

	const query = searchQuery.toLowerCase();
	return array.filter((item) => {
		return searchFields.some((field) => {
			const fieldValue = item[field];
			return (
				fieldValue &&
				fieldValue.toString().toLowerCase().includes(query)
			);
		});
	});
};

// Storage utilities (for caching, preferences, etc.)
export const storage = {
	// Simple memory cache
	cache: new Map(),

	set: (key, value, ttl = 300000) => {
		// Default 5 minutes TTL
		const expiry = Date.now() + ttl;
		storage.cache.set(key, { value, expiry });
	},

	get: (key) => {
		const item = storage.cache.get(key);
		if (!item) return null;

		if (Date.now() > item.expiry) {
			storage.cache.delete(key);
			return null;
		}

		return item.value;
	},

	remove: (key) => {
		storage.cache.delete(key);
	},

	clear: () => {
		storage.cache.clear();
	},
};

// Network utilities
export const checkNetworkConnectivity = async () => {
	try {
		const response = await fetch("https://www.google.com/favicon.ico", {
			method: "HEAD",
			mode: "no-cors",
		});
		return true;
	} catch (error) {
		return false;
	}
};

// Debounce utility for search
export const debounce = (func, delay) => {
	let timeoutId;
	return (...args) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func.apply(null, args), delay);
	};
};

// Generate random ID (for offline usage)
export const generateId = () => {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Color utilities
export const getRandomColor = () => {
	const colors = [
		"#FF6B6B",
		"#4ECDC4",
		"#45B7D1",
		"#96CEB4",
		"#FFEAA7",
		"#DDA0DD",
		"#98D8C8",
		"#F7DC6F",
	];
	return colors[Math.floor(Math.random() * colors.length)];
};

// Alert utilities
export const showConfirmDialog = (title, message, onConfirm, onCancel) => {
	return new Promise((resolve) => {
		Alert.alert(title, message, [
			{
				text: "Cancel",
				onPress: () => {
					if (onCancel) onCancel();
					resolve(false);
				},
				style: "cancel",
			},
			{
				text: "Confirm",
				onPress: () => {
					if (onConfirm) onConfirm();
					resolve(true);
				},
			},
		]);
	});
};

// Form utilities
export const createFormValidator = (rules) => {
	return (formData) => {
		const errors = {};

		Object.keys(rules).forEach((field) => {
			const fieldRules = rules[field];
			const value = formData[field];

			fieldRules.forEach((rule) => {
				if (errors[field]) return; // Skip if already has error

				switch (rule.type) {
					case "required":
						if (!validateRequired(value)) {
							errors[field] =
								rule.message || `${field} is required`;
						}
						break;
					case "minLength":
						if (!validateMinLength(value, rule.value)) {
							errors[field] =
								rule.message ||
								`${field} must be at least ${rule.value} characters`;
						}
						break;
					case "maxLength":
						if (!validateMaxLength(value, rule.value)) {
							errors[field] =
								rule.message ||
								`${field} must be no more than ${rule.value} characters`;
						}
						break;
					case "email":
						if (value && !validateEmail(value)) {
							errors[field] =
								rule.message || "Invalid email format";
						}
						break;
					case "custom":
						if (!rule.validator(value, formData)) {
							errors[field] = rule.message || "Invalid value";
						}
						break;
				}
			});
		});

		return errors;
	};
};

// Example usage of form validator:
export const itemFormRules = {
	title: [
		{ type: "required", message: "Title is required" },
		{
			type: "minLength",
			value: 3,
			message: "Title must be at least 3 characters",
		},
		{
			type: "maxLength",
			value: 100,
			message: "Title must be no more than 100 characters",
		},
	],
	body: [
		{ type: "required", message: "Description is required" },
		{
			type: "minLength",
			value: 10,
			message: "Description must be at least 10 characters",
		},
	],
};

export const validateItemForm = createFormValidator(itemFormRules);
