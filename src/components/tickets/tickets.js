import React from 'react';
import axios from 'axios';
import uniqueId from 'lodash.uniqueid';

import Ticket from '../ticket/ticket';


import { cutArray } from '../../utils/utils';


class Timer extends React.Component {
  state = {
    searchId: '',
    tickets: [],
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
    const { searchId, stop, tickets } = this.state;
    axios
      .get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
      .then((response) => {
        this.setState({
          tickets: [...tickets, ...response.data.tickets],
          filtered: [...tickets, ...response.data.tickets],
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
    // filtered.sort((first, second) => first.price - second.price);
    this.setState((prevState) => ({
      filtered: prevState.filtered
        .sort((first, second) => first.price - second.price),
    }));
  }


  onNoStopsCheck = (evt) => {
    this.setState({
      noStops: evt.target.checked,
    });
  }

  onOneStopCheck = (evt) => {
    this.setState({
      oneStop: evt.target.checked,
    });
  }

  onTwoStopsCheck = (evt) => {
    this.setState({
      twoStops: evt.target.checked,
    });
  }

  onThreeStopsCheck = (evt) => {
    this.setState({
      threeStops: evt.target.checked,
    });
  }

  onAllStopsCheck = (evt) => {
    this.setState({
      allStops: evt.target.checked,
    });
  }


  render() {
    const {
      noStops, oneStop, twoStops, threeStops, allStops, filtered,
    } = this.state;

    const ticketsFiltered = filtered
      .filter((ticket) => allStops
      || (threeStops === true && ticket.segments[0].stops.length === 3)
      || (twoStops === true && ticket.segments[0].stops.length === 2)
      || (oneStop === true && ticket.segments[0].stops.length === 1)
      || (noStops === true && ticket.segments[0].stops.length === 0));

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


      <div className="timer-container">

        <label htmlFor="allStops">
          all
          <input type="checkbox" checked={allStops} id="allStops" onClick={this.onAllStopsCheck} />
        </label>

        <label htmlFor="noStops">
          noStops
          <input type="checkbox" id="noStops" onClick={this.onNoStopsCheck} />
        </label>

        <label htmlFor="oneStop">
          1stop
          <input type="checkbox" id="oneStop" onClick={this.onOneStopCheck} />
        </label>

        <label htmlFor="twoStops">
          2stops
          <input type="checkbox" id="twoStops" onClick={this.onTwoStopsCheck} />
        </label>

        <label htmlFor="threeStops">
          3stops
          <input type="checkbox" id="threeStops" onClick={this.onThreeStopsCheck} />
        </label>

        <div className="display">
          <span>{}</span>
        </div>
        <button type="button" onClick={this.onSortByFastest}>
          SortByFastest
        </button>
        <button type="button" onClick={this.onSortByChipest}>
          SortByChipest
        </button>


        <ul>
          {ticketsList}
        </ul>
      </div>
    );
  }
}

export default Timer;
