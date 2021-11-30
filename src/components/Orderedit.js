import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Textfield from "./Textfield";
import env from "./settings";
import axios from "axios";
import "./ProductReg.css";
import Navbarns from "./Navbarns";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading_page from "./Loading_page";

function Orderedit() {
  const Navigate = useNavigate();
  const validate = Yup.object({
    status: Yup.string().required("Status required"),
  });
  const [Data, setData] = useState();
  const [Loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchdata = async () => {
    setLoading(true);
    try {
      let data = await axios.get(`${env.api}/adminordersbyid/${id}`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      console.log(data);
      setData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      window.alert("Check your network");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <Navbarns />
      {Loading ? (
        <Loading_page />
      ) : Data.status !== undefined ? (
        <div>
          <div className="CT-overall">
            <h4> UPDATE ORDER</h4>
            <Link to="/allorders">
              <button className="CT-buttons">ALL ORDERS</button>
            </Link>
          </div>
          <div className="Register-image">
            <section className="R-loginContainer">
              <div>
                <Formik
                  initialValues={{
                    status: "",
                  }}
                  validationSchema={validate}
                  onSubmit={async (values) => {
                    try {
                      let postData = await axios.put(
                        `${env.api}/adminorderupdate/${id}`,
                        { status: values.status },
                        {
                          headers: {
                            Authorization:
                              window.localStorage.getItem("app_token"),
                          },
                        }
                      );
                      window.alert("Product updated");
                      Navigate("/allorders");
                    } catch (error) {
                      if (
                        error.message === "Request failed with status code 409"
                      ) {
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
                        <div className="R-login-title">UPDATE ORDER</div>
                        <div>
                          <h3>Current status:{Data.status}</h3>
                        </div>
                        <Form>
                          <Textfield
                            label="STATUS"
                            name="status"
                            list="option"
                            placeholder="STATUS"
                          />
                          <datalist id="option">
                            <option value="DISPACHED" />
                            <option value="DELIVERED" />
                          </datalist>
                          <button className="R-buttons" type="submit">
                            UPDATE
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
        </div>
      ) : (
        <h5>Something wentwrong kindly retry again</h5>
      )}
    </>
  );
}

export default Orderedit;
