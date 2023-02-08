# fresh project

### Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

### TODO

- [x] Mongoose,
- [x] JWT Header Auth
  - Went with simple cookies :cookie:
- [x] _Redis / Session Cookies?_
- [x] Look up config ts from CJ
- [x] Work on API routes
  - [x] Register user and store hashed password in DB / Register form as an
        island
  - [x] Login route / Login form as an island
    - [ ] Create new house (everyone can create a house)
    - [ ] Join house with secret house code (one user can only be in a one
          house)
      - [ ] Leave house (house can have no users. Users can rejoin if they have
            a secred code)
        - [ ] Delete house (only the person who created the house can delete it)
        - [ ] Add / remove / _edit_ purchases. Everyone in the hosue can add a
              purchase
        - [ ] Show all the purchases from a house that user is in,
- [ ] Add loaders for forms etc.
- [x] Organize Imports (use aliases)
  - [ ] Add some missing aliases
- [ ] Dashboard island: _chart_
- [ ] Deploy to Deno deploy
