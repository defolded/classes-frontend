# College Course Scheduler Frontend

This is the frontend component of a college course scheduling and graduation planning chat-bot. The frontend is built with React and TypeScript, providing an intuitive interface for students to interact with the chat-bot, upload their transcripts, and receive personalized course scheduling assistance.

## Features

- **User-Friendly Interface:** Designed with a clean and responsive UI to make it easy for students to interact with the chat-bot.
- **File Upload:** Allows users to upload their PDF transcripts, which are processed by the backend to provide personalized scheduling advice.
- **Real-time Communication:** Enables real-time interaction with the chat-bot, powered by the backend's integration with LLaMA-based language models.

## Installation

### Install the required npm packages:

```bash
npm install
```

or, if you're using yarn:

```bash
yarn install
```

install with bun:

```bash
bun install
```

### Prerequisites

- Node.js 14+
- npm or yarn

### Install Dependencies

First, clone the repository and navigate to the project directory:

```bash
git clone https://github.com/defolded/classes-frontend.git
cd classes-frontend
```

### Environment Variables

The frontend application needs to communicate with the backend API. To configure the API endpoint, open `app/page.tsx` and change `BACKEND_URL`:

```js
const BACKEND_URL = "http://127.0.0.1:8001";
```

Replace `http://localhost:8001` with the URL of your backend server if it's different.

## Running the Application

To start the development server, use the following command:

```bash
npm start
```

or, if you're using yarn:

```bash
yarn start
```

run with bun:

```bash
bun dev
```

or

```bash
bun run start
```

The application should open automatically in your default web browser at http://localhost:3000.

### Project Structure

- `src/`: Contains the main source code for the application.
  - `app/`: Includes global styles and layout components.
    - `favicon.ico`: The favicon for the application.
    - `globals.css`: Global CSS styles for the application.
    - `layout.tsx`: Layout component that wraps the application pages.
    - `page.tsx`: Main page component of the application.
  - `components/`: Reusable React components used throughout the app.
    - `ChatConversations.tsx`: Component for displaying chat conversations.
    - `ChatInput.tsx`: Component for inputting chat messages.
    - `ChatInterface.tsx`: Main chat interface component.
    - `ChatMessage.tsx`: Component for individual chat messages.
  - `enums/`: Contains TypeScript enums used across the application.
    - `MessageRole.ts`: Enum for defining the role of a message (e.g., user or bot).
  - `hooks/`: Custom React hooks.
    - `useCopyToClipboard.ts`: Hook for copying text to the clipboard.
  - `types/`: TypeScript type definitions.
    - `index.ts`: Contains common types used throughout the application.
