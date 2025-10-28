# Gemini Project Guide: Taskify

This document provides a comprehensive guide for developing the Taskify application. It outlines the project structure, technology stack, and key conventions to ensure consistency and streamline development.

## 1. Project Overview

Taskify is a mobile application built with React Native and Expo. Based on the file structure and dependencies, it appears to be a task management or to-do list application. It includes features like user authentication, task categorization, and a multi-tab interface.

## 2. Tech Stack

The project is built with the following technologies:

- **Core Framework:** React Native with Expo
- **Language:** TypeScript
- **State Management:** Redux Toolkit with Redux Persist
- **Navigation:** React Navigation (with bottom tabs)
- **API Communication:** Axios
- **UI Components:** Custom-built components, with libraries like `@gorhom/bottom-sheet` and `react-native-modal` for complex UI patterns.
- **Styling:** A custom theme system is in place, located in `src/theme`.
- **Localization:** `i18next` and `react-i18next` are used for internationalization.
- **Linting:** ESLint with `eslint-config-expo`.

## 3. Getting Started

To run the application, use the following scripts from `package.json`:

- `npm start`: Starts the Expo development server.
- `npm run android`: Runs the app on an Android emulator or connected device.
- `npm run ios`: Runs the app on an iOS simulator or connected device.
- `npm run lint`: Lints the codebase to check for errors and style issues.

## 4. Project Structure

The `src` directory is the heart of the application and is organized as follows:

- **`src/api`**: Handles all network requests.
  - `endpoints/`: Defines API endpoints.
  - `network/`: Contains the Axios client and network configuration.
  - `services/`: Houses functions that interact with the API.
  - `types/`: Contains TypeScript types for API-related data.

- **`src/components`**: Contains reusable UI components. Each component is in its own directory.
  - `index.ts`: Exports all components for easy importing.

- **`src/config`**: Manages environment-specific configurations.

- **`src/constants`**: Holds constant values used throughout the application.

- **`src/hooks`**: Contains custom React hooks.

- **`src/navigators`**: Manages all aspects of navigation.
  - `RootNavigator.tsx`: The main navigator for the application.
  - `stack/`: Contains different stack navigators.
  - `routes/`: Defines the navigation routes.

- **`src/screens`**: Contains the application's screens, organized by feature.
  - `auth/`: Screens related to user authentication (e.g., Login, Sign Up).
  - `core/`: Core screens of the application after login (e.g., Home, Profile).

- **`src/stores`**: Manages the application's state using Redux Toolkit.
  - `slices/`: Defines the different state slices.
  - `index.ts`: Configures and exports the Redux store.

- **`src/styles`**: Contains global styles and application-wide style utilities.

- **`src/theme`**: Defines the application's visual theme.
  - `colors.ts`: Color palette.
  - `fonts.ts`: Font definitions.
  - `sizes.ts`: Sizing and spacing guidelines.

- **`src/translations`**: Manages localization and internationalization.
  - `i18n.ts`: i18next configuration.
  - `resources/`: Contains translation files for different languages.

- **`src/types`**: Contains global TypeScript types and interfaces.

- **`src/utils`**: Provides utility functions and helper modules.

## 5. Key Conventions

- **Component Creation**: New components should be placed in their own directory within `src/components` and exported from `src/components/index.ts`.
- **Screen Creation**: New screens should be added to the appropriate subdirectory in `src/screens` and integrated into the navigation flow in `src/navigators`.
- **State Management**: For new features requiring global state, create a new slice in `src/stores/slices`.
- **API Usage**: All API interactions should be handled through the service layer in `src/api/services`.
- **Styling**: Use the predefined theme from `src/theme` for all styling to maintain a consistent look and feel. Avoid inline styles.

## 6. How-to Guides

### How to Add a New Component

1.  Create a new directory in `src/components` with the component's name (e.g., `src/components/NewComponent`).
2.  Create an `index.tsx` file inside the new directory with the component's logic.
3.  Export the new component from `src/components/index.ts`.
4.  Import and use the component in your screens or other components.

### How to Add a New Screen

1.  Create a new file in the relevant subdirectory of `src/screens` (e.g., `src/screens/core/NewScreen.tsx`).
2.  Define the screen component.
3.  Add the new screen to a navigator in `src/navigators`.
4.  Define the route for the new screen in `src/navigators/routes`.

### How to Add a New Redux Slice

1.  Create a new file in `src/stores/slices` (e.g., `newSlice.ts`).
2.  Use `createSlice` from Redux Toolkit to define the slice, its initial state, and its reducers.
3.  Add the new slice's reducer to the root reducer in `src/stores/index.ts`.
