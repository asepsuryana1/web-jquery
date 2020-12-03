# web-jquery

## installing expres view ejs

```bash
$ express web-jquery --view=ejs
```
```bahs
$ cd web-jquery
$ npm install
```

## installing nodemon

```bash
$ npm install nodemon -D
```

### package.json add dev 

```json
{
  "name": "web-jquery",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.6"
  }
}
```
* Try to run in localhost:3000
```bash
$ npm run dev
```

## Create Database postgreSQL

### change user 
```bash
$ sudo su <user.postgre>
```
### masuk pake ```psql```
```bash
postgres@docs-desktop:/home/docs$ psql
```
```bash
psql (13.1 (Ubuntu 13.1-1.pgdg20.04+1), server 12.5 (Ubuntu 12.5-1.pgdg20.04+1))
Type "help" for help.

postgres=# 
```

### nampilin database ```\l```

```bash
postgres=# \l   \q ---> for exit

                                  List of databases
   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges   
-----------+----------+----------+-------------+-------------+-----------------------
 cobaDB    | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 condb     | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 jwtdb     | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 ormdb     | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 postgres  | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 template0 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |          |          |             |             | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |          |          |             |             | postgres=CTc/postgres
(7 rows)
```

### create database ```CREATE DATABASE database_name```
```bash
postgres=# create database siswadb;
```
#### create table siswa 
** pgAdmin
*** id serial primary key
*** nama character variying
*** umur integer
*** isboolean boolean

## connecting to database
* [install libarary pg](https://www.npmjs.com/package/pg)
```bash $ npm install pg -S
```






