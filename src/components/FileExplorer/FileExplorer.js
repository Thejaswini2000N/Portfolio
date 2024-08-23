import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './FileExplorer.css'

const FileExplorer = (props) => {
    const [structure, setStructure] = useState({
        id: 'unique 1',
        name: 'root',
        isShown: true,
        isFolder: true,
        isRoot: true,
        marginLeft: 0,
        folderChild: [
            {
                id: 'unique 2',
                name: 'learning',
                isFolder: true,
                isShown: true,
                folderChild: [
                    {
                        id: 'unique 3',
                        name: 'lld',
                        isFolder: true,
                        isShown: true,
                        folderChild: [
                            {
                                id: 'unique 4',
                                name: 'file explorer',
                                isFolder: false,
                                isShown: true,
                            },
                        ],
                    }
                ],
            },
            {
                id: 'unique 5',
                name: 'atlassian',
                isFolder: false,
                isShown: true,
            },
            {
                id: 'unique 6',
                name: 'microsoft',
                isFolder: false,
                isShown: true,
            },
        ],
    })

    const [dataValue, setDataValue] = useState('')
    const [subfolderdataValue, setSubfolderDataValue] = useState('')
    const [showInput, setShowInput] = useState(false)
    const [showSubFolderInput, setshowSubFolderInput] = useState(false)

    const generateStructure = (folderData) => {
        const folderStructure = folderData.folderChild.map((e) => {
            if (folderData.isRoot) {
                folderData.marginLeft = 0
            }
            if (!e.isShown) {
                return
            } else if (e.isFolder && e.isShown) {
                if (folderData.marginLeft) {
                    e.marginLeft = folderData.marginLeft += 10
                } else {
                    folderData.marginLeft = 10
                    e.marginLeft = 10
                }
                return (
                    <div style={{ 'marginLeft': `${e['marginLeft']}px` }} className="sub-folder" key={e.id} >
                        <div className="folder" onClick={(event) => toggleChild(event, e)}>
                            <span>{e.name}</span>
                            {!showSubFolderInput && <button onClick={(event) => addToStructure(event, e)}>Add</button>}
                            {showSubFolderInput && (
                                <span>
                                    <input value={subfolderdataValue} onClick={(event) => event.stopPropagation()} onChange={(event) => onInputChange(event, structure)} />
                                    <button onClick={(event) => addData(event, false)}>Enter</button>
                                </span>
                            )}
                            {/* <button onClick={(event) => addToStructure(event, e)}>Add</button> */}
                        </div>
                        {generateStructure(e)}
                    </div>
                )
            } else {
                return <div style={{ 'marginLeft': `${folderData['marginLeft']}px` }} className="file" key={e.id}>{e.name}</div>
            }
        })
        return folderStructure
    }

    const toggleChild = (event, data) => {
        event.stopPropagation()
        if (data.isRoot) {
            data.folderChild.forEach(child => {
                child.isShown = !child.isShown
            })
            setStructure({ ...data })
        } else {
            let collapsedFolder = ''
            const findCollapsedFolder = (childElement) => {
                childElement.forEach((child) => {
                    if (child['id'] === data['id']) {
                        collapsedFolder = child
                        child.folderChild.forEach((subchild) => {
                            subchild['isShown'] = !subchild['isShown']
                        })
                        return child['id'] === data['id']
                    } else if (child.isFolder) {
                        return findCollapsedFolder(child.folderChild)
                    }
                })
            }
            const structureCopy = { ...structure }
            findCollapsedFolder(structureCopy.folderChild)
            setStructure(structureCopy)
        }
    }

    const addToStructure = (e, formData) => {
        e.preventDefault()
        e.stopPropagation()
        if (formData.isRoot) {
            setShowInput(true)
        } else {
            setshowSubFolderInput(true)
        }
    }

    const onInputChange = (e, formData) => {
        if (formData.isRoot) {
            setDataValue(e.target.value)
        } else {
            setSubfolderDataValue(e.target.value)
        }
    }

    const addData = (e, isRoot) => {
        e.stopPropagation()
        const newFile = {
            name: dataValue,
            id: uuidv4(),
            isFolder: true,
            isShown: true,
            folderChild: []
        }
        if (isRoot) {
            if (dataValue) {
                const structureCopy = { ...structure }
                structureCopy.folderChild.push(newFile)
                setStructure(structureCopy)
            }
            setShowInput(false)
            setDataValue('')
        } else {
            console.log('==> not root')
            setshowSubFolderInput(false)
            setSubfolderDataValue('')

        }
    }

    return (
        <div>
            FileExplorer
            <div className='root'>
                <div className='folder' onClick={(e) => toggleChild(e, structure)}>
                    <span>{structure.name}</span>
                    {!showInput && <button onClick={(e) => addToStructure(e, structure)}>Add</button>}
                    {showInput && (
                        <span>
                            <input value={dataValue} onClick={(e) => e.stopPropagation()} onChange={(e) => onInputChange(e, structure)} />
                            <button onClick={(e) => addData(e, true)}>Enter</button>
                        </span>
                    )}
                </div>
                {generateStructure(structure)}
            </div>

        </div >
    )
}

export default FileExplorer