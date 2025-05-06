import React from "react";

const ContactMap = () => {
  return (
    <div id="page-content  mt-5">
      <div className="container contact-style2">
        <div className="contact-maps section p-0">
          <div className="row">
            <div className="col-12">
              <div className="map-section ratio ratio-16x9">
                <iframe
                  className="rounded-5"
                  src="https://www.google.com/maps/embed?pb="
                  allowFullScreen
                  height="650"
                  title="Google Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
