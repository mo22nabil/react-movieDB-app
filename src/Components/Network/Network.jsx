import React, { useContext } from 'react'
import { CounterContext } from './../../CreateCounterContext';

export default function Network() {
  let x= useContext(CounterContext)
  return (
    <div>Network : {x.counter}</div>
  )
}
