import { findMax, findNode, findRoot, insertNode } from "./binaryTreeService";
import type { TreeNode } from "../types/TreeNode";
import { rotateLeft, rotateRight } from "./rotationService";

export const deleteNode = (root: TreeNode | null, value: number): TreeNode | null => {
    const nodeToDelete = findNode(root, value);
    if (!nodeToDelete) return root;
    if (!nodeToDelete.parent && !nodeToDelete.left && !nodeToDelete.right) return null;

    const newRoot = deleteHelper(nodeToDelete);
    if (newRoot) newRoot.color = 'BLACK';
    return newRoot;
};

const deleteHelper = (node: TreeNode): TreeNode | null => {
    let toDelete = node;
    if (!toDelete.parent && !toDelete.left && !toDelete.right) return null;
    console.log(toDelete);

    let replacement: TreeNode | null = null;

    if (node.left && node.right) {
        const predecessor = findMax(node.left);
        node.value = predecessor.value;
        toDelete = predecessor;
        if (toDelete.parent) toDelete.parent.value = toDelete.value;
        console.log(node, predecessor, toDelete);
    }

    replacement = toDelete.left || toDelete.right;
    console.log(toDelete);

    if (!replacement) {
        if (toDelete.color === 'BLACK') fixDoubleBlack(toDelete);
        replaceNode(toDelete, null);
        console.log(toDelete);
        return findRoot(toDelete);
    }

    replaceNode(toDelete, replacement);

    if (toDelete.color === 'BLACK') {
        if (replacement.color === 'RED') {
            replacement.color = 'BLACK';
        } else {
            fixDoubleBlack(replacement);
        }
    }

    return findRoot(replacement);
};

const replaceNode = (oldNode: TreeNode, newNode: TreeNode | null) => {
    console.log(oldNode);
    if (oldNode.parent) {
        if (oldNode.parent.left === oldNode) {
            oldNode.parent.left = newNode;
        } else {
            oldNode.parent.right = newNode;
        }
    }

    if (newNode) {
        newNode.parent = oldNode.parent;
    }
};

const fixDoubleBlack = (node: TreeNode) => {
    if (!node.parent) return;

    const parent = node.parent;
    const isLeftChild = parent.left === node;
    const sibling = isLeftChild ? parent.right : parent.left;

    if (!sibling) {
        fixDoubleBlack(parent);
        return;
    }

    if (sibling.color === 'RED') {
        parent.color = 'RED';
        sibling.color = 'BLACK';
        if (isLeftChild) {
            rotateLeft(parent);
        } else {
            rotateRight(parent);
        }
        fixDoubleBlack(node);
    } else {
        const siblingLeftBlack = !sibling.left || sibling.left.color === 'BLACK';
        const siblingRightBlack = !sibling.right || sibling.right.color === 'BLACK';

        if (siblingLeftBlack && siblingRightBlack) {
            sibling.color = 'RED';
            if (parent.color === 'BLACK') {
                fixDoubleBlack(parent);
            } else {
                parent.color = 'BLACK';
            }
        } else {
            if (!isLeftChild && sibling.left && sibling.left.color === 'RED') {
                sibling.left.color = parent.color;
                parent.color = 'BLACK';
                rotateRight(parent);
            } else if (isLeftChild && sibling.right && sibling.right.color === 'RED') {
                sibling.right.color = parent.color;
                parent.color = 'BLACK';
                rotateLeft(parent);
            } else {
                if (!isLeftChild && sibling.right) {
                    sibling.right.color = 'BLACK';
                    sibling.color = 'RED';
                    rotateLeft(sibling);
                    fixDoubleBlack(node);
                } else if (isLeftChild && sibling.left) {
                    sibling.left.color = 'BLACK';
                    sibling.color = 'RED';
                    rotateRight(sibling);
                    fixDoubleBlack(node);
                }
            }
        }
    }
};

export const addNode = (
  tree: TreeNode | null,
  value: number
): TreeNode => {
  const newTree = insertNode(tree, value);
  const insertedNode = findNode(newTree, value);

  if (!insertedNode) return newTree;

  return applyInsertionFixes(newTree, insertedNode);
};

export const applyInsertionFixes = (
  tree: TreeNode,
  insertedNode: TreeNode
): TreeNode => {
  if (!tree) throw console.error('No supplied tree');
  return verifyRedBlackProperties(insertedNode);
};

export const verifyRedBlackProperties = (node: TreeNode): TreeNode => {
  if (!node.parent) {
    node.color = 'BLACK';
    return node;
  }

  if (node.parent.color === 'BLACK') {
    return findRoot(node);
  }

  const parent = node.parent;
  const grandparent = parent.parent;

  if (!grandparent) {
    parent.color = 'BLACK';
    return findRoot(parent);
  }

  const uncle = grandparent.left === parent
    ? grandparent.right
    : grandparent.left;

  if (uncle?.color === 'RED') {
    parent.color = 'BLACK';
    uncle.color = 'BLACK';
    grandparent.color = 'RED';
    return verifyRedBlackProperties(grandparent);
  }

  let newRoot: TreeNode;

  if (grandparent.left === parent) {
    if (parent.right === node) {
      rotateLeft(parent);
      node = parent;
    }
    newRoot = rotateRight(grandparent);
  } else {
    if (parent.left === node) {
      rotateRight(parent);
      node = parent;
    }
    newRoot = rotateLeft(grandparent);
  }

  newRoot.color = 'BLACK';
  if (newRoot.left) newRoot.left.color = 'RED';
  if (newRoot.right) newRoot.right.color = 'RED';

  return findRoot(newRoot);
};