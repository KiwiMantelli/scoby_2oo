import React from 'react'
import FormItem from "../components/Forms/FormItem"

const EditItems = (props) => {
    console.log(props)
    return (
        <div>
            <FormItem history = {props.history} action="edit" id={props.match.params.id} />
        </div>
    )
}

export default EditItems;