function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function toArray(obj) {
  return Array.isArray(obj) ? obj : [obj];
}

// Factory function and methods for object traversal.
// Uses a stack rather than recursion.

const _traverseProto = {
  _nextEntry() {
    [this.key, this.value] = this.entries.pop();
    this.path[this.path.length - 1] = this.key;
    this.actAfter = true;
  },

  _intoObject() {
    this.stack.push(this.entries);
    this.entries = Object.entries(this.value).reverse();
    [this.key, this.value] = this.entries.pop();
    this.path.push(this.key);
    this.actAfter = true;
  },

  _unstack() {
    this.path.pop();
    this.entries = this.stack.pop();
    this.actAfter = false;
  },

  _setOptions(options) {
    this.maxDepth = options.maxDepth;
    this.actFor = toArray(options.actFor).reduce((obj, option) => {
      obj[option] = true;
      return obj;
    }, {});
  },

  _isTerminal() {
    return !isObject(this.value) || Object.keys(this.value).length === 0;
  },

  _doAction() {
    const isTerminal = this._isTerminal();
    const isClipped = !isTerminal && this.path.length === this.maxDepth;
    return (
      this.actAfter &&
      (this.actFor.all ||
        (this.actFor.terminal && isTerminal) ||
        (this.actFor.clipped && isClipped) ||
        (this.actFor.intermediate && !isTerminal))
    );
  },

  forEach(callbackFn, options = { actFor: 'terminal', maxDepth: Infinity }) {
    this._setOptions(options);

    do {
      if (!this._isTerminal()) this._intoObject();
      else if (this.entries.length === 0) this._unstack();
      else this._nextEntry();
      if (this._doAction()) {
        callbackFn(this.key, this.value, this.path);
      }
    } while (this.entries !== null);
  },

  reduce(
    callbackFn,
    initialValue,
    options = { actFor: 'terminal', maxDepth: Infinity }
  ) {
    this._setOptions(options);
    let accumulator = initialValue;

    do {
      if (!this._isTerminal()) this._intoObject();
      else if (this.entries.length === 0) this._unstack();
      else this._nextEntry();
      if (this._doAction()) {
        accumulator = callbackFn(accumulator, this.key, this.value, this.path);
      }
    } while (this.entries !== null);
    return accumulator;
  },

  flatten() {
    return this.reduce((accumulator, key, value, path) => {
      accumulator[path.join('.')] = value;
      return accumulator;
    }, {});
  },

  expand() {},
};

function traverse(obj) {
  let trav = Object.create(_traverseProto);
  trav.stack = [];
  trav.path = [];
  trav.entries = null;
  trav.key = '';
  trav.value = obj;
  return trav;
}

function mergeDottedKey(dottedKey, value, obj) {
  const keys = dottedKey.split('.').reverse();
  let sub = obj;
  let key = keys.pop();

  // Advance until key not found or value not an object
  while (key in sub && isObject(sub[key])) {
    sub = sub[key];
    key = keys.pop();
  }

  // Then build branch backwards and attach
  sub[key] = keys.reduce((branch, key) => {
    return { [key]: branch };
  }, value);
  return obj;
}

const obj = {
  a: 'alpha',
  b: 'beta',
  c: { d: 'gamma', e: {} },
  f: { f1: { f2: { f3: 0 } } },
};

class xArray extends Array {
  constructor(...arr) {
    super(...arr);
  }

  log() {
    console.log(JSON.stringify(this));
  }
}

const o2 = {};

const x = new xArray(1, 2, 3);
/*
x[3] = 11
x[4] = 12
x[5] = 13

x.log()

x.map((x) => 2 * x)
  .filter((x) => x < 10)
  .log()
*/

//console.log(traverse(obj).flatten())
//console.log(
//  traverse(obj).forEach((key, value, path) => {
//    console.log('', key, value)
//  })
//)

// Options: all | terminal | intermediate | clipped

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

function contractV6(address) {
  const index1 = address.indexOf('::');
  const index2 = address.indexOf('::', index1);

  const splits = address.split(':');
  const doubles = (address.match(/::/) || []).length;

  if (index1 === -1) {
    if (splits.length !== 8) return false;
  } else if (index2 !== -1) {
    return false;
  } else {
    //if (index1 === 0 && splits.length <= 8)
  }

  const re = /(::)?([0-9a-fA-F]{0,4})(:|::)/;

  let valid = true;
  let emtpy = false;
  let dou;
  const splits = address.split(':').forEach((str) => {
    if (!address.test(/^[0-9a-fA-F]{0,4}$/)) valid = false;
    if (address === '') empty = true;
  });

  const double_at_edge = address.test(/^::(\w+:)*\w+/);

  console.log(address.startsWith('::'), address.endsWith('::'));
  if (doubles === 0 && splits.length !== 8) return false;
  if (doubles === 1) {
    if (
      ((address.startsWith('::') || address.endsWith('::')) &&
        splits.length > 8) ||
      splits.length > 7
    )
      return false;
  }

  let valid = /^(::)?([0-9a-fA-F]{1,4}(:|::))*([0-9a-fA-F]{1,4})?$/g.test(
    address
  );

  const re = /(::)?([0-9a-fA-F]{1,4}(:|::))*/;

  return true;
}

console.log(contractV6('1:2:3:4:5:6:7:8'), true);
console.log(contractV6('1:2::5:6:7:8'), true);
console.log(contractV6('::3:4:5:6:7:8'), true);
console.log(contractV6('1:2:3:4:5:6::'), true);

console.log(contractV6('2607:G8B0:4010:801::1004'), false); // illeg char

// Too many double-colons
console.log(contractV6('2001:470::76::2'), false);

// Too many groups
console.log(contractV6('2a02:0cb41:0:0:0:0:0:0:7'), false);

// Not enough groups and no double-colon
console.log(contractV6('2620:0:863:ed1a:0:1'), false);

// Expansion of double-colon would make address too long
console.log(contractV6('2600:1406:34:0:0:0::b819:3854'), false);
