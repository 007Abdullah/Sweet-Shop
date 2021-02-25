import { useState, useRef } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import { useGlobalState } from "./../context/globalContext";

// import { Container, Form, Col, Button, Row } from 'react-bootstrap'
import './admin.css';
import fallback from './../images/image_1024.png';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Col, Form, Container, Row } from "react-bootstrap";





let url = 'http://localhost:5000'

function AdminDashboard() {
    const [data, setData] = useState([]);
    const [images, setImages] = useState([fallback, fallback, fallback]);
    const globalState = useGlobalState();
    // const setGlobalState = useGlobalStateUpdate();
    const productname = useRef();
    const price = useRef();
    const activeStatus = useRef();
    const stock = useRef();
    const description = useRef();







    function handlsubmit(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: url + '/admindashboard',
            data: {
                productname: productname.current.value,
                price: price.current.value,
                productimages: images,
                activeStatus: activeStatus.current.value,
                stock: stock.current.value,
                description: description.current.value,
                // ["http://sdfsdfsdfsf", "wwefwfwef"]
            }, withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                alert(response.data.message)
                setData((previous) => {
                    return previous.concat([response.data.data]);
                });
                // console.log("ya data check karna han kaha sa a rha han", response.data.data)
            } else {
                alert(response.data.message);
            }
        }).catch((error) => {
            console.log(error);
        });


    }

    function upload(e, index) {

        var fileInput = document.getElementById("fileInput");
        const file = e.target.files[0];
        const reader = new FileReader();

        // // To convert a File into Blob (not recommended)
        // var blob = null;
        // var file = fileInput.files[0];
        // let reader = new FileReader();
        // reader.readAsArrayBuffer(file)
        // reader.onload = function (e) {
        //     blob = new Blob([new Uint8Array(e.target.result)], { type: file.type });
        //     console.log(blob);
        // }

        console.log("fileInput: ", fileInput);
        console.log("fileInput: ", fileInput.files[0]);

        let formData = new FormData();
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax

        formData.append("myFile", fileInput.files[0]); // file input is for browser only, use fs to read file in nodejs client
        // formData.append("myFile", blob, "myFileNameAbc"); // you can also send file in Blob form (but you really dont need to covert a File into blob since it is Actually same, Blob is just a new implementation and nothing else, and most of the time (as of january 2021) when someone function says I accept Blob it means File or Blob) see: https://stackoverflow.com/questions/33855167/convert-data-file-to-blob
        formData.append("myName", "sameer"); // this is how you add some text data along with file
        formData.append("myDetails",
            JSON.stringify({
                "subject": "Science",   // this is how you send a json object along with file, you need to stringify (ofcourse you need to parse it back to JSON on server) your json Object since append method only allows either USVString or Blob(File is subclass of blob so File is also allowed)
                "year": "2021"
            })
        );

        // you may use any other library to send from-data request to server, I used axios for no specific reason, I used it just because I'm using it these days, earlier I was using npm request module but last week it get fully depricated, such a bad news.
        axios({
            method: 'post',
            url: url + "/upload",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        }).then(res => {
            console.log(`  upload Success`);
            alert("upload Success")
            // document.getElementById("show_pic").innerHTML = instanceOfFileReader.readAsDataURL(res.data);

            reader.addEventListener("load", function () {
                // convert image file to base64 string
                setImages(prev => {
                    prev[index] = reader.result;
                    return [].concat(prev)
                });
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }

        }).catch(err => {
            console.log(err);
        })
    }
    // function previewFile(e, index) {
    //     console.log("fffffffffffffff: ", e.target);
    //     const file = e.target.files[0];
    //     const reader = new FileReader();

    //     reader.addEventListener("load", function () {
    //         // convert image file to base64 string
    //     }, false);

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // }

    console.log("Which data === >", images);

    function check(event) {
        event.preventDefault();
    }


    return (

        <div className="logincenter">
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <form onSubmit={handlsubmit}>
                            <p className="h4 text-center mb-4">Product Add</p>
                            <label htmlFor="defaultFormLoginEmailEx" className="black-text">
                                Product Name
                            </label>
                            <input type="text" ref={productname} className="form-control" placeholder="Product Name" />

                            <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                                Product Price
                            </label>
                            <input type="number" className="form-control" ref={price} placeholder="Product Price" />
                            <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                                Product Stock
                            </label>
                            <input type="text" className="form-control" ref={stock} placeholder="Product Stock" />
                            <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                                ActiveStatus
                            </label>
                            <select style={{ float: 'right' }} ref={activeStatus}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                            <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                                Product Images
                            </label>
                            <div className="row justify-content-lg-between d-flex" style={{ border: '1px solid black' }}>

                                {images.map((eachImage, index) => (
                                    <form onSubmit={check}>
                                        <div className="file-upload" key={index}>
                                            <img src={eachImage} alt="FallBack" id="show_pic" />;
                                            <input type="file" onChange={(e) => { upload(e, index) }} id="fileInput" required />
                                        </div>
                                    </form>))}
                                {/* <div className="file-upload">
                                    <img src={fallback} alt="FallBack" id="show_pic1" />;
                                    <input type="file" onChange={previewFile} id="fileInput" required />
                                </div>
                                <div className="file-upload">
                                    <img src={fallback} alt="FallBack" id="show_pic2" />;
                                    <input type="file" onChange={previewFile} id="fileInput" required />
                                </div> */}
                                {/* <div className="file-upload">
                                <img src={fallback} alt="FallBack" id="show_pic" />;
                                <input type="file" onChange={previewFile} id="fileInput" required />
                                </div>
                                <div className="file-upload">
                                <img src={fallback} alt="FallBack" id="show_pic" />;
                                <input type="file" onChange={previewFile} id="fileInput" required />
                                </div>
                                <div className="file-upload">
                                <img src={fallback} alt="FallBack" id="show_pic" />;
                                <input type="file" onChange={previewFile} id="fileInput" required />
                                </div> */}
                            </div>

                            <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                                Product Description
                            </label>
                            <input type="text" className="form-control" ref={description} placeholder="Product Description" />

                            <div className="text-center mt-4">
                                <MDBBtn color="indigo" type="submit">Add</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>



            {'===>' + JSON.stringify(globalState)}
        </div>


    )
}

export default AdminDashboard;