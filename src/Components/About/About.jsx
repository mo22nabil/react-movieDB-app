import React, { useContext } from 'react'
import { CounterContext } from '../../CreateCounterContext';

export default function About() {
let x = useContext(CounterContext);

  return (<>
    <div>About :{x.counter}</div>
    <button className='btn btn-outline-danger btn-sm' onClick={x.increase} >increase </button>
    </>
  )
}
