import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import uniqueId from 'lodash.uniqueid';
import { lightFormat, addMinutes } from 'date-fns';

const Header = styled.div`
display: flex;
justify-content: space-between;
`;


const Price = styled.span`
font-weight: 600;
font-size: 24px;
line-height: 30px;
color: #2196F3;
width: 50%;
text-align: left;
margin-bottom: 25px;
`;

const CarrierLogo = styled.div`
text-align: left;
width: 30%;
`;

const Item = styled.li`
padding: 20px;
background-color: #ffffff;
border-radius: 5px;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
margin-bottom: 20px;
`;

const Segment = styled.ul`
list-style: none;
padding: 0;
display: flex;
justify-content: space-between;
`;

const Column = styled.li`
display: flex;
flex-direction: column;
width: 30%;
`;

const ColumnHeader = styled.span`
font-weight: 600;
font-size: 12px;
line-height: 18px;
color: #A0B0B9;
text-align: left;
text-transform: uppercase;
`;

const ColumnData = styled.span`
font-weight: 600;
font-size: 14px;
line-height: 21px;
color: #4A4A4A;
margin-bottom: 10px;
text-align: left;

`;

const Ticket = (props) => {
  const {
    price,
    carrier,
    segments,
  } = props;

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
    <Segment key={uniqueId()}>
      <Column>
        <ColumnHeader>
          {arr[0].origin}
          {' '}
          -
          {' '}
          {arr[1].origin}
        </ColumnHeader>
        <ColumnData>
          {lightFormat(new Date(segment.date), 'HH:mm')}
          {' '}
          –
          {' '}
          {lightFormat(addMinutes(new Date(segment.date), segment.duration), 'HH:mm') }
        </ColumnData>
      </Column>
      <Column>
        <ColumnHeader>
          В пути
        </ColumnHeader>
        <ColumnData>
          {Math.floor(segment.duration / 60)}
          {'ч '}
          {segment.duration % 60}
          {'м'}


        </ColumnData>
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
    <Item key={uniqueId()}>
      <Header>
        <Price>
          {`${price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} Р`}
        </Price>
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


  segments: PropTypes.array.isRequired,

};

export default Ticket;
