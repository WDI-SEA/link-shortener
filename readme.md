# Link Shortener

A link shortener is a tool that takes a long URL and shortens it. **WOW!! MAGIC!!**

Link shorteners are especially useful for sites like Twitter where you have a limit on how many characters you are allowed to type.

We can take this link:

https://www.google.com/maps/place/Shorty's/@47.6137498,-122.3451417,3a,46.3y,42.93h,84.81t/data=!3m7!1e1!3m5!1sOAT5FI6A5tyPinemSDJnSA!2e0!6s%2F%2Fgeo0.ggpht.com%2Fcbk%3Fpanoid%3DOAT5FI6A5tyPinemSDJnSA%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D52.248997%26pitch%3D0!7i13312!8i6656!4m2!3m1!1s0x5490154c4bd3aa9b:0x3936ed1b6b680646!6m1!1e1

and turn it in to something like this...

http://bit.ly/shortysbelltown

#### Popular Link Shorteners

* https://tr.im/
* http://ow.ly/
* https://goo.gl/
* http://bitly.com

Note that a link shortener utilizes a common data structure called a **map**. Maps are a math concept that associates items between two sets of entities, similar to objects in JavaScript.

**Example Map**

```
google -> http://www.google.com
shortysbelltown -> https://www.google.com/maps/place/Shorty's....
```

Using the idea of shortening links by **mapping** a shorter word to a longer URL, let's create a link shortener!

## Getting Started

* Fork and clone this repository
* Run `npm install` to install dependencies
  * Use `nodemon` to start the server
  * Run `npm run lint:js` to lint your JS
  * Run `npm run lint:css` to lint your CSS

## User Stories

* As a URL creator, I want to enter a long URL and receive a shortened URL.
  * Example: I'll type in `http://www.google.com` and receive `http://localhost:3000/xA`
* As a URL creator, I'll paste the long URL into a form input.
* As a URL recipient, I want to enter the shortened URL and be redirected to the actual URL.
  * Example: I'll type in `http://localhost:3000/xA` and be redirected to `http://www.google.com`

## Requirements

#### Recommended Site Routes

| Verb | URL | Purpose | Description |
|---|---|---|---|
| GET | / | Home page | Contains a simple form where a user can enter a URL and get a short URL |
| POST | /links | Create Link | Accepts data from the form. Stores the URL in the database and redirects to the show route. |
| GET | /links/:id | Show Link | Displays the short URL of the specified id (so the user can copy / share it) |
| GET | /:hash | Redirect | Takes the hash and redirects the user to the URL stored in the database. |

#### Database Model

This should only require 1 database model called "link" which can contain 2 columns: id and url. Note that the url should be of type `text`. Think about why.

#### Suggested Process

##### Set up project

* Install dependencies with npm, like `ejs body-parser`
* Setup a basic express server
* Build all pages / routes

##### Add database

* Install database dependencies with npm: `pg pg-hstore sequelize`
* Create the database with `createdb`
* Initialize sequelize with `sequelize init`
* Change database configuration to match your new database
* Create a migration for the new `link` model
* Run migration
* Test model (try to create/find links using the Node console, or a separate test file)

##### Put it together

In order to avoid using the `id` as the hash in the shortened link, we can generate a hash from the database model's `id` by using the `hashids` module. `hashids` provides a function that maps each number to a generated string, which requires a **salt** in order to provide variability.

Note that a hash is a piece of data, specifically a string. In this case, the hash *maps* to a number! Try it out.

* Install hashing module (npm): hashids
* Add code in to your previously created routes so they interact with the database and generate hashes ([draw the rest of the owl](http://www.forimpact.org/wp-content/uploads/2014/01/HowToDrawOwl.jpg)).

**Example:**

```js
// require and create a new Hashids object
var Hashids = require("hashids");
var hashids = new Hashids("this is my salt");

// turn a number (such as a model id) to a hash
var hash = hashids.encode(12345); // hash is now "NkK9"

// decode the hash back into a number (note that this returns an array)
var linkId = hashids.decode("NkK9"); // linkId is now [ 12345 ]
```

## Resources

* [Hashids documentation](https://www.npmjs.com/package/hashids)
* [Sequelize documentation](http://docs.sequelizejs.com/en/latest/)
* [Express documentation](http://expressjs.com/4x/api.html)


## Bonuses

#### Track click count

Keep track of how many times the shortened URL is used. To do this, you'll need to add another column `count:Integer` to the links table and increment it every time someone is redirected to that URL. Additionally, add a count to the Show Link page... eg: "This link has been clicked **X** times."

This will require a migration. Running the following Sequelize command will make a migration file. Look at the [documentation for migrations](http://docs.sequelizejs.com/en/latest/docs/migrations/#functions) to find the functions necessary for a column migration.

```bash
sequelize migration:create --name addCountToLinkTable
```

#### Link index page

Create a link index `GET /links` that lists all links in the database. Try sorting the links by the click count (most popular links on top).



---

## Licensing
1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
