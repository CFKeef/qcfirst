![Banner Image](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/Banner.png)

# Coursor

## A Course management system for students and teachers

### Current Goal: MVP

MVP will require:

-   Users
-   Support for Students
-   Support for Professors
    -Session
    -CRUD Bits
-   CRUD Ops on Courses
-   Crud Ops for User Accounts
    -Enrollment Manage
-   Validation Logic

### To use it

Just head over to [the deployed site and take a look!](https://coursor.io)

OR

Clone the repo and type

```
yarn dev
```

You will need to set environment variables for your DATABASE_URL

### Features

-Handles both students and teachers

-   Students are able to view courses enrolled, courses offered and enroll into new ones
-   Teachers are able to view courses they are teaching and create new courses

-All CRUD operations are supported
-Day/Night theme

### Design

Heres the general look of the pages but they are subject to change as I bring it to development. Notes may be visible as well.

### Responsiveness Layout

#### Mobile
We use a margin of 20px around the body of the content to keep it from touching the edges and flex on the container to arrange it in a column with with being the 100% - 40px
![Layout for mobile](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/mobileLayout.png)

#### Desktop
For desktop we use these two components for a responsive layout:
![Screenshot of components](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/carbon.png)

This gives us an extremely responsive layout that stacks its children like a "stack of books".
![Layout for Desktop](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/desktopLayout.png)
#### Form Pages (Login, Signup, recover)

![Form Page UI Screenshot on Mobile](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/Screen%20Shot%202021-03-20%20at%2012.44.03%20PM.png)

#### Dashboard

![Dasboard UI Screenshot on Mobile](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/Screen%20Shot%202021-03-20%20at%2012.44.19%20PM.png)
![Dasboard UI Screenshot on Tablet](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/tabletDash.png)
![Dasboard UI Screenshot on Desktop](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/Screen%20Shot%202021-03-20%20at%2012.45.11%20PM.png)


#### Course Creation with notes

![Creation UI Screenshot on Mobile](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/Screen%20Shot%202021-03-20%20at%2012.44.38%20PM.png)
![Creation UI Screenshot on Tablet](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/tabletCreation.png)
![Creation UI Screenshot on Desktop](https://github.com/CFKeef/qcfirst/blob/main/public/images/readme/Screen%20Shot%202021-03-20%20at%2012.45.02%20PM.png)

#### Course Search with notes

![Search UI Screenshot on Mobile](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/Screen%20Shot%202021-03-20%20at%2012.44.47%20PM.png)
![Search UI Screenshot on Tablet](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/tabletSearch.png)
![Search UI Screenshot on Desktop](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/Screen%20Shot%202021-03-20%20at%2012.44.53%20PM.png)
