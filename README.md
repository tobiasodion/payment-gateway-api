# Overview

The payment gateway project includes the following:
- **A payments Gateway API** - with endpoints for merchants to accept payments and retrieve details of a previously made payment.
- **Acquiring bank simulator** - A simulation of an acquiring bank to process the payment from the payment gateway
- **A bank simulator** - A web app for developers to simulate and explore the APIs.

## Technology Stack
The technology stack is based on node.js and typescript as follows:

### Payment Gateway API
- express.js

### Bank Simulator
- React
- Vite
- Tailwind

## To run - With Docker-Compose

### Requirements

- [Docker Engine](https://docs.docker.com/engine/install/)

### Steps

- Start the application by executing `docker-compose up --build`
- Access the bank simulator on `http://localhost:3000`
- Access the API documentation on `http://localhost:3001/docs`
- Stop the docker run by executing `ctrl + C`

## To run - Manually

### Start server
- Navigate to the `api` folder
- Copy the .env.template file to a .env file by running `cp .env.template .env`
- Update the `PORT` in the `.env` file accordingly.
- Install the dependencies by running `npm install`
- Start the server by running `npm run start`
- Take note of the `server url`

### Start simulator

- Navigate to the `bankSimulator` folder
- Copy the .env.template file to a .env file by running `cp .env.template .env`
- Update the `VITE_API_BASE_URL` variable in the `.env` file with the `server url` from the **Start server** step. 
- Install the dependencies by running `npm install`
- Start the server by running `npm run dev`
- Take note of this `simulate url`

### Troubleshooting

- **CORS** - The bank simulator will run on `http:localhost:3000` by default which is configured in the `vite.config.js` file. This url is registered in the server's cors middleware to allow requests from the simulator to the server. However, if this url configuration is changed, the cors middleware on the server MUST be updated with this new url to prevent potential request rejection problems.
