import axios from "axios";

// Base configuration for API
const API_CONFIG = {
	// Change this URL to your actual API endpoint
	BASE_URL: "https://jsonplaceholder.typicode.com",

	// You can add more configuration here
	TIMEOUT: 10000,

	// Add your API endpoints here
	ENDPOINTS: {
		POSTS: "/posts",
		USERS: "/users",
		COMMENTS: "/comments",
	},
};

// Create axios instance with base configuration
const apiClient = axios.create({
	baseURL: API_CONFIG.BASE_URL,
	timeout: API_CONFIG.TIMEOUT,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor for adding auth tokens, etc.
apiClient.interceptors.request.use(
	(config) => {
		// Add auth token if available
		// const token = getAuthToken();
		// if (token) {
		//   config.headers.Authorization = `Bearer ${token}`;
		// }

		console.log("API Request:", config.method?.toUpperCase(), config.url);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
	(response) => {
		console.log("API Response:", response.status, response.config.url);
		return response;
	},
	(error) => {
		console.error("API Error:", error.response?.status, error.config?.url);

		// Handle common errors
		if (error.response?.status === 401) {
			// Handle unauthorized access
			console.log("Unauthorized access - redirect to login");
		} else if (error.response?.status === 500) {
			// Handle server errors
			console.log("Server error - show user friendly message");
		}

		return Promise.reject(error);
	}
);

export { apiClient, API_CONFIG };
