# 🚀 Quick Setup Guide for Snack Expo

This guide will help you quickly set up the CRUD app template in Snack Expo.

## Step 1: Create New Snack Project

1. Go to [snack.expo.dev](https://snack.expo.dev)
2. Click "Create a new Snack"
3. Choose "Blank" template

## Step 2: Copy Files

Copy all the files from this template to your Snack project:

### Required Files Structure:

```
/
├── App.js
├── package.json
├── app.json
├── babel.config.js
└── src/
    ├── config/
    │   ├── api.js
    │   ├── theme.js
    │   └── apiExamples.js
    ├── services/
    │   └── ItemService.js
    ├── screens/
    │   ├── HomeScreen.js
    │   ├── ItemListScreen.js
    │   ├── AddItemScreen.js
    │   ├── EditItemScreen.js
    │   └── ItemDetailScreen.js
    ├── components/
    │   ├── LoadingSpinner.js
    │   └── ErrorMessage.js
    └── utils/
        └── index.js
```

## Step 3: Update Dependencies

Replace the content of `package.json` with the provided version to ensure all required dependencies are included.

## Step 4: Customize Your API (Optional)

### Option A: Use Default (JSONPlaceholder)

The template works out of the box with JSONPlaceholder for testing.

### Option B: Use Your Own API

Edit `src/config/api.js`:

```javascript
const API_CONFIG = {
	BASE_URL: "https://your-api.com/api", // Change this
	// ... rest of config
};
```

## Step 5: Run the App

1. Click the "Run" button in Snack
2. Scan the QR code with Expo Go app on your phone
3. The app should load and show the home screen

## Step 6: Test Features

Test all CRUD operations:

-   ✅ View items list
-   ✅ Add new item
-   ✅ Edit existing item
-   ✅ View item details
-   ✅ Delete item
-   ✅ Search functionality

## Common Issues in Snack

### Issue 1: Dependencies Not Loading

**Solution**: Make sure all dependencies in `package.json` are Expo-compatible versions.

### Issue 2: Navigation Issues

**Solution**: Ensure React Navigation dependencies are correctly installed.

### Issue 3: API Calls Not Working

**Solution**:

-   Check if your API supports CORS
-   Verify the API URL is correct
-   Test API endpoints with a tool like Postman first

### Issue 4: Icons Not Showing

**Solution**: React Native Vector Icons should work automatically in Snack.

## Customization Quick Tips

### Change App Colors

Edit `src/config/theme.js`:

```javascript
export const theme = {
	colors: {
		primary: "#YOUR_COLOR", // Change this
		// ...
	},
};
```

### Add New Form Fields

1. Update `AddItemScreen.js` and `EditItemScreen.js`
2. Add new Input components
3. Update validation in `validateForm()`
4. Modify `ItemService.js` to handle new fields

### Change API Structure

1. Edit `src/services/ItemService.js`
2. Update data transformation in each method
3. Test with your actual API

## Example Snack Links

You can reference these Snack examples:

-   Basic CRUD: [Link will be here]
-   With Authentication: [Link will be here]
-   With Custom API: [Link will be here]

## Need Help?

1. **API Issues**: Check `src/config/apiExamples.js` for different API patterns
2. **UI Issues**: All styles are in component files, easy to modify
3. **Navigation Issues**: Check `App.js` for navigation setup
4. **Form Issues**: Check validation functions in screen files

## Production Deployment

When ready for production:

1. **Expo Build**: Use `expo build:android` or `expo build:ios`
2. **Standalone App**: Configure `app.json` for your app details
3. **App Store**: Follow Expo's publishing guide
4. **Updates**: Use Expo OTA updates for quick fixes

## Next Steps

1. ✅ Get the template running in Snack
2. ✅ Customize colors and branding
3. ✅ Connect to your API
4. ✅ Add additional features as needed
5. ✅ Test thoroughly
6. ✅ Deploy to production

**Happy coding! 🎉**
