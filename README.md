# E-Commerce API

![Node](https://img.shields.io/badge/-MySQL2-darkgreen)
![Sequelize](https://img.shields.io/badge/-Sequelize-blue) 
![Dotenv](https://img.shields.io/badge/-Dotenv-purple)
![MIT license](https://img.shields.io/badge/License-MIT-green.svg)
![badge](https://img.shields.io/github/languages/top/ruxinqu/e-commerce-api)

## Description

This project is an E-Commerce api that a user can Create/Read/Update/Delete data.

 An ORM(Object relational mapping) tool [Sequelize](https://sequelize.org/docs/v6/) is used to perform queries. The database driver is [Mysql2](https://www.npmjs.com/package/mysql2). Routes are built with [Express](https://expressjs.com).


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Technologies Used](#technologies-used)
- [Question](#question)

## Installation

1. Run `git@github.com:RuxinQu/e-commerce-api.git` on the terminal to git clone the repo.
2. Then run `npm install` to download all the packages.
3. Add a *.env* file, in the root directory containing the code below:
```
DB_NAME= 'database_name'
DB_USER= 'database_username'
DB_PW= 'database_password'
```

## Usage

1. Run `npm run seed` and `npm start` to start the server.
2. Endpoints available: 
    * Category: `/api/categories`, `/api/categories/:id`
    * Product: `/api/products`,`/api/products/:id`
    * Tag: `/api/tags`, `/api/tags/:id`
3. Validation is added to the PUT and DELETE routes. If there's no data matches the given id, an error will be thrown.
4. Validation is added to the POST routes for category and tags endpoint to ensure no duplicated data is added.

View the demo video of this project [**HERE**](https://drive.google.com/file/d/1KT1IfQv5BD3MR2ITonp-bk2r6anXIb5L/view?usp=share_link).

## License

This project is under MIT license

[https://opensource.org/licenses/MIT](https://opensource.org/lsicenses/MIT)

## Technologies Used

- [mysql2](https://www.npmjs.com/package/mysql2)
- [sequelize](https://sequelize.org/docs/v6/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://expressjs.com)
## Question

 Contact me via: ruxinqu@gmail.com if you have addition questions.
