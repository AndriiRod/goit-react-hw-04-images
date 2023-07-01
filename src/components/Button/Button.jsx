import { ButtonLM } from './Button.styled';

const LoadMoreBtn = ({ huddlerCLick }) => {
  return (
    <ButtonLM type="button" onClick={huddlerCLick}>
      Load more
    </ButtonLM>
  );
};

export default LoadMoreBtn;
