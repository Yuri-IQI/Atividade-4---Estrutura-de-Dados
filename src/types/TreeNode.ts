import type { Color } from "./enums/RedBlack";

export interface TreeNode {
    value: number,
    left: TreeNode | null,
    right: TreeNode | null,
    color: Color,
    parent: TreeNode | null
}