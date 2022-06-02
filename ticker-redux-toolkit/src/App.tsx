// Hooks
import { useAppSelector, useAppDispatch } from './reduxHooks';
import { useGetBitcoinDataQuery } from './services/app';
// actions
import { changeCurrency } from './features/appSlice';
// Styles
import { Wrapper } from './App.styles';

const INTERVAL_TIME = 5000; // ms

const App = () => {
  const { currency } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useGetBitcoinDataQuery(undefined, {
    pollingInterval: INTERVAL_TIME
  });

  const handleCurrencySelection = (e: any) => dispatch(changeCurrency(e.currentTarget.value));

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Something went horrible wrong ...</div>;

  return (
    <Wrapper>
      <>
        <h2>Bitcoin Price</h2>
        <select value={currency} onChange={handleCurrencySelection}>
          {data &&
            Object.keys(data).map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>
        <div>
          <h2>
            {data && data[currency].symbol}
            {data && data[currency].last}
          </h2>
        </div>
      </>
    </Wrapper>
  );
};

export default App;
