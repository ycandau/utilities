//------------------------------------------------------------------------------
// Numbers
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Prime numbers

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= num >> 1; i++) if (num % i === 0) return false;
  return true;
}

function binarySearchLeftmost(arr, val) {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    let mid = (left + right) >> 1;
    if (arr[mid] < val) left = mid + 1;
    else right = mid;
  }
  return left;
}

function binarySearchRightmost(arr, val) {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    let mid = (left + right) >> 1;
    if (arr[mid] <= val) left = mid + 1;
    else right = mid;
  }
  return right - 1;
}

function notDivisibleBy(num, primes, start) {
  for (let i = start; i < primes.length; i++) {
    const p = primes[i];
    if (num % p === 0) return false;
    else if (p * p > num) return true;
  }
}

function memoGetPrimes() {
  let max = 6;
  let wheel = [1, 5];
  const primes = [2, 3, 5];

  return (num) => {
    // Expand the cache if necessary
    while (max < num) {
      // Compute new wheel
      const next_prime = wheel[1];
      const new_wheel = [];
      for (let r = 0; r < max * next_prime; r += max) {
        for (const n of wheel) {
          if ((n + r) % next_prime !== 0) new_wheel.push(n + r);
        }
      }
      wheel = new_wheel;
      max *= next_prime;

      // Filter and store primes from new wheel
      const next_prime_sq = wheel[1] * wheel[1];
      const count = primes.length;
      for (let i = 1; i < wheel.length; i++) {
        if (wheel[i] < next_prime_sq || notDivisibleBy(wheel[i], primes, count))
          primes.push(wheel[i]);
      }
    }
    return primes.slice(0, binarySearchRightmost(primes, num) + 1);
  };
}

function memoGetPrime() {
  let max = 6;
  let wheel = [1, 5];
  const primes = [2, 3, 5];

  const notDivisibleBy = (num, primes, start) => {
    for (let i = start; i < primes.length; i++) {
      const p = primes[i];
      if (num % p === 0) return false;
      else if (p * p > num) return true;
    }
  };

  return (index) => {
    // Expand the cache if necessary
    while (index >= primes.length) {
      // Compute new wheel
      const next_prime = wheel[1];
      const new_wheel = [];
      for (let r = 0; r < max * next_prime; r += max) {
        for (const n of wheel) {
          if ((n + r) % next_prime !== 0) new_wheel.push(n + r);
        }
      }
      wheel = new_wheel;
      max *= next_prime;

      // Filter and store primes from new wheel
      const next_prime_sq = wheel[1] * wheel[1];
      const count = primes.length;
      for (let i = 1; i < wheel.length; i++) {
        if (wheel[i] < next_prime_sq || notDivisibleBy(wheel[i], primes, count))
          primes.push(wheel[i]);
      }
    }
    return primes[index];
  };
}

function primeFactors(num) {
  const getPrime = memoGetPrime();
  const factors = [];
  let i = 0;

  while (num !== 1) {
    const p = getPrime(i++);
    let power = 0;
    while (num % p === 0) {
      num /= p;
      power++;
    }
    if (power) factors.push([p, power]);
  }
  return factors;
}

function primeFactors_ShortButInefficient(num) {
  const factors = [];
  for (let i = 2; i <= num; i++) {
    let power = 0;
    while (num % i === 0) {
      num /= i;
      power++;
    }
    if (power) factors.push([i, power]);
  }
  return factors;
}
