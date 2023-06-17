import React, { useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import queryString from 'query-string';
import slugify from "slugify";

const slug_options = {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: 'en', // language code of the locale to use
};

const Update = ({ data }) => {
    const router = useRouter();
    const [id, setId] = useState(data.id);
    const [note, setNote] = useState({
        title: data.title,
        description: data.description
    });

    const [error, setError] = useState({
        titleError: false,
        descriptionError: false
    });

    function handleChange(e) {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validForm = isValidFormData();
        if (!validForm) {
            return false;
        }

        note.slug = slugify(note.title, slug_options)
        const data = queryString.stringify(note);
        const api_url = `${process.env.API_URL}notes/${id}`;

        axios.put(api_url, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function (response) {
            alert("Updated Successfully");
            router.push(`/note/${id}`);
        });
    }

    const isValidFormData = () => {
        let titleError = false;
        let descriptionError = false;

        if (note.title == '') {
            titleError = true;
        }

        if (note.description == '') {
            descriptionError = true;
        }

        if (note.title == '' || note.description == '') {
            setError({ ...error, titleError: titleError, descriptionError: descriptionError });
            return false;
        } else {
            return true;
        }
    }


    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card mt-5">
                    <h4 className="text-center card-header">UPDATE NOTE</h4>
                    <div className="card-body">
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="note_title">Title</label>
                                <input type="text" name="title" onChange={e => handleChange(e)} value={note.title} className={(error.titleError) ? 'form-control is-invalid' : 'form-control'} id="note_title" placeholder="Enter title" />
                                {(error.titleError) ? <div className="invalid-feedback"> Title can not be empty</div> : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="note_description">Description</label>
                                <textarea name="description" onChange={e => handleChange(e)} value={note.description} id="note_description" cols="30" rows="5" className={(error.descriptionError) ? 'form-control is-invalid' : 'form-control'}></textarea>
                                {(error.descriptionError) ? <div className="invalid-feedback"> Please Write Something</div> : null}
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Update Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update

export const getServerSideProps = async (context) => {
    const api_url = process.env.API_URL + 'notes/' + context.params.id;
    const res = await fetch(api_url);
    try {
        const data = await res.json() || '';
        return {
            props: {
                data
            }
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }

}
