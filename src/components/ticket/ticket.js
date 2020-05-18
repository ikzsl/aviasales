import React from 'react';
import PropTypes from 'prop-types';

import uniqueId from 'lodash.uniqueid';

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
    <li key={uniqueId()}>
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
      <hr />
    </li>
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
