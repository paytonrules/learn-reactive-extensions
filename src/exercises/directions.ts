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

**Important:** The Observable emits wrapper \`Number\` objects. The React callback expects a \`number\` primitive so you'll need to dconvert the \`Number\` to a \`number\` with the \`valueOf\` method.
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
`

export const mapStatusCode = `
## Map Status Code

You're using the RxJS \`fromFetch\` function to create an Observable from a URL, and the calling component is subscribing that result and using it. Congratulations! At this point you could use Observables anywhere you use Promises with no trouble. For the next step you'll being using your first Reactive *operator* to convert the response to a value: - map.

Specifically in this case you want to return an Observable that maps the response object to its status code (which can be found on the response object). Remember the \`pipe\` operator? You'll need that too. Don't worry, it's not as much as it sounds.
`

export const getTheJSON = `
## Fetch the JSON

If you are paying close attention thus far you may have noticed we're cheating.... a little bit. The response object that is emitted by the fetch Observable is the same as the response object used by the official [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). In our case we have it wrapped in an Observable, the official API wraps it in a Promise. To get the actual JSON body we need to call the JSON function - but that returns a Promise. If we use \`map\` here we're going to map every response to a Promise, not to the actual json body inside the Promise. In simpler terms, we'll map will convert the Response to a Promise, when we want to convert a Response to the actual JSON. How do we deal with that situation?

This is where \`mergeMap\` or \`flatMap\` come in. When you don't want an Observable of Observables - you want a \`flatMap\`.

`
