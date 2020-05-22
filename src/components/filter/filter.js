import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Header, List, Item, Label, Checkbox,
} from './style';

const Filter = (props) => {
  const {
    allStops, noStops, oneStop, twoStops, threeStops, onFilterCheck,
  } = props;

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
        {item('noStops', 'Без пересадок', noStops)}
        {item('oneStop', '1 пересадка', oneStop)}
        {item('twoStops', '2 пересадки', twoStops)}
        {item('threeStops', '3 пересадки', threeStops)}
      </List>
    </Container>
  );
};

Filter.propTypes = {
  allStops: PropTypes.bool.isRequired,
  noStops: PropTypes.bool.isRequired,
  oneStop: PropTypes.bool.isRequired,
  twoStops: PropTypes.bool.isRequired,
  threeStops: PropTypes.bool.isRequired,
  onFilterCheck: PropTypes.func.isRequired,
};

export default Filter;
