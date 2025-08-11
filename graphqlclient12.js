12 aug
Skip to content
You said:
Access to fetch at 'https://fakeapi.platzi.com/en/gql/products/' from origin 'http://localhost:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
App.jsx:10  POST https://fakeapi.platzi.com/en/gql/products/ net::ERR_FAILED
(anonymous) @ @apollo_client.js?v=3dcfcd0d:11683
Subscription2 @ @apollo_client.js?v=3dcfcd0d:10054
subscribe2 @ @apollo_client.js?v=3dcfcd0d:10112
complete @ @apollo_client.js?v=3dcfcd0d:10678
Concast2.start @ @apollo_client.js?v=3dcfcd0d:10707
Concast2 @ @apollo_client.js?v=3dcfcd0d:10699
QueryManager2.getObservableFromLink @ @apollo_client.js?v=3dcfcd0d:16328
QueryManager2.getResultsFromLink @ @apollo_client.js?v=3dcfcd0d:16364
resultsFromLink @ @apollo_client.js?v=3dcfcd0d:16621
QueryManager2.fetchQueryByPolicy @ @apollo_client.js?v=3dcfcd0d:16646
fromVariables @ @apollo_client.js?v=3dcfcd0d:16420
QueryManager2.fetchConcastWithInfo @ @apollo_client.js?v=3dcfcd0d:16448
ObservableQuery2.fetch @ @apollo_client.js?v=3dcfcd0d:15155
ObservableQuery2.reobserveAsConcast @ @apollo_client.js?v=3dcfcd0d:15255
ObservableQuery2.reobserve @ @apollo_client.js?v=3dcfcd0d:15284
(anonymous) @ @apollo_client.js?v=3dcfcd0d:14779
Subscription2 @ @apollo_client.js?v=3dcfcd0d:10054
subscribe2 @ @apollo_client.js?v=3dcfcd0d:10112
(anonymous) @ @apollo_client.js?v=3dcfcd0d:17913
subscribeToStore @ react-dom_client.js?v=3dcfcd0d:4636
react_stack_bottom_frame @ react-dom_client.js?v=3dcfcd0d:17484
runWithFiberInDEV @ react-dom_client.js?v=3dcfcd0d:1483
commitHookEffectListMount @ react-dom_client.js?v=3dcfcd0d:8458
commitHookPassiveMountEffects @ react-dom_client.js?v=3dcfcd0d:8516
commitPassiveMountOnFiber @ react-dom_client.js?v=3dcfcd0d:9885
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=3dcfcd0d:9866
commitPassiveMountOnFiber @ react-dom_client.js?v=3dcfcd0d:9879
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=3dcfcd0d:9866
commitPassiveMountOnFiber @ react-dom_client.js?v=3dcfcd0d:9982
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=3dcfcd0d:9866
commitPassiveMountOnFiber @ react-dom_client.js?v=3dcfcd0d:9879
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=3dcfcd0d:9866
commitPassiveMountOnFiber @ react-dom_client.js?v=3dcfcd0d:9897
flushPassiveEffects @ react-dom_client.js?v=3dcfcd0d:11300
(anonymous) @ react-dom_client.js?v=3dcfcd0d:11058
performWorkUntilDeadline @ react-dom_client.js?v=3dcfcd0d:34
<ProductList>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=3dcfcd0d:248
App @ App.jsx:10
react_stack_bottom_frame @ react-dom_client.js?v=3dcfcd0d:17422
renderWithHooks @ react-dom_client.js?v=3dcfcd0d:4204
updateFunctionComponent @ react-dom_client.js?v=3dcfcd0d:6617
beginWork @ react-dom_client.js?v=3dcfcd0d:7652
runWithFiberInDEV @ react-dom_client.js?v=3dcfcd0d:1483
performUnitOfWork @ react-dom_client.js?v=3dcfcd0d:10866
workLoopSync @ react-dom_client.js?v=3dcfcd0d:10726
renderRootSync @ react-dom_client.js?v=3dcfcd0d:10709
performWorkOnRoot @ react-dom_client.js?v=3dcfcd0d:10328
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=3dcfcd0d:11621
performWorkUntilDeadline @ react-dom_client.js?v=3dcfcd0d:34
<App>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=3dcfcd0d:248
(anonymous) @ main.jsx:10Understand this error
@apollo_client.js?v=3dcfcd0d:201 Download the Apollo DevTools for a better development experience: https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm
ChatGPT said:
You're encountering a CORS (Cross-Origin Resource Sharing) issue when trying to make a request from your frontend (http://localhost:5173) to the GraphQL API at https://fakeapi.platzi.com/en/gql/products/.

🔍 Error Breakdown
The key error is:

"Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource."

This means:

Your browser is enforcing CORS policy.

The server at https://fakeapi.platzi.com is not allowing cross-origin requests from your frontend's origin (http://localhost:5173).

🔧 What Causes This?
When your app sends a POST request with headers or content types like JSON, the browser first sends a preflight OPTIONS request to ask the server if it allows the real request.

If the server doesn't respond with appropriate CORS headers, the browser blocks the actual request before it ever reaches the server.

✅ Ways to Fix or Work Around It
1. Check if the API supports CORS
If you don't control the API (fakeapi.platzi.com), you cannot fix CORS on their server. You need to:

Check their documentation to see if they offer CORS support or a proxy endpoint.

Reach out to Platzi or check their GitHub/issues/forums.

2. Use a CORS proxy (temporary development solution)
If it's for learning/testing and not production:

https://cors-anywhere.herokuapp.com/https://fakeapi.platzi.com/en/gql/products/
Or other public CORS proxies.

⚠️ Not for production — insecure, rate-limited, and can go offline.

3. Use a Backend Proxy (recommended for production)
Set up a small server (Node.js/Express, for example) that:

Accepts requests from your frontend (localhost).

Makes the API request to Platzi's server.

Forwards the response back to your frontend.

// Node.js + Express example:
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/products', async (req, res) => {
  try {
    const response = await axios.post('https://fakeapi.platzi.com/en/gql/products/', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));
Then from your frontend:

fetch('http://localhost:3000/api/products', { method: 'POST', body: JSON.stringify(...) })
4. Use GraphQL from the server side only
If you're doing server-side rendering (e.g., Next.js API routes or Node backend), call the API server-side where CORS isn't enforced by browsers.

✅ Summary
Fix Method	Use When	Notes
Use CORS proxy	Dev/testing only	Not secure or reliable
Backend proxy	Best option for production	Full control over headers
Contact API owner	If possible	Ask for proper CORS support
Move fetch server-side	If using SSR	Avoids browser CORS limits
Let me know which method you'd like to go with, and I can help you implement it.

You said:
i am using dummy api so how to solve for fetching in frontend
ChatGPT said:
Thanks for clarifying — since you're using a dummy API (like https://fakeapi.platzi.com) that doesn't support CORS, and you're building a frontend app, you have two main options:

✅ Option 1: Use a CORS Proxy (for development/testing only)
You can prepend a CORS proxy to your API URL like this:

const url = 'https://cors-anywhere.herokuapp.com/https://fakeapi.platzi.com/en/gql/products/';
And then use it in your fetch or Apollo Client setup:

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ /* your GraphQL query */ }),
})
  .then(res => res.json())
  .then(data => console.log(data));
Or in Apollo:

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://cors-anywhere.herokuapp.com/https://fakeapi.platzi.com/en/gql/products/',
  }),
  cache: new InMemoryCache(),
});
⚠️ You may need to visit https://cors-anywhere.herokuapp.com/ once and click “Request temporary access to the demo server” to use it.

✅ Option 2: Use a Local Backend Proxy (recommended)
Create a simple backend proxy to bypass CORS:

Install Express in your project or in a separate folder:

npm init -y
npm install express axios cors
Create server.js:

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/products', async (req, res) => {
  try {
    const response = await axios.post(
      'https://fakeapi.platzi.com/en/gql/products/',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Proxy server running at http://localhost:3001');
});
In your frontend, make the request to http://localhost:3001/api/products:

fetch('http://localhost:3001/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ /* your GraphQL query */ }),
})
  .then(res => res.json())
  .then(data => console.log(data));
✅ Summary Table
Method	Use Case	Pros	Cons
CORS Proxy	Dev only	Quick, no server needed	Not reliable, rate limits
Local Backend Proxy	Dev or prod	Secure, scalable	Requires Node backend
Would you like help setting up the proxy server or updating your Apollo Client setup?



Attach

Search

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.

