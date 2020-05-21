import React from 'react';
import uniqueId from 'lodash.uniqueid';

import Filter from '../filter/filter';
import Sort from '../sort/sort';
import Ticket from '../ticket/ticket';

import cutArray from '../../utils/utils';
import { getSearchId, getData } from '../../data/data';

import {
  Wrapper, Container, List, Loading, LoadingInner,
} from './style';

class Tickets extends React.Component {
  state = {
    searchId: '',
    sortByPrice: true,
    stop: false,
    filtered: [],
    noStops: false,
    oneStop: false,
    twoStops: false,
    threeStops: false,
    allStops: true,
  };

  async componentDidMount() {
    this.setState({
      searchId: await getSearchId(),
    });
    this.onTicketsLoad();
  }

  onTicketsLoad = () => {
    const { searchId, stop, filtered } = this.state;

    getData(searchId)
      .then((response) => {
        this.setState({
          filtered: [...filtered, ...response.data.tickets],
          stop: response.data.stop,
        });

        if (!stop) {
          this.setState((prevState) => ({
            filtered: prevState.filtered.sort((first, second) => first.price - second.price),
          }));
          this.onTicketsLoad();
        }
      })
      .catch(() => {
        // console.log('error', error);
        if (!stop) {
          this.onTicketsLoad();
        }
      });
  };

  onSortChange = (evt) => {
    if (evt.target.value === 'fastest') {
      this.setState((prevState) => ({
        sortByPrice: false,
        filtered: prevState.filtered.sort(
          (first, second) => first.segments[0].duration
            + first.segments[1].duration
            - (second.segments[0].duration + second.segments[1].duration),
        ),
      }));
    } else {
      this.setState((prevState) => ({
        sortByPrice: true,
        filtered: prevState.filtered.sort((first, second) => first.price - second.price),
      }));
    }
  };

  onFilterCheck = (evt, stops) => {
    this.setState({
      [stops]: evt.target.checked,
    });
  };

  render() {
    const {
      noStops,
      oneStop,
      twoStops,
      threeStops,
      allStops,
      filtered,
      sortByPrice,
      stop,
    } = this.state;

    const ticketsFiltered = filtered.filter((ticket) => {
      const { stops } = ticket.segments[0];
      return (
        allStops
        || (threeStops && stops.length === 3)
        || (twoStops && stops.length === 2)
        || (oneStop && stops.length === 1)
        || (noStops && stops.length === 0)
      );
    });

    const ticketsFilteredCutted = cutArray(ticketsFiltered, 5);

    const ticketsList = ticketsFilteredCutted.map((ticket) => (
      <Ticket
        key={uniqueId()}
        price={ticket.price}
        carrier={ticket.carrier}
        segments={ticket.segments}
      />
    ));

    return (
      <Wrapper>
        <Filter allStops={allStops} onFilterCheck={this.onFilterCheck} />

        <Container>
          <Sort sortByPrice={sortByPrice} onSortChange={this.onSortChange} />
          <List>{ticketsList}</List>
        </Container>
        {stop ? null : (
          <Loading>
            <LoadingInner />
          </Loading>
        )}
      </Wrapper>
    );
  }
}

export default Tickets;
