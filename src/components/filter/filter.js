import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
background-color: #ffffff;
/* max-width: 230px; */
border-radius: 5px;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
margin-right: 20px;

@media (max-width: 768px) {  
width: 100%;
margin-bottom: 20px;
}

`;

const Header = styled.p`
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
padding-bottom: 10px;
background-color: #ffffff;
max-width: 230px;
border-radius: 5px;
list-style: none;
`;

const Item = styled.li`

`;

const Label = styled.label`
display: block;
position: relative;
padding: 10px 0;
padding-left: 50px;
font-size: 13px;
line-height: 20px;
color: #4a4a4a;
transition: all 0.3s ease;

&:hover {
    cursor: pointer;  
    background-color: #F1FCFF;
}

&::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    left: 20px;
    top: 10px;    
    border: 1px solid #9abbce;
    border-radius: 2px;
}
`;

const Checkbox = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0 0 0 0);

  &:checked + ${Label} {
    
    &::before {    
        border-color: #2196F3;
    }

    &::after {    
    content: '';
    position: absolute;
    width: 10px;
    height: 5px;
    left: 25px;
    top: 16px;
    border: 2px solid #2196F3;
    border-left: none;
    border-bottom: none;
    transform: rotate(135deg);
    }
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
          <Checkbox type="checkbox" checked={allStops} id="allStops" onChange={(evt) => onFilterCheck(evt, 'allStops')} />
          <Label htmlFor="allStops">Все</Label>
        </Item>

        <Item>
          <Checkbox type="checkbox" id="noStops" onChange={(evt) => onFilterCheck(evt, 'noStops')} />
          <Label htmlFor="noStops">Без пересадок</Label>
        </Item>

        <Item>
          <Checkbox type="checkbox" id="oneStop" onChange={(evt) => onFilterCheck(evt, 'oneStop')} />
          <Label htmlFor="oneStop">1 пересадка</Label>
        </Item>

        <Item>
          <Checkbox type="checkbox" id="twoStops" onChange={(evt) => onFilterCheck(evt, 'twoStops')} />
          <Label htmlFor="twoStops">2 пересадки</Label>
        </Item>

        <Item>
          <Checkbox type="checkbox" id="threeStops" onChange={(evt) => onFilterCheck(evt, 'threeStops')} />
          <Label htmlFor="threeStops">3 пересадки</Label>
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
