## Computational Inefficiencies and Anti-Patterns

1. Improper Use of useMemo:

- The memoization dependencies include both `balances` and `prices`, but `prices` are not used inside the memoized function. This can cause unnecessary calculate when `prices` change.

2. Inefficient Filtering and Sorting:

- It checks the priority and amount conditions for each balance, which could be optimized by combining conditions or improving the filtering process.

3. Incorrect Filtering Logic:

- The filtering logic inside useMemo has an issue where it checks `lhsPriority` > -99, but `lhsPriority` is never defined inside the filter method. This could lead to incorrect filtering behavior.

4. Logic getPriority:

- The getPriority function is called multiple times for the same balance object during sorting. This is inefficient as the priority should only be calculated once per balance.
- The logic of `getPriority` is simple: it returns a value based on the blockchain type. This could be optimized and made cleaner by using a configuration map object.

5. Wrong logic when calculate `rows`:

- The code first maps over `sortedBalances` to create `formattedBalances`, then maps over `sortedBalances` again to create `rows`. `rows` must use the `FormattedWalletBalance` type because the map logic uses the `formatted` property.

## Explanation of Improvements

1. Proper Use of useMemo:

- The dependencies of useMemo now only include `balances` since `prices` are not used for sorting or filtering.

2. Efficient Filtering and Sorting:

- Combined the filtering and sorting processes for better performance.
- The filter now correctly checks conditions with simplified logic.

3. Correct Filtering Logic:

- Fixed the filtering logic to properly define and use conditions inside useMemo.

4. Logic getPriority:

- Calculate priority once per balance during sorting to avoid redundant computations.
- Used a configuration map object.

5. Type Consistency:

- Ensured type consistency by using the correct types across the entire component.
