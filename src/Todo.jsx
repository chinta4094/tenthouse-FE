import logo from './logo.svg';
import { useState } from 'react';
import './App.css';


function App() {
  let [add, setAdd] = useState('')
  let [array, setArray] = useState([])
  const addText = (event) => {
    add = setAdd(event.target.value)
  }
  const addItem = () => {
    array = setArray([...array, add])
  }
  function removeItem (removeIndex){
    console.log(array)
    setArray(array.filter((arr, index) => index !== removeIndex));
  }
  return (
    <div className='form'>
      <div className='header'>
          <input className='input-box' onChange={addText}></input>
          <label className='add' onClick={addItem}>ADD</label>
      </div>
      <div className='header-foot'>
      {array.map((item, index) => (
        <div key={index}>
          <h5 className='input-box-out'>
            {item}
          </h5>
          <h5 className='add-remove' onClick={() => removeItem(index)}>x</h5>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
