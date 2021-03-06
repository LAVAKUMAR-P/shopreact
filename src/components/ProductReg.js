import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Textfield from "./Textfield";
import env from "./settings";
import axios from "axios";
import "./ProductReg.css";
import Navbarns from "./Navbarns";
import { Link, useNavigate } from "react-router-dom";
import Loading_page from "./Loading_page";

function ProductReg() {
const [Loading,setLoading]=useState(false)
const Navigate=useNavigate()

  const validate = Yup.object({
    title: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Required"),
    category: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    quantity: Yup.number().required("price required"),
    price: Yup.number().required("price required"),
    image: Yup.string().required("Image required"),
    rating: Yup.number().required("price required").min(0, 'Min value 0.')
    .max(5, 'Max value 5.'),
    count: Yup.number().required("price required").min(1, 'Min value 0.')
    .max(100, 'Max value 100.'),
    description: Yup.string().required("Description required"),
  });

  return (
    <>
      <Navbarns />
      {
        Loading ? <Loading_page/>:<><div className="CT-overall">
        <h4> CREAT PRODUCT</h4>
                    <Link to="/productlist">
                      <button className="CT-buttons">PRODUCT LIST</button>
                    </Link>
        </div>
        <div className="Register-image">
          <section className="R-loginContainer">
         
            <div>
              <Formik
                initialValues={{
                  title: "",
                  category: "",
                  price: "",
                  image: "",
                  quantity:"",
                  count:"",
                  rating:"",
                  description: "",
                }}
                validationSchema={validate}
                onSubmit={async (values) => {
                  setLoading(true)
                  values.image=`https://drive.google.com/uc?export=view&id=${values.image}`
                  try {
                    let postData = await axios.post(
                      `${env.api}/productregister`,
                      { values },
                      {
                        headers: {
                          Authorization: window.localStorage.getItem("app_token"),
                        },
                      }
                    );
                    setLoading(false)
                    window.alert("Product registered");
                    Navigate("/productlist")
                  } catch (error) {
                    setLoading(false)
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
                   
                    <div className="PR-content">
                      
                      <Form>
                        <div className="R-login-title">CREATE PRODUCT</div>
                        <div className="R-gird">
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
                          label="Count"
                          name="count"
                          type="number"
                          placeholder="Enter Number of product"
                        />
                         <Textfield
                          label="STOCK"
                          name="quantity"
                          type="number"
                          placeholder="Enter STOCK"
                        />
                        <Textfield
                          label="Rating"
                          name="rating"
                          type="number"
                          placeholder="Enter Rating 1 to 5"
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
                        </div>
                      </Form>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
          </section>
        </div></>
      }
    </>
  );
}

export default ProductReg;
