# WazirX Visualizer ![https://github.com/adityak74/wazirx-visualizer/blob/main/.github/workflows/main.yml](https://github.com/adityak74/wazirx-visualizer/blob/main/.github/workflows/main.yml/badge.svg)

A simple wazirx coins ticker data collector and visualizer. Will be used as a dataset for the Crypto Prediction Project ([ChainML](https://github.com/adityak74/chainML) ).

# PreRequisite

* xampp/lampp/wampp application to run MySQL database and Apache server [Download from here](https://www.apachefriends.org/download.html).
* Download Node js and install in your operating system. [Download from here](https://nodejs.org/en/download/)
* Postman a desktop app or you can use it [chrome extension](https://chrome.google.com/webstore/category/extensions) for API testing.[Download from here](https://www.getpostman.com/apps) 

# Used Packages 

### MYSQL
* For development please download and use XAMPP/LAMP. 

---

# SQL Configuration

```
cp config-example.json config.json
```
* Update your credentials for the environment you are using

---
# Migrations

```
sequelize db:migrate
```
* Please run the migrations defined in the migrations folder using sequelize-cli

* Run the coins metadata seeder using the following command
```
node services/coins-seeder.js
```

---

# Get Started

1. `$ git clone https://github.com/adityak74/wazirx-visualizer.git`
2. `$ npm install`
3. Launch Enviornment:
    * `$ node app.js or nodemon app.js`
4. In Cluster mode with the help of pm2 [optional step]:
    * `$ pm2 start app.js or pm2 start app.js -i <no of instances>`
5. Open in browser:
    * open `http://localhost:8080`

# API Usage 

1. Coins Seeder Route route - `http://localhost:8080/seedCoinsData`
     * Seeds the coins from WazirX API to the database

Example response object for request (JSON object) -

```
{
    "username":"test",
    "password":"testpass"
}
```

# Features

* To scrape the WazirX API Endpoint for Ticker, Market Data
* Store/Collect the data in the database
