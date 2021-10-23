class Node {
  constructor(value, children = []) {
    this.value = value;
    this.children = children;
  }

  append(...nodes) {
    this.children.push(...nodes);
  }
}

//------------------------------------------------------------------------------

const traverse_BreadthFirst = (root, action) => {
  const queue = [...root.children];

  while (queue.length > 0) {
    const node = queue.shift();
    action(node);
    queue.push(...node.children);
  }
};

//------------------------------------------------------------------------------

const traverse_DepthFirst = (root, action) => {
  action(root);
  for (const node of root.children) {
    traverse_DepthFirst(node, action);
  }
};
