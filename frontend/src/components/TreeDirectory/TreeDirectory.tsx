import "./TreeDirectory.css";

export type TreeNode = {
  path: string;
  children: TreeNode[];
};

export const TreeDirectory = ({
  node,
  index,
}: {
  node: TreeNode;
  index: number;
}) => {
  if (node.children.length === 0) {
    const tab = new Array(index + 1).fill("--").join("");
    return (
      <div className="file">
        <span>
          {tab} {node.path.split("/").pop()}
        </span>
      </div>
    );
  }

  const tab = new Array(index).fill("__").join("");

  return (
    <div className="directory">
      <h3>
        {tab} {node.path}
      </h3>
      {node.children.map((child) => (
        <TreeDirectory node={child} index={index + 1} />
      ))}
    </div>
  );
};
