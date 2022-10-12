// hooks
import { useAppDispatch, useAppSelector } from "./reduxHooks";
// Types
import { BitcoinData } from "./bitcoinTypes";
// Styles
import { Wrapper } from "./App.styles";
import { changeCurrency } from "./features/appSlice";
import { useGetBitcoinDataQuery } from "./services/app";

const getBCData = async (): Promise<BitcoinData> =>
  await (await fetch("https://blockchain.info/ticker")).json();

const App = () => {
  const { currency } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const { bitcoinData, isLoading, isError } = useGetBitcoinDataQuery(
    undefined,
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        bitcoinData: data,
        isLoading,
        isError,
      }),
      // how often should data be fetched
      pollingInterval: 5000,
    }
  );

  const handleCurrencySelection = (e: any) =>
    dispatch(changeCurrency(e.currentTarget.value));

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Something went horrible wrong ...</div>;

  return (
    <Wrapper>
      <>
        <h2>Bitcoin Price</h2>
        <select value={currency} onChange={handleCurrencySelection}>
          {bitcoinData &&
            Object.keys(bitcoinData).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>
        <div>
          <h2>
            {bitcoinData && bitcoinData[currency].symbol}
            {bitcoinData && bitcoinData[currency].last}
          </h2>
        </div>
      </>
    </Wrapper>
  );
};

export default App;
