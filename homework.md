# Need to create server
    - Express.js is used to create server in Node.js
    - Install Express.js
    - Install nodemon - automatically refreshes the server after any change.

# Create a repository
# Initialize the repository
# node_modules, package.json, package-lock.json
# Install Express
# Create a server
# Listem to port 7777
# Write request handlers for /test,/hello
# Install nodemon and update scripts inside package.json

# diff between caret and tilde
# what are dependencies
# what is use of -g while npm Install

- Initialize git 
- gitignore
- Create a remote repo on github
- Push all code to remote origin


- Sequence of Routing matters. ( Order of writing the routes matter the most).
- Use Postman for API Calls.

- Learn Regular expresion in Routing
- Explore routing and use of ?, + , * , () in the routes
- Use of regex in routes /a/ , /.*fly$/
- Reading the query param in the routes
- Reading the dynamic routes.

- Multiple Route Handlers - Play with the code
- next()
- next function and errors along with res.send()
- app.use("/route", rH, [rH2, rH3], rH4, rh5);
- What is a Middleware? Why do we need it?
- How express JS basically handles requests behind the scenes
- Difference app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
- Error Handling using app.use("/", (err, req, res, next) = {});

- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the Database "Connection-url"/devTinder
- Call the connectDB function and connect to database before starting application on 7777
- Create a userSchema & user Model
- Create POST /sigup API to add data to database
- Push some documents using API calls from postman
- Error Handling using try , catch

- JS object vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API dynamic to recive data from the end user
- User.findOne with duplucate email ids, which object returned
- API- Get user by email
- API - Feed API - GET /feed - get all the users from the database
- API - Get user by ID
- Create a delete user API
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documention for Model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID

- Explore schematype options from the documention
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropiate validations on each field in Schema
- Add timestamps to the userSchema
- Add API level validation on Patch request & Signup post api
- DATA Sanitizing - Add API validation for each field
- Install validator
- Explore validator library funcation and Use vlidator funcs for password, email, photoURL
- NEVER TRUST req.body

- Validate data in Signup API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user is excrupted password
- Create login API
- Compare passwords and throw errors if email or password is invalid

- install cookie-parser
- just send a dummy cookie to user
- create GET /profile APi and check if you get the cookie back
- install jsonwebtoken
- IN login API, after email and password validation, create e JWT token and send it to user in cookies
- read the cookies inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middle ware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWT()
- Create UserSchema method to comparepassword(passwordInputByUser)

# Express Router

    - For grouping and handling number of api routes
    - This is good way to group and code apis.

    - Identify all the corner cases.

    - $or query similary there is $and,$not,$nor read about inverse queries -- Check this in MongoDb Logical queries.

    - Schema.pre("save",function(){})
      -- pre is like middleware used whenever .save(); is called
      -- all the logic written in it will be at schema level and executed before save event.

# Indexing in DB

    -- When i am giving any field unique : true it (MongoDb) automatically creates a index
    -- Or directly give index:true

    # Compound Index In Mongoose
      - connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
      - whenever quering more than one item together then compund indexes can be given.

      -- Learn about Compound Indexes

      -- Also learn why should not create indexes on every field
      -- why do we need index
      -- adv and dis adv of creating index

# Relationship in DB

    # REF & POPULATE
      -- Use ref="MODEL NAME"
        -- By writing ref it creates reference to that Collection.
        -- And use populate in query for getting specific fields.
        -- Alternative for Joins
        -- Read about REF and POPULATE
        