import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import env from "./settings";
import axios from "axios";
import "./ProductReg.css";
import Navbarns from "./Navbarns";
import { Link } from "react-router-dom";
import Textarea from "./Textarea";

function Address() {
  const validate = Yup.object({
    address: Yup.string()
      .max(200, "Must be 200 characters or less")
      .required("Required"),
  });

  return (
    <>
      <Navbarns />
      <div className="CT-overall">
      <h4> ADDRESS</h4>
                  <Link to="/cart">
                    <button className="CT-buttons">CART</button>
                  </Link>
      </div>
      <div className="Register-image">
        <section className="R-loginContainer">
       
          <div>
            <Formik
              initialValues={{
                address: "",
              }}
              validationSchema={validate}
              onSubmit={async (values) => {
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
                  window.alert("User registered");
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
                    <div className="R-login-title">CREATE PRODUCT</div>
                    <Form>
                      <Textarea
                        label="ENTER YOUR ADDRESS"
                        name="address"
                        type="text"
                        placeholder="ENTER YOUR ADDRESS"
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
  );
}

export default Address;
