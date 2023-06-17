import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import slugify from "slugify";
import queryString from 'query-string';
import { AppContext } from '../pages/index';

const slug_options = {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: 'en', // language code of the locale to use
};

const Update = () => {
    const { refresh, setRefresh } = useContext(AppContext);
    const [note, setNote] = useState({
        title: "",
        description: ""
    });

    const [error, setError] = useState({
        titleError: false,
        descriptionError: false
    });

    function handleChange(e) {
        setNote({ ...note, [e.target.name]: e.target.value });
    }


    const handleSubmit = async (e, refresh, setRefresh) => {
        e.preventDefault();

        const validForm = isValidFormData();
        if (!validForm) {
            return false;
        }

        note.slug = slugify(note.title, slug_options)
        const data = queryString.stringify(note);
        const api_url = `${process.env.API_URL}notes`;

        axios.post(api_url, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function (response) {
            alert("Added Successfully");
            setNote({ ...note, title: "", description: "" });
            setError({ ...error, titleError: false, descriptionError: false });
            setRefresh(!refresh);
            // console.log(response);
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
        <div className="card mt-5">
            <h4 className="text-center card-header">ADD A NOTE</h4>
            <div className="card-body">
                <form onSubmit={e => handleSubmit(e, refresh, setRefresh)}>
                    <div className="form-group">
                        <label htmlFor="note_title">Title</label>
                        <input type="text" name="title" onChange={e => handleChange(e)} value={note.title} className={(error.titleError) ? 'form-control is-invalid' : 'form-control'} id="note_title" placeholder="Enter title" />
                        {(error.titleError) ? <div className="invalid-feedback"> Title can't be empty</div> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="note_description">Description</label>
                        <textarea name="description" onChange={e => handleChange(e)} value={note.description} id="note_description" cols="30" rows="5" className={(error.descriptionError) ? 'form-control is-invalid' : 'form-control'}></textarea>
                        {(error.descriptionError) ? <div className="invalid-feedback"> Please Write Something</div> : null}
                    </div>
                    <button type="submit" className="btn btn-primary float-right">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Update