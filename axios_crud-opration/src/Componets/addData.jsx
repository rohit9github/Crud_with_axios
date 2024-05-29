import { useEffect, useState } from "react";
import axios from "axios"


function Add() {

    let [work, setWork] = useState({});
    let [details, setDetails] = useState([])

    let getValue = (e) => {
        setWork({ ...work, [e.target.name]: e.target.value });
    }

    let submitData = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/data", {
            work: work.task,
        }).then(() => {
            alert("data added");
            setWork({})
            getData();
        }).catch(() => {
            alert("something wrong")
        })
    }

    let getData = () => {
        axios.get("http://localhost:3000/data")
            .then((res) => {
                setDetails(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        getData();
    }, []);

    let deleteData = (id) => {
        axios.delete(`http://localhost:3000/data/${id}`)
            .then(() => {
                alert("data deleted");
                getData();
            }).catch((err) => {
                console.log(err);
            })
    }


    return (
        <>
            <h1>Add Data</h1>
            <form method="post" onSubmit={(e) => submitData(e)}>
                <label htmlFor="">Add Your Task :- </label>
                <input type="text" placeholder="Enter Your Task" name="task" value={work.task ? work.task : ""} onChange={(e) => getValue(e)} /> <br /><br />
                <button type="submit">Submit</button>
            </form>

            <div>
                <h1>Your Data</h1>
                {
                    details.map((v, i) => {
                        return (
                            <>
                                <div style={{ display: "flex" }} >
                                    <h2 key={i}>{++i}:-</h2>
                                    <h2 key={i}>{v.work}</h2>
                                    <button onClick={() => deleteData(v.id)} >Delete</button>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Add;