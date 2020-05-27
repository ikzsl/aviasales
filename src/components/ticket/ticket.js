import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice, formatDuration, formatInterval } from '../../utils/utils';

import {
  Header,
  Price,
  CarrierLogo,
  Item,
  Segment,
  Column,
  ColumnHeader,
  ColumnData,
} from './style';

const Ticket = (props) => {
  const {
    price, carrier, segments, id,
  } = props;

  // console.log(price, carrier, segments, id);

  const switchStops = (stops) => {
    switch (stops) {
      case 0:
        return 'Без пересадок';

      case 1:
        return ' Пересадка';

      default:
        return ' Пересадки';
    }
  };

  const segmentsList = segments.map((segment, idx, arr) => (
    <Segment key={`${id + idx}`}>
      <Column>
        <ColumnHeader>
          {arr[0].origin}
          {' '}
          -
          {arr[1].origin}
        </ColumnHeader>
        <ColumnData>{formatInterval(segment.date, segment.duration)}</ColumnData>
      </Column>
      <Column>
        <ColumnHeader>В пути</ColumnHeader>
        <ColumnData>{formatDuration(segment.duration)}</ColumnData>
      </Column>
      <Column>
        <ColumnHeader>
          {segment.stops.length === 0 ? null : segment.stops.length}
          {switchStops(segment.stops.length)}
        </ColumnHeader>
        <ColumnData>{segment.stops.join(', ')}</ColumnData>
      </Column>
    </Segment>
  ));

  return (
    <Item>
      <Header>
        <Price>{formatPrice(price)}</Price>
        <CarrierLogo>
          <img src={`//pics.avs.io/99/36/${carrier}.png`} alt={`${carrier}`} />
        </CarrierLogo>
      </Header>
      {segmentsList}
    </Item>
  );
};

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,

  // eslint-disable-next-line react/forbid-prop-types
  segments: PropTypes.array.isRequired,
};

export default Ticket;
