# Cashback Explorer

In this test assessment, we would like you to build Cashback Explorer application. You will have to utilize our API, please [see API.md](./API.md).

This test has two levels of difficulty:

1. Application developer (Swift / React Native)
2. Fullstack developer (Swift + Javascript developer)

First, complete "Application developer" level, and later, if you like, complete "Fullstack developer" level.

## Application developer

In this level you should build a client application "Cashback Explorer", using an API written for you (**[see API.md](./API.md)**). You can create your own architecture and design of an application. Below you could find a possible variation:

### <a id="login-screen"></a>1. "Login" screen

*Does not require authorization*

Should have controls:

1. User name input
2. User email input
3. "Sign in" button

If user's name or email are incorrect, a login procedure should fail. A successful login form submission indicated by "token" header in the server response. Once **token** obtained, it should be preserved on the client and sent with every request to the Cashback Explorer API.

Once subsripbtion succeed, user should navigate to **["Explore" screen](#explore-screen)**.

### <a id="explore-screen"></a>2. "Explore" screen

*Requires authorization*

This screen should have:

1. A full-screen Map with a user indicator in the center.
2. Markers on the map, where each marker represents a venue (cafe, bar, restaraunt, shop, etc). Each marker should have a cashback value on it's indicator (see example below). Pressing the marker should display information about venue: name, cashback value, city name and a name of a user who created that venue (if exists).

   [![image.png](https://s15.postimg.cc/4gy3joy97/image.png)](https://postimg.cc/image/68r2elhlz/)

3. A handler for navigation to **["Add new venue" screen](#add-new-venue-screen)**

### <a id="add-new-venue-screen"></a>3. "Add new venue" screen

*Requires authorization*

This screen should have a form for adding a new cashback venue. If form submission fails, a new venue should not be added and incorrect fields in the form should have proper error indication.

Once form successfully submitted, a user should be redirected back to **["Explore" screen](#explore-screen)** with a new cashback venue.

## Fullstack developer

In this level we want you to improve application you wrote by adding "Reviews" functionality. After completing this level, each venue in previously created application shall have a list of reviews from arbitrary users, and each review should contain:

1. Name of a reviewer
2. Date of a review
3. Rating (1-5)
4. Text of a review

Your work will consist of two parts:

1. Building a backend part and submitting a PR to this repository
2. Building review module and displaying reviews in your app

How it should work:

When a user presses a pin on the **["Explore" screen](#explore-screen)**, he sees the average rating for this venue (if it has enough reviews) and a list of reviews. Also, he is able to create a new review. Only logged in users could create a new review.

Once review created, user should see it on the review list for a venue.

---

That's it! Once you have completed, send a link to joseph@cogni.is. If you have any technical questions regarding execution, please contact max@cogni.is.

