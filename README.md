# tamk-group8-todo-backend  

## Description

Backend for 4a00ez62-3001-group08  

## Installation:  


### Backend setup:  

Clone backend repository: ```git clone https://github.com/iskela45/tamk-group8-todo-backend```  

After cloning install the required packages with: ```npm i```

* Create a database with the ```/create_sql_database/createDatabase.mysql```  

* Start up the server and provide the following environment variables with a startup command such as: ```user=userName connectionLimit=10 host=example.database.com password=example database=dbxbalpy1 apikey=123456 node index.js```  
  * user, host, password and database are for connecting to your database.  
  * give the apikey a unique value that matches with the frontend configuration.  
  * connectionLimit is up to your discretion but we have used a value of 10.  
  * You can also provide a port with ```PORT=``` but this can be left out since the value defaults to 8080.  


### Frontend setup:  

Clone frontend repository: ```git clone https://github.com/TeemuViikeri/tamk-group8-todo-frontend```  

After cloning install the required packages with: ```npm i``` inside the ```todo/``` directory.  

Now create a ```.env``` file into ```todo/``` directory and add the following contents to it:  

  * ```REACT_APP_BACKEND_APIKEY=```  
    * This should be the same value as the apikey in your frontend setup.  

  * ```REACT_APP_URL=```  
    * This should be the url of your backend, by default this should be ```http://localhost:8080/api/```  

now run ```npm start``` inside the ```todo/``` directory.