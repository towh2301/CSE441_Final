/**
 * API Configuration Template
 *
 * This file contains examples of how to configure different types of APIs.
 * Choose the configuration that matches your API and copy it to api.js
 */

// ========================================
// EXAMPLE 1: REST API Configuration
// ========================================
export const REST_API_CONFIG = {
	BASE_URL: "https://your-api.com/api/v1",
	TIMEOUT: 10000,
	ENDPOINTS: {
		ITEMS: "/items",
		USERS: "/users",
		AUTH: "/auth",
	},
	// Add authentication headers
	getAuthHeaders: (token) => ({
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	}),
};

// ========================================
// EXAMPLE 2: Laravel API Configuration
// ========================================
export const LARAVEL_API_CONFIG = {
	BASE_URL: "https://your-laravel-app.com/api",
	TIMEOUT: 15000,
	ENDPOINTS: {
		ITEMS: "/posts", // Laravel resource route
		USERS: "/users",
		AUTH: "/auth",
	},
	// Laravel Sanctum authentication
	getAuthHeaders: (token) => ({
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
		Accept: "application/json",
	}),
};

// ========================================
// EXAMPLE 3: Node.js/Express API Configuration
// ========================================
export const EXPRESS_API_CONFIG = {
	BASE_URL: "http://localhost:3000/api",
	TIMEOUT: 10000,
	ENDPOINTS: {
		ITEMS: "/items",
		USERS: "/users",
		AUTH: "/auth/login",
	},
	// JWT authentication
	getAuthHeaders: (token) => ({
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	}),
};

// ========================================
// EXAMPLE 4: Firebase/Firestore Configuration
// ========================================
export const FIREBASE_CONFIG = {
	// Note: For Firebase, you'll need to replace axios calls with Firebase SDK
	apiKey: "your-api-key",
	authDomain: "your-project.firebaseapp.com",
	projectId: "your-project-id",
	storageBucket: "your-project.appspot.com",
	messagingSenderId: "123456789",
	appId: "your-app-id",
};

// ========================================
// EXAMPLE 5: Custom API with Different Response Structure
// ========================================
export const CUSTOM_API_CONFIG = {
	BASE_URL: "https://api.example.com/v2",
	TIMEOUT: 12000,
	ENDPOINTS: {
		ITEMS: "/posts",
		USERS: "/members",
		AUTH: "/authenticate",
	},
	// Custom response structure
	RESPONSE_STRUCTURE: {
		// If your API wraps responses in a data property
		DATA_WRAPPER: "data",
		// If your API uses different field names
		FIELD_MAPPING: {
			id: "id",
			title: "name", // API uses 'name' instead of 'title'
			body: "description", // API uses 'description' instead of 'body'
			userId: "author_id", // API uses 'author_id' instead of 'userId'
		},
	},
};

// ========================================
// Data Transformation Examples
// ========================================

// Transform data from API format to app format
export const transformFromAPI = (apiData, fieldMapping) => {
	if (!apiData) return null;

	const transformed = {};
	Object.keys(fieldMapping).forEach((appField) => {
		const apiField = fieldMapping[appField];
		transformed[appField] = apiData[apiField];
	});

	return transformed;
};

// Transform data from app format to API format
export const transformToAPI = (appData, fieldMapping) => {
	if (!appData) return null;

	const transformed = {};
	Object.keys(fieldMapping).forEach((appField) => {
		const apiField = fieldMapping[appField];
		if (appData[appField] !== undefined) {
			transformed[apiField] = appData[appField];
		}
	});

	return transformed;
};

// ========================================
// Authentication Examples
// ========================================

// JWT Token Storage (AsyncStorage)
export const AuthHelpers = {
	// Store token
	setToken: async (token) => {
		try {
			await AsyncStorage.setItem("auth_token", token);
		} catch (error) {
			console.error("Error storing token:", error);
		}
	},

	// Get token
	getToken: async () => {
		try {
			return await AsyncStorage.getItem("auth_token");
		} catch (error) {
			console.error("Error retrieving token:", error);
			return null;
		}
	},

	// Remove token
	removeToken: async () => {
		try {
			await AsyncStorage.removeItem("auth_token");
		} catch (error) {
			console.error("Error removing token:", error);
		}
	},
};

// ========================================
// API Service Template for Different Backends
// ========================================

// Example service method for Laravel API
export const LaravelItemService = {
	async getAllItems() {
		try {
			const response = await apiClient.get("/posts");
			// Laravel returns data directly or in a 'data' wrapper
			return response.data.data || response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	},

	async createItem(itemData) {
		try {
			// Transform data to match Laravel expectations
			const laravelData = {
				title: itemData.title,
				content: itemData.body, // Laravel might use 'content' instead of 'body'
				user_id: itemData.userId, // Laravel uses snake_case
			};

			const response = await apiClient.post("/posts", laravelData);
			return response.data.data || response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	},
};

// Example service method for custom API
export const CustomItemService = {
	async getAllItems() {
		try {
			const response = await apiClient.get(
				CUSTOM_API_CONFIG.ENDPOINTS.ITEMS
			);
			const items =
				response.data[
					CUSTOM_API_CONFIG.RESPONSE_STRUCTURE.DATA_WRAPPER
				] || response.data;

			// Transform each item from API format to app format
			return items.map((item) =>
				transformFromAPI(
					item,
					CUSTOM_API_CONFIG.RESPONSE_STRUCTURE.FIELD_MAPPING
				)
			);
		} catch (error) {
			throw this.handleError(error);
		}
	},
};

// ========================================
// Usage Instructions
// ========================================

/*
TO USE THESE CONFIGURATIONS:

1. Choose the configuration that matches your API type
2. Copy the relevant config to src/config/api.js
3. Update the URLs and endpoints to match your API
4. Modify src/services/ItemService.js to use the new structure
5. Update form fields in screens if needed

EXAMPLE USAGE:

// In src/config/api.js
import { REST_API_CONFIG } from './apiExamples';

const API_CONFIG = {
  ...REST_API_CONFIG,
  BASE_URL: 'https://your-actual-api.com/api', // Update this
};

// In src/services/ItemService.js
// Add data transformation if needed
async createItem(itemData) {
  try {
    // Transform data if your API expects different field names
    const apiData = transformToAPI(itemData, FIELD_MAPPING);
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.ITEMS, apiData);
    
    // Transform response back to app format
    return transformFromAPI(response.data, FIELD_MAPPING);
  } catch (error) {
    throw this.handleError(error);
  }
}
*/
