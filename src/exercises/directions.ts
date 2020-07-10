export const directions = `
## Directions

The exercises here are meant to take you from understanding a little about RxJS to using the tool effectively in an app. It is done through a series of puzzles, which are located in the directory \`src/exercises/puzzles.ts\`. Inside that file you'll see a series of functions with names like \`subscribe\`. Those names correspond to the exercises on the left of this web app. So the \`subscribe\` function must be completed to pass the \`Subscribe\` exercise on the left. If you run this application with the provided setup from the README, it will automatically refresh on save, so you will see the results immediately. You should not need to look at the corresponding React components to complete the exercises. If you get stuck google, ask questions, pair. There is no such thing as cheating, and reactive extensions can be very confusing at first.

To get the directions for each exercise click the links on the left. These exercises are meant to be done in order, as the get progressively more difficult as they progress. So why don't you click the Subscribe exercise and get started!

**Important:** If you find the app will not compile because it cannot find a file in \`rjxs/internal\` you may need to restart the app.
`;

export const subscribe = `
## Subscribe

### Goal

Using the passed in observer send its result to callback (\`cb\`).

### Operators

* \`subscribe\`
`;

export const takeTwo = `
## Take 2

### Goal

Return an observable that takes the first two values off the end of the observable.

### New Operators

* \`pipe\`
* \`take\`
`;

export const usingFetch = `
## Fetch

### Goal

Replace the fetch operator with an Observable that calls the same url.

### New Operators

* \`fromFetch\`
`;

export const mapStatusCode = `
## Map Status Code

### Goal

Return an Observable that maps the response object to its status code (which can be found on the response object).

### New Operators
* \`map\`
* \`response.status\`

### Existing Operators
* \`fromFetch\`
* \`pipe\`
`;

export const tapForDebugging = `
## Tap For Side Effects

### Goal

Use \`tap\` to log each entry in the passed in observable

### New Operators
* \`tap\`
`;

export const createYourOwnObservable = `
## Create Your Own Observable

### Goal
Create an Observable that emits 7, 8, 9.

### New Operators
* \`of\` - returns an observable emitting the values passed in.
`;

export const getTheJSON = `
## Fetch the JSON

### Goal

Fetch the JSON off of the HTTP response.

### New Operators
* \`response.json()\`
* \`flatMap\`

### Existing Operators
* \`fromFetch\`
`;

export const takeFiveRowsFromTheJSON = `
## Combining Operators

### Goal
Take the first five entries of the JSON response to the passed in URL. Fetch will emit one, 3000 line, JSON object. This requires combining operators.

### New Operators
* pipe - Allows running one filter after the other in a concise syntax.

### Existing Operators
* flatMap
* tap (to stepwise debug)
* take
* of
* ... or "splat" - not Rx, but JavaScript

### Warning
The request will take some time to refresh until you limit the number of rows. If you log every entry you may end up with a non responsive tab until it finishes. You can use the Browsers task manager to kill the tab.
`;

export const countValidUsers = `
## Count Valid Users

### Goal

Count the number of valid users from the JSON data returned from the server. Empty users are entries where the 'user' field isn't present in the JSON.

### New Operators
* filter
* count

You can technically use just count here, but using filter first is a little more self explanatory. Feel free to use just count for extra credit.

### Existing Operators
* pipe
* flatMap
`;

export const findUsersNamed = `
## Find Users Named With 'n'

### Goal

Getting raw JSON data isn't very interesting. Using filter and map pull out the name of all the users who's user_names begin with l. Note you will get 

### New Operators
* None or \`pluck\` (optional)

### Existing Operators
* \`pipe\`
* \`flatMap\`
* \`filter\`
* \`map\`
* \`fromFetch\`
* \`of\`
`;

export const findUniqueUsersNamed = `
## Find Unique Users Named With 'n'

### Goal

Now that you've pulled out the users who's name begins with an 'l', go ahead and just get the unique ones.

### New Operators
* \`distinct\`

### Existing Operators
* \`pipe\`
* \`flatMap\`
* \`filter\`
* \`map\` or \`pluck\`
* \`fromFetch\`
* \`of\`
`;

export const subscribeAndHandleAnError = `
## Subscribe And Handle the Error

### Goal

The observer passed into this function will, when subscribed to, error. Use the \`subscribe\` method that accepts multiple parameters to catch the error and log it _as an error_ using the passed in console logger.

This function does not return an observer.

### New Operators
* \`subscribe\` with the \`error\` method handler.

### Existing Operators

`;

export const catchErrorEmitsASuccessMessage = `
## Convert an Error Into a Success

### Goal

While it's common to log an error and cancel a subscription an observable, like in the previous exercise, it's also common to convert errors into successful domain objects. Think the "Null Object" pattern for example.

In this exercise take the passed in Observable and use \`catchError\` to convert the error into a success message. Do NOT use subscribe, simply return the modified Observer.

### New Operators
* \`catchError\`

### Existing Operators
* \`pipe\`
`;

export const convertSuccessfulFetchIntoError = `
## Convert Success Into An Error

### Goal

By default \`fromFetch\` will emit a successful response in the event of 404 or other HTTP failures. Many other libraries will emit an error in that case, completing the subscription. In this puzzle use \`fromFetch\` to make the web request, but map the responses statusText to an error.

### New Operators
* \`response\` - use the response object's other methods to determine the error message.

### Existing Operators
* \`pipe\`
* \`map\`

`;

export const chainFetches = `
## Chain Fetches Together

### Goal

The function takes two URLs. The first URL will return one JSON object in the request. Take the user.id from the response and use it in the second fetch. You will return an array of tweets with the screen_name and text from the second request.

### New Operators
* None

### Existing Operators

* \`pipe\`
* \`map\`
* \`flatMap\`
* \`fromFetch\`
`;

export const mergeToCombineRequests = `
## Merge To Combine Requests

### Goal

Use the \`merge\` command to combine two fetches, allowing them to run concurrently, and then return the count of distinct screen_names. You'll need to filter out empty ones.

### New Operators

* \`merge\`

### Existing Operators

* From now on you won't get this hint
`;

export const createYourOwnFetch = `
## Create Your Own Fetch

### Goal

Don't use the \`fromFetch\` or \`fromPromise\` but instead create and return an Observable using that wraps the built in fetch function \`Observalbe.create\`. Your observable should always emit the json blob instead of the response object, and should emit an error with the status text when the response is not 'ok'. If you do this right you'll get two results on the page.

### New Operators

* \`Observable.create\` - you'll need to specify the observer type
`;

export const creatingBehaviorSubjects = `
## Using Subjects

### Goal

This exercise is expecting your code to return a Behavior Subject, to which it will emit "one", "two", "three". Your job is to create one, initialized with the value "zero", and then subscribe to it logging each value with the passed in logger. You'll need to filter out the value "two".

### New Operators

* \`BehaviorSubject\`
* \`Subject\`
`;

export const emitAllTheSentValues = `
## Emit All The Sent Values

An example in choosing the right subject type.

### Goal

Create a subject and send every value in the passed in array to it. You should see all of them displayed on screen.

### Operators

You must choose between \`BehaviorSubject\` and \`ReplaySubject\`.

`;

export const emitTheLastSentValue = `
## Emit The Last Sent Value

A (second) example in choosing the right subject type.

### Goal

Create a subject and send every value in the passed in array to it. You should see all only the last of them displayed on screen, because of the subject chosen.

### Operators

You must choose between \`BehaviorSubject\` and \`ReplaySubject\`.

`;

export const completeASubscription = `
## Complete A Subscription

### Goal

Use the complete function on an observer to complete a subscription. Before you do make sure you emit one value ('value one').

### Operators

Your choice
`;
