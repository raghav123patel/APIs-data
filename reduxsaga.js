Skip to content
You said:
give an example of the redux saga with proper folder structure for the api fetching
ChatGPT said:
Here's a simple but complete example of using Redux-Saga for API fetching, including a clean folder structure. This example fetches a list of users from an API and stores it in Redux state.

🔧 Folder Structure
src/
│
├── api/
│   └── userApi.js         # API call logic
│
├── redux/
│   ├── actions/
│   │   └── userActions.js # Action creators
│   ├── reducers/
│   │   └── userReducer.js # User reducer
│   ├── sagas/
│   │   ├── userSaga.js    # User-specific sagas
│   │   └── rootSaga.js    # Root saga
│   └── store.js           # Redux store setup
│
├── components/
│   └── UserList.js        # React component
│
└── App.js
📦 1. API: userApi.js
// src/api/userApi.js
import axios from 'axios';

export const fetchUsersApi = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users');
};
🧠 2. Redux Actions: userActions.js
// src/redux/actions/userActions.js
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
export const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCESS, payload: users });
export const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: error });
🧩 3. Redux Reducer: userReducer.js
// src/redux/reducers/userReducer.js
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from '../actions/userActions';

const initialState = {
  loading: false,
  users: [],
  error: ''
};

const userReducer = (state = initialState, action) => {
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

export default userReducer;
⚙️ 4. Saga: userSaga.js
// src/redux/sagas/userSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUsersApi } from '../../api/userApi';
import {
  FETCH_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure
} from '../actions/userActions';

function* fetchUsers() {
  try {
    const response = yield call(fetchUsersApi);
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsers);
}
🧵 5. Root Saga: rootSaga.js
// src/redux/sagas/rootSaga.js
import { all } from 'redux-saga/effects';
import userSaga from './userSaga';

export default function* rootSaga() {
  yield all([userSaga()]);
}
🏪 6. Store Setup: store.js
// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from './reducers/userReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
🧱 7. React Component: UserList.js
// src/components/UserList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest } from '../redux/actions/userActions';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
🧩 8. Main App: App.js
// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserList from './components/UserList';

const App = () => (
  <Provider store={store}>
    <UserList />
  </Provider>
);

export default App;
✅ Run It
Make sure you have the required packages:

npm install redux react-redux redux-saga axios
Would you like a version using Redux Toolkit + Redux-Saga (more modern pattern)?

By messaging ChatGPT, you agree to our Terms and have read our Privacy Policy. See Cookie Preferences.
Don't share sensitive info. Chats may be reviewed and used to train our models. Learn more



Attach

Search

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.

