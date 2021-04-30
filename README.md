# jopy API

This is the backend Rest API for **Jopy**.
*Jopy* is an application for personal budget management. It allows you to create and edit income and expenses of money, and show a balance resulting from registered operations.

This application was made to participate in a challenge for **Alkemy**.


# Endpoints

First, you need to create an account or log in with your personal data.

## [POST] /api/auth/signup

You need to add in the req.body:

 - [ ] **username:** should be a string, it can contain numbers and symbols, and unique. Required.
 - [ ] **password:** should be a string, it can contain number and symbols. Required.
 - [ ] **fullname:** should be a string with the name that you want to be called. Required.

This endpoint will return a JSON like this: 
{
	success: boolean,
	token: string
}

You need to set in the *headers* of your next requests the attribute:
**x-access-token:** token

## [POST] /api/auth/login

You need to add in the req.body:

 - [ ] **username:** your username, don't forget it.
 - [ ] **password:** your password, don't forget it.

This endpoint will return a JSON like this: 
{
	success: boolean,
	token: string
}

You also need to set in the *headers* of your next requests the attribute:
**x-access-token: token**

## [POST] /api/transactions

Create a new transaction, you need to add in the req.body:

 - [ ] **ammount:** required, must be a number and greather than 0.
 - [ ] **type:** required, must be a string and it can only have one of these values: "income" or "spends".
 - [ ] **spends_category:** required, but only if the type of the transaction is "spends".
 - [ ] **income_category:** required, but only if the type of the transaction is "income". Can't have a spends_category and a income_category at the same time, one of those must be null.
 - [ ] **created_at:** optional, must have the format YYYY-MM-DD HH-MM-SS. If you don't include it, the server will complete it.

##  [GET] /api/transactions

Get all transactions of your account from the server.

## [GET] /api/transactions/latest

Get the 10 latest transactions of your account from the server.

## [GET] /api/transactions/type/:type

The parameter :type only can be "income" or "spends". Get all transactions of it's type of your account from the server.

## [GET] /api/transactions/:id

Get a specific transaction by it's id of your account.

## [PUT] /api/transactions/:id

Update a specific transaction of your account and send the data again. You can modify everything except the type. Complete: ammount and categories. Optionally created_at.

## [DELETE] /api/transactions/:id
Delete a specific transaction of your account.
