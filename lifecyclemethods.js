Mounting Phase (Class Components)
constructor(props)
Initializes state and binds methods.
Called before the component is mounted.

static getDerivedStateFromProps(props, state)
Syncs state with props if necessary.
Called before rendering on both mount and update.

render()
Returns JSX to render UI.
Required method in class components.

componentDidMount()
Called once after the component is mounted (DOM is ready).
Ideal for API calls, subscriptions, or DOM manipulation.



✅ Mounting in Functional Components (with Hooks)
Functional components don't have lifecycle methods but use React Hooks:

useState() – Initializes state.
useEffect(() => { ... }, [])
Acts like componentDidMount.
The empty dependency array [] ensures it runs once after the component is mounted.



Summary Table




Phase

Class Component Method

Functional Equivalent





Initialization

constructor()

useState()



Before Render

getDerivedStateFromProps()

Not commonly needed



Rendering

render()

JSX return



After Mount

componentDidMount()

useEffect(..., [])



🔁 Update Phase — Class Components
static getDerivedStateFromProps(props, state)
Called before every render (on mount and update).
Used to synchronize state with props.
Rarely needed.

shouldComponentUpdate(nextProps, nextState)
Lets you opt out of re-rendering for performance.
Returns true (default) or false.

render()
Called again to render the component with updated props/state.

getSnapshotBeforeUpdate(prevProps, prevState)
Called right before DOM is updated.
Lets you capture current DOM values (e.g., scroll position).
Must return a value or null, which is passed to componentDidUpdate.

componentDidUpdate(prevProps, prevState, snapshot)
Called after DOM updates.
Good place for API calls, DOM manipulations, or reacting to prop/state changes.



🔁 Update Phase — Functional Components (Hooks)
In functional components, the useEffect hook handles side effects on updates:

useEffect(() => { ... }, [dependencies])
Runs after every render only if the specified dependencies have changed.
You can simulate componentDidUpdate by using useRef to skip the first render.

Simulate componentDidUpdate:
js
CopyEdit
const isFirstRender = useRef(true);

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }
  // Your update logic here
}, [someDependency]);



🔁 Summary Table




Lifecycle Step

Class Component

Functional Component Equivalent





Sync state with props

getDerivedStateFromProps()

Conditional logic in useEffect()



Optimize re-render

shouldComponentUpdate()

React.memo() or custom hooks



Before DOM update

getSnapshotBeforeUpdate()

useLayoutEffect() (in some cases)



After update

componentDidUpdate()

useEffect() with dependencies



✅ Purpose of shouldComponentUpdate()
It determines whether the component should re-render or not.
Return:
true → allow re-render.
false → skip rendering (performance optimization).



📦 Example Code
jsx
CopyEdit
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      fixedValue: 100,
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  updateFixed = () => {
    // Updating with the same value (no real change)
    this.setState({ fixedValue: 100 });
  };

  // Only re-render if `count` changes
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate called");

    if (this.state.count !== nextState.count) {
      return true; // Allow re-render
    }
    return false; // Skip re-render
  }

  render() {
    console.log("Rendering component...");
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <h3>Fixed Value: {this.state.fixedValue}</h3>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.updateFixed}>Update Fixed (no re-render)</button>
      </div>
    );
  }
}

export default Counter;



🧠 What Happens Here:
When you click "Increment":
count changes → shouldComponentUpdate() returns true → component re-renders.

When you click "Update Fixed":
fixedValue is set to the same value (100).
count didn't change → shouldComponentUpdate() returns false → no re-render happens.
So "Rendering component..." won't appear in the console.



✅ Summary
Use shouldComponentUpdate() for performance optimization, especially in large or frequently updated components.
It helps avoid unnecessary re-renders.

🧹 Unmounting Phase – Class Components
✅ Only One Lifecycle Method:
componentWillUnmount()
js
CopyEdit
componentWillUnmount() {
  // Cleanup logic here
}


📌 Purpose:
Clean up side effects:
Clear timers (setInterval, setTimeout)
Cancel subscriptions (e.g., WebSocket, event listeners)
Abort ongoing API calls
Clean up DOM event handlers or observers



⚛️ Unmounting in Functional Components (Hooks)
You handle unmounting by returning a cleanup function from useEffect():

Example:
js
CopyEdit
useEffect(() => {
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  // 👇 Cleanup runs on unmount
  return () => {
    clearInterval(timer);
    console.log("Component unmounted");
  };
}, []); // Empty dependency = run once



🧠 Summary Table




Component Type

Lifecycle Method

Purpose





Class Component

componentWillUnmount()

Cleanup before removal from DOM



Functional Hook

useEffect(() => {...}, []) with return function

Cleanup inside returned function




🔁 Full Lifecycle Recap (Unrelated but helpful)




Phase

Class Method





Mounting

constructor → getDerivedStateFromProps → render → componentDidMount



Updating

getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate



Unmounting

✅ componentWillUnmount ✅



What is getSnapshotBeforeUpdate?
getSnapshotBeforeUpdate(prevProps, prevState) is a lifecycle method in React class components that runs right before the DOM is updated. It allows you to capture some information (a "snapshot") from the DOM before React makes changes based on the new render.
The value you return from getSnapshotBeforeUpdate is passed as the third parameter to the next lifecycle method, componentDidUpdate(prevProps, prevState, snapshot).


Why use getSnapshotBeforeUpdate?
Use it when you want to capture some DOM information right before it changes. For example, if you want to:

Preserve the scroll position of a list before it updates, so you can restore it afterward.
Capture the position or size of an element before React modifies it.
