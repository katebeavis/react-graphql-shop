import styled from "styled-components";

import { LARGE } from "../../constants/breakpoints";

export const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.red};
    color: white;
    transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: ${LARGE}) {
    margin: 0;
    text-align: center;
  }
`;

export const Bar = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  border-bottom: 10px solid ${props => props.theme.black};
  justify-content: space-between;
  align-items: stetch;
  @media (max-width: ${LARGE}) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

export const SubBar = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  border-bottom: 1px solid ${props => props.theme.lightGrey};
`;
