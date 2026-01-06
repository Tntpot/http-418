---
title: 'Introduction to Redux'
description: 'The state of the world...'
pubDate: 'Dec 18 2025'
heroImage: '../../assets/blog-placeholder-1.jpg'
tags: ['redux', 'development']
---
The Redux API has very few functions and is relatively simplistic (base Redux that is).

## Compose
```javascript
import { compose} from "redux";
```

The `compose` function takes any number of provided single-argument' functions as parameters, and returns a singular function which effectively combines all of these.

This is done with right-to-left associativity, and will execute these in the reverse sequence they are provided to the `compose` function (from right-to-left...).

## Store
```javascript
import { createStore } from "redux";
    
const store = createStore(reducer);
```

A `store` is exactly what you would think — a `redux store` of the state of the application.

As such, the `store` has functions such as `store.getState()` which will return the 'state of the world' as it is at that point in time.

When creating a store, there is only one required parameter — a `reducer`.

## Reducers
`Reducer`s are pure functions — two things go in, one thing comes out.

A `reducer` takes two parameters — the `state`, and an `action` to apply to that state, and then returns the updated `state`.

```javascript
const incrementReducer = (state, action) => {
    if(action.type === 'INCREMENT') {
        return { value: state.value + 1 };
    };

    return state;
};
```

Points to note:
- The relevant logic for each `action` typically exists in a conditional `if` block.
- The value returned from this `reducer` (all paths, including the conditional `action` block) **must** represent the entire `state`.
- You can have multiple reducers, so your single `reducer` logic doesn't need to contain multiple conditional `if` blocks for every type of `action`.

## Actions
An `action` is an object, and only has one required property — the `type`.

Typically there are other properties such as `payload` or `error`, but you can add anything to this object.

An 'action' is self-descriptive; it is an event that has happened within the application, that means the `state` now needs updated.

It is worth noting that best-practice is to assign the `type` to a constant and reference this in-code, to reduce human error and spelling mistakes.
<br/> Conventionally this constant is in upper-case letters, to distinguish it from other variables.

```javascript
const INCREMENT = 'INCREMENT';
const incrementAction = { type: INCREMENT, payload: 1, error: '' };
```

Actions should be delcarative & lightweight — related logic, default params etc. should live in the `reducer`.

#### Action Creators
A fancy function to allow easier construction of `action`s and reduce boiler plate & repetition.

Using the Increment `action` above, an 'action creator' for this might look like
```javascript
const increment = (amount) => { type: INCREMENT, payload: amount, error: '' };

const incrementBy2Action = increment(2);
```

We can then `dispatch` these `actions`, and our `reducer` will 'apply' these to our `state`.

```javascript
const reducer = (state, action) => { ... };

const store = createStore(reducer);

store.dispatch(incrementBy2Action);
```

##### Bind Action Creators
The above syntax can be simplified even further, as Redux allows us to group `action`s and bind these to the `dispatch` on our `store` directly.

This allows us to call these functions without having to use the `store.dispatch()` syntax.

You can group these actions by calling the `bindActionCreators` function from `redux`. The first parameter is an object containing the action creators you
want to group, and the second parameter is what to bind these to — in our case, `store.dispatch`.

```javascript
import { bindActionCreators } from "redux";

...

const actions = bindActionCreators({ increment }, store.dispatch);
```

Note that we pass `increment`, the action creator, **not** `incrementBy2Action` which is itself an `action` (the result of calling the action creator).

We can then `dispatch` this `action` directly by calling
```javascript
actions.increment(2);
```

## Initial State
It is crucial to set the initial `state` of your application, else you will run into errors.

In our example, our `state` object stores a value that we can increment using our new `action`.

As such it is reasonable that our `state` should start with a `value` of 0.
One way that we can apply this initial `state` to our `store` is by providing this as a second parameter when creating the `store`:
```javascript
const intitialState = { value: 0 };

// Initial state is set at the top level
const store = createStore(reducer, initialState);
```

However as you can have multiple `reducer`s which may deal with different, specific areas of your `state`, it can be helpful to have an initial `state` scoped to this area.

Consider an application which has a `user` and `blogpost`s.

We may have two separate `reducer`s to handle `action`s related to each application area.

A `user` object may look something like
```javascript
const user = {
    firstName: 'Dan',
    lastName: 'Ferguson',
    jobTitle: 'Software Developer',
    location: {
        city: 'Belfast'
    },
};
```

We may have various `action`s to update `firstName`, `jobTitle` etc., and our user `reducer` needs to be able to handle these.

In this case, a `reducer` with an initial state may look like:
```javascript
const initialUserState = {
    firstName: '',
    lastName: '',
    jobTitle: '',
    location: {
        city: ''
    },
};

const userReducer = (state = initialUserState, action) => {
    if(action.type === UPDATE_FIRST_NAME) {
        return {
            ...state,
            firstName: action.value,
        };
    };

    return state;
};
```

A `blogpost` object may look like
```javascript
const blogpost = {
    title: 'Introduction to Redux',
    publishDate: '12/12/2025',
    ...
}
```

In this case, a `reducer` with an initial state may look lke:
```javascript
const initialBlogpostState = {
    title: '',
    publishDate: '',
    ...
}

const blogpostReducer = (state = initialBlogpostState, action) => {
    if(action.type === UPDATE_TITLE) {
        return {
            ...state,
            title: action.value,
        };
    };

    return state;
};
```

It is clear how this allows for more specific `state` management per application area, as if we were to create and manage `state` and initial `state` with one object, this would get unmaintainable very quickly.

```javascript
const globalInitialState = {
    user: {
        firstName: '',
        lastName: '',
        jobTitle: '',
        location: {
            city: ''
        },
    },
    blogposts: [
        {
            title: '',
            publishDate: '',
        },
        {
            title: '',
            publishDate: '',
        },
        {
            title: '',
            publishDate: '',
        },
    ].
};
```

A small exmaple, but this serves to highlight the issue.

Redux allows for multiple `reducer`s to facilitate code splitting, and having distinct initial `state`s for these is better practice than attempting to maintain a singular monolithic `state` object.
