import React, { useState } from "react";

function App() {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    
    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-white">Count: {count}</h1> {/* Display the current count */}
            <div>
              <button className="btn btn-outline-dark" onClick={increment}>Increment</button> {/* Increment the count */}
            <button className="btn btn-outline-dark" onClick={decrement}>Decrement</button> {/* Decrement the count */}
            </div>
        </div>
    );
}

export default App;