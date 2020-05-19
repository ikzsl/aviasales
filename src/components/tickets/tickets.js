import React from 'react';
import axios from 'axios';
import uniqueId from 'lodash.uniqueid';
import styled from 'styled-components';

import Filter from '../filter/filter';


import Ticket from '../ticket/ticket';


import { cutArray } from '../../utils/utils';

const Wrapper = styled.div`
display: flex;
align-items: flex-start;
margin: 0 auto;
padding: 0 10px;
max-width: 730px;
`;

const Container = styled.div`
display: flex;
flex-direction: column;
flex-grow: 1;
padding: 0;
`;


const List = styled.ul`
padding: 0;
text-align: center;
list-style: none;
`;


class Tickets extends React.Component {
  state = {
    searchId: '',
    // tickets: [],
    stop: false,
    filtered: [],
    noStops: false,
    oneStop: false,
    twoStops: false,
    threeStops: false,
    allStops: true,
  };

  componentDidMount() {
    axios.get('https://front-test.beta.aviasales.ru/search').then((response) => {
      this.setState({
        searchId: response.data.searchId,
      });
      this.onTicketsLoad();
    });
  }

  onTicketsLoad = () => {
    const { searchId, stop } = this.state;
    axios
      .get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
      .then((response) => {
        this.setState({
          filtered: [...response.data.tickets],
          stop: response.data.stop,
        });
        if (!stop) {
          this.onTicketsLoad();
          this.onSortByChipest();
        }
      })
      .catch(() => {
        // console.log('error', error);
        if (!stop) {
          this.onTicketsLoad();
        }
      });
  };

  onSortByFastest = () => {
    this.setState((prevState) => ({
      filtered: prevState.filtered
        .sort((first, second) => (first.segments[0].duration + first.segments[1].duration)
      - (second.segments[0].duration + second.segments[1].duration)),
    }));
  }

  onSortByChipest = () => {
    this.setState((prevState) => ({
      filtered: prevState.filtered
        .sort((first, second) => first.price - second.price),
    }));
  }


  onFilterCheck = (evt, stops) => {
    this.setState({
      [stops]: evt.target.checked,
    });
  }


  render() {
    const {
      noStops, oneStop, twoStops, threeStops, allStops, filtered,
    } = this.state;

    const ticketsFiltered = filtered
      .filter((ticket) => allStops
      || (threeStops && ticket.segments[0].stops.length === 3)
      || (twoStops && ticket.segments[0].stops.length === 2)
      || (oneStop && ticket.segments[0].stops.length === 1)
      || (noStops && ticket.segments[0].stops.length === 0));

    const ticketsFilteredCutted = cutArray(ticketsFiltered, 5);


    const ticketsList = ticketsFilteredCutted.map((ticket) => (
      <Ticket
        key={uniqueId()}
        price={ticket.price}
        carrier={ticket.carrier}
        origin1={ticket.segments[0].origin}
        origin2={ticket.segments[1].origin}
        destination1={ticket.segments[0].destination}
        destination2={ticket.segments[1].destination}
        date1={ticket.segments[0].date}
        date2={ticket.segments[1].date}
        stops1={ticket.segments[0].stops}
        stops2={ticket.segments[1].stops}
        duration1={ticket.segments[0].duration}
        duration2={ticket.segments[1].duration}

      />
    ));

    return (
      <Wrapper>
        <Filter
          allStops={allStops}
          onFilterCheck={this.onFilterCheck}
        />

        <Container>

          <div>
            <button type="button" onClick={this.onSortByFastest}>
              SortByFastest
            </button>
            <button type="button" onClick={this.onSortByChipest}>
              SortByChipest
            </button>
          </div>

          <List>
            {ticketsList}
          </List>

        </Container>
      </Wrapper>
    );
  }
}

export default Tickets;
