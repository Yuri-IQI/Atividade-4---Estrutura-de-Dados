import type { Color } from "../types/enums/Color";
import type { TreeNode } from "../types/TreeNode";

export const traverseTree = (
    tree: TreeNode | null,
    callback: (tree: TreeNode) => void
): TreeNode => {
    if (!tree) throw console.error('No tree to be traversed');
    
    callback(tree);
    
    if (tree.left) traverseTree(tree.left, callback);
    if (tree.right) traverseTree(tree.right, callback);

    return tree;
};

export const createNode = (
    value: number,
    parent: TreeNode | null = null,
    color: Color = 'RED'
): TreeNode => ({
    value,
    left: null,
    right: null,
    color,
    parent
});

export const insertNode = (
    tree: TreeNode | null,
    value: number,
    parent: TreeNode | null = null
): TreeNode => {
    if (!tree) {
        return createNode(value, parent);
    }

    if (value < tree.value) {
        const insertedLeft = insertNode(tree.left, value, tree);
        tree.left = insertedLeft;
        insertedLeft.parent = tree;
    } else if (value > tree.value) {
        const insertedRight = insertNode(tree.right, value, tree);
        tree.right = insertedRight;
        insertedRight.parent = tree;
    }

    return tree;
};

export const findRoot = (node: TreeNode): TreeNode => {
    if (node.parent) return findRoot(node.parent);
    return node;
};

export const findMax = (node: TreeNode): TreeNode =>
    node.right ? findMax(node.right) : node;

export const findNode = (
    tree: TreeNode | null,
    value: number
): TreeNode | null => {
    if (!tree) return null;
    if (tree.value === value) return tree;
    return value < tree.value
        ? findNode(tree.left, value)
        : findNode(tree.right, value);
};