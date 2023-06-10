import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import { SnackBar } from "./components/UI/modal/SnackBar"
import { snackBarActions } from './components/store/snackBar';
function App() {
  const snackBar = useSelector((state) => state.snackBar);
  const dispatch = useDispatch()
  function closeHandler() {
    dispatch(snackBarActions.closeHandler());
  }
  return (
    <div className="App">
      <SnackBar
        open={snackBar.open}
        handleClose={closeHandler}
        severity={snackBar.saverity}
      >
        {snackBar.message}
      </SnackBar>
      <MainRoutes />
    </div>
  );
}

export default App;
