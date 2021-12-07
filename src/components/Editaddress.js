import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import env from "./settings";
import axios from "axios";
import "./ProductReg.css";
import Navbarns from "./Navbarns";
import {Link,useNavigate} from "react-router-dom";
import Textarea from "./Textarea";

function Editaddress() {
  const validate = Yup.object({
    address: Yup.string()
      .max(100, "Must be 40 characters or less")
      .required("Required"),
  });

  const Navigate=useNavigate();

  return (
    <>
      <Navbarns />
      <div className="CT-overall">
      <h4> EDIT ADDRESS</h4>
      <div className="A-cartButton">
                  <Link to="/cart">
                    <button className="CT-buttons">CART</button>
                  </Link>
      </div>
      </div>
      <div className="Register-image">
        <section className="R-loginContainer">
       
          <div>
            <Formik
              initialValues={{
                address:"",
              }}
              validationSchema={validate}
              onSubmit={async (values) => {
               
                try {
                  let postData = await axios.put(
                    `${env.api}/editaddress`,
                    { address:values.address },
                    {
                      headers: {
                        Authorization: window.localStorage.getItem("app_token"),
                      },
                    }
                  );
                  window.alert("ADDRESS EDITED");
                  Navigate("/address")
                } catch (error) {
                  
                    window.alert("check your network");
                    console.log(error);
                }
              }}
            >
              {(formik) => (
                <div>
                 
                  <div className="R-content">
                    <div className="R-login-title">EDIT ADDRESS</div>
                    <Form>
                      <Textarea
                        label="Edit address"
                        name="address"
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
    </>
  );
}

export default Editaddress;
