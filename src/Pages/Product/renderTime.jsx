import React from "react";

const renderTime = ({ days, hours, minutes, seconds }) => (
  <div className="product-countdown d-flex-center text-center my-3">
    <span className="ht-count days">
      <span className="count-inner">
        <span className="time-count">{days}</span>{" "}
        <span className="text">Days</span>
      </span>
    </span>
    <span className="ht-count hour">
      <span className="count-inner">
        <span className="time-count">{hours}</span>{" "}
        <span className="text">Hr</span>
      </span>
    </span>
    <span className="ht-count minutes">
      <span className="count-inner">
        <span className="time-count">{minutes}</span>{" "}
        <span className="text">Min</span>
      </span>
    </span>
    <span className="ht-count second">
      <span className="count-inner">
        <span className="time-count">{seconds}</span>{" "}
        <span className="text">Sc</span>
      </span>
    </span>
  </div>
);

export default renderTime;
