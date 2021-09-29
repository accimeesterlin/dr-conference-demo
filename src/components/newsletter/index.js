import React from 'react';

function NewsLetter() {
  return <div className="subs-area padding-top-120 padding-bottom-120">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="row align-items-center">
            <div className="col-lg-7 col-xl-6 col-12 wow fadeInLeft">
              <div className="subs-content">
                <h2>subscribe our newsletter</h2>
              </div>
            </div>
            <div className="col-lg-5 col-xl-6 col-12 wow fadeInRight">
              <div className="subs-form">
                <form action="#">
                  <input type="email" placeholder="Enter your email address" />
                  <button type="submit">subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default NewsLetter;