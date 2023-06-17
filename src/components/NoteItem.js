import React, { useContext } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { AppContext } from '../pages/index'


const handleDelete = async (e, note_id, refresh, setRefresh) => {
    e.preventDefault();
    try {
        const response = await axios.delete(`${process.env.API_URL}notes/${note_id}`);
        const result = response.data;
        if (result == 1) {
            alert("Deleted Successfully");
            setRefresh(!refresh);
        } else {
            alert("Something went wrong! Please try again...");
        }
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

const NoteItem = ({ note }) => {
    const { refresh, setRefresh } = useContext(AppContext);

    return (
        <div className="card mt-2">
            <div className="card-header d-flex justify-content-between">
                <Link href={`/note/${note.id}`}>
                    <h5>{note.title}</h5>
                </Link>
                <div className="d-flex">
                    <Link href={`/note/${note.id}/update`} className='btn btn-primary btn-sm mr-2 text-white'>
                        <i className="fa fa-pencil-square-o"></i>
                    </Link>
                    <Link href={`/note/${note.id}`} className='btn btn-danger btn-sm text-white' onClick={e => handleDelete(e, note.id, refresh, setRefresh)}>
                        <i className="fa fa-trash"></i>
                    </Link>
                </div>
            </div>

            <p className="card-text p-3">
                {note.description?.substring(0, 50)}
                <br />
                <Link href={`/note/${note.id}`} className="float-right"> Read more...</Link>
            </p>
        </div>
    )
}

export default NoteItem