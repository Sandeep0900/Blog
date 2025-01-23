# TextVerse - Blog Platform

## Overview
TextVerse is a modern web-based blogging platform that allows users to create, share, and manage blog posts with image uploads.

## Features
- User Authentication (Sign Up/Login)
- Create Blog Posts with Text and Images
- View Personal Blog Posts
- Delete Blog Posts
- Responsive and Modern UI

## Technologies Used
- Firebase Authentication
- Firestore Database
- Tailwind CSS
- Vanilla JavaScript

## Prerequisites
- Modern Web Browser
- Firebase Account
- Vercel Account (for deployment)

## Setup and Installation

### 1. Clone the Repository
```bash
git clone https://your-repository-url.git
cd textverse-blog
```

### 2. Firebase Configuration
1. Create a Firebase project
2. Enable Authentication and Firestore
3. Replace Firebase config in `firebase-config.js`

### 3. Local Development
- Use a local server (http-server recommended)
```bash
npx http-server
```

## Deployment
- Deploy on Vercel:
```bash
vercel deploy
```

## Firebase Configuration
- Enable Email/Password Authentication
- Create Firestore Database
- Set up security rules

## Security Rules (Firestore)
```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogs/{blogId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Project Structure
- `index.html`: Main HTML structure
- `script.js`: Application logic
- `style.css`: Custom styles
- `firebase-config.js`: Firebase configuration

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## License
MIT License

## Contact
Sandeep Sharma
Email: sandeesharma09@gmail.com
