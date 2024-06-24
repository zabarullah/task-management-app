# Task Management App

A simple task management application built with TypeScript. 

## Features
- Add tasks
- Complete tasks
- Remove tasks
- Persist tasks in local storage

## Prerequisites
- Node.js (version 14.17 or higher)
- npm (version 6.14 or higher)

## Installation

1. **Clone the repository:**
git clone https://github.com/zabarullah/task-management-app.git

2. Navigate to the project directory:
cd task-management-app

3. Install dependencies:
npm install


# Development
To start the development server and watch for changes, follow these steps:

1. Compile TypeScript files:
npx tsc --watch

2. Start the live server:
npx live-server

Alternatively, you can use the lite-server for a development server. First, install it as a dev dependency:
npm install lite-server --save-dev

Then, add the following script to your package.json:

g"scripts": {
  "dev": "lite-server"
}

Now, you can start the development server with:
npm run dev

This will start a live-reload server and open the app in your default browser.

# Build
To build the project for production, run:
npx tsc

The build output will be in the dist directory.