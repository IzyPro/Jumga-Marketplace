# FLW Dev Challenge - (Israel and Kelechi)

![Jumga Logo](https://github.com/IzyPro/Jumga-Marketplace/blob/main/jumga-frontend/src/Icons/fullLogo.png "Jumga Logo")

#### NB: This project leverages on the Flutterwave Payment Gateway and is currently set to the test enivronment, all accounts and cards should be associated with the flutterwave's test accounts and cards.

You can check out the project live [here](https://jumgafw.netlify.app)

[API Documentation](https://jumga-api.herokuapp.com/index.html)
## Jumga Frontend Documentation

The frontend of the project was built with Javascript as a language on React and Bootstrap & React Bootstrap for styling

## Tools

1. Microsoft Visual Studio Code
2. Github (Version Control and CI/CD)
3. Netlify App

## Jumga Backend API Documentation

This project is written from ground up using C# as language on ASP.NET CORE 3.1 Framework and MSSQL for database system

## Tools

1. Microsoft Visual Studio 2019
2. Github (Version Control and CI/CD)
3. Heroku App

## Description

Jumga is a multi-tenant marketplace created for sellers, merchants, brands and anyone who want to create a simple hassle free online shop for the success of their brand, this includes 
online presence, product listing and management, fast, easy and safe payment integration, shopping cart, orders and delivery services.

#### Features

1. Secure User Registration and Authentication
2. Shop Creation
3. Unique Shop URL
4. Automatic Payment Integration with flutterwave
5. Product Sale
6. Shop and Product Management
7. Product Image Gallery View
8. Orders History
9. Shopping Cart
10. Cart Item breakdown
11. Riders Delivery Assignment

## Project Flow

#### Shop Creation

A seller creates a shop through the registration process, proper information is gathered for the creation of the shop.
Shop is created and given a unique shop URL for access from customers, all shop newly created has a flag "isApproved" that is set to false;
With the "isApproved" flag set to false, user's unique shop URL returns 404 to customers and anyone who visits, no rider is assigned and no flutterwave subaccount for payment integration would be created.

#### Shop Approval

There is a notification on the Shop Admin Dashboard that prompts the shop to be approved with a "approve button", approval is made after a token of $20 is made to the Jumga Platform via Flutterwave secure payment gateway, after a succesful transaction the flutterwave transaction verification endpoint is called via our backend in order to fully verify the transaction (transaction id, currency and amount) and give value to the set shop. The shop is approved, a Flutterwave Subaccount is created on the Jumga Platform, a rider(already onboarded on the database) is assigned to the shop and the shop URL is active for public use.

#### Shop and Product Management

Shop Admin can add products to be displayed on the shop.
Product details include (Product name, quantity, description, price, delivery price and a picture of the product)
product is saved on the database according to the respective shop.

#### Orders and Product Sale

Customers can buy single and multiple items(Carting)
Customer KYC is collected as the payment is initialized, 
the prices of items and delivery amounts are pre-calulated and is passed to the Flutterwave Payment Checkout Modal, 
the shop's and associated rider's flutterwave subaccount Ids are retrieved from the database or secure session storage and is assigned to the subaccount array section of the flutterwave inline script, 
product prices and delivery amount are summed up and is split according to the proper percentages and assigned to their respective subaccounts(passing the exact amount, with the appopriate options). The flutterwave checkout modal is displayed and payment is made by the customer, on succesful payment , the Flutterwave transaction verification endpoint is called again,
if the verification is successful, value is set in the database(logging the orders in the database, deduction of product units in shop and populating shop and rider balances).

##### NB: There is currently no subaccount creation support for UK on Flutterwave.
