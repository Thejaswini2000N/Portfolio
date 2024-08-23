import React, { useState } from "react";
import './MultiSelecteDropDown.css'

const MultiSelecteDropDown = () => {
    const allValues = ['Itachi Uchiha', 'Minato Namikaze', 'Obito Uchiha', 'Kakshi Hatake', 'Itadori Yuji', 'Fushiguro Megumi', 'Gojo Saturo',]
    const powers = [
        {
            name: 'Itachi Uchiha',
            ability: ['MS', 'Sussano', 'Amaterasu']
        },
        {
            name: 'Minato Namikaze',
            ability: ['Speed', 'Rasengan', 'Sage Mode']
        },
        {
            name: 'Obito Uchiha',
            ability: ['MS', 'Teleportation', 'Legend']
        },
        {
            name: 'Kakshi Hatake',
            ability: ['Copy Ninja', 'Chidori', 'Teleportation']
        },
        {
            name: 'Itadori Yuji',
            ability: ['Sukuna', 'Black Flash', 'Raw Strength']
        },
        {
            name: 'Fushiguro Megumi',
            ability: ['Maharago', 'Different Summons']
        },
        {
            name: 'Gojo Saturo',
            ability: ['Domain Expansion', 'Eyes', 'Infinity']
        },
    ]
    const [selectedValue, setSelectedValue] = useState([])
    const [unSelctedValue, setUnSelectedValue] = useState([...allValues])
    const [isShown, setIsShown] = useState(false)
    const [primaryPower, setPrimaryPower] = useState([])
    const setSelectedValueFun = (e, val) => {
        e.stopPropagation()
        console.log('==> val', val)
        const updatedSelectedValue = selectedValue.filter((e) => e !== val)
        setSelectedValue(updatedSelectedValue)
        setUnSelectedValue([...unSelctedValue, val])
        setIsShown(false)
    }
    const setUnSelectedValueFun = (e, val) => {
        const updatedUnSelectedValue = unSelctedValue.filter((e) => e !== val)
        setSelectedValue([...selectedValue, val])
        setUnSelectedValue(updatedUnSelectedValue)
        setIsShown(false)
    }

    const setPower = (e, selectedCharacter, characterName) => {
        const filteredList = primaryPower.filter((e) => e.name !== characterName)
        setPrimaryPower([...filteredList, { name: characterName, superPower: e.target.value }])
    }

    const renderSelect = (characterName, i) => {
        const selectedCharacter = powers.find((power) => power.name === characterName)
        const { ability } = selectedCharacter
        const superPowerForTheCharacter = primaryPower.find((e) => e.name === characterName)
        const selectedPower = superPowerForTheCharacter?.superPower ? superPowerForTheCharacter.superPower : ability[0]
        return (
            <div key={i}>
                <span>
                    Select the primary power
                </span>
                <select value={selectedPower} onChange={(e) => setPower(e, selectedCharacter, characterName)}>
                    {ability.map((pow, i) => <option key={i}>{pow}</option>)}
                </select>
                <div>{characterName} primary technique is {selectedPower} </div>
            </div>
        )
    }
    return (
        <div className="multi-select">
            MultiSelecteDropDown
            <div>
                <div onClick={() => setIsShown(!isShown)} className="select-container">
                    {!selectedValue.length && <div>Select Value</div>}
                    {selectedValue.map((val, i) => {
                        return (
                            <p className="selected-options" key={i}>
                                {val} <span onClick={(e) => setSelectedValueFun(e, val)}> x </span>
                            </p>
                        )
                    })}
                </div>
            </div>
            {isShown && <div className="unselect-container">
                {!unSelctedValue.length && <div>All values are selected</div>}
                {unSelctedValue.map((val, i) => {
                    return (
                        <p className="unselect-options" onClick={(e) => setUnSelectedValueFun(e, val)} key={i}>
                            {val}
                        </p>
                    )
                })}
            </div>}
            <div>
                {selectedValue.length > 0 && (
                    <div>
                        powers
                        {selectedValue.map((val, i) => {
                            return (
                                renderSelect(val, i)
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MultiSelecteDropDown