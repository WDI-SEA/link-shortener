#Link Shortener

A link shortener is a tool that takes a long URL and shortens it. **WOW!! MAGIC!!**

Link shorteners are especially useful for sites like Twitter where you have a limit on how many characters you are allowed to type.

The purpose of a link shortener is to take a long url like this

https://www.google.com/maps/place/Shorty's/@47.6137498,-122.3451417,3a,46.3y,42.93h,84.81t/data=!3m7!1e1!3m5!1sOAT5FI6A5tyPinemSDJnSA!2e0!6s%2F%2Fgeo0.ggpht.com%2Fcbk%3Fpanoid%3DOAT5FI6A5tyPinemSDJnSA%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D52.248997%26pitch%3D0!7i13312!8i6656!4m2!3m1!1s0x5490154c4bd3aa9b:0x3936ed1b6b680646!6m1!1e1

and turn it in to something like this...

http://bit.ly/shortysbelltown

####Popular Link Shorteners

* https://tr.im/
* http://ow.ly/
* https://goo.gl/
* http://bitly.com

**NOTE:** For this assignment, fork and clone this repository your computer, and run `npm init` in the folder to being the project.

##User Experience

###User 1 - URL creator

**Description:** Anyone that needs to shorten a URL.

**Usage:** User should be able to come to the site, enter a url, click submit (or press enter) and receive a shortened url that they can share.


###User 2 - URL recipient

**Description:** Anyone that receives a shared URL (from user 1)

**Usage:** User should be redirected to the original URL used to create the shortened url.



##Site Routes

| Verb | URL | Purpose | Description |
|---|---|---|---|
| GET | / | Home page | Contains a simple form where a user can enter a URL and get a short url |
| POST | /links | Create Link | Accepts data from the form. Stores the url in the database and redirects to the show route. |
| GET | /links/:id | Show Link | Displays the short url of the specified id (so the user can copy / share it) |
| GET | /:hash | Redirect | Takes a hash and redirects the user to the url stored in the database |


##Database Model

This should only require 1 database model called "links" which can contain 3 columns id, url, hash.

**Optional bonus** Try using only 2 columns (id and url), while still using a hash

##Suggested Process

###Set up project / express

* create project directory
* npm init
* Install web server stuff (npm): express ejs body-parser
* Setup a basic express server (res.send('hi') on `GET /` route)
* Build all pages / routes

###Add database

* Install database stuff (npm): pg pg-hstore sequelize
* create database (postgres)
* sequelize init
* Create migration
* Run migration
* Test model (try to create/find links using the Node console, or a separate test file)

###Put it together

* Install hashing module (npm): hashids
* Add code in to your previously created routes so they interact with the database and generate hashes ([draw the rest of the owl](http://www.forimpact.org/wp-content/uploads/2014/01/HowToDrawOwl.jpg)).

##Resources

[Hashids documentation](https://www.npmjs.com/package/hashids)

[Sequelize documentation](http://docs.sequelizejs.com/en/latest/)

[Express documentation](http://expressjs.com/4x/api.html)

## Part 2 - Track click count

Keep track of how many times the shortened url is used. To do this you'll just need to add another column `count:Integer` to the links table and increment it every time someone is redirected to that url.

Additionally, add a count to the Show page... eg: "This link has been clicked **X** times."

## Part 3 - Link index page

Create a link index `GET /links` that lists all links in the database sorted by the click count (most popular links on top).


