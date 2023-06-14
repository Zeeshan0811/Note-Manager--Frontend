import React from 'react'
import NoteItem from '/components/NoteItem'

const NoteList = ({ notes }) => {
    return (
        <div>
            <h2 className='text-center mb-3'>Note List</h2>
            {notes.map(note => (
                <NoteItem note={note} key={note.id} />
            ))}
        </div>
    )
}

export default NoteList


