Skip to content
You said:
redux implementation in nextjs along with implementation and the code flow
ChatGPT said:
Implementing Redux in a Next.js application is a common pattern when managing global state, especially in medium-to-large applications. Below is a detailed guide, including installation, setup, code flow, and how everything works together.

✅ Why Redux with Next.js?
Next.js supports SSR (Server-Side Rendering) and Static Site Generation (SSG). To integrate Redux properly, we need to ensure:

State is shared correctly between client and server.

Redux store is rehydrated properly on the client side.

We use the package @reduxjs/toolkit (RTK) for boilerplate reduction, and react-redux for bindings.

📦 Installation
npm install @reduxjs/toolkit react-redux
📁 Project Structure
my-app/
├── pages/
│   ├── _app.js
│   ├── index.js
├── store/
│   ├── index.js
│   └── counterSlice.js
└── components/
    └── Counter.js
1️⃣ Create a Redux Slice
store/counterSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    reset(state) {
      state.value = 0;
    }
  }
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
2️⃣ Configure the Redux Store
store/index.js

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
3️⃣ Integrate Redux with Next.js via _app.js
pages/_app.js

import { Provider } from 'react-redux';
import { store } from '../store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
This wraps your app with the Redux provider so any component can access the store.

4️⃣ Access Redux State in a Component
components/Counter.js

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../store/counterSlice';

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+ Increment</button>
      <button onClick={() => dispatch(decrement())}>- Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}
5️⃣ Use the Counter Component
pages/index.js

import Counter from '../components/Counter';

export default function Home() {
  return (
    <div>
      <h2>Redux in Next.js</h2>
      <Counter />
    </div>
  );
}
🔄 Code Flow Summary
Redux store is created with configureStore and includes reducers like counterSlice.

The store is provided to the whole Next.js app via the <Provider> component in _app.js.

React components (like Counter) use useSelector to read from the store and useDispatch to send actions.

Actions update the state using reducers defined in the slice.

React automatically re-renders components when the Redux state they depend on changes.

⚠️ SSR Note (Optional)
If you need to support SSR with Redux, consider using:

npm install next-redux-wrapper
And wrap your store with it. But for most client-only state management, what we did above is sufficient.

Would you like the SSR version of the setup as well?

You said:
give the example along with the api call
ChatGPT said:
Great! Let's build a full Redux + Next.js example that includes:

✅ Redux for global state
✅ API call using fetch (or axios)
✅ Displaying the fetched data in a component
✅ Managing loading & error states in Redux

🔧 Scenario
We'll fetch a list of users from a public API (https://jsonplaceholder.typicode.com/users) and manage the following state with Redux:

Users list

Loading state

Error handling

📁 Project Structure
my-app/
├── pages/
│   ├── _app.js
│   └── index.js
├── store/
│   ├── index.js
│   └── usersSlice.js
├── components/
│   └── UsersList.js
1️⃣ Install Dependencies
npm install @reduxjs/toolkit react-redux
2️⃣ Create the Redux Slice with Async Thunk
store/usersSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch users from API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
3️⃣ Set Up the Redux Store
store/index.js

import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
4️⃣ Wrap Next.js App with Redux Provider
pages/_app.js

import { Provider } from 'react-redux';
import { store } from '../store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
5️⃣ Create Component to Display Users
components/UsersList.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/usersSlice';

export default function UsersList() {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
6️⃣ Render Component in Page
pages/index.js

import UsersList from '../components/UsersList';

export default function HomePage() {
  return (
    <div>
      <h1>Redux + API Call in Next.js</h1>
      <UsersList />
    </div>
  );
}
✅ Final Code Flow
Redux Store is created with a usersSlice that includes async logic using createAsyncThunk.

In the UsersList component:

useEffect dispatches fetchUsers().

Redux updates the loading state → UI shows loading message.

When data is fetched → Redux stores it → component re-renders with users.

If there's an error → UI displays it.

Redux is connected to Next.js via <Provider> in _app.js.

🚀 Output in Browser
When you run:

npm run dev
You’ll see:

Redux + API Call in Next.js
User List
- Leanne Graham (Sincere@april.biz)
- Ervin Howell (Shanna@melissa.tv)
...
Want more?
I can extend this with:

Pagination

Loading spinner (instead of text)

Search/filter

SSR with Redux

Let me know!



Attach

Search

Study

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.
//next redux some solutions 
    Skip to content
You said:
in nextjs we have to implement the redux toolkit so what is folder structure if we use app routing
ChatGPT said:
When using Redux Toolkit with Next.js 13+ (App Router), the folder structure and integration differ slightly from traditional setups due to the modular nature of the App Router.

Here's a clean and scalable folder structure recommendation for using Redux Toolkit with App Router in a Next.js project:

✅ Recommended Folder Structure
/my-nextjs-app
├── /app
│   ├── /[route]           # Your dynamic or static routes
│   │   └── page.tsx
│   ├── /layout.tsx        # Shared layout (like <html> and <body>)
│   └── /page.tsx          # Root index page
│
├── /redux
│   ├── /features
│   │   └── /counter
│   │       ├── counterSlice.ts     # A feature slice
│   │       └── counterSelectors.ts # (optional) selectors
│   ├── store.ts                    # Redux store configuration
│   └── provider.tsx                # Redux <Provider> wrapper
│
├── /components
│   └── Counter.tsx         # UI component using Redux state
│
├── /styles
├── /public
├── /utils
├── /hooks
├── next.config.js
├── tsconfig.json
└── package.json
🛠 Step-by-step Setup
1. Install Redux Toolkit and React-Redux
npm install @reduxjs/toolkit react-redux
2. Create Redux Store
/redux/store.ts

import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
3. Create a Provider Wrapper
/redux/provider.tsx

'use client'

import { Provider } from 'react-redux'
import { store } from './store'

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
4. Wrap the App with ReduxProvider
/app/layout.tsx

import { ReduxProvider } from '@/redux/provider'

export const metadata = {
  title: 'My App',
  description: 'With Redux Toolkit',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
5. Create a Redux Slice
/redux/features/counter/counterSlice.ts

import { createSlice } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
6. Use Redux State in a Component
/components/Counter.tsx

'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { increment, decrement } from '@/redux/features/counter/counterSlice'

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
}
✅ Tips
Always mark components that use Redux or other hooks with 'use client' in the App Router.

Keep Redux logic (slices, store, etc.) outside the app/ directory.

Consider using RTK Query if you need to fetch data via API.

Would you like me to generate a full working template with this structure?

You said:
give exmaple of an api
ChatGPT said:
Sure! Here's a complete example of how to create and consume an API using Redux Toolkit (with RTK Query) in a Next.js App Router project.

📌 Goal:
Create a simple REST API using Next.js API route (/api/products)

Use RTK Query to fetch data from that API and display it in a component

📁 Folder Structure (only relevant parts shown):
/app
│
├── /products
│   └── page.tsx          # Client page that uses the API data
│
/pages
│
├── /api
│   └── /products
│       └── index.ts      # API route returning a product list
│
/redux
│   ├── /services
│   │   └── productApi.ts # RTK Query API slice
│   ├── provider.tsx
│   └── store.ts
🔧 1. Create the API Route
/pages/api/products/index.ts

import type { NextApiRequest, NextApiResponse } from 'next'

const products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Phone', price: 500 },
  { id: 3, name: 'Tablet', price: 750 },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(products)
}
📦 2. Setup RTK Query API Slice
/redux/services/productApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
  }),
})

export const { useGetProductsQuery } = productApi
🏗 3. Update Redux Store
/redux/store.ts

import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './services/productApi'

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
🌐 4. Wrap with Provider
/redux/provider.tsx

'use client'

import { Provider } from 'react-redux'
import { store } from './store'

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
🔁 5. Use API Data in Page
/app/products/page.tsx

'use client'

import { useGetProductsQuery } from '@/redux/services/productApi'

export default function ProductsPage() {
  const { data: products, error, isLoading } = useGetProductsQuery()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading products.</p>

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products?.map((product: any) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}
🧪 Test it!
Start your Next.js app with:

npm run dev
Then visit:
📍 http://localhost:3000/products

✅ Summary
You created a Next.js API route at /api/products

You used RTK Query to fetch that data

You displayed the data on a client component

Let me know if you want:

A mutation (e.g., POST to add a product)

Or if you're fetching from a real external API (like JSONPlaceholder or your backend)

You said:
api example with redux toolkit in nextjs
ChatGPT said:
Great — let's build a complete example of using an API with Redux Toolkit (including RTK Query) in a Next.js 13+ project (App Router).

✅ Goal:
We’ll:

Create a simple API in Next.js (/api/posts)

Use Redux Toolkit with RTK Query to fetch posts

Display the posts in a page using Redux state

🛠 Technologies:
Next.js 13+ App Router

Redux Toolkit

RTK Query

TypeScript

📁 Final Project Structure (simplified)
/app
│ └── layout.tsx
│ └── page.tsx
│ └── /posts
│     └── page.tsx   ← UI that fetches data
/pages
│ └── /api
│     └── /posts
│         └── index.ts  ← API route
/redux
│ └── store.ts
│ └── provider.tsx
│ └── /services
│     └── postApi.ts  ← RTK Query setup
/components
│ └── PostList.tsx   ← UI Component
📦 1. Install Dependencies
npm install @reduxjs/toolkit react-redux
🔌 2. Create API Route
/pages/api/posts/index.ts

import type { NextApiRequest, NextApiResponse } from 'next'

const posts = [
  { id: 1, title: 'First Post', content: 'This is the first post.' },
  { id: 2, title: 'Second Post', content: 'This is the second post.' },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(posts)
}
🧠 3. Setup Redux Store
/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { postApi } from './services/postApi'

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
/redux/provider.tsx
'use client'

import { Provider } from 'react-redux'
import { store } from './store'

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
🔗 4. Setup RTK Query API Slice
/redux/services/postApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
  }),
})

export const { useGetPostsQuery } = postApi
🧱 5. Wrap Your App with Redux Provider
/app/layout.tsx
import { ReduxProvider } from '@/redux/provider'
import './globals.css'

export const metadata = {
  title: 'Next.js + Redux Toolkit',
  description: 'Example using RTK Query',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
🧩 6. Create a Component That Uses Redux
/components/PostList.tsx
'use client'

import { useGetPostsQuery } from '@/redux/services/postApi'

export default function PostList() {
  const { data: posts, error, isLoading } = useGetPostsQuery()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading posts</p>

  return (
    <ul>
      {posts?.map((post: any) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  )
}
📄 7. Use the Component in a Page
/app/posts/page.tsx
import PostList from '@/components/PostList'

export default function PostsPage() {
  return (
    <div>
      <h1>Posts</h1>
      <PostList />
    </div>
  )
}
✅ Result
Visit:
📍 http://localhost:3000/posts

You’ll see a list of posts fetched via your own API, using Redux Toolkit + RTK Query.

🧠 Optional Extras
Add createPost mutation to show POST requests

Use TypeScript interfaces for API response

Add loading skeletons, pagination, etc.

Would you like an example of POST (mutation) as well?

You said:
using javascript   
ChatGPT said:
Perfect! Here's a complete example of using Redux Toolkit with RTK Query in Next.js (App Router) using JavaScript (not TypeScript).

🧾 What You'll Get:
✅ A working API in Next.js (/api/posts)

✅ Redux Toolkit + RTK Query setup

✅ Fetching posts using Redux in a component

✅ Works with App Router

📁 Project Structure (Simplified)
/app
│ └── layout.js
│ └── page.js
│ └── /posts
│     └── page.js         ← UI page to display posts
/pages
│ └── /api
│     └── /posts
│         └── index.js    ← API endpoint
/redux
│ └── store.js
│ └── provider.js
│ └── /services
│     └── postApi.js      ← RTK Query API slice
/components
│ └── PostList.js         ← Component to show posts
🔧 Step-by-Step Guide (JavaScript Version)
1️⃣ Create the API Route
/pages/api/posts/index.js

export default function handler(req, res) {
  const posts = [
    { id: 1, title: 'First Post', content: 'Hello from the first post.' },
    { id: 2, title: 'Second Post', content: 'Redux Toolkit is awesome.' },
  ]

  res.status(200).json(posts)
}
2️⃣ Create RTK Query API Slice
/redux/services/postApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
  }),
})

export const { useGetPostsQuery } = postApi
3️⃣ Set Up the Store
/redux/store.js

import { configureStore } from '@reduxjs/toolkit'
import { postApi } from './services/postApi'

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
})
4️⃣ Set Up the Redux Provider
/redux/provider.js

'use client'

import { Provider } from 'react-redux'
import { store } from './store'

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}
5️⃣ Wrap Your App with Redux Provider
/app/layout.js

import { ReduxProvider } from '../redux/provider'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
6️⃣ Create a Component to Use the API
/components/PostList.js

'use client'

import { useGetPostsQuery } from '../redux/services/postApi'

export default function PostList() {
  const { data: posts, error, isLoading } = useGetPostsQuery()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error fetching posts.</p>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  )
}
7️⃣ Create a Page to Show Posts
/app/posts/page.js

import PostList from '../../components/PostList'

export default function PostsPage() {
  return (
    <div>
      <h1>All Posts</h1>
      <PostList />
    </div>
  )
}
✅ Result
Run your app:

npm run dev
Visit: http://localhost:3000/posts
➡️ You should see the list of posts from your API, loaded using Redux Toolkit (RTK Query).

✅ Summary
Task	✅ Done?
Next.js API	✅
Redux Toolkit Setup	✅
RTK Query API Slice	✅
Redux Provider in Layout	✅
Data Fetch Component	✅
Would you like me to include a mutation example (e.g. create post) next?

You said:
only frontend here i think backend is also included
ChatGPT said:
You're right — the example I gave includes both frontend and a simple backend API route (/api/posts) via Next.js's built-in API routes.

Since you're asking for frontend only, here's what we can do instead:

✅ Goal (Frontend-Only Redux Toolkit + RTK Query)
We'll:

Use Redux Toolkit with RTK Query in the frontend only

Fetch data from an external API (like JSONPlaceholder)

Avoid writing any custom backend or API routes

🔧 Use Case
Fetch posts from:

https://jsonplaceholder.typicode.com/posts
No /pages/api/ is needed — 100% frontend.

🧾 Project Structure (Frontend Only)
/app
│ └── layout.js
│ └── /posts
│     └── page.js         ← UI page using Redux
/redux
│ └── store.js
│ └── provider.js
│ └── /services
│     └── postApi.js      ← RTK Query
/components
│ └── PostList.js         ← Component to show posts
✅ Steps
1️⃣ Setup Redux + RTK Query API Slice
/redux/services/postApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
  }),
})

export const { useGetPostsQuery } = postApi
2️⃣ Setup Store
/redux/store.js

import { configureStore } from '@reduxjs/toolkit'
import { postApi } from './services/postApi'

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
})
3️⃣ Setup Redux Provider
/redux/provider.js

'use client'

import { Provider } from 'react-redux'
import { store } from './store'

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}
4️⃣ Wrap App in Provider
/app/layout.js

import { ReduxProvider } from '../redux/provider'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
5️⃣ Component to Fetch and Display Posts
/components/PostList.js

'use client'

import { useGetPostsQuery } from '../redux/services/postApi'

export default function PostList() {
  const { data: posts, error, isLoading } = useGetPostsQuery()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load posts.</p>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  )
}
6️⃣ Page to Render the Component
/app/posts/page.js

import PostList from '../../components/PostList'

export default function PostsPage() {
  return (
    <div>
      <h1>Posts</h1>
      <PostList />
    </div>
  )
}
✅ Output
Visit:

http://localhost:3000/posts
➡️ You’ll see posts fetched from https://jsonplaceholder.typicode.com/posts — fully frontend, no backend API route used.

Want to Add Mutations?
If you'd like to:

Create posts

Update posts

Delete posts

I can show how to do that next with createApi and builder.mutation.

Would you like a simple "add post" example too?




Attach

Search

Study

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.


