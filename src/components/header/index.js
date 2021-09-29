import React from "react";

function Header() {

  return (
    <header>
      <div id="main-header" className="header-area">
        <div className="header-topbar padding-10">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-9 col-xl-8 col-md-8 col-12">
                <div className="contact-details">
                  <div><span><i className="icofont-ui-call"></i></span> +880 1175 12 42 35</div>
                  <div><span><i className="icofont-ui-message"></i></span> support@hotmail.com</div>
                  <div><span><i className="icofont-ui-home"></i></span> Dhaka, Bangladesh-1230</div>
                </div>
              </div>
              <div className="col-lg-3 col-xl-4 col-md-4 col-12">
                <div className="social-icons text-center text-md-right">
                  <a href="#"> <span className="si3"><i className="fab fa-pinterest-p"></i> </span></a>
                  <a href="#"> <span className="si3"> <i className="fab fa-linkedin-in"></i></span></a>
                  <a href="#"> <span className="si1"><i className="fab fa-facebook-f"></i> </span> </a>
                  <a href="#"> <span className="si2"> <i className="fab fa-twitter"></i></span> </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="container position-relative">
            <div className="header-bottom">
              <div className="row align-items-center justify-content-start justify-content-lg-between">
                <div className="col-lg-2 col-md-3 col-sm-3 col-3">
                  <div className="logo">
                    <a href="index.html"> <img src="../assets/images/logo.png" alt="" /></a>
                  </div>
                </div>
                <div className="col-lg-8 d-none d-lg-block">
                  <nav id="mobile-menu">
                    <ul className="main-menu">
                      <li className="has-submenu"><a href="index.html">home </a>
                        <ul className="submenu">
                          <li><a href="index.html">home 1</a></li>
                          <li><a href="homepage2.html">home 2</a></li>
                        </ul>
                      </li>
                      <li><a href="about.html">about</a></li>
                      <li><a href="speakers.html">speakers</a></li>
                      <li><a href="schedule.html">schedule</a></li>
                      <li><a href="ticket.html">ticket</a></li>
                      <li className="has-submenu"><a href="#">blog</a>
                        <ul className="submenu">
                          <li><a href="blog.html">blog</a></li>
                          <li><a href="blog-single.html">blog single</a></li>
                        </ul>
                      </li>
                      <li className="has-submenu"><a href="#">pages</a>
                        <ul className="submenu">
                          <li><a href="about-single.html">about single</a></li>
                          <li><a href="contact.html">contact page</a></li>
                          <li><a href="event-gallery.html">event gallery</a></li>
                          <li><a href="faq.html">faq page</a></li>
                          <li><a href="schedule-single.html">schedule single</a></li>
                          <li><a href="404.html">error page</a></li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="col-lg-2 col-md-6 col-sm-8 col-6">
                  <div className="header-btn text-center text-lg-right">
                    <a className="btn1" href="contact.html">contact us</a>
                  </div>
                </div>
              </div>
              <div className="mobile-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </header>

  );
}

export default Header;
