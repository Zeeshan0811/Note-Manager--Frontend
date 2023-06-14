import React from 'react'
import Link from 'next/link'

const NoteItem = ({ note }) => {
    return (
        <div className="row mt-3 justify-content-center">
            <div className="col-md-8 ">
                <div className="card">
                    <Link href={`/note/${note.id}`}>
                        <h5 className="card-header">{note.title}</h5>
                    </Link>
                    <p className="card-text p-3">{note.description}</p>
                </div>
            </div>
        </div>

    )
}

export default NoteItem