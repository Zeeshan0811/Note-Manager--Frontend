import React from 'react'
import Link from 'next/link'

const index = ({ note }) => {
    return (
        <div className="row pt-5 justify-content-center">
            <div className="col-md-8 ">
                <div className="card text-center">
                    <h5 className="card-header">{note.title}</h5>
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
    const note = await res.json() || '';

    return {
        props: {
            note
        }
    }
}