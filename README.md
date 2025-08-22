# 💲 Online Order Management App

A hybrid mobile application built with **Ionic + React + Firebase Firestore**, designed for managing products, a shopping cart, and customer orders.
This project demonstrates advanced multiplatform configuration (Android + iOS) and integration with a remote database.

---

## 🌟 Objective of the Activity

For students to develop a mobile application connected to a remote database, manage complex data, and demonstrate multiplatform deployment.

---

## 📋 Features

* 📦 **Products**: View product catalog with name, description, price, and stock.
* 🛍️ **Shopping Cart**: Add products with quantity control.
* 📁 **Orders**: Place an order and store it in Firebase Firestore.
* 🔄 **Real-Time Sync**: Product stock updates instantly after orders.
* 🗜️ **Order History**: (extendable) retrieve past orders per user.
* 📱 **Multiplatform**: Runs on both Android and iOS.

---

## 🗂️ Data Model

**Products Collection**

* `name` (string)
* `description` (string)
* `price` (number)
* `stock` (number)

**Orders Collection**

* `userId` (string)
* `items` (array of `{ productId, name, price, quantity }`)
* `status` (string, e.g. "pending", "completed")
* `date` (timestamp)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/jmramos123/OrdersManagement-Demo.git
cd OrdersManagement-Demo
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project.
3. Enable **Firestore Database**.
4. Copy your Firebase config object and place it in `src/firebaseConfig.ts`:

```ts
// Example firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

---

### 4️⃣ Run the App

* Web preview (Ionic Lab):

```bash
ionic serve
```

* Android:

```bash
ionic capacitor run android
```

* iOS (requires macOS + Xcode):

```bash
ionic capacitor run ios
```

* Usage
  
![showoff](https://github.com/user-attachments/assets/e69e9541-3671-475b-a3dd-6c90e8c71425)

---

## 🧪 Minimum Content Requirements

* Functional application with product catalog, cart, and order management.
* Connection to remote database (Firebase Firestore).
* Complex CRUD operations.
* Relational data modeling (Products ↔ Orders).
* Consistent behavior on **Android** and **iOS**.

---

## 👨‍💻 Tech Stack

* [Ionic Framework](https://ionicframework.com/) (React)
* [Firebase Firestore](https://firebase.google.com/) (NoSQL database)
* [Capacitor](https://capacitorjs.com/) (Native builds)

---

## 📜 License

This project is for educational purposes. Feel free to fork and modify.
