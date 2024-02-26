# To Do App

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Deployments](#deployments)
  - [Installation](#installation)
- [Screennshots](#screennshots)

## Introduction
Welcome to To-Do App – a powerful and user-friendly task management solution that helps you stay organized and boost your productivity.

## Features

- **User Account Creation:** Sign up and create a personalized account to unlock advanced features.
- **Task Creation:** Easily add tasks with details such as title, description, and due date.
- **Status Updates:** Dynamically change the status of your tasks from "To-Do" to "In Progress" to "Completed."
- **Task Updates:** Modify task details, update descriptions, or adjust due dates as your projects evolve.
- **Task Deletion:** Remove completed or no longer relevant tasks with a simple delete action.

## Getting Started

Guide users on how to set up and run your project on their local machines.

### Deployments
Website - http://ec2-13-60-47-237.eu-north-1.compute.amazonaws.com

Backend - http://ec2-16-170-243-97.eu-north-1.compute.amazonaws.com/api/v1
Backend git - https://github.com/OvinduPathiraja/TO-Do-Backend.git

### Installation

Step-by-step instructions on how to install and set up your project. 

Run the following command in your terminal of the local computer
```bash
git clone https://github.com/OvinduPathiraja/To-do-App.git
```
Install the npm in to the frontend and run the command
```bash
cd ./frontend
npm install
```
```bash
npm run dev
```
Now the website will run in your local machine since the backend is running on a seperate EC2 instance in AWS. 

If need to run the backend locally as well. Following the below steps, Not compulsory 

```bash
cd ..
cd ./backend
npm install
```
Open the code in vs code or simmilar code editor platform

Update the .env file in the frontend folder
```js
VITE_APP_API_URL=http://localhost:3000/
```
Then run the following command in the terminal
```bash
npm run dev
```


## Screennshots
<h1>To Do Application</h1>

![Screenshot 2024-02-26 075505](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/ac3758ed-318d-4927-8c36-b0894c8175cb)

![Screenshot 2024-02-26 094938](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/33b1c177-5437-4599-ae19-ffda0305ed2d)

![Screenshot 2024-02-26 082410](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/36d90f10-b9d8-4892-a192-d643665c45aa)

![Screenshot 2024-02-26 083128](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/b78b14da-4d70-4cc1-bcb1-608d6809d1cd)

![Screenshot 2024-02-26 083146](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/d546830e-4b71-4d73-80cd-ec7c57ebb484)



![Screenshot 2024-02-26 082505](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/2df80e7e-fa77-4aac-aff4-8f503bc67d4a)

![Screenshot 2024-02-26 082518](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/187a19a2-a27e-4d52-8bed-8c91ef1772fe)

![Screenshot 2024-02-26 082618](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/13cf7d34-eacf-4861-a9aa-b1d9b44f8f52)




![Screenshot 2024-02-26 092541](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/15fbae04-f713-45df-afc3-35d62847f030)



![Screenshot 2024-02-26 092659](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/6578ff2b-6300-4c3d-8df9-b61c038054c2)

![Screenshot 2024-02-26 092759](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/37b7a2b4-0026-4097-b475-8ab0902fe0fc)

![Screenshot 2024-02-26 092626](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/8cc412d1-3e5e-40e5-8e1b-574302b57776)

![Screenshot 2024-02-26 092716](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/82072bb0-50fe-48e5-94bb-38e460df1c7c)

![Screenshot 2024-02-26 092744](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/58f59534-be06-4284-97f8-800c6b012166)

![Screenshot 2024-02-26 092614](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/269997fc-dcd2-44be-a125-384643e10ff0)
![Screenshot 2024-02-26 092601](https://github.com/OvinduPathiraja/To-do-App/assets/128158494/f660ad26-1c79-4d2f-b66e-5fa263d1cca3)


