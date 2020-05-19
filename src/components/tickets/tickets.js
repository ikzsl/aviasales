import React from 'react';
import uniqueId from 'lodash.uniqueid';
import styled from 'styled-components';

import Filter from '../filter/filter';
import Sort from '../sort/sort';
import Ticket from '../ticket/ticket';

import { cutArray, getSearchId, getData } from '../../utils/utils';

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

const Loading = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0,0,0, 0.3);
`;

const LoadingInner = styled.div`  
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  border-radius: 50%;
  position: relative;
  animation: loader-2 0.9s 0.35s ease alternate infinite;
  margin: -20px auto 0;


&:after,
&:before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: loader-2 0.9s ease alternate infinite;
}

&:before {
  left: -20px;
  animation-delay: 0.2s;
}

&:after {
  right: -20px;
  animation-delay: 0.5s;
}

@keyframes loader-2 {
  0% {
    box-shadow: 0 15px 0 -15px #ffffff;
  }
  100% {
    box-shadow: 0 15px 0 #ffffff;
  }
}


`;


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
            filtered: prevState.filtered
              .sort((first, second) => first.price - second.price),
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
        filtered: prevState.filtered
          .sort((first, second) => (first.segments[0].duration + first.segments[1].duration)
        - (second.segments[0].duration + second.segments[1].duration)),
      }));
    } else {
      this.setState((prevState) => ({
        sortByPrice: true,
        filtered: prevState.filtered
          .sort((first, second) => first.price - second.price),
      }));
    }
  }


  onFilterCheck = (evt, stops) => {
    this.setState({
      [stops]: evt.target.checked,
    });
  }


  render() {
    const {
      noStops, oneStop, twoStops, threeStops, allStops, filtered, sortByPrice, stop,
    } = this.state;

    const ticketsFiltered = filtered
      .filter((ticket) => {
        const { stops } = ticket.segments[0];
        return allStops
      || (threeStops && stops.length === 3)
      || (twoStops && stops.length === 2)
      || (oneStop && stops.length === 1)
      || (noStops && stops.length === 0);
      });

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
          <Sort
            sortByPrice={sortByPrice}
            onSortChange={this.onSortChange}

          />
          <List>
            {ticketsList}
          </List>

        </Container>
        { stop ? null : <Loading><LoadingInner /></Loading>}
      </Wrapper>
    );
  }
}

export default Tickets;
