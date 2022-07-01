import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { MdCheck, MdDelete } from 'react-icons/md';

const Home = () => {

    const [task, setTask] = useState("");
    const [allTasks, setAllTasks] = useState([]);
    const [edit, setEdit] = useState(false);
    const [completedTask, setCompletedTask] = useState("");
    const [id, setId] = useState("");


    const getTask = (e) => {
        const taskInput = e.target.value;
        setTask(taskInput);
    }

    const taskData = {
        textTask: task
    }

    const handleTask = () => {
        fetch(`https://bloc-chesterfield-02084.herokuapp.com/task`, {
            mode: "no-cors",
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(taskData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            })
    }

    useEffect(() => {
        fetch(`https://bloc-chesterfield-02084.herokuapp.com/taskData`)
            .then(res => res.json())
            .then(data => setAllTasks(data));

    }, [taskData]);


    const handleDeleteItem = id => {
        const confirmation = window.confirm("Are you sure?");
        if (confirmation) {
            const url = `https://bloc-chesterfield-02084.herokuapp.com/task/${id}`
            fetch(url, {
                mode: "no-cors",
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        const rest = allTasks.filter(book => book._id !== id);
                        setAllTasks(rest);
                    }
                })
        }
    }

    useEffect(() => {
        fetch(`https://bloc-chesterfield-02084.herokuapp.com/editTask/${id}`)
            .then(res => res.json())
            .then(data => setCompletedTask(data));

    }, [id]);



    const completedTaskData = {
        completedTask: completedTask.textTask
    }

    const handleCompletedTask = () => {
        fetch(`https://bloc-chesterfield-02084.herokuapp.com/completedTask`, {
            mode: "no-cors",
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(completedTaskData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            })
    }

    return (
        <div>
            <input type="text" placeholder="Your task here" onBlur={getTask} class="input input-bordered w-full max-w-xs m-10" />
            <button class="btn" onClick={handleTask}>Add task</button>

            <div className="">
                {
                    edit && <div>
                        <input type="text" placeholder="Your task here" onBlur={getTask} class="input input-bordered w-full max-w-xs m-10" />

                        <button className="btn btn-primary">Confirm</button>
                    </div>
                }
                {
                    allTasks.map(task => <div key={task._id} className="flex justify-center">
                        <div className="flex justify-between my-5 items-center md:w-[600px]">
                            <input
                                onClick={() => setId(task._id)}
                                type="checkbox"
                                name=""
                                id="" />
                            <button className="btn btn-outline" onClick={handleCompletedTask}>
                                complete
                            </button>

                            <h1 className="">{task.textTask}</h1>
                            <div className="flex text-2xl">
                                <AiFillEdit
                                    className="mr-10"
                                    onClick={() => setEdit(true)}
                                />
                                <MdDelete onClick={() => handleDeleteItem(task._id)} />
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Home;