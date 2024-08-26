# Maze Navigator

## Overview

Maze Navigator is an online maze navigation game that allows users to load custom maze definition files and navigate through them. The game presents available navigation options at each step, enabling users to move within the maze. The game is designed to be extensible, allowing users to upload their maze files and select them for navigation.

## Architecture Overview

The Maze Navigator application is built using a modern web stack with Angular 18 for the front-end and .NET 8 for the back-end. The application architecture consists of the following key components:

1.  **Frontend (Angular 18)**:

  *   **Components**: Handles UI rendering and user interactions.
  *   **Services**: Manages communication with the backend API and state management.
  *   **Pipes**: Transforms data for display purposes, such as converting maze definitions into a navigable format.
  *   **Routing**: Manages navigation between different views within the application.
2.  **Backend (ASP.NET Core 8)**:

  *   **API Controllers**: Provides endpoints to handle maze uploads, loading, and navigation logic.
  *   **Services**: Encapsulates the business logic, such as maze parsing and movement validation.
  *   **Data Models**: Defines the structure of the maze and other related entities.
3.  **Database**: The application uses SQL Server 2019, deployed through Docker. The database is automatically populated by default using a seed method in the backend, ensuring that the required data is available upon initialization..

4.  **Testing**:

  *   **Unit Tests**: Both the front-end and back-end include unit tests to ensure the correctness of the logic.
  *   **End-to-End (E2E) Tests**: The front-end uses Cypress to simulate user interactions and verify application behavior.
5.  **Docker**: The application can be containerized using Docker, with a `docker-compose` setup to run both the front-end and back-end services.


## Project Structure

### Frontend (Angular)



`/src   /app     /components     /services     /pipes     /models     /tests`

### Backend (ASP.NET Core)



`/src   /ValantDemoApi   /ValantDemoApi.UnitTests`

## User Stories

1.  **Upload a Maze**: Users can upload custom maze definition files to the maze navigator.
2.  **Navigate a Maze**: Users can load a maze and navigate through it, moving from one cell to another.
3.  **Display Success Message**: Once the user reaches the end of the maze, a success message is displayed.

## Prerequisites

*   **Node.js** (v18.x)
*   **Angular CLI** (v18.x)
*   **.NET SDK** (v8.x)
*   **Docker** (latest)

## Installation and Setup

### 1\. Clone the Repository

First, clone the repository to your local machine:

bash

Copy code

`git clone https://github.com/mbenitez159/Maze-Navigator.git cd maze-navigator`

### 2\. Install Frontend Dependencies

Navigate to the Angular project directory and install the necessary dependencies:


`cd /Maze-Navigator/apps/demo npm install`

### 3\. Install Backend Dependencies

Navigate to the .NET project directory and restore the required packages:

`cd ../ValantDemoApi dotnet restore`

## Running the Application

### 1\. Start the Backend Server

Navigate to the .NET project directory and run the backend server:



`cd src/MazeNavigator.API dotnet run`

The backend server will start on `http://localhost:5000`. This API handles requests from the Angular front-end.

### 2\. Start the Frontend Server

Open a new terminal window, navigate to the Angular project directory, and start the Angular development server:


`cd src/maze-navigator-frontend ng serve`

The Angular application will be running on `http://localhost:4200`. This will serve the user interface for the Maze Navigator.

### 3\. Access the Application

Once both servers are running, open your browser and go to `http://localhost:4200` to start using the Maze Navigator.

## Running Tests

### 1\. Frontend Unit Tests

To run unit tests for the Angular application, navigate to the Angular project directory and execute the following command:



`cd .../Maze-Navigator/apps/demo ng test`

This will launch the test runner and execute all unit tests.

### 2\. Backend Unit Tests

To run unit tests for the .NET application, navigate to the test project directory and execute the following command:


`cd .../Maze-Navigator/ValantDemoApi/ValantDemoApi.UnitTests dotnet test`

This will run all the unit tests for the backend.

### 3\. Frontend E2E Tests

To run end-to-end tests using Cypress, navigate to the Angular project directory and execute:


`cd .../Maze-Navigator/apps/demo npx cypress open`

This will open the Cypress test runner, where you can select and run the end-to-end tests.

## Building the Application

### 1\. Frontend Build

To build the Angular application for production, navigate to the Angular project directory and run:


`cd src/maze-navigator-frontend ng build --prod`

This will create a `dist` folder containing the production-ready build of the Angular application.

### 2\. Backend Build

To build the .NET application for production, navigate to the .NET project directory and run:



`cd .../Maze-Navigator/ValantDemoApi/ValantDemoApi dotnet publish -c Release -o ../publish`

This will create a publish directory with the compiled output.

## Docker Deployment

### 1\. Build Docker Images

To containerize the application, navigate to the root directory and run:



`cd .../Maze-Navigator/ValantDemoApi/ValantDemoApi docker-compose build`

This command will build Docker images for both the Angular and .NET services.

### 2\. Run Docker Containers

After building the Docker images, run the containers using:


`docker-compose up`

This will start the application in Docker, with the frontend accessible at `http://localhost:4200` and the backend at `http://localhost:7200`.

## Custom Maze Format

The application supports a simple plain text maze definition format:

Copy code

```
SOXXXXXXXX
OOOXXXXXXX 
OXOOOXOOOO 
XXXXOXOXXO
OOOOOOOXXO 
OXXOXXXXXO 
OOOOXXXXXE
```


*   **S**: Start position
*   **O**: Open path
*   **X**: Wall
*   **E**: Exit


### Setting Up Environment Variables for Backend API URL in Angular

The Angular application needs to communicate with the backend API, which requires setting the correct base URL. This is done through the environment configuration files in Angular.

1.  **Locate the Environment Files**:  
    In the Angular project, you can find environment configuration files in the `src/environments` directory. The files include:

  *   `environment.ts` (for development)
  *   `environment.prod.ts` (for production)
2. **Set the Backend API URL**:  
    Open the `environment.ts` file and update the `baseUrl` to match the URL where your .NET backend API is running.

 ```
    export const environment = {
      production: true,
      baseUrl: 'http://localhost:7200', // Update this to match your production API URL 
    };
  ```

  Similarly, for the production environment, open `environment.prod.ts` and set the `baseUrl` accordingly:


  ```
  export const environment = {
    production: true,
    baseUrl: 'http://your-production-api-url', // Update this to match your production API URL 
  };

  ```


3. **Rebuild the Application**:  
    After updating the environment settings, rebuild your Angular application if needed:


```
ng build --prod
```

This ensures that the correct API URL is used when deploying the application.


## Additional Notes

*   The solution meets all acceptance criteria outlined in the user stories.
*   The codebase is structured to be clean, maintainable, and easily testable.
*   Extensive tests are provided to ensure the reliability of the application.

