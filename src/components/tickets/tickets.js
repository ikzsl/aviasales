import React from 'react';
import uniqueId from 'lodash.uniqueid';

import Filter from '../filter/filter';
import Sort from '../sort/sort';
import Ticket from '../ticket/ticket';

import { cutArray } from '../../utils/utils';
import { getSearchId, getData } from '../../data/data';

import {
  Wrapper, Container, List, Loading, LoadingInner,
} from './style';

class Tickets extends React.Component {
  state = {
    filtered: [],
    noStops: true,
    oneStop: true,
    twoStops: true,
    threeStops: true,
    allStops: true,
    stops: {
      noStops: true,
      oneStop: true,
      twoStops: true,
      threeStops: true,
      allStops: true,
    },
  };

  componentDidMount() {
    this.onPageLoad();
  }

  onPageLoad = async () => {
    const searchId = await getSearchId();
    await this.onTicketsLoad(searchId);
  };

  onTicketsLoad = async (searchId) => {
    const { filtered } = this.state;
    let stop;
    try {
      const response = await getData(searchId);

      const ticketsById = response.data.tickets.map((ticket) => ({ ...ticket, id: uniqueId() }));
      stop = response.data.stop;
      this.setState({
        filtered: [...filtered, ...ticketsById],
      });

      if (!stop) {
        await this.onTicketsLoad(searchId);
      } else {
        this.setState({
          loading: false,
        });
      }
    } catch (error) {
      if (!stop) {
        await this.onTicketsLoad(searchId);
      }
    }
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
    if (stops === 'allStops') {
      this.setState((prevState) => ({
        noStops: !prevState.allStops,
        oneStop: !prevState.allStops,
        twoStops: !prevState.allStops,
        threeStops: !prevState.allStops,
        allStops: !prevState.allStops,
      }));
    } else {
      this.setState((prevState) => ({
        [stops]: !prevState[stops],
      }));

      const { state } = this;

      const {
        noStops, oneStop, twoStops, threeStops,
      } = state;

      const previousCheckBoxesStatus = {
        noStops,
        oneStop,
        twoStops,
        threeStops,
      };
      const currentCheckBoxesStatus = {
        ...previousCheckBoxesStatus,
        [stops]: !state[stops],
      };

      const predicateAllChecked = !Object.values(currentCheckBoxesStatus).includes(false);

      if (predicateAllChecked) {
        this.setState({
          allStops: true,
        });
      } else {
        this.setState({
          allStops: false,
        });
      }
    }

    // this.setState((prevState) => ({
    //   [stops]: !prevState[stops],
    //   allStops: (noStops && oneStop && twoStops && threeStops),
    // }));
  };

  render() {
    const {
      noStops, oneStop, twoStops, threeStops, allStops, filtered, sortByPrice,
    } = this.state;

    const checkedStops = [noStops, oneStop, twoStops, threeStops];
    const ticketsFiltered = filtered.filter((ticket) => {
      const { stops } = ticket.segments[0];
      return checkedStops[stops.length];
    });

    const ticketsFilteredCutted = cutArray(ticketsFiltered, 5);

    const ticketsList = ticketsFilteredCutted.map((ticket) => (
      <Ticket
        key={ticket.id}
        price={ticket.price}
        carrier={ticket.carrier}
        segments={ticket.segments}
      />
    ));

    return (
      <Wrapper>
        <Filter
          allStops={allStops}
          noStops={noStops}
          oneStop={oneStop}
          twoStops={twoStops}
          threeStops={threeStops}
          onFilterCheck={this.onFilterCheck}
        />

        <Container>
          <Sort sortByPrice={sortByPrice} onSortChange={this.onSortChange} />
          <List>{ticketsList}</List>
        </Container>
        {filtered.length === 0 ? (
          <Loading>
            <LoadingInner />
          </Loading>
        ) : null}
      </Wrapper>
    );
  }
}

export default Tickets;
