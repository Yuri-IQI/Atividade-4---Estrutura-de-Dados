import type { TreeNode } from "../types/TreeNode";

export const rotateLeft = (node: TreeNode): TreeNode => {
    const rightChild = node.right;
    if (!rightChild) return node;

    node.right = rightChild.left;
    if (rightChild.left) {
        rightChild.left.parent = node;
    }

    rightChild.left = node;

    rightChild.parent = node.parent;

    if (node.parent) {
        if (node.parent.left === node) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }
    }

    node.parent = rightChild;

    return rightChild;
};

export const rotateRight = (node: TreeNode): TreeNode => {
    const leftChild = node.left;
    if (!leftChild) return node;

    node.left = leftChild.right;
    if (leftChild.right) {
        leftChild.right.parent = node;
    }

    leftChild.right = node;

    leftChild.parent = node.parent;

    if (node.parent) {
        if (node.parent.left === node) {
            node.parent.left = leftChild;
        } else {
            node.parent.right = leftChild;
        }
    }

    node.parent = leftChild;

    return leftChild;
};