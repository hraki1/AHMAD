// src/components/CollectionBanner.jsx
import React from "react";

// استيراد الصور
import womenImg from "../../assets/images/collection/demo1-ct-img1.jpg";
import menImg from "../../assets/images/collection/demo1-ct-img2.jpg";
import kidsImg from "../../assets/images/collection/demo1-ct-img3.jpg";

export default function CollectionBanner() {
  return (
    <section className="section collection-banners pb-0">
      <div className="container">
        <div className="collection-banner-grid">
          <div className="row sp-row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 collection-banner-item">
              <div className="collection-item sp-col">
                <a href="shop-left-sidebar.html" className="zoom-scal">
                  <div className="img">
                    <img
                      className="blur-up lazyload"
                      src={womenImg}
                      alt="Women Wear"
                      title="Women Wear"
                      width="645"
                      height="723"
                      loading="lazy"
                    />
                  </div>
                  <div className="details middle-right">
                    <div className="inner">
                      <div className="mb-2 sub-banner">Trending Now</div>
                      <div className="title-banner">Women Wear</div>
                      <span className="btn btn-outline-secondary btn-md">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-6 collection-banner-item">
              {/* Men Wear */}
              <div className="collection-item sp-col mb-4 mb-sm-4 mb-md-4 mb-lg-4">
                <a href="shop-left-sidebar.html" className="zoom-scal">
                  <div className="img">
                    <img
                      className="blur-up lazyload"
                      src={menImg}
                      alt="Mens Wear"
                      title="Mens Wear"
                      width="645"
                      height="344"
                      loading="lazy"
                    />
                  </div>
                  <div className="details middle-left">
                    <div className="inner">
                      <div className="title-banner mb-2">Mens Wear</div>
                      <div className="sub-banner mb-3">
                        Tailor-made with passion
                      </div>
                      <span className="btn btn-outline-secondary btn-md">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Kids Wear */}
              <div className="collection-item sp-col">
                <a href="shop-left-sidebar.html" className="zoom-scal">
                  <div className="img">
                    <img
                      className="blur-up lazyload"
                      src={kidsImg}
                      alt="Kids Wear"
                      title="Kids Wear"
                      width="645"
                      height="349"
                      loading="lazy"
                    />
                  </div>
                  <div className="details middle-right">
                    <div className="inner">
                      <div className="sub-banner mb-2">
                        Buy one get one free
                      </div>
                      <div className="title-banner">Kids Wear</div>
                      <span className="btn btn-outline-secondary btn-md">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
