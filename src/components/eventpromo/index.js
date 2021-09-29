import React from 'react';

function EventPromo() {
  return <div className="event-promo padding-bottom-90" >
    <div className="ev_shapes" >
      <img src="../assets/images/e_vec1.png" alt="" className="vec_1" />
      <img src="../assets/images/e_vec2.png" alt="" className="vec_2" />
      <img src="../assets/images/e_vec3.png" alt="" className="vec_3" />
      <img src="../assets/images/e_vec4.png" alt="" className="vec_4 item-animateOne" />
      <img src="../assets/images/e_vec5.png" alt="" className="vec_5 item-animateTwo" />
      <img src="../assets/images/e_vec6.png" alt="" className="vec_6" />
      <img src="../assets/images/e_vec7.png" alt="" className="vec_7 item-animateOne" />
      <img src="../assets/images//e_vec8.png" alt="" className="vec_8" />
      <img src="../assets/images/vec_2.png" alt="" className="vec_9 item-animateTwo" />
    </div >
    <div className="container" >
      <div className="row align-items-center" >
        <div className="col-lg-6" >
          <div className="ep_left" >
            <div className="row" >
              <div className="col-md-6 wow fadeInUp" data-wow-delay=".2s" >
                <div className="single-ep" >
                  <div className="icon-box" >
                    <img src="../assets/images/eicon1.png" alt="" />
                  </div>
                  <div className="cont-box" >
                    <h4>Event Conferences</h4>
                    <p>Lorem ipsum easy consectetur magna aliqua ala ma as. </p>
                    <a href="schedule-single.html">learn more</a>
                  </div >
                </div >
                <div className="single-ep" >
                  <div className="icon-box" >
                    <img src="../assets/images/eicon2.png" alt="" />
                  </div>
                  <div className="cont-box" >
                    <h4>Event Conferences</h4>
                    <p>Lorem ipsum easy consectetur magna aliqua ala ma as. </p>
                    <a href="schedule-single.html">learn more</a>
                  </div >
                </div >
              </div >
              <div className="col-md-6 col-sm-12 d-md-flex align-items-center wow fadeInUp" delay=".4s" >
                <div className="single-ep" >
                  <div className="icon-box" >
                    <img src="../assets/images/eicon3.png" alt="" />
                  </div>
                  <div className="cont-box" >
                    <h4>Event Conferences</h4>
                    <p>Lorem ipsum easy consectetur magna aliqua ala ma as. </p>
                    <a href="schedule-single.html">learn more</a>
                  </div >
                </div >
              </div >
            </div >
          </div >
        </div >
        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".6s" >
          <div className="ep_right" >
            <div className="common-title" >
              <h2>Why You Should Join Event?</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Quis ip suspendisse ultrices gravida. Risus commodo
              </p>
              <a href="ticket.html" className="btn1" > join event</a >
            </div >
          </div >
        </div >
      </div >
    </div >
  </div >;
}

export default EventPromo;