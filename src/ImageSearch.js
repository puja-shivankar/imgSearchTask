import React from "react";
import { connect } from "react-redux";
import { searchImgs } from "./imgSearch";
import { BiSearchAlt2 } from "react-icons/bi";

class ImageSearch extends React.Component {
  state = {
    query: "",
  };

  handleSearch = (e) => {
    e.preventDefault();

    const { query } = this.state;
    const { searchImgs } = this.props;
    searchImgs(query);
  };
  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  render() {
    const { query } = this.state;
    const { loading, images, error } = this.props;

    return (
      <div>
        <form
          className="form-group d-flex justify-content-center p-4 m-4"
          onSubmit={this.handleSearch}
        >
          <input
            type="text"
            value={query}
            className="form-control formInput"
            onChange={this.handleChange}
          />
          <button className="search" type="submit">
            <BiSearchAlt2 />
          </button>
        </form>
        <div className="div_img">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className=" m-2">
              {/* image count */}
              {images.length === 0 ? null : (
                <h6 className="Count">{images.length} images found</h6>
              )}

              {/* if error occurs display this line */}
              {/* {error === null ? null : (
                <h5 className="Count">There is an error</h5>
              )} */}
              {images.map((image) => (
                <>
                  <img
                    className="p-2 img_p"
                    key={image.id}
                    src={image.urls.thumb}
                    alt={image.alt_description}
                  />
                </>
              ))}
              <div className="d-flex justify-content-center">
                <button className="search">Load More</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const stateToProps = (state) => ({
  loading: state.loading,
  images: state.images,
  error: state.error,
});

const dispatchToProps = (dispatch) => ({
  searchImgs: (query) => dispatch(searchImgs(query)),
});

export default connect(stateToProps, dispatchToProps)(ImageSearch);
