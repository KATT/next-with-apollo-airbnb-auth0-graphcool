# Apollo Example

[![graphql-up](http://static.graph.cool/images/graphql-up.svg)](https://www.graph.cool/graphql-up/new?source=https://raw.githubusercontent.com/nikolasburk/ConferencePlanner/master/conference_planner.schema)

Server-side rendered & authed requests using auth0 & graph.cool. Project based on the [with-apollo](https://github.com/zeit/next.js/tree/master/examples/with-apollo) example.

## Stuff used

* [next.js](https://zeit.co/blog/next)
* [graph.cool](https://graph.cool) as a backend
* [auth0](https://auth0.com) for auth
* [apollo-client](https://github.com/apollographql/apollo-client) for gql requests
* [airbnb linting](https://github.com/airbnb/javascript)
* [env-cmd](https://github.com/toddbluhm/env-cmd) for serving env vars
* [redis](https://redis.io) using [redislabs](https://redislabs.com) for session storage
* [plop](https://github.com/amwmedia/plop) for scaffolding

## Demo

https://next-with-apollo-airbnb-auth0-graphcool.now.sh/

## How to use

1. Clone the repo
2. Install with `yarn`
3. `npm run dev`

Environment variables are saved in `.eslintrc` and the ones that should be exposed to the front-end are exposed through `next.config.js`.

## The idea behind the example

[Apollo](http://dev.apollodata.com) is a GraphQL client that allows you to easily query the exact data you need from a GraphQL server. In addition to fetching and mutating data, Apollo analyzes your queries and their results to construct a client-side cache of your data, which is kept up to date as further queries and mutations are run, fetching more results from the server.

In this simple example, we integrate Apollo seamlessly with Next by wrapping our *pages* inside a [higher-order component (HOC)](https://facebook.github.io/react/docs/higher-order-components.html). Using the HOC pattern we're able to pass down a central store of query result data created by Apollo into our React component hierarchy defined inside each page of our Next application.

On initial page load, while on the server and inside `getInitialProps`, we invoke the Apollo method,  [`getDataFromTree`](http://dev.apollodata.com/react/server-side-rendering.html#getDataFromTree). This method returns a promise; at the point in which the promise resolves, our Apollo Client store is completely initialized.

This example relies on [graph.cool](https://www.graph.cool) for its GraphQL backend.
