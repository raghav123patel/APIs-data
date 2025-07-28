Skip to content
You said:
redux thunk one example with proper folder structure and all the code
ChatGPT said:
Here’s a complete example of Redux with Thunk middleware for a React app. This includes a proper folder structure, action creators using redux-thunk, reducers, store setup, and a component that uses the thunk action.

✅ Use Case
We'll build a simple app that fetches users from a fake API (https://jsonplaceholder.typicode.com/users).

📁 Folder Structure
my-redux-thunk-app/
├── public/
├── src/
│   ├── actions/
│   │   └── userActions.js
│   ├── reducers/
│   │   └── userReducer.js
│   ├── store/
│   │   └── store.js
│   ├── components/
│   │   └── UserList.js
│   ├── App.js
│   └── index.js
├── package.json
└── ...
1️⃣ Install Dependencies
npm install redux react-redux redux-thunk axios
2️⃣ store/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from '../reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
3️⃣ actions/userActions.js
import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: error.message,
      });
    }
  };
};
4️⃣ reducers/userReducer.js
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from '../actions/userActions';

const initialState = {
  loading: false,
  users: [],
  error: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { loading: false, users: action.payload, error: '' };
    case FETCH_USERS_FAILURE:
      return { loading: false, users: [], error: action.payload };
    default:
      return state;
  }
};
5️⃣ components/UserList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../actions/userActions';

const UserList = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
6️⃣ App.js
import React from 'react';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <UserList />
    </div>
  );
}

export default App;
7️⃣ index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
✅ Result
When the app loads, it dispatches the fetchUsers() thunk, and the UI will show a list of user names from the API.

Would you like a version of this example using TypeScript or using Redux Toolkit (RTK) instead?

By messaging ChatGPT, you agree to our Terms and have read our Privacy Policy. See Cookie Preferences.
Don't share sensitive info. Chats may be reviewed and used to train our models. Learn more



Attach

Search

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.

