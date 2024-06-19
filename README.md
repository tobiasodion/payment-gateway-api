# Overview

The payment gateway project includes the following:
- **A payments Gateway API** - with endpoints for merchants to accept payments and retrieve details of a previously made payment.
- **Acquiring bank simulator** - A simulation of an acquiring bank to process the payment from the payment gateway
- **A bank simulator** - A web app for developers to simulate and explore the APIs.

# To run - With Docker-Compose

### Requirements

- [Docker Engine](https://docs.docker.com/engine/install/)

### Steps

- Start the application by executing `docker-compose up --build`
- Access the bank simulator on `http://localhost:3000`
- Access the API documentation on `http://localhost:3001/docs`
- Stop the docker run by executing `ctrl + C`
