import React, {useState, useEffect} from 'react' ;
import styled from 'styled-components';
import Contents from './Contents'
import {useForm} from 'react-hook-form';

var testData = {userName: 'noni'};

const AddItem = () => {

    const {register, handleSubmit, errors} = useForm();
    // const onSubmit = data => console.log(data);
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)); 
    let today = new Date();

    const validateFirstName = async (value) => {
        await sleep(1000);
        if (value === "bill") {
            return true;
        }
        return false;
    }

    const onSubmit = (data) => {
        console.log(data);
        fetch('/pushBoardData', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .then(() => {window.location.reload();})
        .catch(error => console.log('Error: ', error));
    }


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Add Item</h1>
            <label for="title">Title: </label>
            <input name="title" id="title" ref={register({required: true})} />
            {errors.title && <p>This is required</p>}
            <br/>
            <label for="writer">Writer: </label>
            <input name="writer" id="writer" ref={register({required: true})} />
            {errors.writer && <p>This is required</p>}
            <br/>
            <br/>
            <input type="submit" />

        </form>




        /* Example Code */

        // <form onSubmit={handleSubmit(onSubmit)}>
        // <h1>Add Item</h1>
        // <label>Title: </label>
        // <input name="Title" ref={register({ required: true, minLength: 2, validate: validateFirstName})} />
        // {errors.Title && errors.Title.type === "required" && 
        // (<p>This is required</p>)}
        // {errors.Title && errors.Title.type === "minLength" && 
        // (<p>This is field required min length of 2</p>)}
        // {errors.Title && errors.Title.type === "validate" &&
        // (<p>Validation failed</p>)}
        // <br/>
        // <label>Writer: </label>
        // <input name="writer" ref={register} />
        
        // <br/>
        // <select name="gender" ref={register}>
        //     <option value="">Select...</option>
        //     <option value="male">Male</option>
        //     <option value="female">Female</option>
        // </select>
        // <br/>
        // <label>Username: </label>
        // <input name="username" ref={register} />
        // <br/>
        // <label>About you: </label>
        // <textarea name="aboutYou" ref={register} />
        // <br/>
        // <input type="submit" />
        // </form>
    )
}

export default AddItem;