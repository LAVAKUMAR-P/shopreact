import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import env from "./settings";
import axios from "axios";
import "./ProductReg.css";
import Navbarns from "./Navbarns";
import { Link, useNavigate } from "react-router-dom";
import Textfield from "./Textfield";
import "./Address.css";
import Loading_page from "./Loading_page";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Address() {
  const [name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const placeorder = async (values) => {
    setisLoading(true);
    try {
      let postData = await axios.post(
        `${env.api}/orderproduct`,
        { paymentid: window.localStorage.getItem("payid") },
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      window.alert("Product ordered kindly note paymentid");
      Navigate("/cart");
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      window.alert(
        "Something went wrong kindly contact us if money taken from bank account"
      );
      window.alert(localStorage.getItem("orid"));
      window.alert(localStorage.getItem("payid"));
    }
  };

  const displayRazorpay = async (values) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await axios.post(
      `${env.api}/razorpay`,
      { values },
      {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      }
    );

    localStorage.setItem("orid", data.data.id);

    if (data.data.amount > 0) {
      const options = {
        key: env.secret,
        currency: data.data.currency,
        amount: data.data.amount.toString(),
        order_id: data.data.id,
        name: "Shoping",
        description: "Thank you .",
        image:
          "https://drive.google.com/file/d/1f5HenjjAanXL9yM9tC2chWRkAdjysGTS/view?usp=sharing",
        handler: function (response) {
          let ok = localStorage.getItem("orid");
          if (ok == response.razorpay_order_id) {
            localStorage.setItem("payid", response.razorpay_payment_id);
            localStorage.setItem("sig", response.razorpay_signature);
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
            alert(
              "PAYMENT SUCCESS FULL WAIT FOR A MINTUE TO COMFIRM YOUR ORDER"
            );
            placeorder();
          } else {
            alert("PAYMENT FAILED KINDLY NOTE PAYMENT ID");
            alert(response.razorpay_payment_id);
          }
        },
        prefill: {
          name,
          email: email,
          phone_number: mobile,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      alert("Some thing went wrong try again later");
    }
  };

  const validate = Yup.object({
    holdername: Yup.string()
      .max(200, "Must be 200 characters or less")
      .required("Required"),
    mobile: Yup.string()
      .max(10, "max 10 digit")
      .required("Enter mobile number"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });
  const Navigate = useNavigate();

  const fechuser = async () => {
    try {
      const user = await axios.get(`${env.api}/getuser`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setAddress(user.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fechuser();
  }, []);

  return (
    <>
      <Navbarns />
      {isLoading ? (
        <Loading_page />
      ) : (
        <>
          <div className="A-cartButton">
            <Link to="/cart">
              <button className="CT-buttons">CART</button>
            </Link>
          </div>
          <div className="CT-overall">
            <h4>PLACE ORDER</h4>
          </div>
          <div className="Register-image">
            <section className="R-loginContainer">
              <div>
                <Formik
                  initialValues={{
                    holdername: "",
                    mobile: "",
                    email: "",
                  }}
                  validationSchema={validate}
                  onSubmit={(values) => {
                    setName(values.holdername);
                    setemail(values.email);
                    setmobile(values.mobile);
                    displayRazorpay();
                  }}
                >
                  {(formik) => (
                    <div>
                      <div className="R-content">
                        <div className="R-login-title">ORDER PRODUCT</div>
                        <Form>
                          <Textfield
                            label="ENTER YOUR NAME"
                            name="holdername"
                            type="text"
                            placeholder="ENTER YOUR ADDRESS"
                          />
                          <Textfield
                            label="ENTER YOUR MOBILE NUMBER"
                            name="mobile"
                            type="number"
                            placeholder="MOBILE NUMBER"
                          />
                          <Textfield
                            label="ENTER EMAIL"
                            name="email"
                            type="email"
                            placeholder="EMAIL ID"
                          />
                          <div>
                            <h4>Your address:</h4>
                            <h5>{Address}</h5>
                            <div>
                              <Link to="/editaddress">
                                <button
                                  className="A-botton A-buttonPosition"
                                  type="reset"
                                >
                                  EDIT
                                </button>
                              </Link>
                            </div>
                          </div>
                          <button className="R-buttons" type="submit">
                            PAY
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
      )}
    </>
  );
}

export default Address;
