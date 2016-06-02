import React, { PropTypes } from 'react';

const SearchResults = (props) =>
  <div>
    {props.results.length > 1 ? <p>{props.results.length} results</p> : null}
    <ul>
      {props.results.map((result, index) =>
        <li
          key={result.id}
          onClick={() => props.onClick(result.id, index)}
        >
          Name: {result.name}<br />
          Language: {result.original_language}<br />
          Type: {result.media_type}<br />
          Year: {result.date}<br />
        </li>
      )}
    </ul>
  </div>;

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchResults;
