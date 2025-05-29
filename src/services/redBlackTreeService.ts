import { findNode, insertNode  } from "./binaryTreeService";
import type { TreeNode } from "../types/TreeNode";
import { rotateLeft, rotateRight } from "./rotationService";

export const addNode = (
    tree: TreeNode | null,
    value: number
): TreeNode => {
    const newTree = insertNode(tree, value);
    const insertedNode = findNode(newTree, value);

    if (!insertedNode) return newTree;

    const fixedTree = fixViolations(newTree, insertedNode);
    return fixedTree;
};

const fixViolations = (tree: TreeNode, node: TreeNode): TreeNode => {
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
        return fixViolations(tree, grandparent);
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

const findRoot = (node: TreeNode): TreeNode => {
    if (node.parent) return findRoot(node.parent);

    return node;
};