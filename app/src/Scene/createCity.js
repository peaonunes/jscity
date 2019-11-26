import get from 'lodash/get';

import blocksPallet from '../blocksPallet';
const ROAD_SIZE_OFFSET = 1;

function getSize(block) {
  const childCount = block.children.length;
  const roadsOffset = childCount * ROAD_SIZE_OFFSET;
  const x = block.loc + roadsOffset;
  const y = block.type === 'FunctionDeclaration' ? block.cec || 1 : 1;
  const z = block.loc + roadsOffset;
  return [x, y, z];
}

function getProjectSize(cityBlocks) {
  return cityBlocks['Project'].children.reduce(
    (acc, childId) => {
      const size = get(cityBlocks, `${childId}.size`);
      const x = size[0] + acc[0];
      const y = size[1];
      const z = size[2] + acc[2];
      return [x, y, z];
    },
    [1, 1, 1]
  );
}

function buildCityBlocks(blocksMap) {
  const cityBlocks = {};
  const root = blocksMap['Project'];
  const queue = [root.id];
  let childOffsetX = 0;
  let childOffsetY = 0;
  let childOffsetZ = 0;

  cityBlocks[root.id] = {
    ...root,
    color: blocksPallet[root.type],
    position: [childOffsetX, childOffsetY, childOffsetZ]
  };

  while (queue.length) {
    // Current block
    const block = cityBlocks[queue.pop()];

    // If the block has parent its children offset is based on his parent position
    const parentX = get(cityBlocks[block.parent], 'position[0]', 0);
    const parentZ = get(cityBlocks[block.parent], 'position[2]', 0);
    childOffsetX = parentX;
    childOffsetZ = parentZ;
    const type = get(cityBlocks, `${block.id}.type`);
    if (type === 'FunctionDeclaration') {
      /*
       * block.position[1]: means the current block Y position.
       * size/2: because rendering on Y axis renders half on up direction and another half on down direction.
       */
      childOffsetY = block.position[1] + block.size[1] / 2;
    } else if (type === 'Project') {
      /*
       * block.position[1]: means the current block Y position.
       * 0.5: because Project have 1 of height.
       */
      childOffsetY = block.position[1] + 0.5;
    } else {
      childOffsetY = block.position[1];
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
      childOffsetX = child.loc + ROAD_SIZE_OFFSET;
      childOffsetZ = child.loc + ROAD_SIZE_OFFSET;

      // Add child to the processing queue
      queue.unshift(child.id);
    }
  }

  cityBlocks[root.id].size = getProjectSize(cityBlocks);

  return cityBlocks;
}

export default buildCityBlocks;
