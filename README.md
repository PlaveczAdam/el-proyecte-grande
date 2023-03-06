# Grande Hotel Management System

## What is our application about?

Our application aims to help those who work in the tourism sector with the management of their real estates, in our case hotels.<br>
The applicaction is divided into separate modules that are the different building blocks of the system
but that are related and in most cases work in collaboration with each other to represent a complex hotel management system.
These modules at the current time include Hotels, Rooms, Guests, Reservations and Inventory, but can be extended on demand of the user at any time.<br>

## What are the main features and technologies used in ths project?

The technologies and features that we have incorporated in this application include:

- ASP.NET Core 6.0 backend with different endpoints and services
- React v18 frontend with routing, clean UI made with MaterialUI components
- PostgreSQL database connection with persistent data and connected tables
- Entity Framework as an ORM tool
- Authentication and Authorization implemented both on backend and frontend
- Management and permissions of different users based on their roles
- Containerization: Backend and frontend in one Docker container
- CI/CD: Workflows for GitHub Actions run tests for backend services on each pull request, also builds the version pushed to the main branch and publishes to DockerHub
- HTTPS enabled for security

## How to run this application?

This application contains backend and frontend and requires:

- A separate PostgreSQL database
- HTTPS certificate in `.pfx` format

### Windows

In a windows environment, you can execute the `production_test.bat` file with edited variables, to quickly test out the deployed version locally. Docker required. Help text is included within the file.

This file builds a docker image (default name: grande-management) and and runs it in container (default name: grande_container).

The app runs on [localhost](http://localhost) by default.

### Docker

The project is on [DockerHub](https://hub.docker.com/r/grandthefthotel/grande_management), you can use the image edited with your environmental variables, to deploy in a container with docker.

### Environmental variables

- `ASPNETCORE_DB_CONNECTION_STRING`: The connection string of your PostgreSQL database
- `ASPNETCORE_URLS`: The ports of the frontend site, recommended: `"https://+:443;http://+:80"`
- `ASPNETCORE_HTTPS_PORT`: The HTTPS port, recommended: `443`
- `ASPNETCORE_Kestrel__Certificates__Default__Path`: The path of your certificate
- `ASPNETCORE_Kestrel__Certificates__Default__Password`: The secure password of your certificate

## Pictures

##### The model classes

<img src="./pictures/grande_management_model_classes.jpg">
