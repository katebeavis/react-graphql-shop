import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Dot, AnimationStyles } from './CartCount.style';

interface CartCountProps {
  count: number;
}

const CartCount = ({ count }: CartCountProps) => {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          className='count'
          classNames='count'
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
};

export default CartCount;
