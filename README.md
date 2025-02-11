# DownloadableFileTable Component

A React component for displaying and managing a list of files with selection and download capabilities.

## Features

- Display files in a tabular format with columns for name, device, path, and status
- Ability to select individual or multiple files
- Tri-state select-all checkbox functionality
- Download available files (currently shows an alert with selected files)
- Visual indication of selected rows
- Status indicator for available files
- Responsive design - change the viewwport width, table with is clamped between 600px and 1280px, otherwise spans viewport width
- Tests - includes tests to verify common features.

## Installation

## Development Setup

1. After downloading the repo

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Running Tests

The component uses Vitest for testing. To run the tests:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm test --watch

```

## Props

### DownloadableFileTable Component

| Prop  | Type  | Required | Description                                   |
| ----- | ----- | -------- | --------------------------------------------- |
| files | Array | Yes      | Array of file objects to display in the table |

### File Object Structure

Each file object in the `files` array should have the following properties:

| Property | Type   | Description                                  |
| -------- | ------ | -------------------------------------------- |
| name     | string | Name of the file                             |
| device   | string | Device where the file is located             |
| path     | string | File path                                    |
| status   | string | File status (e.g., "available", "scheduled") |

## Dependencies

- react
- react-icons/gr
- @testing-library/react
- @testing-library/jest-dom
- jest
