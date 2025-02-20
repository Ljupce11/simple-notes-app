# Notes Application

A simple note-taking application built with React, TypeScript, and Vite that supports real-time saving and @mention functionality.

## Features

- Add and edit notes with real-time saving
- @mention functionality with user suggestions
- Responsive grid layout for notes display
- Clean and modern UI with Tailwind CSS
- Client-side routing with React Router

## Technology Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Biome (for linting and formatting)
- SWC (for fast compilation)

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
VITE_API_URL=your_api_url
VITE_API_SESSION=your_api_session_key
```

4. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run lint` - Runs Biome linter
- `npm run format` - Formats code using Biome
- `npm run tsc` - Runs TypeScript compiler

## Project Structure

```
src/
  ├── components/     # UI components
  ├── context/       # React context providers
  ├── hooks/         # Custom React hooks
  ├── icons/         # SVG icons components
  ├── interfaces/    # TypeScript interfaces
  ├── pages/         # Route components
  ├── services/      # API service functions
```

## Features in Detail

### Real-time Note Saving
- Automatic saving with debounce functionality
- Visual feedback during save operations
- Error handling and display

### @mentions System
- User mention suggestions while typing
- Keyboard navigation support
- Highlighted mention styling