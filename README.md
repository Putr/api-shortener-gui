GUI for API Shortner
--------------------

Minimal GUI for [api-shortener](https://github.com/Putr/api-shortener). Supports creation and deletion. Does not display stats.

**Usecase**: This is intendend only for testing or as a stopgap method while you're implementing the api into your own app. It's probably also good enough for personal use.

**DO NOT USE IN PRODUCTION**

![ApiShort screenshots](http://files.andree.si/apishort.gif)

## Requirements

- Nginx => 1.7.5

## Install

**Setup nginx config**

Copy nginx.conf.dist to nginx.conf and modify `server_name` and `all paths`.

**Secure the install**

We're using Basic HTTP Auth.

Create file `etc/.htpasswd` and add the username/password (see google how).

**Setup config**

Copy config.js.dist to config.js and modify with your information.

**Restart nginx**

    sudo service nginx restart

That's it!

## Security consideration:

1. This has no autentichation/authorisation code. 
2. Your access_code for the API is passed to the client (who can steal it!) as all requests are made with javascript.

This is intended for stopgap/testing purposes. It should be secured with at least Basic HTTP Auth.

## Deployment

Deployment is done with [Deployer](http://deployer.org/).

**Copy config file and configure**

    cp deploy.php.dist deploy.php
    nano deploy.php

run with

    dep deploy production






