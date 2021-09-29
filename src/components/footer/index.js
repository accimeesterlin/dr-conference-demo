import React from 'react';

function Footer() {

  return <footer>
    <div className="footer-area">
      <div className="foo_top padding-top-120 padding-bottom-65">
        <div className="foo_top_shapes">
          <img src="../assets/images/fo_vec1.png" alt="" className="shp_1" />
          <img src="../assets/images/fo_vec2.png" alt="" className="shp_2 item-zooming" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 wow fadeInUp" data-wow-delay=".2s">
              <div className="foo-widget">
                <div className="logo">
                  <a href="index.html"> <img src="../assets/images/logo.png" alt="" /></a>
                </div>
                <p>Outsource your HR functions to industry-specialized experts.</p>
                <div className="social-links">
                  <a href="#"><span className="active"><i className="icofont-pinterest"></i></span></a>

                  <a href="#"><span><i className="icofont-facebook"></i></span></a>

                  <a href="#"><span><i className="fab fa-linkedin-in"></i></span></a>

                  <a href="#"><span><i className="icofont-twitter"></i></span></a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 wow fadeInUp" data-wow-delay=".4s">
              <div className="foo-widget">
                <h4>usefull links</h4>
                <ul>
                  <li><a href="index.html">home</a> </li>
                  <li><a href="about.html">about</a> </li>
                  <li><a href="schedule.html">schedule</a> </li>
                  <li><a href="speakers.html">speakers</a></li>
                  <li><a href="blog.html">blog</a> </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 wow fadeInUp" data-wow-delay=".6s">
              <div className="foo-widget">
                <h4>contact us</h4>
                <ul>
                  <li>
                    <span><i className="icofont-clock-time"></i></span> agencify HR Serice
                  </li>
                  <li>
                    <span><i className="icofont-phone"></i></span> +1 561-318-5142
                  </li>
                  <li>
                    <span><i className="icofont-email"></i></span> hr@agencifyllc.com
                  </li>
                  <li>
                    <span><i className="icofont-ui-home"></i></span>
                    uttara, West
                    dhaka, Bangladesh
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 wow fadeInUp" data-wow-delay=".8s">
              <div className="foo-widget">
                <h4>Instagram Feed</h4>
                <div className="foo-gal-wrapper">
                  <div className="single-gal">
                    <a href="#"><img src="../assets/images/f_img1.png" alt="" /></a>
                  </div>
                  <div className="single-gal">
                    <a href="#"><img src="../assets/images/f_img2.png" alt="" /></a>
                  </div>
                  <div className="single-gal">
                    <a href="#"><img src="../assets/images/f_img3.png" alt="" /></a>
                  </div>
                  <div className="single-gal">
                    <a href="#"><img src="../assets/images/f_img4.png" alt="" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="foo_btm">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="copyright-text">
                <span> &copy; copyright by <a href="https://softtechitltd.com/"><b>SoftTech-IT</b></a>
                  2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

}

export default Footer;

