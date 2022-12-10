# plateable

To view the final release of the application, go to https://plateable-f3a42.web.app/

Final Release
Installing npm:
Visit the download page on the node website by clicking the link here: https://nodejs.org/en/download/
Make sure LTS is selected (it is the default) and then click on the operating system that matches your system. 
This will begin the download. After it has finished downloading, click on the installer at the bottom of your browser or in your downloads folder. 
Follow the prompts in the pop-up window to complete the node installation. 

Installing React:
With npm installed, open the terminal if you are on Mac or the Command Prompt if you are on Windows. 
In the command line window, type the following command to install React:
  npm install create-react-app -g
This will install react and allow you to run the code locally.

Cloning the Project from GitHub
In the command prompt, navigate to the directory you want to download the code repository to 
This can be done with the “cd” command in the command prompt
Download the project with the provided .zip folder, or follow the instructions to clone from the repository. 
If you have Git installed on your machine, you can clone the repository by typing the following command in your command prompt:
git clone https://github.com/The-Nobodies-SDD/plateable.git
If you do not have Git, you can download the repository from here and place it in the directory from step 1:
https://github.com/The-Nobodies-SDD/plateable/archive/refs/heads/main.zip 
Now, in the command prompt window, you can use the following command to move into the code repository that was downloaded onto your machine:
cd plateable-main
	
Or, if you cloned the repository, run: 
cd plateable

Now you are in the code directory and can follow the next section to run the code

Implementing credentials: 
Navigate to src/firebase.js
Update firebaseConfig by replacing the value for the apiKey on line 17 with the one provided from the development team:
16  const firebaseConfig = {
17    apiKey: "",
18    authDomain: "plateable-f3a42.firebaseapp.com",
19    projectId: "plateable-f3a42",
20    storageBucket: "plateable-f3a42.appspot.com",
21    messagingSenderId: "112759364220",
22    appId: "1:112759364220:web:fd3008823da9d0873cc7f9",
23    measurementId: "G-FTWCCP5BC5"
24  };
 

Running the application locally:
After installing react and npm and downloading the code from Github, you can run the application locally. Start by installing all the required packages for the project by running the following command in the command terminal:
npm install 
Now you can start running the code, do this by running the following command:
npm start
To stop running the code, in the terminal window press CTRL+C (this is for mac and windows)

Note: The API key is limited to 50 requests per day, we kindly ask you to not exceed that limit. API calls are made when searching for a recipe, generating a recipe, and clicking on a recipe to view further details. 

By The Nobodies
