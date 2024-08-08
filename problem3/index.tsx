interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  priority: number;
  formatted: string;
}

const WALLET_PRIORITY = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedAndFormattedBalances = useMemo(() => {
    return balances
      .map((balance: WalletBalance) => ({
        ...balance,
        priority: WALLET_PRIORITY[balance.blockchain] ?? -99,
        formatted: balance.amount.toFixed(),
      }))
      .filter((balance) => balance.priority > -99 && balance.amount > 0)
      .sort((lhs, rhs) => rhs.priority - lhs.priority);
  }, [balances]);

  const rows = sortedAndFormattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index} // for dynamic balances, should use a unique key
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  // dose not have children to render
  return <div {...rest}>{rows}</div>;
};
