IOM BE Test Task 

Task:  The site admin need daily report contains:
  - Show a summary of absent workers
  - Show a summary of late workers
  - Total active hours for workers
  - Total inactive hours for workers

  For this I have created the data flow operations to save the sata in to our database and also added code to fetch the data
  app/controllers - this folder holds all the controller and methods to manage the requirements
  app/jobs - this folder has a job file (report.js which will run the job at midnight and send the reports to all the clients)
  
  database - database folder to create database structure as per task requirements I have used postgres database as I had more experiance working 
			 postgress as compared to mongo but I can work on mongo as well. 
  database/helpers - contains hgelper methods
  database/migrations - contains migration file for the project
  database/models - contains models as per database entities
  database/seeders - not implmented

  routes -  routes will have all the public and private routes of the application
			right  now I have just created a public routes file as I have not implemented auth in the app so all the routes are open routes