import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router';

const index = ({ note }) => {
    const router = useRouter();
    const handleDelete = async (e, note_id) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${process.env.API_URL}notes/${note_id}`);
            const result = response.data;
            if (result == 1) {
                alert("Deleted Successfully");
                router.push(`/`);
            } else {
                alert("Something went wrong! Please try again...");
            }
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="row pt-5 justify-content-center">
            <div className="col-md-8 ">
                <div className="card text-center">
                    <div className="card-header d-flex justify-content-between">
                        <Link href={`/note/${note.id}`}>
                            <h5>{note.title}</h5>
                        </Link>
                        <div className="d-flex">
                            <Link href={`/note/${note.id}/update`} className='btn btn-primary btn-sm mr-2 text-white'>
                                <i className="fa fa-pencil-square-o"></i>
                            </Link>
                            <Link href={`/note/${note.id}`} className='btn btn-danger btn-sm text-white' onClick={e => handleDelete(e, note.id)}>
                                <i className="fa fa-trash"></i>
                            </Link>
                        </div>
                    </div>
                    <p className="card-text p-3">{note.description}</p>
                    <div className="card-footer text-muted">
                        <Link href="/">Go back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index

export const getServerSideProps = async (context) => {
    const api_url = process.env.API_URL + 'notes/' + context.params.id;
    const res = await fetch(api_url);

    try {
        const note = await res.json() || '';
        return {
            props: {
                note
            }
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}