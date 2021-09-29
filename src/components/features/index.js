import React from 'react';

function Features() {
  return <div className="fea-area padding-top-120 padding-bottom-90" >
    <div className="fea-shapes" >
      <img src="../assets/images/e_vec3.png" alt="" className="vec_1" />
      <img src="../assets/images/e_vec5.png" alt="" className="vec_2" />
    </div >
    <div className="container" >
      <div className="row align-items-center" >
        <div className="col-lg-6 wow slideInLeft" >
          <div className="fea-left" >
            <div className="common-title" >
              <h2>what is business startup Conference</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodpor incididunt ut
                labore et dolore magna aliqua. Quis ipsum suspendi ultrices gravida Risus commodo.</p>
              <ul>
                <li>great speakers</li>
                <li>best participants</li>
                <li>interactive floor plans</li>
              </ul>
              <a href="schedule-single.html" className="btn1" > learn more</a >
            </div >
          </div >
        </div >
        <div className="col-lg-6" >
          <div className="fea-right" >
            <div className="row" >
              <div className="col-6 wow fadeInDown" >
                <img src="../assets/images/fea_img1.jpg" alt="" />
              </div>
              <div className="col-6 wow fadeInDown" data-wow-delay=".2s" >
                <img src="../assets/images/fea_img2.jpg" alt="" />
              </div>
            </div >
            <div className="row" >
              <div className="col-12 wow fadeInUp" >
                <img src="../assets/images/fea_img3.jpg" alt="" />
              </div>
            </div >
          </div >
        </div >
      </div >
    </div >
  </div >;
}

export default Features;