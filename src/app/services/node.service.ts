import { Injectable } from '@angular/core';
import treeNodesData from '../data/tree-nodes-data.json';
import { TreeNode } from '../core/models/node.model';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  getTreeNodesData(): TreeNode[] {
    return treeNodesData.treeNodes;
  }

  getFiles(): Promise<TreeNode[]> {
    return Promise.resolve(this.getTreeNodesData());
  }
}
