import { useEffect, useState } from "react";
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';



function Add() {

    let [userData, setUserData] = useState({});
    let [details, setDetails] = useState([])
    let [id, setId] = useState(0)

    let getValue = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    let submitData = (e) => {
        e.preventDefault();
        if (id == 0) {
            axios.post("http://localhost:3000/data", userData).then(() => {
                alert("data added");
                setUserData({})
                getData();
            }).catch(() => {
                alert("something wrong")
            })
        }
        else {
            axios.put(`http://localhost:3000/data/${id}`, userData).then(() => {
                alert("data updated");
                setUserData({ username: "" })
                getData();
            }).catch(() => {
                alert("something wrong")
            })
            setId(0)
        }

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


    let updateData = (id) => {
        let dd = details.find((v) => v.id === id)
        setUserData(dd);
        setId(id)
        console.log(dd)
    }

    return (
        <>
            <h1>Add Your Details</h1>
            <form method="post" onSubmit={(e) => submitData(e)}>
                <label htmlFor="">Add Your userName :- </label>
                <input type="text" placeholder="Enter Your Username" name="username" value={userData.username ? userData.username : ""} onChange={(e) => getValue(e)} /> <br /><br />
                <label htmlFor="">Add Your Email :- </label>
                <input type="text" placeholder="Enter Your Email" name="email" value={userData.email ? userData.email : ""} onChange={(e) => getValue(e)} /> <br /><br />
                <label htmlFor="">Add Your Number :- </label>
                <input type="text" placeholder="Enter Your Number" name="number" value={userData.number ? userData.number : ""} onChange={(e) => getValue(e)} /> <br /><br />
                <label htmlFor="">Add Image :- </label>
                <input type="text" placeholder="Enter Your Iamge" name="img" value={userData.img ? userData.img : ""} onChange={(e) => getValue(e)} /> <br /><br />
                <button type="submit">{id == 0 ? "Submit" : "Update"}</button>
            </form>

            <div>
                <h1>Your Data</h1>
                <Container>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>UserName</th>
                                <th>Email</th>
                                <th>Conatct</th>
                                <th>Image</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                details.map((v, i) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{++i}</td>
                                                <td>{v.username}</td>
                                                <td>{v.email}</td>
                                                <td>{v.number}</td>
                                                <td>  <img src={v.img} alt="" width={"80px"} /></td>
                                                
                                                <td><Button variant="danger"  onClick={() => deleteData(v.id)} >Delete</Button></td>
                                                <td><Button variant="primary" onClick={() => updateData(v.id)} >Update</Button></td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Container>
            </div>
        </>
    )
}

export default Add;