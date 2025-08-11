// Recursive JavaScript function to calculate the factorial of a number.
function factorial(x, result = 1) {
  // Base case: factorial of 0 or 1 is 1.
  if (x === 0 || x === 1) {
    return result;
  }
  return factorial(x - 1, x * result);
}
console.log(factorial(5));