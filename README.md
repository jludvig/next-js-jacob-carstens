## Starred.com Case Study

I spent a day learning next.js by following their tutorial. 

I used the next.js sample as a starting point and implemented the job search feature 
using server components and a client side search bar.

I wanted to experiment with server side actions, but found it was not responsive enough for the favourites feature,
so I added an api to update the job favourites instead. 

Then I copied the db folder from the starred sample project since sqlite seemed like a good choice for a
project like this where ease of setup is important.

## Running the project

2. Run `npm install -g pnpm` if you don't have pnpm installed
3. Run `pnpm db:reset` to reset the database
4. Run `pnpm install` to install dependencies
4. Run `pnpm dev` to start the project
5. Open http://localhost:3000 in your browser

There is no authentication, the login and logout buttons are just redirects. Given more time I would definitely
add authentication. I can see the db is already prepared for hashed and salted passwords, but time did not allow it.
