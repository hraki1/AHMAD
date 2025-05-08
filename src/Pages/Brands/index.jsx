import React, { useState } from "react";
import Slider from "react-slick";
import PageHeader from "../../Components/layout/Header/PageHeader";
import useFetchBrands from "../../utils/useFetchBrands";

const BrandsPage = () => {
  const { brands, loading, error } = useFetchBrands();
  const [selectedLetter, setSelectedLetter] = useState("A");

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
      { breakpoint: 420, settings: { slidesToShow: 1 } },
    ],
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const filteredBrands = brands?.filter((b) =>
    b.name?.toUpperCase().startsWith(selectedLetter)
  );

  const renderBrands = (list) => (
    <div className="row g-3 brands-row text-center">
      {list.map((brand) => (
        <div
          className="col-6 col-sm-4 col-md-3 col-lg-2 brands-logo"
          key={brand.id}
        >
          <a
            href="shop-right-sidebar.html"
            className="zoom-scal zoom-scal-nopb"
          >
            <img
              className="blur-up lazyload"
              src={brand.image}
              alt={brand.name}
              width="194"
              height="97"
            />
          </a>
          <p className="mt-1 mb-0">{brand.name}</p>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <PageHeader title="Brands" middleBreadcrumb="PAGES" />
      <div className="brands-page">
        <div className="page-wrapper">
          <div className="page-content">
            <div className="container">
              {/* Slider */}
              <h2 className="text-center mb-4">Popular Brands</h2>
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : error ? (
                <p className="text-center text-danger">{error}</p>
              ) : (
                <div className="featured-brands-logo mb-4 pb-3">
                  <Slider {...settings} className="logo-slider">
                    {brands.map((brand) => (
                      <div className="brands-logo px-2" key={brand.id}>
                        <a
                          href="shop-right-sidebar.html"
                          className="zoom-scal zoom-scal-nopb"
                        >
                          <img
                            className="blur-up lazyload w-full h-auto"
                            src={brand.image}
                            alt={brand.name}
                            width="194"
                            height="97"
                          />
                        </a>
                        <p className="content mt-1 mb-1">{brand.name}</p>
                        <p>{brand.slug}</p>
                      </div>
                    ))}
                  </Slider>
                </div>
              )}

              {/* All Brands by Alphabet */}
              <h2 className="mb-3">All Brands</h2>
              <div className="brands-search alphaBets text-start mb-3">
                <ul className="list-unstyled listing d-flex-wrap">
                  {alphabet.map((char) => (
                    <li key={char}>
                      <button
                        className={`alpha ${
                          selectedLetter === char ? "active" : ""
                        }`}
                        onClick={() => setSelectedLetter(char)}
                      >
                        {char}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <h4 className="letter-title">
                Brands Starting with "{selectedLetter}"
              </h4>
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : error ? (
                <p className="text-center text-danger">{error}</p>
              ) : filteredBrands.length > 0 ? (
                renderBrands(filteredBrands)
              ) : (
                <p className="text-center">
                  No brands found for "{selectedLetter}".
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandsPage;
