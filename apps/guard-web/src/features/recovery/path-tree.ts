export type PathTreeNode = {
  name: string;
  path: string;
  kind: 'folder' | 'file';
  children: PathTreeNode[];
  leafCount: number;
};

type MutablePathTreeNode = PathTreeNode & {
  map?: Map<string, MutablePathTreeNode>;
};

function createFolderNode(name: string, path: string): MutablePathTreeNode {
  return {
    name,
    path,
    kind: 'folder',
    children: [],
    leafCount: 0,
    map: new Map<string, MutablePathTreeNode>(),
  };
}

function finalizeNode(node: MutablePathTreeNode): PathTreeNode {
  const children = [...node.children]
    .map((child) => finalizeNode(child as MutablePathTreeNode))
    .sort((left, right) => {
      if (left.kind !== right.kind) return left.kind === 'folder' ? -1 : 1;
      return left.name.localeCompare(right.name);
    });

  if (node.kind === 'file') {
    return {
      name: node.name,
      path: node.path,
      kind: 'file',
      children: [],
      leafCount: 1,
    };
  }

  const leafCount = children.reduce((sum, child) => sum + child.leafCount, 0);
  return {
    name: node.name,
    path: node.path,
    kind: 'folder',
    children,
    leafCount,
  };
}

export function buildPathTree(paths: string[]) {
  const root = createFolderNode('', '');

  for (const rawPath of paths) {
    const cleaned = rawPath.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
    if (!cleaned) continue;
    const parts = cleaned.split('/').filter(Boolean);
    let current = root;
    let currentPath = '';

    for (let index = 0; index < parts.length; index += 1) {
      const part = parts[index];
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const isLeaf = index === parts.length - 1;

      if (isLeaf) {
        const fileNode: MutablePathTreeNode = {
          name: part,
          path: currentPath,
          kind: 'file',
          children: [],
          leafCount: 1,
        };
        current.children.push(fileNode);
        continue;
      }

      const existing = current.map?.get(part);
      if (existing) {
        current = existing;
        continue;
      }

      const folderNode = createFolderNode(part, currentPath);
      current.children.push(folderNode);
      current.map?.set(part, folderNode);
      current = folderNode;
    }
  }

  return finalizeNode(root).children;
}
