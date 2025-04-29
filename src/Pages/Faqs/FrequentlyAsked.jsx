import React from "react";

const FrequentlyAsked = () => {
  return (
    <div className="container mb-5 mt-5">
      {/* Frequently Content */}
      <div className="row help-center mb-4 mb-md-0">
        <div className="col-12 col-sm-12 col-md-10 col-lg-6 mx-auto">
          <h2 className="mb-5 text-center main-title-heading">
            Frequently Asked Questions
          </h2>
          <form
            className="frequently-search"
            id="frequentlysearch"
            action="#"
            method="get"
          >
            <div className="input-group">
              <input
                type="text"
                className="form-control input-group-field"
                name="search"
                placeholder="Search…"
                required
              />
              <button
                type="submit"
                className="input-group-btn btn btn-secondary"
                name="search"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAsked;
