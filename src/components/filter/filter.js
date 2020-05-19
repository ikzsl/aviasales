import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
background-color: #ffffff;
max-width: 230px;
border-radius: 5px;
`;

const Header = styled.h2`
text-transform: uppercase;
margin: 0;
padding: 20px;
font-weight: 600;
font-size: 12px;
line-height: 12px;
letter-spacing: 0.5px;
color: #4a4a4a;
`;


const List = styled.ul`
padding: 0;
margin: 0;
background-color: #ffffff;
max-width: 230px;
border-radius: 5px;
list-style: none;
`;

const Item = styled.li`
padding: 10px;

&:hover {
    cursor: pointer;
    background-color: #F1FCFF;
}
`;

const Label = styled.label`
display: block;
&:hover {
    cursor: pointer;
    

}
`;

const Filter = (props) => {
  const {
    allStops,
    onFilterCheck,
  } = props;

  return (
    <Container>

      <Header>Количество пересадок</Header>


      <List>
        <Item>
          <Label htmlFor="allStops">
            <input type="checkbox" checked={allStops} id="allStops" onChange={(evt) => onFilterCheck(evt, 'allStops')} />
            all
          </Label>
        </Item>

        <Item>
          <Label htmlFor="noStops">
            <input type="checkbox" id="noStops" onChange={(evt) => onFilterCheck(evt, 'noStops')} />
            noStops
          </Label>
        </Item>

        <Item>
          <Label htmlFor="oneStop">
            <input type="checkbox" id="oneStop" onChange={(evt) => onFilterCheck(evt, 'oneStop')} />
            1stop
          </Label>
        </Item>

        <Item>
          <Label htmlFor="twoStops">
            <input type="checkbox" id="twoStops" onChange={(evt) => onFilterCheck(evt, 'twoStops')} />
            2stops
          </Label>
        </Item>

        <Item>
          <Label htmlFor="threeStops">
            <input type="checkbox" id="threeStops" onChange={(evt) => onFilterCheck(evt, 'threeStops')} />
            3stops
          </Label>
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
