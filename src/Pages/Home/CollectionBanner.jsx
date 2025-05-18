import React from "react";
import { Link } from "react-router-dom";
import useFetchCategories from "../Hooks/useFetchCategories";

export default function CollectionBanner() {
  const { categories, loading, error } = useFetchCategories();

  if (loading) return <>جاري التحميل...</>;
  if (error) return <>{error}</>;

  // تأكد من توفر 3 تصنيفات على الأقل
  const womenCategory = categories[0];
  const menCategory = categories[1];
  const kidsCategory = categories[2];

  return (
    <section className="section collection-banners pb-0">
      <div className="container">
        <div className="collection-banner-grid">
          <div className="row sp-row">
            {/* Women Wear */}
            {womenCategory && (
              <div className="col-12 col-sm-6 col-md-6 col-lg-6 collection-banner-item">
                <div className="collection-item sp-col">
                  <Link
                    to={`/ShopGrid?category=${womenCategory.id}`}
                    className="zoom-scal"
                  >
                    <div className="img">
                      <img
                        className="blur-up lazyload hei-imp"
                        src={womenCategory.img || "/placeholder.jpg"}
                        alt={womenCategory.name}
                        title={womenCategory.name}
                        width="623"
                        height="698"
                        loading="lazy"
                      />
                    </div>
                    <div className="details middle-right">
                      <div className="inner">
                        <div className="mb-2 sub-banner">Trending Now</div>
                        <div className="title-banner">{womenCategory.name}</div>
                        <span className="btn btn-outline-secondary btn-md">
                          Shop Now
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {/* Men + Kids */}
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 collection-banner-item">
              {/* Men Wear */}
              {menCategory && (
                <div className="collection-item sp-col mb-4 mb-sm-4 mb-md-4 mb-lg-4">
                  <Link
                    to={`/ShopGrid?category=${menCategory.id}`}
                    className="zoom-scal"
                  >
                    <div className="img">
                      <img
                        className="blur-up lazyload hei-imp"
                        src={menCategory.img || "/placeholder.jpg"}
                        alt={menCategory.name}
                        title={menCategory.name}
                        width="623"
                        height="332"
                        loading="lazy"
                      />
                    </div>
                    <div className="details middle-left">
                      <div className="inner">
                        <div className="title-banner mb-2">
                          {menCategory.name}
                        </div>
                        <div className="sub-banner mb-3">
                          Tailor-made with passion
                        </div>
                        <span className="btn btn-outline-secondary btn-md">
                          Shop Now
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Kids Wear */}
              {kidsCategory && (
                <div className="collection-item sp-col">
                  <Link
                    to={`/ShopGrid?category=${kidsCategory.id}`}
                    className="zoom-scal"
                  >
                    <div className="img">
                      <img
                        className="blur-up lazyload hei-imp"
                        src={kidsCategory.img || "/placeholder.jpg"}
                        alt={kidsCategory.name}
                        title={kidsCategory.name}
                        width="623"
                        height="337"
                        loading="lazy"
                      />
                    </div>
                    <div className="details middle-right">
                      <div className="inner">
                        <div className="sub-banner mb-2">
                          Buy one get one free
                        </div>
                        <div className="title-banner">{kidsCategory.name}</div>
                        <span className="btn btn-outline-secondary btn-md">
                          Shop Now
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
