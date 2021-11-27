import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbarns from './Navbarns';
import env from "./settings";
import {useParams} from 'react-router-dom'
import Textfield from './Textfield';
import { Form, Formik } from 'formik';
import * as Yup from "yup";

function UserProductedit() {
   const {id}=useParams();
    const [Data, setData] = useState()
    const [Loading, setLoading] = useState(true);
    const validate = Yup.object({
      title: Yup.string()
        .max(20, "Must be 15 characters or less")
        .required("Required"),
        category: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
        price: Yup.number().required("price required"),
        image: Yup.string().required("Image required"),
        description: Yup.string().required("Description required"),
    });
    const fetchdata=async()=>{
        try {
            let data=await axios.get(`${env.api}/getproductbyid/${id}`, {
              headers: {
                Authorization: window.localStorage.getItem("app_token"),
              },
            })
            console.log(data.data);
            setData(data.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            window.alert("Check your network")
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchdata();
    },[])

    

    return (
        <>
        <Navbarns/>
        
            {
              Loading ? <h5>Loading</h5>:<div className="Register-image">
             
              <section className="R-loginContainer">
                <div>
                  <Formik
                    initialValues={{
                      title: Data.values.title,
                      category: Data.values.category,
                      price: Data.values.price,
                      image: Data.values.image,
                      description: Data.values.description,
                    }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                     
                      try {
                        let postData = await axios.put(`${env.api}/editproduct/${id}`, { values },{
                          headers : {
                            "Authorization" : window.localStorage.getItem("app_token")
                          }
                        });
                        window.alert("Product edited");
                       fetchdata()
                      } catch (error) {
                        if (error.message === "Request failed with status code 409") {
                          window.alert("Mailid is already registered");
                          console.log(error);
                        } else {
                          window.alert("check your network");
                          console.log(error);
                        }
                      }
                    }}
                    enableReinitialize
                  >
                    {(formik) => (
                      <div>
                        <div className="R-content">
                          <div className="R-login-title">EDIT PRODUCT</div>
                          <Form>
                            <Textfield
                              label="Product Name"
                              name="title"
                              type="text"
                              placeholder="Enter Product Name"
                             
                            />
                            <Textfield
                              label="Product category"
                              name="category"
                              type="text"
                              placeholder="Enter Product category"
                            />
                            <Textfield
                              label="Price"
                              name="price"
                              type="number"
                              placeholder="Enter Product price"
                            />
                            <Textfield
                              label="Image"
                              name="image"
                              type="text"
                              placeholder="Image URL"
                            />
                            <Textfield
                              label="Description"
                              name="description"
                              type="text"
                              placeholder="description"
                            />
                            <button className="R-buttons" type="submit">
                              EDIT
                            </button>
                            <button className="R-buttons" type="reset">
                              RESET
                            </button>
                          </Form>
                        </div>
                      </div>
                    )}
                  </Formik>
                </div>
              </section>
            </div>
            }
            
          </>
        
      
    )
}

export default UserProductedit
