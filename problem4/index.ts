/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 * Efficiency: straightforward and easy to understand but performance is poor for large n
 */
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 * Efficiency: easy to understand but when n is large, it could lead to high memory usage and potential stack overflow
 */
function sum_to_n_c(n: number): number {
  if (n <= 1) {
    return n;
  }
  return n + sum_to_n_c(n - 1);
}

/**
 * Time complexity: O(1)
 * Space complexity: O(1)
 * Efficiency: use mathematical formula, this approach is the most efficient in both time and space
 */
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}
