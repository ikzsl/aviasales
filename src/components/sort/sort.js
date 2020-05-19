import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
display: flex;
background-color: #ffffff;
border-radius: 5px;
overflow: hidden;
border: 1px solid #DFE5EC;
`;


const Label = styled.label`
width: 50%;
display: block;
position: relative;
padding: 10px 0;
color: #4a4a4a;
font-weight: 600;
font-size: 12px;
line-height: 20px;
letter-spacing: 0.5px;
text-align: center;
text-transform: uppercase;
transition: all 0.3s ease;




&:hover {
    cursor: pointer;  
}

`;

const Radio = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0 0 0 0);

  &:checked + ${Label} {
    background-color: #2196F3;
    color: #ffffff;
  }
`;

const Sort = (props) => {
  const {
    sortByPrice,
    onSortChange,
  } = props;

  return (
    <Container>

      <Radio
        checked={sortByPrice}
        value="chipest"
        id="chipestChoice"
        name="sort"
        type="radio"
        onChange={(evt) => onSortChange(evt)}
      />
      <Label htmlFor="chipestChoice">Самый дешевый</Label>


      <Radio
        value="fastest"
        id="fastestChoice"
        name="sort"
        type="radio"
        onChange={(evt) => onSortChange(evt)}
      />
      <Label htmlFor="fastestChoice">Самый быстрый</Label>
    </Container>
  );
};


Sort.propTypes = {
  sortByPrice: PropTypes.bool.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default Sort;
