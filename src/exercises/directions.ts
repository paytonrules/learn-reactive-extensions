export const directions = `
## Directions

The exercises here are meant to take you from understanding a little about RxJS to using the tool effectively in an app. It is done through a series of puzzles, which are located in the directory \`src/exercises/puzzles.ts\`. Inside that file you'll see a series of functions with names like \`subscribePuzzle\`. Those names correspond to the exercises on the left of this web app. So the \`subscribePuzzle\` function must be completed to pass the \`Subscribe\` exercise on the left. If you run this application with the provided docker-compose setup it will automatically refresh on save, so you will see the results immediately. You should not need to look at the corresponding React components to complete the exercises. If you get stuck google, ask quesetions, pair. There is no such thing as cheating, and reactive extensions can be very confusing at first.

To get the directions for each exercise click the links on the left. These exercises are meant to be done in order, as the get progressively more difficult as they progress. So why don't you click the Subscribe exercise and get started!

**Important:** If you find the app will not compile because it cannot find a file in \`rjxs/internal\` you may need to restart the app.
`;

export const subscribe = `
## Subscribe

This first exercise is meant to show you how to use the \`subscribe\` method on an Observable. The function subscribePuzzle is called with two parameters: an Observable of Numbers, and a React dispatch function. The Observable will "emit" one value which you capture via the subscribe function.

The subscribe function takes one parameter - a callback, which is passed the value(s) emitted by the Observable. In this case it is just one value. Subscribe is how you get values out of an Observable. You can think of it like the \`then\` of a promise.

For this first exercise you'll take the value emitted from the Observable, and send it back to the React App via the callback function.

**Important:** The Observable emits wrapper \`Number\` objects. The React callback expects a \`number\` primitive so you'll need to convert the \`Number\` to a \`number\` with the \`valueOf\` method.
`;

export const takeTwo = `
## Take 2

In the first exercise we subscribed to an Observable and then made a callback into a React application. This isn't how you'll want to use Observable's typically, indeed you could have just made the callback directy. Part of the power of Observables is that you can return them as values, and that's what we'll be doing in this second exercise. The parent component will handle the subscription, which is a more typical way to use an Observable.

In this exercise the function will take an Observable, modify it using your first RxJS operator (take), and return it to be further processed by the react app. Specifically this app will take first two items from the Observable. It's a straightforward operator that takes the first x items emitted from the Observable.

Keep in mind that operators can be called two different ways. One is to call them directly, passing them their parameters which then return a function that takes an Observable. This is awkward and the more common way to make the call is to use the \`pipe\` operator, and pass operators to the pipe like so: \`observable.pipe(map(val => val * 2))\`.
`;

export const fetch = `
## Fetch

Now that a function is returning an Observable we are partway to seeing the power of Reactive Extensions, but where do Observable's come from? Well they can be created anywhere but in this exercise you'll use the the RxJS \`fromFetch\` function to create an Observable that represents make a web request and return an Observable. The function currently returns an \`empty\` which is quite useful for testing but not very useful in real code.

Replace the empty Observable with an Observable representing the web request and you'll see this test turn green with a JSON response.
`;

export const mapStatusCode = `
## Map Status Code

You're using the RxJS \`fromFetch\` function to create an Observable from a URL, and the calling component is subscribing that result and using it. Congratulations! At this point you could use Observables anywhere you use Promises with no trouble. For the next step you'll being using your first Reactive *operator* to convert the response to a value: - map.

Specifically in this case you want to return an Observable that maps the response object to its status code (which can be found on the response object). Remember the \`pipe\` operator? You'll need that too. Don't worry, it's not as much as it sounds.
`;

export const tapForDebugging = `
## Tap Tap Tap

Now that you've begun using operators you'll naturally want to combine them together. If you're familiar with functional programming you'll be very familiar with this style of programming, otherwise it should begin to become intuitive.

One of the advantages to this style of programming is that it can lead to very consice pipelines, but unfortunately it's not always clear how to do anything that is not "pure" in an operation. Consider debugging. In a long pipeline you may want to \`console.log\` the state of an emitted value to see it before and after the operations. You could use map to do that, but you'd need to ensure you always returned the same value from the map. It's hacky.

Enter \`tap\` (or \`do\` or \`doOnNext\` in other languages. \`tap\` passes the value to a function for the purposes of side effects (such as \`console.log\`) but does not modify the value. In this exercise use \`tap\` to log each entry in the passed in observable, without modifying it.`
;

export const createYourOwnObservable = `
## Create Your Own Observable

### Goal
* Create an Observable that emits 7, 8, 9.

### New Operators
* \`of\` - returns an observable emitting the values passed in.
`;

export const getTheJSON = `
## Fetch the JSON

If you are paying close attention thus far you may have noticed we're cheating.... a little bit. The response object that is emitted by the fetch Observable is the same as the response object used by the official [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). In our case we have it wrapped in an Observable, the official API wraps it in a Promise. To get the actual JSON body we need to call the JSON function - but that returns a Promise. If we use \`map\` here we're going to map every response to a Promise, not to the actual json body inside the Promise. In simpler terms, we'll map will convert the Response to a Promise, when we want to convert a Response to the actual JSON. How do we deal with that situation?

This is where \`mergeMap\` or \`flatMap\` come in (they are aliases for each other). When you don't want an Observable of Observables - you want a \`flatMap\`.

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
## Find Users Named With 'l'

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
## Find Unique Users Named With 'l'

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
