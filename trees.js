class Node {
  constructor(value, children = []) {
    this.value = value;
    this.children = children;
  }

  append(...nodes) {
    this.children.push(...nodes);
  }
}
