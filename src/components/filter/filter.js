import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Header, List, Item, Label, Checkbox,
} from './style';

const Filter = (props) => {
  const { allStops, onFilterCheck } = props;

  return (
    <Container>
      <Header>Количество пересадок</Header>

      <List>
        <Item>
          <Checkbox
            type="checkbox"
            checked={allStops}
            id="allStops"
            onChange={(evt) => onFilterCheck(evt, 'allStops')}
          />
          <Label htmlFor="allStops">Все</Label>
        </Item>

        <Item>
          <Checkbox
            type="checkbox"
            id="noStops"
            onChange={(evt) => onFilterCheck(evt, 'noStops')}
          />
          <Label htmlFor="noStops">Без пересадок</Label>
        </Item>

        <Item>
          <Checkbox
            type="checkbox"
            id="oneStop"
            onChange={(evt) => onFilterCheck(evt, 'oneStop')}
          />
          <Label htmlFor="oneStop">1 пересадка</Label>
        </Item>

        <Item>
          <Checkbox
            type="checkbox"
            id="twoStops"
            onChange={(evt) => onFilterCheck(evt, 'twoStops')}
          />
          <Label htmlFor="twoStops">2 пересадки</Label>
        </Item>

        <Item>
          <Checkbox
            type="checkbox"
            id="threeStops"
            onChange={(evt) => onFilterCheck(evt, 'threeStops')}
          />
          <Label htmlFor="threeStops">3 пересадки</Label>
        </Item>
      </List>
    </Container>
  );
};

Filter.propTypes = {
  allStops: PropTypes.bool.isRequired,
  onFilterCheck: PropTypes.func.isRequired,
};

export default Filter;
