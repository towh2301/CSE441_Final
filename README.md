# 📱 Simple CRUD Android App Template

A complete React Native CRUD (Create, Read, Update, Delete) application template with easy API integration, designed specifically for **Snack Expo** compatibility.

## 🚀 Features

-   ✅ **Complete CRUD Operations** - Create, Read, Update, Delete items
-   ✅ **Modern UI** - Clean, professional design with React Native Elements
-   ✅ **Easy API Integration** - Configurable API endpoints and services
-   ✅ **Search Functionality** - Search through items with real-time filtering
-   ✅ **Form Validation** - Client-side validation with error handling
-   ✅ **Navigation** - Stack navigation between screens
-   ✅ **Responsive Design** - Works on various screen sizes
-   ✅ **Error Handling** - Comprehensive error handling and user feedback
-   ✅ **Loading States** - Loading indicators for better UX
-   ✅ **Snack Expo Compatible** - Ready to run on Snack Expo

## 📱 Screens

### Bottom Tab Navigation

-   **Items Tab** - Contains all CRUD functionality
-   **Profile Tab** - User profile and settings

### Items Tab Screens:

1. **Home Screen** - Welcome screen with navigation options
2. **Item List Screen** - Display all items with search and refresh functionality
3. **Add Item Screen** - Form to create new items
4. **Edit Item Screen** - Form to update existing items
5. **Item Detail Screen** - Detailed view of a single item

### Profile Tab Screens:

6. **Profile Screen** - User profile with editable information, stats, and settings

## 🛠️ Project Structure

```
src/
├── config/
│   ├── api.js          # API configuration and axios setup
│   └── theme.js        # App theme colors and styling
├── screens/
│   ├── HomeScreen.js
│   ├── ItemListScreen.js
│   ├── AddItemScreen.js
│   ├── EditItemScreen.js
│   ├── ItemDetailScreen.js
│   └── ProfileScreen.js
├── components/
│   ├── LoadingSpinner.js
│   └── ErrorMessage.js
├── utils/
│   └── index.js        # Utility functions
└── services/
    └── ItemService.js  # API service for CRUD operations
```

## 🔧 How to Customize APIs

### 1. Update API Configuration

Edit `src/config/api.js`:

```javascript
const API_CONFIG = {
	// Change this to your API base URL
	BASE_URL: "https://your-api.com/api",

	// Update timeout as needed
	TIMEOUT: 10000,

	// Define your API endpoints
	ENDPOINTS: {
		ITEMS: "/items", // Your items endpoint
		USERS: "/users", // Your users endpoint
		// Add more endpoints as needed
	},
};
```

### 2. Modify Data Structure

Edit `src/services/ItemService.js` to match your API's data structure:

```javascript
// Example: If your API returns different field names
async createItem(itemData) {
  try {
    // Transform data to match your API
    const apiData = {
      name: itemData.title,           // API expects 'name' instead of 'title'
      description: itemData.body,     // API expects 'description' instead of 'body'
      owner_id: itemData.userId,      // API expects 'owner_id' instead of 'userId'
    };

    const response = await apiClient.post(API_CONFIG.ENDPOINTS.ITEMS, apiData);
    return response.data;
  } catch (error) {
    throw this.handleError(error);
  }
}
```

### 3. Add Authentication

Add authentication headers in `src/config/api.js`:

```javascript
// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
	(config) => {
		const token = getAuthToken(); // Your token retrieval function
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);
```

### 4. Customize Form Fields

Modify the form screens to match your data requirements:

-   Edit `AddItemScreen.js` and `EditItemScreen.js`
-   Add/remove input fields as needed
-   Update validation rules in `validateForm()` function

## 🎨 Customization Options

### Theme Colors

Edit `src/config/theme.js`:

```javascript
export const theme = {
	colors: {
		primary: "#YOUR_PRIMARY_COLOR",
		secondary: "#YOUR_SECONDARY_COLOR",
		// ... other colors
	},
};
```

### Screen Titles

Update navigation titles in `App.js`:

```javascript
<Stack.Screen
	name="ItemList"
	component={ItemListScreen}
	options={{ title: "Your Custom Title" }}
/>
```

## 📦 Installation & Setup

### For Snack Expo:

1. **Copy the code** - Copy all files to your Snack project
2. **Install dependencies** - Snack will automatically install the required packages
3. **Run the app** - Click the "Run" button in Snack

### For Local Development:

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## 📚 Dependencies

```json
{
	"expo": "~50.0.0",
	"react": "18.2.0",
	"react-native": "0.73.6",
	"@react-navigation/native": "^6.1.9",
	"@react-navigation/stack": "^6.3.20",
	"@react-navigation/bottom-tabs": "^6.5.11",
	"react-native-screens": "~3.29.0",
	"react-native-safe-area-context": "4.8.2",
	"react-native-gesture-handler": "~2.14.0",
	"axios": "^1.6.0",
	"react-native-elements": "^3.4.3",
	"react-native-vector-icons": "^10.0.3"
}
```

## 🔄 API Examples

The template uses JSONPlaceholder (https://jsonplaceholder.typicode.com) for demonstration. Here's how to adapt it to your API:

### Example API Responses

**GET /items**

```json
[
	{
		"id": 1,
		"title": "Sample Item",
		"body": "This is a sample description",
		"userId": 1
	}
]
```

**POST /items**

```json
{
	"title": "New Item",
	"body": "New item description",
	"userId": 1
}
```

### Common API Patterns

1. **REST API** - Already implemented
2. **GraphQL** - Replace axios calls with GraphQL queries
3. **Firebase** - Replace with Firebase SDK calls
4. **Custom API** - Modify endpoints and data transformation

## 🚨 Error Handling

The template includes comprehensive error handling:

-   **Network Errors** - Handles connection issues
-   **HTTP Errors** - Handles 4xx and 5xx responses
-   **Validation Errors** - Client-side form validation
-   **User Feedback** - Alert dialogs for success/error messages

## 🧪 Testing Your API

1. **Update API_CONFIG.BASE_URL** in `src/config/api.js`
2. **Test endpoints** individually using a tool like Postman
3. **Modify data structure** in ItemService.js to match your API
4. **Update form fields** to match your required data
5. **Test all CRUD operations** in the app

## 📖 Usage Examples

### Adding a New Field

1. **Update the form screens**:

```javascript
// In AddItemScreen.js and EditItemScreen.js
<Input
	label="Category"
	placeholder="Enter category"
	value={formData.category}
	onChangeText={(value) => handleInputChange("category", value)}
/>
```

2. **Update the service**:

```javascript
// In ItemService.js
async createItem(itemData) {
  const response = await apiClient.post(API_CONFIG.ENDPOINTS.ITEMS, {
    title: itemData.title,
    body: itemData.body,
    userId: itemData.userId,
    category: itemData.category, // New field
  });
  return response.data;
}
```

### Adding Search Parameters

```javascript
// In ItemService.js
async searchItems(query, filters = {}) {
  const params = new URLSearchParams({ q: query, ...filters });
  const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.ITEMS}?${params}`);
  return response.data;
}
```

## 🆘 Troubleshooting

### Common Issues:

1. **Network Error**: Check your API URL and internet connection
2. **CORS Issues**: Configure CORS on your server or use a proxy
3. **Authentication**: Ensure tokens are correctly set in headers
4. **Data Format**: Verify API response format matches expected structure

### Debug Tips:

-   Check console logs for API requests/responses
-   Use network tab in developer tools
-   Test API endpoints independently
-   Verify data transformation in services

## 🤝 Contributing

Feel free to customize this template according to your needs. The code is structured to be easily modifiable and extensible.

## 📄 License

Free to use for personal and commercial projects.

---

## 🎯 Quick Start Checklist

-   [ ] Copy code to Snack Expo
-   [ ] Update `BASE_URL` in `src/config/api.js`
-   [ ] Modify data structure in `ItemService.js`
-   [ ] Customize form fields in Add/Edit screens
-   [ ] Update theme colors if needed
-   [ ] Test all CRUD operations
-   [ ] Deploy to Expo or build APK

**Happy Coding! 🚀**
