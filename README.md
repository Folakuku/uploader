# Uploader API

Welcome to the Uploader API.

#### Entity Relationship Diagram (ERD)

![erd diagram](https://github.com/Folakuku/uploader/blob/main/erd.png?raw=true)

---

### Postman Documentation Link

Here is the Postman Documentation [here](https://documenter.getpostman.com/view/24732748/2sAYX2NPk9)

---

## Project Setup Instructions

### Prerequisites

Before proceeding, ensure you have the following installed on your system:

- Node.js(LTS)
- npm
- MySQL
- MongoDB

### Cloning the Repository

1. Open your terminal and navigate to the directory where you want to clone the project.

```shell
cd /path/to/your/directory
```

2. Clone the repository

```shell
 git clone https://github.com/Folakuku/uploader.git
```

3.  Navigate into the project directory

```shell
cd uploader
```

### Installing Dependencies

Install the project dependencies using npm:

```shell
npm install
```

### Setting Up the Environment Variables

This server was built to work with MongoDB or MySQL, the Database to be used is configured by setting the env variable to `mongodb` or `mysql`

```shell
DB_TYPE=<"mysql" | "mongodb">
JWT_SECRET="your-jwt-secret"
MY_SQL_DB_HOST="your-database-host"
MY_SQL_DB_USER="your-database-user"
MY_SQL_DB_PASSWORD="your-database-password"
MY_SQL_DB_NAME="your-database-name"
MONGO_DB_URI=mongodb://127.0.0.1:27017/uploader
NAME=Uploader API
EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_HOST=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_REGION=

```

### Setting Up the Database

1. Log in to your MySQL server

```sql
mysql -u <DB_USER> -p
```

2. Create the database

```sql
CREATE DATABASE <DB_NAME>
```

3. Exit the MySQL prompt

```shell
exit
```

### Running Migrations and Seeding the Database

Run the database migrations to set up the required tables:

```shell
npm run migrate:up
```

Run the following command to seed the database with initial data:

```shell
npm run seed
```
