import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, styled, TextField } from '@mui/material';
import { Modal as MuiModal } from '@mui/material';
import {} from '@mui/material';
import Button from '../../UI/Button';
import { Loading } from '../../UI/loading/Loading';
import { snackBarActions } from '../../store/snackBar';
import { foodsActions } from '../../store/admin/foods/foodsSlice';
import { updateFood } from '../../store/admin/foods/foodsThunk';

const FoodsModal = () => {
  const dispatch = useDispatch();
  const { open, title, description, price, isLoading, id } = useSelector(
    (state) => state.foods
  );
  function getTitleValue(e) {
    dispatch(foodsActions.getTitleValue(e.target.value));
  }
  function getDescriptionValue(e) {
    dispatch(foodsActions.getDescriptionValue(e.target.value));
  }
  function getPriceValue(e) {
    dispatch(foodsActions.getPriceValue(e.target.value));
  }
  function closeModal() {
    dispatch(foodsActions.toggleModalHandler());
  }
  async function submitHandler(e) {
    try {
      e.preventDefault();
      const data = {
        title,
        description,
        price: +price,
        };
        await dispatch(updateFood({data, id})).unwrap()
      dispatch(foodsActions.toggleModalHandler());
      dispatch(snackBarActions.successHandler('Successfully updated'));
    } catch (error) {
      console.log(error);
      dispatch(snackBarActions.errorHandler(error));
    }
  }
  return (
    <MuiModal
      open={open}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Form onSubmit={submitHandler}>
        <div>
          <TextField
            sx={{
              width: '100%',
              marginBottom: '20px',
            }}
            id="outlined-basic"
            label="Title"
            value={title}
            onChange={getTitleValue}
            variant="outlined"
            type="text"
          />
          <TextField
            sx={{
              width: '100%',
              marginBottom: '20px',
            }}
            id="outlined-basic"
            label="Description"
            value={description}
            onChange={getDescriptionValue}
            variant="outlined"
            type="text"
          />
          <TextField
            sx={{
              width: '100%',
            }}
            id="outlined-basic"
            label="Price"
            value={price}
            onChange={getPriceValue}
            variant="outlined"
            type="number"
          />
        </div>
        <ButtonContainer>
          <Button
            circle={true}
            buttonState={false}
            colorState={true}
            borderState={true}
            onClick={closeModal}
          >
            Close
          </Button>
          <Button
            circle={true}
            marginLeft="16px"
            buttonState={false}
            colorState={false}
            borderState={false}
            onClick={submitHandler}
          >
            Update
          </Button>
        </ButtonContainer>
        {isLoading ? null : <Loading />}
      </Form>
    </MuiModal>
  );
};
export default FoodsModal;
const Form = styled(Box)(() => ({
  padding: '20px 20px 0px 20px',
  gap: '20px',
  width: '631px',
  height: '297px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#ffffff',
  borderRadius: '10px',
}));
const ButtonContainer = styled(Container)(() => ({
  padding: ' 0 !important',
  display: 'flex',
  justifyContent: 'flex-end',
}));
