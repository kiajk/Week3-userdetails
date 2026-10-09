User Explorer

A React application for exploring, searching, and filtering users using data fetched from the JSONPlaceholder API.

Overview

User Explorer is a frontend project built with React and Vite. It demonstrates essential React concepts, including functional components, props, state management, custom hooks, side effects, conditional rendering, and API integration.

The application fetches users from an external API and provides an interactive interface for searching users, filtering them by company, and viewing their details.

Features

* Fetch Users: Retrieve user data from the JSONPlaceholder API.
* Search Users: Search for users by name.
* Filter by Company: Display users belonging to a selected company.
* Clear Filters: Reset the search input and company filter.
* User Selection: Select a user from the list.
* User Details: Display the selected user’s name, email, phone number, and company.
* Loading State: Show a loading message while fetching data.
* Error Handling: Display an error message when a request fails.
* Retry Requests: Retry a failed API request.
* Request Cancellation: Use AbortController and effect cleanup to cancel unfinished requests.
* Responsive UI: Provide a simple interface that adapts to smaller screens.

Technologies Used

* React
* JavaScript
* Vite
* CSS
* Fetch API
* JSONPlaceholder API
* Git and GitHub

Project Structure
src/
├── components/
│   ├── UserExplorer.jsx
│   ├── SearchInput.jsx
│   ├── CompanyFilter.jsx
│   ├── ClearFilters.jsx
│   ├── UserList.jsx
│   └── UserCard.jsx
│   ├── UserDetails.jsx
├── hooks/
│   └── useUsers.js
├── App.jsx
├── App.css
└── main.jsx
Component Tree
App
└── UserExplorer
    ├── SearchInput
    ├── CompanyFilter
    ├── ClearFilters
    ├── UserList
    │   └── UserCard
    └── UserDetails
    Component Responsibilities

* App: The root component of the application.
* UserExplorer: Manages the main application state, filters users, and coordinates the child components.
* SearchInput: Allows users to search for users by name.
* CompanyFilter: Filters users by company.
* ClearFilters: Resets the search and company filters.
* UserList: Renders the filtered list of users.
* UserCard: Displays a user’s basic information and allows the user to select them.
* UserDetails: Displays detailed information about the selected user.

State Ownership

The main application state is managed by the UserExplorer component.

* search: Stores the search input and is used to filter users by name.
* company: Stores the selected company and is used to filter users by company.
* selectedUser: Stores the currently selected user and is passed to UserDetails.

These states are owned by UserExplorer because multiple components depend on them or need to update them.

The useUsers custom hook manages the API-related state:

* users: Stores the fetched user data.
* loading: Indicates whether the request is in progress.
* error: Stores any request error.
* retryCount: Tracks retry attempts and triggers a new request when updated.

Keeping UI state in UserExplorer and API-related state in useUsers separates the responsibilities of the application.

Derived Data

filteredUsers is calculated from the users, search, and company values.

It is not stored in a separate state because its value can be derived from existing data.

Whenever the component re-renders after a relevant state change, the filtering logic runs again and produces the updated list.

This approach avoids duplicated state and keeps the application logic simpler and more predictable.

Data Flow

The application follows React’s one-way data flow.

1. UserExplorer owns the search and company filter states.
2. It passes the current values and callback functions to SearchInput and CompanyFilter through props.
3. When a user changes a filter, the child component calls the callback provided by UserExplorer.
4. UserExplorer updates its state and recalculates filteredUsers.
5. The filtered list is passed to UserList through props.
6. When a user selects a UserCard, the selected user is passed back through a callback to UserExplorer.
7. UserExplorer passes the selected user to UserDetails for display.

This structure keeps state management in one place and separates data handling from presentation.

Custom Hook and API

The application fetches user data from the JSONPlaceholder API:

https://jsonplaceholder.typicode.com/users

useUsers Hook

The useUsers custom hook manages API requests and their related states.

It is responsible for:

* Fetching users from the API.
* Managing the loading state.
* Handling request errors.
* Supporting retry functionality.
* Cancelling unfinished requests with AbortController.

Request Lifecycle

1. When the hook runs, useEffect starts the API request.
2. The loading state is set to true, and the previous error is cleared.
3. The application fetches the user data and checks whether the response was successful.
4. The response data is converted to JSON and stored in the users state.
5. If the request fails, the error message is stored in the error state.
6. When the request finishes, the loading state is set to false, unless the request was aborted.

Retry Mechanism

The hook uses a retryCount state to trigger another request when the user clicks the Retry button.

Updating retryCount causes the useEffect dependency to change, so the effect runs again.

Request Cancellation

The hook uses AbortController to cancel an unfinished request when the effect is cleaned up.

This helps prevent unnecessary requests and avoids updating state from a cancelled request.

Separation of Responsibilities

The useUsers hook handles data fetching and API-related states, while UserExplorer handles search, filtering, user selection, and the main UI.

This separation makes the code easier to understand, maintain, and reuse.

Installation & Usage

Prerequisites

Make sure you have Node.js and npm installed on your machine.

Installation

Clone the repository:
git clone https://github.com/kiajk/Week3-userdetails.git
Navigate to the project directory:
cd Week3-userdetails
Install dependencies:
npm install
Run the Development Server

Start the application:
npm run dev
Open the local URL shown in your terminal to view the application in your browser.