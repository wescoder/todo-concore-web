# todo-concore-web

Front-end server for the concore skill test.

## Development

Before starting you'll need to install the dependencies with `npm` or `yarn`:

```sh
npm install
# or
yarn
```

After installing create the environment configuration on the `.env.development` file or `.env.production` if deploying:

```sh
NODE_ENV='development'
BABEL_DISABLE_CACHE=1
APP_PORT=4001
PUBLIC_URL='http://todo-concore.lvh.me:4001'
API_URL='http://localhost:4000'
APP_ID='playground'
APP_KEY='<YOUR_API_KEY>'
```

After this you should be able to build for production with `npm run build` or run locally with `npm run dev`.

### Tips

While developing React `[HMR]` console messages can get in the way. Here is a snippet to put on chrome devtools to filter those:

```regex
/^(?!.*\[HMR\])/
```

And for the network tab this may be useful:

```regex
/^(?!.*\/\_next\/on\-demand\-entries\-ping\?|\/\_next\/webpack)/
```

## Architecture

The application uses Next.js and follows the recommended architecture with some extra folders for separation of concerns.
Some aliases where configured for easy of use:

```js
'@components/*' = './components/*'
'@reducers/*' = './reducers/*'
'@pages/*' = './pages/*'
'@root/*' = './*'
```

## License

> This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license
