import React from 'react';

function Register() {

  return <div className="regis-area padding-top-120 padding-bottom-120">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 wow fadeInLeft">
          <div className="reg-left">
            <img src="../assets/images/form_img1.png" alt="" />
          </div>
        </div>
        <div className="col-lg-6 wow fadeInRight">
          <div className="reg-right">
            <div className="common-title">
              <h2>register now</h2>
              <div className="form-wrapper">
                <form action="#">
                  <div className="input-wrapper">
                    <span className="icon"><i className="icofont-ui-user"></i></span>
                    <input type="text" placeholder="Full Name" />
                  </div>
                  <div className="input-wrapper">
                    <span className="icon"><i className="icofont-email"></i></span>
                    <input type="text" placeholder="Email Adress" />
                  </div>
                  <div className="input-wrapper">
                    <span className="icon"><i className="icofont-phone"></i></span>
                    <input type="text" placeholder="Phone" />
                  </div>
                  <div className="input-wrapper special">
                    <span className="icon"><i className="icofont-ui-messaging"></i></span>
                    <textarea placeholder="Additional massage"></textarea>
                  </div>
                  <button type="submit" className="btn1">submit now</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default Register;