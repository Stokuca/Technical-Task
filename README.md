# Getting Started with AI Dashboard

This project is a simple dashboard app for managing reports. It was built with React, TypeScript, Zustand, and Material UI. Users can create, edit, summarize, and organize reports using drag & drop. All data is stored locally in the browser using localStorage.

## Available Features

In this app, you can:

### Create a New Report

Use the rich text editor to write a report with a title and content, then save it.

### Edit Existing Reports

Click the "Edit" button to load a report back into the form, make changes, and save it again.

### AI Summary Simulation

Click the "Summarize" button to simulate an AI-generated summary. This updates the report content and logs the activity.

### Activity Logs

Each report keeps a short log of actions (created, edited, summarized). You can click "View Log" to see it in a modal window.

### Drag & Drop Support

Reorder your reports by dragging them. Changes are saved automatically.

### LocalStorage Support

All reports and their order are saved to your browser, so they will still be there when you refresh.

### Search

Filter reports by typing into the search field. It filters live by title.

### Clear All

Click "Clear All" to remove all reports and reset the dashboard.

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.  
The build is optimized and ready to be deployed.

### `npm test`

Runs all tests using Jest and React Testing Library.

### `npm run storybook`

Starts Storybook for viewing components in isolation.  
Open [http://localhost:6006](http://localhost:6006) to view it in your browser.

---

## Learn More

This project uses:

- React & TypeScript
- Zustand (state management)
- TinyMCE (rich text editor)
- Material UI
- DnD Kit (drag and drop)

All data is stored using `localStorage`, so no backend is required.

---

## Testing

Tests are written using Jest and React Testing Library.  
Test coverage includes:

- ReportEditor
- ReportCard
- ReportListDraggable

To run tests:

```bash
npm test
