import React from "react";
import "./Loading_page.css";
import Loading from "./images/Loading.gif"


function Loading_page() {
  return (
    <>
      <div className="Loding-bacgroung">
        <div className="Loading_Container_position">
          <div className="Loding_container">
            <div className="Loding_typing">
            PAGE LOADING.....
            </div>
            <img src={Loading} alt="Loading_image" className="Loading" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Loading_page;
