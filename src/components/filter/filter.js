import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Header, List, Item, Label, Checkbox,
} from './style';

const Filter = (props) => {
  const { allStops, onFilterCheck } = props;

  const item = (id, label, checked) => (
    <Item>
      <Checkbox
        type="checkbox"
        checked={checked}
        id={id}
        onChange={(evt) => onFilterCheck(evt, id)}
      />
      <Label htmlFor={id}>{label}</Label>
    </Item>
  );

  return (
    <Container>
      <Header>Количество пересадок</Header>
      <List>
        {item('allStops', 'Все', allStops)}
        {item('noStops', 'Без пересадок')}
        {item('oneStop', '1 пересадка')}
        {item('twoStops', '2 пересадки')}
        {item('threeStops', '3 пересадки')}
      </List>
    </Container>
  );
};

Filter.propTypes = {
  allStops: PropTypes.bool.isRequired,
  onFilterCheck: PropTypes.func.isRequired,
};

export default Filter;
