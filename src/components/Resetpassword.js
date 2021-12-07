import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Register.css";
import Navbar_login from "./Navbar_Login";
import axios from "axios";
import Textfield from "./Textfield";
import env from "./settings";
import { useParams } from "react-router";



function Resetpassword() {

  const{userId,token}=useParams()

  const validate = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });


  
  return (
    <>
      <div className="Register-image">
        <Navbar_login />
        <section className="R-loginContainer">
          <div >
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validate}
              onSubmit={async (values) => {
                try {
                  console.log(values);
                  let data =await axios.post(`${env.api}/reset/${userId}/${token}
                  `,{
                    password: values.password,
                  })
                 window.alert("password changed");
                
                } catch (error) {
                  if(error.message==="Request failed with status code 409"){
                    window.alert("Something went wrong");
                    console.log(error);
                  }
                  else{
                    window.alert("Something went wrong / check your network");
                    console.log(error);
                  }
                }

                
              }}
            >
              {(formik) => (
                <div>
                  <div className="R-content">
                    <div className="R-login-title">Reset password</div>
                    <Form>
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
                       Reset 
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
    </>
  );
}

export default Resetpassword;
