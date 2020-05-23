import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label, Radio } from './style';

const Sort = (props) => {
  const { onSortChange } = props;

  const SortButton = (value, id, label) => (
    <>
      <Radio value={value} id={id} name="sort" type="radio" onChange={(evt) => onSortChange(evt)} />
      <Label htmlFor={id}>{label}</Label>
    </>
  );

  return (
    <Container>
      {SortButton('chipest', 'chipestChoice', 'Самый дешевый')}
      {SortButton('fastest', 'fastestChoice', 'Самый быстрый')}
    </Container>
  );
};

Sort.propTypes = {
  onSortChange: PropTypes.func.isRequired,
};

export default Sort;
