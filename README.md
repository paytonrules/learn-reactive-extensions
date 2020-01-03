# Reactive Extensions Learning

## Getting Started

This exercise is best done with the docker setup. Start the app by using
`docker-compose up`. The first time will take a while as it installs dependencies. 

After that you can re-run the application with `docker-compose up` and it should
be quite fast.

The app will start on http://localhost:3000. Futher directions are found there.

## Your Editor and TypeScript

Because the app is running on a Docker container, the `node_modules` directory
is also built in the docker container, and therefore when you first run
`docker-compose up` your hosts directory structure will have an empty
`node_modules` directory.

This is not a problem for the app but your editor/IDE will report compiler
errors. To address this you can either configure your IDE to edit inside the
 docker container (outside the scope of this doc) or run `yarn install` on your
 host. This will install the dependencies locally, so the editor can find them,
 but mind you there may be minor differences between the modules built in the
 container and those built locally. 

## Yarn

The exercises can be run directly using `yarn start` however be warned they were
developed on MacOS, so if you're using a Windows machine I cannot guarantee they work.
