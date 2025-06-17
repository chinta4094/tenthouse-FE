
import arrow from './img/arrow-down.png'
import tickSymbol from './img/tick-symbol.png'
import './Dropdown.css'
import { useState } from 'react'

export default function Dropdown (props) {
    const list = props.list
    const [selector, setSelector] = useState('Choose One')
    const [isDisable, setIsDisable] = useState(false)
    const [select, setSelect] = useState(0)
    
    const dropDown = (event) => {
        if(isDisable) {
            setIsDisable(false)
        } else {
            setIsDisable(true)
        }
    }
    const dropDownSelector = (id, name) => {
        if(id === select) {
            setSelect(0)
            setSelector('Choose One')
            props.submitHandler(null)
        } else {
            setSelector(name)
            setIsDisable(false)
            setSelect(id)
            props.submitHandler(name)
        }
    }

    return (
        <div className='select-box'>
                <label className='select-name'>{props.name} : </label>
                <div className='selector'>
                    <div className='top-select'>
                        <label className='name-select'>{selector}</label>
                        <img className='arrow-select' src={arrow} alt='*****' onClick={dropDown}></img>
                    </div>
                </div>
                <div>
                    { isDisable && list.map((d) => {
                        return (
                            <div className='child-select' onClick={() => dropDownSelector(d.id, d.name)}>
                                <label key={d.id}>{
                                    d.id !== select ? 
                                    <div className='child-list'>{d.name}</div> 
                                    : <div>
                                        <div className='child-list'>{d.name}</div> 
                                        <img className='tick-symbol' src={tickSymbol} alt='*****'></img>
                                    </div>}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
    )
}