import type { TreeNode } from "../types/TreeNode";

export const traverseTree = (
    node: TreeNode | null,
    callback: (node: TreeNode) => void
): void => {
    if (!node) return;
    
    callback(node);
    
    if (node.left) traverseTree(node.left, callback);
    if (node.right) traverseTree(node.right, callback);
};

export const findNode = (
    node: TreeNode | null,
    value: number
): TreeNode | null => {
    if (!node) return null;
    
    if (node.value === value) return node;
    
    return value < node.value
        ? findNode(node.left, value)
        : findNode(node.right, value);
}

export const createNode = (
    value: number,
    parent: TreeNode | null
): TreeNode => {
    return {
        value,
        left: null,
        right: null,
        color: 'RED',
        parent: parent
    }
}

export const basicNodeInsertion = (
    node: TreeNode | null,
    value: number,
    parent: TreeNode | null = null
): TreeNode => {
    if (!node) return createNode(value, parent);

    if (value < node.value) {
        return {
            ...node,
            left: basicNodeInsertion(node.left, value, node),
        };
    } else if (value > node.value) {
        return {
            ...node,
            right: basicNodeInsertion(node.right, value, node),
        };
    } else {
        return node;
    }
};