import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import uniqueId from 'lodash.uniqueid';


const Heading = styled.h1`
font-weight: 600;
font-size: 24px;
line-height: 24px;

display: flex;
align-items: center;
color: #2196F3;
`;

const Item = styled.li`
padding: 20px;
background-color: #ffffff;
border-radius: 5px;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
margin-bottom: 20px;
`;

const Ticket = (props) => {
  const {
    price,
    carrier,
    origin1,
    origin2,
    destination1,
    destination2,
    date1,
    date2,
    stops1,
    stops2,
    duration1,
    duration2,
  } = props;

  return (
    <Item key={uniqueId()}>
      <Heading>{price}</Heading>
      <img src={`//pics.avs.io/99/36/${carrier}.png`} alt={`${carrier}`} />
      <br />
      {price}
      <br />
      {carrier}
      <br />
      {origin1}
      -
      {destination1}
      -
      {date1}
      -
      {duration1}
      -
      {stops1.length}
      <br />
      {origin2}
      -
      {destination2}
      -
      {date2}
      -
      {duration2}
      -
      {stops2.length}
    </Item>
  );
};


Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,

  origin1: PropTypes.string.isRequired,
  origin2: PropTypes.string.isRequired,

  destination1: PropTypes.string.isRequired,
  destination2: PropTypes.string.isRequired,

  date1: PropTypes.string.isRequired,
  date2: PropTypes.string.isRequired,

  duration1: PropTypes.number.isRequired,
  duration2: PropTypes.number.isRequired,

  stops1: PropTypes.array.isRequired,
  stops2: PropTypes.array.isRequired,

};

export default Ticket;
