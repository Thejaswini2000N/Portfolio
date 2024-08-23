import React, { useEffect, useRef, useState } from 'react'
import './DragAndDrop.css'

const DragAndDrop = () => {
    const [upperList, setUpperList] = useState(['Itachi', 'Minato', 'Obito'])
    const [lowerList, setLowerList] = useState(['Gojo', 'Sukuna', 'Itadori'])
    // const [draggedFrom, setDraggedFrom] = useState('')
    const [draggingTo, setDraggingTo] = useState('')
    const [dragIdx, setDragIdx] = useState(0)
    const dragAndDropRef = useRef(null)


    useEffect(() => {
        const mainSubContainers = [...dragAndDropRef?.current?.children]
        mainSubContainers.forEach((container) => {
            container.addEventListener('dragover', (e) => onDragOver(e))
        })
    }, [])

    const onDragOver = (e) => {
        e.preventDefault()
        const listContainer = [...e?.target?.children]
        const dragged = listContainer?.find((list) => list.classList.contains('dragging'))
        let isUpper = false
        if (e.target.localName === 'div') {
            isUpper = e.target.classList.contains('upper-container')
        } else if (e.target.localName === 'p') {
            isUpper = e.target.parentNode.classList.contains('upper-container')
        }
        const toClass = isUpper ? 'upper-container' : 'lower-container'
        setDraggingTo(toClass)
        // dragged && e.target.appendChild(dragged)
    }

    const upperDragStart = (e, val) => {
        console.log('Start')
        e.target.classList.add('dragging')
        // setDraggedFrom(e.target.parentNode.classList.value)
    }

    const upperDragEnter = (e, i) => {
        console.log('Enter')
        setDragIdx(i)
    }

    const upperDragEnd = (e, val) => {
        console.log('End')
        const isUpperListDragged = e.target.parentNode.classList.contains('upper-container') ? true : false
        if (draggingTo !== e.target.parentNode.classList.value) {
            if (isUpperListDragged) {
                const updatedUpperList = upperList.filter((e) => e !== val)
                // updatedUpperList.splice(dragIdx)
                const updatedLowerList = [...lowerList]
                updatedLowerList.splice(dragIdx, 0, val)
                setUpperList([...updatedUpperList])
                setLowerList([...updatedLowerList])
                // setLowerList([...lowerList, val])
            } else {
                const updatedLowerList = lowerList.filter((e) => e !== val)
                const updatedUpperList = [...upperList]
                updatedUpperList.splice(dragIdx, 0, val)
                setLowerList([...updatedLowerList])
                setUpperList([...updatedUpperList])
                // setUpperList([...upperList, val])
            }
        } else {
            if (draggingTo.split('-')[0] === 'upper') {
                const updatedUpperList = upperList.filter((e) => e !== val)
                updatedUpperList.splice(dragIdx, 0, val)
                setUpperList([...updatedUpperList])
            } else {
                const updatedLowerList = lowerList.filter((e) => e !== val)
                updatedLowerList.splice(dragIdx, 0, val)
                setLowerList([...updatedLowerList])
            }
        }
        // setDraggedFrom('')
        setDraggingTo('')
        e.target.classList.remove('dragging')
    }
    return (
        <div className='drag-drop-container' ref={dragAndDropRef} >
            DragAndDrop
            <div className='upper-container'>
                {
                    upperList.map((list, i) => <p onDragEnter={(e) => upperDragEnter(e, i)} onDragEnd={(e) => upperDragEnd(e, list)} onDragStart={(e) => upperDragStart(e, list)} key={i} draggable='true'>{list}</p>)
                }
            </div>
            <div className='lower-container'>
                {
                    lowerList.map((list, i) => <p onDragEnter={(e) => upperDragEnter(e, i)} onDragEnd={(e) => upperDragEnd(e, list)} onDragStart={(e) => upperDragStart(e, list)} key={i} draggable='true'>{list}</p>)
                }
            </div>
        </div>
    )
}

export default DragAndDrop