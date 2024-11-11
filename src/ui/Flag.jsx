import styled from "styled-components";

export const StyledFlag = styled.img`
  max-width: 2rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);
`;

function Flag(src) {
  return <StyledFlag src={src}></StyledFlag>;
}

export default Flag;
