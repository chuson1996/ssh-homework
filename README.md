# SSH-HOMEWORK

### Running The Solution
```bash
npm install
npm run dev
```

### Solution Explaination

Boilerplate: https://github.com/erikras/react-redux-universal-hot-example

A few note on the optional task: I implement 2 ways to accomplish the task. One uses the `/document/<id>/text?search=<query>` endpoint. One does not and use a ready-made [component](https://github.com/bvaughn/react-highlight-words).

Right now the one using the ready-made component is commented out and if you want to see how it works, please read the comments in src/containers/Document.js

### Answer to bullet point number 4

I believe the reason that my work in the project won't break when there's new feature relies on:
* how react components are divided into 2 categories: _Container_ and _Presentational_ components. Dan Abramov covers this topic pretty solid in [this article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.afwxidnth) and I reckon your developers would be familiar with the definition of containers and presentational components. If we have a new route then we will need a new container bound to corresponding redux actions to handle data. If we have a feature that doesn't concern with the rest of the app but the props of its own and is resuable, we will create a (presentational) component. New features, which might involve creating redux modules, containers or components will not affect the existing ones whatsoever.
* When having new endpoints and new data binding, we just need to add new redux modules....


### Answer to bullet point number 5

So far I have completed all the tasks I believe. However, there are a few things that can be polished like the design and animation transitions to improve the user experience.

Currently token expiration is not handled properly. If I have time I would loook more into this issue. Perhaps something that stacks all the Unauthorized requests, get user to login, and call again those requests to return user to their previous state. This behavior is conveyed in [angular-http-auth](https://github.com/witoldsz/angular-http-auth) but I haven't found a simliar one for react.


