# Adaptive Learning Interface for Neurodivergence 🧠✨

A production-ready full-stack application designed to transform educational content into neuro-friendly formats for **Dyslexia** and **ADHD** learners.

## 🚀 Key Features

- **Adaptive Modes**: 
  - **Dyslexia Mode**: Larger font, increased letter-spacing, and soft, low-contrast background (cream) to reduce visual stress.
  - **ADHD Mode**: Content chunked into small, impactful cards to maintain focus and highlight key ideas.
  - **Normal Mode**: Structured summaries in clear bullet points.
- **AI-Powered**: Uses OpenAI GPT-4o for intelligent content transformation.
- **Read Aloud**: Integrated Speech-to-Text for auditory reinforcement.
- **Premium UI**: Modern dark mode with glassmorphism, smooth animations (Framer Motion), and responsive layouts.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Framer Motion, Lucide-React, Axios.
- **Backend**: Node.js, Express, OpenAI API.
- **Styling**: Vanilla CSS (Modern System with Variable Tokens).

---

## 🏗️ Getting Started

### 1. Prerequisites
- Node.js (v18+)
- OpenAI API Key

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the `.env` file with your OpenAI API Key:
   ```env
   OPENAI_API_KEY=sk-xxxx...
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   *Server runs on: http://localhost:5000*

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   *Frontend runs on: http://localhost:5173*

---

## 📂 Project Structure

```text
adaptive-learning/
├── backend/
│   ├── config/          # OpenAI config
│   ├── controllers/     # AI Logic & Logic for parsing bullets
│   ├── routes/          # AI transformation endpoint
│   ├── server.js        # Main entry point
│   └── .env             # Environment variables
└── frontend/
    ├── src/
    │   ├── components/  # ModeSelector, TextInput, OutputDisplay, SpeechButton
    │   ├── pages/       # Home
    │   ├── services/    # api.js (Axios)
    │   ├── styles/      # main.css (System design)
    │   ├── App.jsx
    │   └── main.jsx
    └── vite.config.js
```

## 🌍 Deployment

### Backend (Render)
1. Push the code to a Git repository.
2. Link the repository to Render.
3. Set the Environment Variable: `OPENAI_API_KEY`.
4. Build Command: `npm install`.
5. Start Command: `node server.js`.

### Frontend (Vercel)
1. Connect Vercel to your repository.
2. Framework Preset: `Vite`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Set `VITE_API_BASE_URL` to your Render backend URL.

---

Created for the **Adaptive Learning Hackathon**. 🚀
