class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
  insertRecursively(val, node = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < node.val) {
      if (!node.left) {
        node.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, node.left);
    } else {
      if (!node.right) {
        node.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, node.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      current = val < current.val ? current.left : current.right;
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val, node = this.root) {
    if (!node) return undefined;
    if (val === node.val) return node;
    if (val < node.val) return this.findRecursively(val, node.left);
    return this.findRecursively(val, node.right);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder() {
    let visited = [];
    function traverse(node) {
      if (!node) return;
      visited.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    let visited = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      visited.push(node.val);
      traverse(node.right);
    }
    traverse(this.root);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder() {
    let visited = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      visited.push(node.val);
    }
    traverse(this.root);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
  bfs() {
    let queue = [this.root];
    let visited = [];

    while (queue.length) {
      let node = queue.shift();
      if (node) {
        visited.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }

    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */
  remove(val) {
    function removeNode(node, val) {
      if (!node) return null;

      if (val === node.val) {
        // Node has no children
        if (!node.left && !node.right) return null;
        // Node has no left child
        if (!node.left) return node.right;
        // Node has no right child
        if (!node.right) return node.left;

        // Node has two children
        let temp = node.right;
        while (temp.left) temp = temp.left;
        node.val = temp.val;
        node.right = removeNode(node.right, temp.val);
        return node;
      } else if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else {
        node.right = removeNode(node.right, val);
        return node;
      }
    }

    this.root = removeNode(this.root, val);
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced() {
    function height(node) {
      if (!node) return -1;
      return Math.max(height(node.left), height(node.right)) + 1;
    }

    function checkBalanced(node) {
      if (!node) return true;
      let leftHeight = height(node.left);
      let rightHeight = height(node.right);
      return (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        checkBalanced(node.left) &&
        checkBalanced(node.right)
      );
    }

    return checkBalanced(this.root);
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    let current = this.root;
    while (current) {
      // Case: current is the highest and has a left subtree.
      if (current.left && !current.right) {
        return this.findMax(current.left).val;
      }
      // Case: current is parent of the highest, and the highest has no children.
      if (current.right && !current.right.left && !current.right.right) {
        return current.val;
      }
      current = current.right;
    }
  }

  findMax(node) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }
}

module.exports = BinarySearchTree;
