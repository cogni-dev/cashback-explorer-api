# Cashback API endpoints

[ ![Codeship Status for CogniInc/cashback-explorer-api](https://app.codeship.com/projects/b3260f40-83e8-0136-bdbd-22d4a94c839b/status?branch=master)](https://app.codeship.com/projects/302215)

This document has API documentation.

API base url: https://cashback-explorer-api.herokuapp.com/

All specified parameters are required.

Routes marked with __*__ require authorization. Authorized request contains valid `token` header, issued by `POST /users` endpoint.

`POST /users`

Creates a new user and issues an authorization token in case of success.

Expects next parameters to be passed:
- name - name of a user
- email - valid email of a user

Successful response has a `token` header, **which should be preserved and sent with each request** in the request header.

`* POST /login`

Refreshes authorization token for a user.

Expects next parameters to be passed:
- name - name of a user
- email - valid email of a user

`* GET /venues`

Gets list of venues in the specified city. Must have a `city` parameter passed. By default, all venues are in the "New York" city.

- city - name of a city

`* POST /venues`

Creates a cashback venue.

Expects next parameters to be passed:
- name - name of a venue
- city - venue city name
- lat (float) - latitude of a venue. `-85.0 < lat > 85.0`
- long (float) - longitude of a venue. `-180.0 < long > 180.0`
- cashback (float) - cashback value of a venue. `0 < cashback > 80.0`