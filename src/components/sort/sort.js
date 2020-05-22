import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label, Radio } from './style';

const Sort = (props) => {
  const { sortByPrice, onSortChange } = props;

  const SortButton = (value, id, label, checked) => (
    <>
      <Radio
        checked={checked}
        value={value}
        id={id}
        name="sort"
        type="radio"
        onChange={(evt) => onSortChange(evt)}
      />
      <Label htmlFor={id}>{label}</Label>
    </>
  );

  return (
    <Container>
      {SortButton('chipest', 'chipestChoice', 'Самый дешевый', sortByPrice)}
      {SortButton('fastest', 'fastestChoice', 'Самый быстрый')}
    </Container>
  );
};

Sort.propTypes = {
  sortByPrice: PropTypes.bool.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default Sort;
