import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBasket } from '../../store/user/basket/basket';
import { snackBarActions } from '../../store/snackBar';
import Button from '../../UI/Button';
import { Loading } from '../../UI/loading/Loading';
import ModalItem from './ModalItem';
import { Container, List, styled } from '@mui/material';
import { Modal as MuiModal } from '@mui/material';
import {} from '@mui/material';
import { modalActions } from '../../store/user/modal';
const TOTAL_PRICE = 'TOTAL_PRICE';
const MODAL_TRUE = 'MODAL_TRUE';
const MODAL_FALSE = 'MODAL_FALSE';
const stateReducer = (state, action) => {
  if (action.type === TOTAL_PRICE) {
    return {
      ...state,
      totalPrice: action.payload,
    };
  }
  if (action.type === MODAL_TRUE) {
    return {
      ...state,
      modalSize: true,
    };
  }
  if (action.type === MODAL_FALSE) {
    return {
      ...state,
      modalSize: false,
    };
  }
};

const Modal = ({ onClick }) => {
  const { items, isLoading } = useSelector((state) => state.basket);
  const { open } = useSelector((state) => state.modal);
  const [state, dispatchState] = useReducer(stateReducer, {
    totalPrice: 0,
    modalSize: false,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBasket())
      .unwrap()
      .then(() => {
        dispatch(
          snackBarActions.successHandler('Successfully received basket')
        );
      })
      .catch((error) => {
        dispatch(snackBarActions.errorHandler(error));
      });
  }, []);
  useEffect(() => {
    if (items?.length > 0) {
      dispatchState({ type: MODAL_TRUE });
    }
    let priceSum = 0;
    items.forEach((el) => {
      const price = el.price * el.amount;
      priceSum += price;
    });
    if (priceSum === 0) {
      dispatchState({ type: MODAL_FALSE });
    }
    dispatchState({ type: TOTAL_PRICE, payload: Math.floor(priceSum) });
  }, [items]);
  return (
    <MuiModal
      open={open}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StyledContainer contextLength={items.length}>
        {isLoading ? null : <Loading />}
        {state.modalSize && (
          <UnorderedList contextLength={items.length}>
            {items?.map((el) => {
              return (
                <ModalItem
                  key={el._id}
                  id={el._id}
                  title={el.title}
                  price={el.price}
                  amount={el.amount}
                ></ModalItem>
              );
            })}
          </UnorderedList>
        )}
        <div>
          <TotalPrice>
            <h3>Total Price</h3>
            <p>${state.totalPrice}</p>
          </TotalPrice>
          <ButtonContainer>
            <Button
              onClick={() => dispatch(modalActions.toggleModalHandler())}
              circle={true}
              buttonState={false}
              colorState={true}
              borderState={true}
            >
              Close
            </Button>
            {state.modalSize && (
              <Button
                circle={true}
                marginLeft="16px"
                buttonState={false}
                colorState={false}
                borderState={false}
              >
                Order
              </Button>
            )}
          </ButtonContainer>
        </div>
      </StyledContainer>
    </MuiModal>
  );
};
export default Modal;
const UnorderedList = styled(List)(({ contextLength }) => ({
  padding: 0,
  overflowY: (() => {
    switch (contextLength) {
      case 0:
        return 'none';
      case 1:
        return 'none';
      case 2:
        return 'none';
      default:
        return 'scroll';
    }
  })(),
  display: ({ state }) => (state ? 'none' : 'block'),
  margin: 0,
  height: (() => {
    switch (contextLength) {
      case 0:
        return 'none';
      case 1:
        return '166px';
      case 2:
        return '266px';
      default:
        return '266px';
    }
  })(),
}));
const StyledContainer = styled(Container)(({ contextLength }) => ({
  padding: '0 !important',
  padding: '32px',
  width: '671px',
  height: (() => {
    switch (contextLength) {
      case 0:
        return '165px';
      case 1:
        return '300px';
      case 2:
        return '431px';
      default:
        return '431px';
    }
  })(),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#ffffff',
  borderRadius: '20px',
}));
const TotalPrice = styled(Container)(() => ({
  padding: ' 0 !important',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '24px',
  width: '607px',
  h3: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    lineHeight: '30px',
    margin: 0,
    color: '#222222',
  },
  p: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '33px',
    color: '#8a2b06',
    margin: 0,
  },
}));
const ButtonContainer = styled(Container)(() => ({
  padding: ' 0 !important',
  display: 'flex',
  justifyContent: 'flex-end',
}));
