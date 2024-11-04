# IP Lookup Application

This project is an IP Lookup application built using Node.js and React, containerized with Docker. It connects to a MongoDB database to store and retrieve IP address information.

![Demo of IP Lookup Application](https://github.com/ozehavi/ip-lookup/blob/main/demo.gif)


## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Docker] (https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js and npm] Node version **18.x** or higher (https://nodejs.org/) (for running the application and managing dependencies)

## Getting Started

1. **Clone the repository**:
```bash
git clone https://github.com/ozehavi/ip-lookup.git
cd ip-lookup
```

2. **Install Dependencies**:
This will install all required dependencies for the application (both server and client)
```bash
npm run setup
```

3. **Run the application**:
This will use docker-compose in order to run the application. This command will build the necessary images, create the containers, and start the application. 
```bash
npm run start
```

Once the application has started, you can access it at http://localhost:3000/.


4. **Stop the application**:
In order to stop the application and remove the containers, you can run:
```bash
npm run stop
```

## Project Structure

The project structure is as follows:
```bash
/ip-lookup
│
├── /client          # React frontend application
│   ├── /src         # Source files
│   └── Dockerfile   # Dockerfile for client
│
├── /server          # Node.js backend application
│   ├── /src         # Source files
│   └── Dockerfile   # Dockerfile for server
│
├── docker-compose.yml  # Docker Compose configuration
└── README.md        # This README file
```
