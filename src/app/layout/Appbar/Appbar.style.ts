import styled from "styled-components";

const containerHeight = '89px';

export const AppbarContainer = styled.div`
  height: ${containerHeight};
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.123061);
  background: linear-gradient(0deg, #00CA9D 0%, #40FFD4 100%);
`;

export const AppbarDefault = styled.div`
  height: inherit;
  box-sizing: border-box;
  display: flex;
`;

export const LogoContainer = styled.div`
  width: ${containerHeight};
  height: inherit;
  margin-right: auto;
  cursor: pointer;
  > svg {
    height: inherit;
  }
`;
