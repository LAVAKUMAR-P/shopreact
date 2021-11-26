import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import Textfield from "./Textfield";
import env from "./settings";
import axios from "axios";
import './ProductReg.css'

function ProductReg(){
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
    
 return(
    <>
      <div className="Register-image">
       
        <section className="R-loginContainer">
          <div>
            <Formik
              initialValues={{
                title: "",
                category: "",
                price: "",
                image: "",
                description: "",
              }}
              validationSchema={validate}
              onSubmit={async (values) => {
               
                try {
                  let postData = await axios.post(`${env.api}/productregister`, values);
                  window.alert("User registered");
                 console.log(values);
                  
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
            >
              {(formik) => (
                <div>
                  <div className="R-content">
                    <div className="R-login-title">Register</div>
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
                        CREATE
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
      
    </>
 )
}

export default ProductReg