# fresh project

### Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

## TODO

### Config

:lock:

- [x] Mongoose from NPM.
- [x] JWT Header Auth.
  - Implemented simple cookie-based authentication :cookie:.
- [x] _Session management using Redis or Cookies?_.
  - Implemented simple cookie-based authentication :cookie:.
- [x] Deno Env.
- [x] Look up config ts from CJ.
- [x] Middlewares (ensureAuth / ensureNotAuth).
- [x] Organize imports
  - [x] Add missing aliases
- [ ] Webmanifest (icons and standalone)
- [ ] Deploy to _Deno Deploy_.

### API

:truck:

- [ ] Implement API routes,

:man:

- [x] Implement Zod validation schemas.
- [x] Mongoose Models.
- [x] Implement user registration and store hashed passwords in the database,
      with a standalone register form.
- [x] Implement a login route with a standalone login form.
- [x] Log out route.

:house:

- [ ] Implement Zod validation schemas.
- [ ] Mongoose Models.
- [ ] Create new virtual household (everyone can create a virtual household).
- [ ] Join someone's household as a resident with secret household code (one
      user can join owner in their virtual household).
- [ ] Leave household (household can have no users. Users can rejoin if they
      have a secret code).
- [ ] Delete household (only the person who created the household can delete
      it).

:euro:

- [ ] Implement Zod validation schemas.
- [ ] Mongoose Models.
- [ ] Add, remove, and edit purchases. Everyone in the hosue can add a purchase.
      Purchase can be edited only by a person who paid for it.
- [ ] Show all the purchases from a household that user is a resident of.
- [ ] Show the amount of all purchases.
- [ ] Display the total amount spent by each user on household purchases.
- [ ] Display a chart to show who owes whom and how much.
- [ ] Provide the ability to change the balance when someone makes a transfer
      (i.e., when one person pays another some or all of what they owe).
- [ ] Add a split button in the purchase-adding form that divides the amount
      into two equal parts.

:scroll:

- [ ] Deno tests for API.

:dizzy:

- [ ] _Use the Preact testing library in a Deno environment._
