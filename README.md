# (Musto) Flix (React)

- A web-application for movie fans.

## OBJECTIVES

- Using React.js library (framework 😋), build the client-side for [MovieApi](https://github.com/mustafa-sarshar/movie-api) based on its existing server-side code (REST API and database), with supporting documentation.

## VISIT THE WEBSITE [😎🔗](https://mustafa-sarshar.github.io/musto-flix-react/)

### SCREENSHOTS

<table width="100%"  style="overflow:auto">
  <tr>
    <th width="25%" style="text-align:center;">Landing/Sign In Page</th>
    <th width="25%" style="text-align:center;">Sign Up Page</th>
    <th width="25%" style="text-align:center;">Movie List</th>
    <th width="25%" style="text-align:center;">User Profile</th>
  </tr>
  <tr>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-flix-react/blob/main/docs/assets/img/musto-flix-react-1.png?raw=true"/></td>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-flix-react/blob/main/docs/assets/img/musto-flix-react-2.png?raw=true"/></td>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-flix-react/blob/main/docs/assets/img/musto-flix-react-3.png?raw=true"/></td>
    <td width="25%"><img src="https://github.com/mustafa-sarshar/musto-flix-react/blob/main/docs/assets/img/musto-flix-react-4.png?raw=true"/></td>
  </tr>
</table>

## THE 5 W’s

- Who — The users of the [Musto Flix](https://mustafa-sarshar.github.io/musto-flix-react/) movie app and codebase, including other developers and designers.
- What — A single-page, responsive movie app built with React, with routing and several interface views. The client-side developed will support the existing server-side [MovieApi](https://github.com/mustafa-sarshar/movie-api) by facilitating user requests and rendering the response from the server-side via a number of different interface views.
- When — Users will be able to use the app whenever they want to read information about different movies or update their user information.
- Where — The app will be hosted online. It is responsive and can therefore be used anywhere and on any device, giving all users an equal experience.
- Why — Movie enthusiasts like to be able to access information about different movies, directors, stars, and genres whenever they want. The app will demonstrate my React skills and my ability to create straightforward documentation for other developers and employers.

## USER STORIES

- As a user, I want to be able to receive information on movies, directors, stars, and genres so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

## KEY FEATURES

- The app should display a welcome view where users will be able to either log in or register an account.
- Once authenticated, the user should now view all movies.
- Upon clicking on a particular movie, users will be taken to a single movie view, where additional movie details will be displayed.
- The single movie view will contain the following additional features:
  - A button that when clicked takes the user to the ​director view​, where details about the director of that particular movie will be displayed.
  - A button that when clicked takes the user to the stars view​, where details about that particular star of the movie will be displayed.
  - A button that when clicked takes the user to the ​genre view​, where details about that particular genre of the movie will be displayed.
  - A feature that enables the user to add or remove the movie from the favorites list.

## TECHNOLOGIES USED

- React +18
- React Bootstrap
- React Redux
- React Toastify
- Parcel

## Note:

- The package "**parcel**" is installed locally as a dev-dependency via: **npm install --save-dev parcel**. [More info](https://parceljs.org/)
- If you have already installed this package globally, we recommend to use this package as a local dev-dependency to avoid any conflict between packages.
- Moreover, you may add one command to the **script** tag in the package.json as follows:
  - "start": "parcel src/index.html"
- Add the following tag to the deploy index.html file to prevent getting the Permission-Policy Error:

```
  <meta http-equiv="Permissions-Policy" content="interest-cohort=()">
```
