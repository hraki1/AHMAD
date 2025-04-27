import React from "react";
import videoImg from "../../assets/images/about/video-popup-bg.jpg";
export default function Video() {
  return (
    <div>
      {/* قسم الفيديو المنبثق */}
      <section className="video-popup-section section pb-0">
        <div className="container">
          <div className="section-header d-none">
            <h2>Hema fashion store</h2>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <div className="video-popup-content position-relative">
                <a
                  href="#aboutVideo-modal"
                  className="popup-video d-flex align-items-center justify-content-center"
                  data-bs-toggle="modal"
                  data-bs-target="#aboutVideo_modal"
                  title="View Video"
                >
                  <img
                    className="w-100 d-block blur-up lazyload"
                    data-src={videoImg}
                    src={videoImg}
                    alt="Background for video popup"
                    title=""
                    width="1100"
                    height="600"
                  />

                  <i className="icon  fa-solid fa-circle-play"></i>
                </a>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <div className="content-section text-center col-lg-9 mx-auto mt-4">
                <div className="text-video mb-3">
                  Section 1.10.32 of "de Finibus Bonorum et Malorum", written by
                  Cicero in 45 BC
                </div>
                <div className="desc-content">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Info */}
      <div
        className="aboutVideo-modal modal fade"
        id="aboutVideo_modal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="ratio ratio-16x9 productVideo-wrap">
                <iframe
                  id="ytPlayer"
                  className="rounded-0"
                  src="https://www.youtube.com/embed/qnOC_ydH1zg?controls=0&autoplay=1&rel=0&showinfo=0&mute=0"
                  allow=""
                  title="YouTube video"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
