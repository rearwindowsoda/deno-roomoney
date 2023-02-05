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
- [ ] Work on API routes
  - [ ] Register user and store hashed password in DB
  - [ ] Login route / Login form as an island
    - [ ] Create new house (everyone can create a house)
    - [ ] Join house with secret house code (one user can only be in a one
          house)
      - [ ] Leave house (house can have no users. Users can rejoin if they have
            a secred code)
        - [ ] Delete house (only the person who created the house can delete it)
        - [ ] Add / remove / _edit_ purchases. Everyone in the hosue can add a
              purchase
        - [ ] Show all the purchases from a house that user is in
- [ ] Organize Imports (use aliases)
- [ ] Dashboard island: _chart_
- [ ] Deploy to Deno deploy
