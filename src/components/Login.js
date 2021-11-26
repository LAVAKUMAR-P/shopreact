import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import "./Login.css";
import Navbar_login from "./Navbar_Login";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Textfield from "./Textfield";
import env from "./settings";
import Bbar from "./Bbar";

function Login() {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  let history = useHistory();

  return (
    <>
       <Navbar_login />
      <div className="image">
        <div className="L-container-position">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              try {
                let postData = await axios.post(
                  `${env.api}/login`,
                  values
                );
                
                window.localStorage.setItem("app_token", postData.data.token);
                window.localStorage.setItem("action", postData.data.unconditional);
                window.alert("Login sucessfull");
                history.push("/home");
              } catch (error) {
                console.log("error");
                if (error.message === "Request failed with status code 401") {
                  window.alert("user name or password miss match");
                } else {
                  window.alert("Check your network");
                }
              }
            }}
          >
            {(formik) => (
              <div className="L-loginContainer">
                <div className="L-content">
                  <div className="L-content-position">
                  <div className="L-login-title">Login</div>
                  <Form>
                    <Textfield label="Email" name="email" type="email"   placeholder="Enter your Mail id" />
                    <Textfield
                      label="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                    />
                      <button className="L-buttons" type="submit">
                        Login
                      </button>
                    <button className="L-buttons" type="reset">
                      Reset
                    </button>
                  </Form>
                  </div>
                  <div className="forgetpassword-position">
                  <Link to="/forgetpassword">forgetpassword?</Link>
                  </div>
                </div>
               
              </div>
            )}
          </Formik>
        </div>
      </div>
      <Bbar/>
    </>
  );
}

export default Login;
