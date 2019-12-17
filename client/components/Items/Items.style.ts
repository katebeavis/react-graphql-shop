import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
`;

export const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme};
  margin: 0 auto;
`;
