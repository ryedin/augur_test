This app is a very simplistic app designed to satisfy the requirements of the Augur.io interview test.

This uses only server-side logic (as long as you agree that utilizing the browser's cache doesn't constitute "logic").

I used Express and bower (just to get jquery for convenience), thus to setup and run the app, do the following...

1. `npm install -g bower`
2. `npm install`
3. `bower install`
4. `node .`
5. Navigate to `http://localhost:3000/`

## Flow

All true logic is server-side, although it does rely on the browser's cache to achieve the desired results.

1. The user navigates to the app for the first time
2. The file `public/index.html` is served (predictably)
3. A script asset called `/tag.js` is requested, which is a dynamic route setup in `index.js`
4. This route checks for the presence of an `if-modified-since` header. Absence of this header indicates this is the first time this client has hit the site (since clearing local cache, of course). If the header IS present, we simply return an empty `304` response to indicate that the browser should load the cached version.
5. If no `if-modified-since` header is present, a new unique id is generated, and this is sent to the client in a very minimal generated javascript file that simply sets a global variable called `tag`.
6. On, the client, this value is rendered in the DOM (not a very useful web page) via the static script asset at `public/render_tag.js`.
7. Another static asset at `public/report_tag.js` is loaded, which tells the server what the value of the tag is (whether or not this was newly generated or loaded from cache).
8. The server keeps a naive in-memory store of known browsers, including a simple little counter which gets logged to the console on each page request.
