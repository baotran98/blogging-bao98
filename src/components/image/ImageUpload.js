import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ImageUpload = (props) => {
  const {
    name,
    className = "",
    progress = 0,
    image = "",
    handleDelImage = () => {},
    ...rest
  } = props;

  return (
    <label
      className={`cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full min-h-[200px] rounded-lg relative shadow-md overflow-hidden ${className} group`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={() => {}}
        {...rest}
      />
      {!image && progress !== 0 && (
        <div className="absolute z-10 w-16 h-16 border-8 border-green-500 rounded-full loading border-t-transparent animate-spin"></div>
      )}
      {!image && progress === 0 && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img
            className="max-w-[80px] mb-5"
            src="/images/img-upload.png"
            alt="upload-img"
          />
          <p className="font-semibold">Choose photos</p>
        </div>
      )}
      {image && (
        <Fragment>
          <img className="object-cover w-full h-full" src={image} alt="" />
          <div className="absolute z-10 flex items-center justify-center invisible w-full h-full transition-all duration-300 ease-in-out bg-black opacity-0 bg-opacity-30 group-hover:opacity-100 group-hover:visible">
            <button
              type="button"
              className="absolute z-10 flex items-center justify-center w-16 h-16 text-red-600 bg-white rounded-full cursor-pointer bg-opacity-80 "
              onClick={handleDelImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </Fragment>
      )}
      {!image && (
        <div
          className="absolute bottom-0 left-0 w-0 h-1 transition-all bg-green-500 image-upload-progress"
          style={{
            width: `${Math.ceil(progress)}%`, // Math.ceil => làm tròn lên
          }}
        ></div>
      )}
    </label>
  );
};

ImageUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  progress: PropTypes.number,
  image: PropTypes.string,
  handleDelImage: PropTypes.func,
};

export default ImageUpload;