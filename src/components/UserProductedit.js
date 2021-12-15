import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbarns from "./Navbarns";
import env from "./settings";
import { useNavigate, useParams } from "react-router-dom";
import Textfield from "./Textfield";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Loading_page from "./Loading_page";

function UserProductedit() {
  const { id } = useParams();
  const [Data, setData] = useState();
  const [Loading, setLoading] = useState(true);
  const Navigate=useNavigate()
  const validate = Yup.object({
    title: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    category: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    quantity: Yup.number().required("price required"),
    price: Yup.number().required("price required"),
    image: Yup.string().required("Image required"),
    rating: Yup.number()
      .required("price required")
      .min(0, "Min value 0.")
      .max(5, "Max value 5."),
    count: Yup.number()
      .required("price required")
      .min(1, "Min value 0.")
      .max(2, "Max value 5."),
    description: Yup.string().required("Description required"),
  });
  const fetchdata = async () => {
    try {
      let data = await axios.get(`${env.api}/getproductbyid/${id}`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });

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
      ) : (
        <div className="Register-image">
          <section className="R-loginContainer">
            <div>
              <Formik
                initialValues={{
                  title: Data.values.title,
                  category: Data.values.category,
                  price: Data.values.price,
                  image: Data.values.image,
                  quantity: Data.values.quantity,
                  count: Data.values.count,
                  rating: Data.values.rating,
                  description: Data.values.description,
                }}
                validationSchema={validate}
                onSubmit={async (values) => {
                  setLoading(true)
                  values.image = `https://drive.google.com/uc?export=view&id=${values.image}`;
                  try {
                    let postData = await axios.put(
                      `${env.api}/editproduct/${id}`,
                      { values },
                      {
                        headers: {
                          Authorization:
                            window.localStorage.getItem("app_token"),
                        },
                      }
                    );
                    setLoading(false)
                    window.alert("Product edited");
                   Navigate("/productlist")
                  } catch (error) {
                    setLoading(false)
                    if (
                      error.message === "Request failed with status code 409"
                    ) {
                      window.alert("Mailid is already registered");
                      console.log(error);
                    } else {
                      window.alert("check your network");
                      console.log(error);
                    }
                    fetchdata()
                  }
                }}
                enableReinitialize
              >
                {(formik) => (
                  <div>
                    <div className="PR-content">
                      <div className="R-login-title">EDIT PRODUCT</div>
                      <Form>
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
                          EDIT
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
        </div>
      )}
    </>
  );
}

export default UserProductedit;
