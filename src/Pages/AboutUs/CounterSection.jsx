import React, { useTransition } from "react";
import PropTypes from "prop-types";
import CountUp from "react-countup"; // استيراد مكتبة CountUp
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
/**
 * @param counterData
 */

export default function CounterSection({ counterData }) {
  const { t } = useTranslation();

  return (
    <section className="destination-section section section-color-light">
      <div className="container">
        <div className="row row-cols-lg-4 row-cols-md-4 row-cols-sm-2 row-cols-2 g-4 text-center">
          {counterData.map((item, index) => (
            <CounterItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

CounterSection.propTypes = {
  counterData: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      count: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// مكون فرعي لكل عنصر لاحتواء useInView
function CounterItem({ item }) {
  const { t } = useTranslation();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className="counterup-items">
      <i className={`${item.icon} fs-3 mb-3`}></i>
      <p className="counterup-number">
        <span className="counterup">
          {inView && (
            <CountUp start={0} end={parseInt(item.count)} duration={2.5} />
          )}
        </span>
        <span className="ms-1 text">{item.text}</span>
      </p>
      <div className="counterup-title">{t(item.title)}</div>
    </div>
  );
}

CounterItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
