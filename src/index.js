import React, {useContext, useEffect, useMemo, useReducer, useState} from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import './index.css';


const contextExample = React.createContext("");

const ReducerTemp = (props) => {
    const initialState = {
        counter: 0
    };
    const [state, dispatch] = useReducer(reducer, initialState)
    const isEven = useMemo(() => {
        return state.counter % 2 === 0
    }, [state.counter])
    //usecallback = caches the function instance itself. cache function
    //useMemo = invokes and caches its result. cache result
    //useRef = get access to dom notes (for example input elements, etc). essentialy useref() is an object that can hold any mutable value. when it changes it holds a ref to the original
    // so it won't re-render upon changes
    const reducer = (state, action) => {
        switch (action.type) {
            case 'increment':
                return {...state, counter: state.counter + 1};
            case 'decrement':
                return {...state, counter: state.counter - 1};
            case 'reset':
                return initialState
            default:
                return state
        }
    }
    return (
        <div>
            <div>{state.counter}</div>
            <button onClick={() => dispatch({type: 'increment'})}>increment</button>
            <button onClick={() => dispatch({type: 'decrement'})}>decrement</button>
            <button onClick={() => dispatch({type: 'reset'})}>reset</button>
        </div>
    )
}


const ContextTemp = () => {
    const catchFraze = useContext(contextExample);
    return (<div>{catchFraze}</div>)
}

const StateTemp = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
            (async () => {
                try {
                    const products = await axios.get("products.json")
                    console.log(products)
                    setProducts(products.data)
                } catch (e) {
                    console.log(e)
                }
            })()
        }, []
    )

    return (
        // <contextExample.Provider value={"Shibidibap"}>
        //     <ContextTemp/>
        // </contextExample.Provider>
        <ReducerTemp/>
        // products.map((product) => <div key={product.name}>{product.name}</div>

    )
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StateTemp/>);

