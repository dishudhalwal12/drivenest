# 🚗 Drivenest - Premium Car Rental Experience

![Drivenest Hero Banner](./public/banner.png)

Drivenest is a high-end car rental application designed to provide a seamless and premium booking experience. Whether you're looking for a luxury sedan for a business trip or a rugged SUV for an adventure, Drivenest has you covered.

---

## ✨ Key Features

- **🎯 Advanced Car Search**: Filter by brand, category, fuel type, and price range.
- **💬 AI-Powered Concierge**: Integrated Gemini-powered chatbot to help you choose the perfect car.
- **👨‍✈️ Professional Drivers**: Option to hire experienced drivers for your journey.
- **💳 Secure Payments**: Seamless payment integration with Razorpay.
- **👤 User Authentication**: Secure login and profile management via NextAuth.
- **📱 Responsive Design**: Fully optimized for mobile and desktop with sleek Framer Motion animations.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB with Mongoose ORM
- **AI**: Google Gemini AI (@google/generative-ai)
- **Payments**: Razorpay SDK
- **Icons**: Lucide React

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/dishudhalwal12/drivenest.git
cd drivenest
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add the following variables:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Gemini AI (for Chatbot)
GEMINI_API_KEY=your_gemini_api_key

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth (for Login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Razorpay (for Payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Admin Configuration
ADMIN_EMAIL=your_admin_email
```

### 4. Database Integration & Seeding
Drivenest uses MongoDB. To populate your database with sample cars and drivers, run the following seed scripts:

**Seed Cars:**
```bash
node scripts/seed.js
```

**Seed Drivers:**
```bash
node scripts/seed-drivers.js
```

### 5. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 📁 Project Structure

- `app/`: Next.js App Router and API routes.
- `components/`: Reusable UI components.
- `lib/`: Utility functions and database connection logic.
- `models/`: Mongoose schemas and models.
- `public/`: Static assets (images, icons).
- `scripts/`: Database seeding scripts.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.
