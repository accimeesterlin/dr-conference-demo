import React from 'react';

function Brands() {
  return <div className="brand-area padding-top-110 padding-bottom-90">
    <div className="container">
      <div className="row justify-content-center margin-bottom-30">
        <div className="col-lg-6 wow fadeInUp">
          <div className="common-title text-center">
            <h2>our great sponsor</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6 col-12 wow zoomIn" data-wow-delay=".2s">
          <div className="single-brand">
            <img src="assets/images/brand1.png" alt="" />
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 col-12 wow zoomIn" data-wow-delay=".4s">
          <div className="single-brand">
            <img src="assets/images/brand2.png" alt="" />
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 col-12 wow zoomIn" data-wow-delay=".6s">
          <div className="single-brand">
            <img src="assets/images/brand3.png" alt="" />
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 col-12 wow zoomIn" data-wow-delay=".8s">
          <div className="single-brand">
            <img src="assets/images/brand4.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default Brands;