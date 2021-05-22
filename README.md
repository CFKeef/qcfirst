![Banner Image](https://raw.githubusercontent.com/CFKeef/qcfirst/main/public/images/readme/Banner.png)

# Coursor

A course management system for students and professors. [Visit Here](www.coursor.io)

## Tean
-Patryck Golebiewski

## Contributions
I did everything which involved designing it first, then bringing it to reality with front end and lastly the backend

### Features
* Supports different user types (Students and Professors for now but can easily expand it)
  * Roles decide what is rendered on the server than sent off to the user
* Student's Actions:
  * View and drop courses enrolled
  * View and enroll in courses offered
* Instructor's Actions:
  * Create and manage courses
  * View courses they are teaching
* All CRUD operations are supported
* Day/Night theme
* Stale while revalidate pattern

### Feature Location
* Can be seen on the sign in page and the view on the dashboard is different depending on what type of user is logged in
  * [Sign In Roles](https://coursor.io/)
  * [Dashboard - Protected by session so you need to log in](https://coursor.io/dashboard) 
* When logged in as a student you can see these actions by interacting with the course element and the search page
  * [Dashboard - Protected by session so you need to log in](https://coursor.io/dashboard)
  * [Search - Protected by session so you need to log in](https://coursor.io/search)
* Day and night toggle appears on all pages. Interacting with it shifts the themes
  * [Sign In Toggle](https://coursor.io/)
* SWR Pattern can be immediately seen when logging into your dashboard or searching for courses. ITs the process of fetching data and
  * [Dashboard - Protected by session so you need to log in](https://coursor.io/dashboard)
  * [Search - Protected by session so you need to log in](https://coursor.io/search)
 
### Technology

On the front end:
-NextJS
-React
-Styled Components

On the backend:
NextJS allows you to skip having an express server so I did everything through its "backend" using next-connect


And for my database I used Postgresql


### Design

Heres the general look of the pages but they are subject to change as I bring it to development. Notes may be visible as well.

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

#### Differences
- No calendar section and menu items differ
- Virtualization and Infinite scrolling is not on app
- Layout shift from nav on bottom to moved to top for mobile
- Search/Results is split up on main app but the mock up has them sharing the page


