import { apiClient, API_CONFIG } from "../config/api";

/**
 * ItemService - Handles all CRUD operations for items
 *
 * This service uses JSONPlaceholder API as an example.
 * Replace the endpoints and data structure according to your actual API.
 */
class ItemService {
	/**
	 * Get all items
	 * @returns {Promise} Array of items
	 */
	async getAllItems() {
		try {
			const response = await apiClient.get(API_CONFIG.ENDPOINTS.POSTS);
			return response.data;
		} catch (error) {
			console.error("Error fetching items:", error);
			throw this.handleError(error);
		}
	}

	/**
	 * Get item by ID
	 * @param {number} id - Item ID
	 * @returns {Promise} Single item object
	 */
	async getItemById(id) {
		try {
			const response = await apiClient.get(
				`${API_CONFIG.ENDPOINTS.POSTS}/${id}`
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching item:", error);
			throw this.handleError(error);
		}
	}

	/**
	 * Create new item
	 * @param {Object} itemData - Item data to create
	 * @returns {Promise} Created item object
	 */
	async createItem(itemData) {
		try {
			const response = await apiClient.post(
				API_CONFIG.ENDPOINTS.POSTS,
				itemData
			);
			return response.data;
		} catch (error) {
			console.error("Error creating item:", error);
			throw this.handleError(error);
		}
	}

	/**
	 * Update existing item
	 * @param {number} id - Item ID to update
	 * @param {Object} itemData - Updated item data
	 * @returns {Promise} Updated item object
	 */
	async updateItem(id, itemData) {
		try {
			const response = await apiClient.put(
				`${API_CONFIG.ENDPOINTS.POSTS}/${id}`,
				itemData
			);
			return response.data;
		} catch (error) {
			console.error("Error updating item:", error);
			throw this.handleError(error);
		}
	}

	/**
	 * Partially update item
	 * @param {number} id - Item ID to update
	 * @param {Object} itemData - Partial item data
	 * @returns {Promise} Updated item object
	 */
	async patchItem(id, itemData) {
		try {
			const response = await apiClient.patch(
				`${API_CONFIG.ENDPOINTS.POSTS}/${id}`,
				itemData
			);
			return response.data;
		} catch (error) {
			console.error("Error patching item:", error);
			throw this.handleError(error);
		}
	}

	/**
	 * Delete item
	 * @param {number} id - Item ID to delete
	 * @returns {Promise} Deletion confirmation
	 */
	async deleteItem(id) {
		try {
			const response = await apiClient.delete(
				`${API_CONFIG.ENDPOINTS.POSTS}/${id}`
			);
			return response.data;
		} catch (error) {
			console.error("Error deleting item:", error);
			throw this.handleError(error);
		}
	}

	/**
	 * Search items
	 * @param {string} query - Search query
	 * @returns {Promise} Array of matching items
	 */
	async searchItems(query) {
		try {
			// This is a mock implementation since JSONPlaceholder doesn't support search
			// Replace with your actual search endpoint
			const response = await apiClient.get(
				`${API_CONFIG.ENDPOINTS.POSTS}?q=${query}`
			);
			return response.data;
		} catch (error) {
			console.error("Error searching items:", error);
			throw this.handleError(error);
		}
	}

	/**
	 * Handle API errors and convert them to user-friendly messages
	 * @param {Error} error - The error object
	 * @returns {Error} Processed error
	 */
	handleError(error) {
		if (error.response) {
			// Server responded with error status
			const status = error.response.status;
			const message = error.response.data?.message || "An error occurred";

			switch (status) {
				case 400:
					return new Error(
						"Invalid request. Please check your input."
					);
				case 401:
					return new Error("Unauthorized. Please log in again.");
				case 403:
					return new Error("Access denied.");
				case 404:
					return new Error("Item not found.");
				case 422:
					return new Error(
						"Validation error. Please check your input."
					);
				case 500:
					return new Error("Server error. Please try again later.");
				default:
					return new Error(message);
			}
		} else if (error.request) {
			// Network error
			return new Error("Network error. Please check your connection.");
		} else {
			// Other error
			return new Error("An unexpected error occurred.");
		}
	}
}

// Export singleton instance
export default new ItemService();
