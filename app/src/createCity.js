import get from 'lodash/get';

import blocksPallet from './blocksPallet';

function getSize(block) {
  const roadSize = 1;
  const childCount = block.children.length;
  const roadsOffset = childCount * roadSize;
  const x = block.loc + roadsOffset;
  const y = block.type === 'FunctionDeclaration' ? block.cec : 1;
  const z = block.loc + roadsOffset;
  return [x, y, z];
}

function buildCityBlocks(blocksMap) {
  const roadSize = 1;
  const cityBlocks = {};
  const root = blocksMap['Project'];
  const queue = [root.id];
  let childOffsetX = 0;
  let childOffsetY = 0;
  let childOffsetZ = 0;

  cityBlocks[root.id] = {
    ...root,
    color: blocksPallet[root.type],
    position: [childOffsetX, childOffsetY, childOffsetZ],
    size: getSize(root)
  };

  while (queue.length) {
    // Current block
    const block = cityBlocks[queue.pop()];

    // If the block has parent its children offset is based on his parent position
    const parentX = get(cityBlocks[block.parent], 'position[0]', 0);
    const parentZ = get(cityBlocks[block.parent], 'position[2]', 0);
    childOffsetX = parentX;
    childOffsetZ = parentZ;
    if (get(cityBlocks, `${block.id}.type`) !== 'FunctionDeclaration') {
      childOffsetY = block.position[1];
    } else {
      // size/2 because rendering on Y axis renders half on up direction
      // and another half on down direction.
      // plus 0.5 because
      childOffsetY = block.position[1] + block.size[1] / 2;
    }

    for (let i = 0; i < block.children.length; i++) {
      const childId = block.children[i];

      // Add child to city blocksMap
      const child = blocksMap[childId];
      const size = getSize(child);
      // childOffsetY + half of the size of the block since it grows
      // both vertical directions
      const position = [childOffsetX, childOffsetY + size[1] / 2, childOffsetZ];
      // Add position as the current offset
      cityBlocks[child.id] = {
        ...child,
        color: blocksPallet[child.type],
        position,
        size
      };

      // Update offset based on its size
      childOffsetX = child.loc + roadSize;
      childOffsetZ = child.loc + roadSize;

      // Add child to the processing queue
      queue.unshift(child.id);
    }
  }

  return cityBlocks;
}

export default buildCityBlocks;
