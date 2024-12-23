# React Native App with Agora.io and Firebase

## Overview

This project is a feature-rich mobile application built using React Native. It integrates Agora.io for video and voice calls and Firebase for authentication, real-time chat, and Google login. The app provides a seamless communication experience for users with both messaging and calling features.

## Features

### Video and Voice Calls

Agora.io SDK is used for high-quality, real-time video and voice calls.

### Authentication

Firebase Authentication supports:

- Email and password-based sign-up and login.

- Google login integration.

### Real-time Chat

- Firebase Realtime Database enables instant messaging between users.

## Prerequisites

- Node.js (>= 14.x recommended)
- npm or yarn
- Firebase and Agora.io accounts with configured projects

## Installation

#### 1. Clone the repository:

```
git clone <repository-url>
cd <repository-folder>
```

#### 2. Install dependencies:

```
npm install
```

#### 3. Setup Firebase:

- Create a Firebase project at Firebase Console.
- Download the google-services.json file (for Android) or GoogleService-Info.plist (for iOS).
- Place these files in the appropriate directories of your React Native project.

#### 4. Setup Agora.io:

- Sign up at Agora.io and create a new project.
- Note the App ID from the Agora project dashboard.
- Update the Agora App ID in your code.

#### 5. Environment Variables:

Create an config.js file in the requesting directory with the following variables:

```
VOICERA_APP_ID = <your-agora-app-id>
FIREBASE_API_KEY=<your-firebase-api-key>
VOICERA_CHANNEL_NAME=<your-agora.io channel name>
VOICERA_UID=<agora user id>
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_APP_ID=<your-firebase-app-id>
```

#### 6. Run the app:

- For Android:

```
npm start
```

Open another terminal and run

```
npm run android
```

## Usage

### Authentication

- Users can sign up with an email and password or log in using Google.
- Authenticated users gain access to the chat and calling features.

### Real-time Chat

- Navigate to the chat screen to start a conversation with other users.
- Messages are synchronized instantly using Firebase Realtime Database.

### Video and Voice Calls

- Initiate a call from the contacts or chat screen.
- Use Agora’s built-in features for muting, camera switching, and more.

## Technologies Used

### Frontend:

- React Native
- React Navigation

### Backend:

- Firebase Realtime Database

### APIs and SDKs:

- Firebase Authentication
- Agora.io SDK
