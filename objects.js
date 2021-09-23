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
