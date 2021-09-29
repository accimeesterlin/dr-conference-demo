import React from 'react';

function Counter() {
  return <div className="counter-area padding-bottom-120" >
    <div className="container" >
      <div className="row justify-content-center" >
        <div className="col-lg-9" >
          <div className="row counter_wrapper countdown" >
            <div className="col-6 col-sm-3" >
              <div className="single-counter" >
                <h2 className="days" > 18</h2 >
                <h6>days</h6>
              </div >
            </div >
            <div className="col-6 col-sm-3" >
              <div className="single-counter" >
                <h2 className="hours" > 10</h2 >
                <h6>hours</h6>
              </div >
            </div >
            <div className="col-6 col-sm-3" >
              <div className="single-counter" >
                <h2 className="minutes" > 48</h2 >
                <h6>minute</h6>
              </div >
            </div >
            <div className="col-6 col-sm-3" >
              <div className="single-counter" >
                <h2 className="seconds" > 30</h2 >
                <h6>second</h6>
              </div >
            </div >
          </div >
        </div >
      </div >
    </div >
  </div >;
}

export default Counter;