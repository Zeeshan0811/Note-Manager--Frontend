import React, { useContext } from 'react'
import NoteItem from './NoteItem'


const NoteList = ({ notes }) => {
    return (
        <div>
            {notes.map(note => (
                <NoteItem note={note} key={note.id} />
            ))}
        </div>
    )
}

export default NoteList


