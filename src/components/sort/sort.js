import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label, Radio } from './style';

const Sort = (props) => {
  const { sortByPrice, onSortChange } = props;

  return (
    <Container>
      <Radio
        checked={sortByPrice}
        value="chipest"
        id="chipestChoice"
        name="sort"
        type="radio"
        onChange={(evt) => onSortChange(evt)}
      />
      <Label htmlFor="chipestChoice">Самый дешевый</Label>
      <Radio
        value="fastest"
        id="fastestChoice"
        name="sort"
        type="radio"
        onChange={(evt) => onSortChange(evt)}
      />
      <Label htmlFor="fastestChoice">Самый быстрый</Label>
    </Container>
  );
};

Sort.propTypes = {
  sortByPrice: PropTypes.bool.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default Sort;
