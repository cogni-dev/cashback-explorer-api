# Cashback Explorer

In this test assessment, we would like you to build Cashback Explorer application. You will have to utilize our API, please [see API.md](./API.md). You can create your own architecture and design of an application. Below you could find a possible variation:

### <a id="login-screen"></a>1. "Login" screen

*Does not require authorization*

Should have controls:

1. User name input
2. User email input
3. "Sign in" button

If user's name or email are incorrect, a login procedure should fail. A successful login form submission indicated by "token" header in the server response. Once **token obtained, it should be preserved on the client and sent with every request** to the Cashback Explorer API.

Once subsripbtion succeed, user should navigate to **["Explore" screen](#explore-screen)**.

### <a id="explore-screen"></a>2. "Explore" screen

*Requires authorization*

This screen should have:

1. A full-screen Map with a user indicator in the center.
2. Markers on the map, where each marker represents a venue (cafe, bar, restaraunt, shop, etc). Each marker should have a cashback value on it's indicator (see example below). Pressing the marker should display information about venue: name, cashback value, city name and a name of a user who created that venue (if exists).

   [![image.png](https://s15.postimg.cc/4gy3joy97/image.png)](https://postimg.cc/image/68r2elhlz/)

---

That's it! Once you have completed, send a link to joseph@cogni.is. If you have any technical questions regarding execution, please contact max@cogni.is.

