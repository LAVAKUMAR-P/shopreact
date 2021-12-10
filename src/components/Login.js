import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import "./Login.css";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";
import Textfield from "./Textfield";
import env from "./settings";
import Navbar_Login from "./Navbar_Login";
import Loading_page from "./Loading_page";
import GoogleLogin from "react-google-login";


function Login() {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const Navigate=useNavigate()
  const[Loading,setLoading]=useState(false);
 
  const postData=async(values)=>{
    setLoading(true)
    try {
      let postData = await axios.post(
        `${env.api}/login`,
        values
      );
      window.localStorage.setItem("app_token", postData.data.token);
      window.localStorage.setItem("action", postData.data.unconditional);
      setLoading(false)
      window.alert("Login sucessfull");
      Navigate("/")
    } catch (error) {
      setLoading(false)
      console.log("error");
      if (error.message === "Request failed with status code 401") {
        window.alert("user name or password miss match");
      } else {
        window.alert("Check your network");
      }
    }
  }
  const handleLogin= async(googleData)=>{
    
    setLoading(true)
    try {
      let postData = await axios.post(
        `${env.api}/loginbygoogle`, {
          token: googleData.tokenId,
        }
      );
      window.localStorage.setItem("app_token", postData.data.token);
      window.localStorage.setItem("action", postData.data.unconditional);
      setLoading(false)
      window.alert("Login sucessfull");
      Navigate("/")
    } catch (error) {
      setLoading(false)
      console.log("error");
      if (error.message === "Request failed with status code 401") {
        window.alert("user name or password miss match");
      } else {
        window.alert("Check your network");
      }
    }
    }
    const handleFailure=(err)=>{
  console.log(err);
  window.alert(err.error)
    }

  return (
    <>
    <Navbar_Login/>
      {
        Loading ? <Loading_page/>:<div className="image">
        <div className="L-container-position">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              setLoading(true)
              postData(values);
            }}
          >
            {(formik) => (
              <div className="L-loginContainer">
                <div className="L-content">
                  <div className="L-content-position">
                  <h5>Login with Google</h5>
                  <div>
                   <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={handleLogin}
                    onFailure={handleFailure}
                    cookiePolicy={'single_host_origin'}
                   />
                   </div>
                   <h4>OR</h4>
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
      }
    
    </>
  );
}

export default Login;
