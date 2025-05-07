import React from "react";
import Slider from "react-slick";

import Button from "../../Components/common/Button";
import { blogPosts } from "./data";
import { Link } from "react-router-dom";

export default function BlogPostSection() {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="section home-blog-post">
      <div className="container">
        <div className="section-header">
          <div className="main-italic mb-2 mt-0">Latest post</div>
          <div className="main-title-heading">Most Recent News</div>
        </div>

        <Slider
          {...settings}
          className="blog-slider-3items gp15 arwOut5 hov-arrow"
        >
          {blogPosts.map((post, i) => (
            <div key={i} className="blog-item">
              <div className="blog-article zoomscal-hov">
                <div className="blog-img">
                  <a className="featured-image zoom-scal" href="/">
                    <img
                      className="blur-up lazyload"
                      src={post.img}
                      alt={post.title}
                      width="740"
                      height="410"
                    />
                  </a>
                  <div className="date">
                    <span className="dt">{post.date.split(" ")[0]}</span>
                    <span className="mt">
                      {post.date.split(" ")[1]}
                      <br />
                      <b>{post.date.split(" ")[2]}</b>
                    </span>
                  </div>
                </div>

                <div className="blog-content">
                  <h2 className="h3 mb-3">
                    <Link to="/">{post.title}</Link>
                  </h2>
                  <p className="content">{post.description}</p>

                  <Button
                    label="Read more"
                    href="/home"
                    primary={false} /* .btn-primary if need it make it true */
                    size="sm" /*   */
                    className="btn-sm" /*  */
                  ></Button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
