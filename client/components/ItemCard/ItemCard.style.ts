import styled from 'styled-components';

export const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  transform: skew(-5deg) rotate(-1deg);
  margin-top: -3rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: ${props => props.theme.red};
    display: inline;
    line-height: 1.3;
    font-size: 4rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
  }
`;

export const Item = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.boxShadow};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
`;

export const PriceTag = styled.span`
  background: ${props => props.theme.red};
  transform: rotate(3deg);
  color: white;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  position: absolute;
  top: -3px;
  right: -3px;
`;

export const ButtonList = styled.div`
  display: grid;
  width: 100%;
  border-top: 1px solid ${props => props.theme.lightGrey};
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 1px;
  background: ${props => props.theme.lightGrey};
  & > * {
    background: white;
    border: 0;
    font-size: 1rem;
    padding: 1rem;
  }
`;
