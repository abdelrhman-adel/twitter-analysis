import React from 'react';
import PropTypes from 'prop-types';
import './Block.css';

/**
 *
 * @param title - block title
 * @param isLoading - determines if the block should be in loading state
 * @param hasError - determines if the block should be in error state
 * @param errorHandler = the function to run when clicking retry
 * @param children - nodeList
 * @return {*}
 * @constructor
 */
const Block = ({ title, isLoading, hasError, errorHandler, children }) => (
  <div className="block">
    <h3 className="block__title">{title}</h3>
    <div className="block__content"> {children}</div>

    {isLoading && (
      <div className="block__overlay">
        <span className="block__overlay-text">Loading ... </span>
      </div>
    )}

    {hasError && (
      <div
        className="block__overlay block__overlay--has-error"
        onClick={errorHandler}
      >
        <span className="block__overlay-text block__overlay-text--has-error">
          an error occured,
          <br />
          please change search params
          <br />
          or click here to try again
        </span>
      </div>
    )}
  </div>
);

Block.propTypes = {
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  errorHandler: PropTypes.function.isRequired,
};
export default Block;
