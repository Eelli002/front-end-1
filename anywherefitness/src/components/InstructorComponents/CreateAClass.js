import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

export default function Create() {
    const { push } = useHistory();
    const id = localStorage.getItem('instructor_id');

    const initialLessonData = {
        class_name: "",
        class_type: "",
        class_start: "",
        class_duration: "",
        class_intensity: "",
        class_location: "",
        class_maxStudents: ""
    }

    const [lessonData, setLessonData] = useState(initialLessonData)
    // const [disabled, setDisabled] = useState(true);

    const onChange = (event) => {
        const { value, name } = event.target;
        setLessonData({
            ...lessonData,
            [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        console.log(lessonData)
        axiosWithAuth()
            .post(`instructors/${id}/classes/new`, lessonData)
            .then(result => {
                console.log(result)
                setLessonData(initialLessonData)
                //push() // This will send instructors over to a list of their lessons where they can edit / delete.

            })
            .catch(err => {
                console.log(err)
            });
    }

    return (
        <div>
            <h2>Create a Class</h2>
            <br></br>
            <form onSubmit={onSubmit}>
                <input
                type="text"
                name="class_name"
                value={lessonData.class_name}
                onChange={onChange}
                placeholder="Class Name"
                />
                <br></br>
                <br></br>
                <input
                type="text"
                name="class_type"
                value={lessonData.class_type}
                onChange={onChange}
                placeholder="Class Type"
                />
                <br></br>
                <br></br>
                <input
                type="text"
                name="class_start"
                value={lessonData.class_start}
                onChange={onChange}
                placeholder="Class Start"
                />
                <br></br>
                <br></br>
                <input
                type="number"
                name="class_duration"
                value={lessonData.class_duration}
                onChange={onChange}
                placeholder="Class Duration"
                />
                <br></br>
                <br></br>                
                <input
                type="text"
                name="class_intensity"
                value={lessonData.class_intensity}
                onChange={onChange}
                placeholder="Class Intensity"
                />
                <br></br>
                <br></br>
                <input
                type="text"
                name="class_location"
                value={lessonData.class_location}
                onChange={onChange}
                placeholder="Class Location"
                />
                <br></br>
                <br></br>
                <input
                type="number"
                name="class_maxStudents"
                value={lessonData.class_maxStudents}
                onChange={onChange}
                placeholder="Class Max Students"
                />

                <br></br>
                <br></br>
      
                <button>Create Your Class</button>
            </form>
        </div>
    )
}