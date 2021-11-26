import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Register.css";
import Navbar_login from "./Navbar_Login";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Textfield from "./Textfield";
import env from "./settings";
import Bbar from "./Bbar";


function Register() {
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  let history = useHistory();
  return (
    <>
      <div className="Register-image">
        <Navbar_login />
        <section className="R-loginContainer">
          <div>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validate}
              onSubmit={async (values) => {
                let data = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  password: values.password,
                  email: values.email,
                };
                try {
                  let postData = await axios.post(`${env.api}/register`, data);
                  window.alert("User registered");

                  history.push("/");
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
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="Enter First Name"
                        placeholder="Enter your first Name"
                      />
                      <Textfield
                        label="last Name"
                        name="lastName"
                        type="text"
                        placeholder="Enter Last  Name"
                      />
                      <Textfield
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                      />
                      <Textfield
                        label="password"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                      />
                      <Textfield
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                      />
                      <button className="R-buttons" type="submit">
                        Register
                      </button>
                      <button className="R-buttons" type="reset">
                        Reset
                      </button>
                    </Form>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </section>
      </div>
      <Bbar/>
    </>
  );
}

export default Register;
