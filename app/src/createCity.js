import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import blocksPallet from './blocksPallet';

const types = {
  FUNCTION: 'FunctionDeclaration',
  FILE: 'File',
  PROJECT: 'Project'
};
const ROAD_SIZE_OFFSET = 1;

function getSize(block) {
  let roadsOffset = 0;
  if (!isEmpty(block.children)) {
    const childCount = block.children.length;
    roadsOffset = childCount + (childCount - 1) * ROAD_SIZE_OFFSET;
  }
  const x = (block.cec || 1) + roadsOffset;
  const y = block.type === types.FUNCTION ? block.loc || 1 : 1;
  const z = (block.cec || 1) + roadsOffset;
  return [x, y, z];
}

function getProjectSize(city) {
  console.log(city);
  return city[types.PROJECT].children.reduce(
    (acc, childId) => {
      const size = get(city, `${childId}.size`);
      const x = size[0] + acc[0];
      const y = 1;
      const z = size[2] + acc[2];
      return [x, y, z];
    },
    [1, 1, 1]
  );
}

function buildDistrict(blocksMap) {
  const city = {};
  const root = blocksMap[types.PROJECT];
  let childOffsetX = 0;
  let childOffsetY = 0;
  let childOffsetZ = 0;

  city[root.id] = {
    ...root,
    color: blocksPallet[root.type],
    position: [childOffsetX, childOffsetY, childOffsetZ]
  };

  const queue = [root.id];

  while (queue.length) {
    // Current block
    const block = city[queue.pop()];

    // If the block has parent its children offset is based on his parent position
    const parentX = get(city, `${block.parent}.position[0]`, 0);
    const parentZ = get(city, `${block.parent}.position[2]`, 0);
    childOffsetX = block.position[0] + parentX;
    childOffsetZ = block.position[2] + parentZ;

    /*
     * Defining the start offset based on current block size, position and offset for roads.
     * The geometry grows on both directions on X, Y and Z. For example:
     * Geometry on position = [0,0,0] and size = [1,1,1] will have it boundarias like:
     *  on X = -0.5 to 0.5
     *  on Y = -0.5 to 0.5
     *  on Z = -0.5 to 0.5
     * Since half of the geometry will go in one direction from the start point and
     * another half on the opposite direcation we have to calculate any offset
     * adding or removing the size of the geometry divided by 2.
     */
    const type = get(city, `${block.id}.type`);
    if (type === types.FUNCTION) {
      childOffsetX = childOffsetX - block.size[0] / 2 + ROAD_SIZE_OFFSET;
      childOffsetY = block.position[1] + block.size[1] / 2;
      childOffsetZ = childOffsetZ - block.size[2] / 2 + ROAD_SIZE_OFFSET;
    } else if (type === types.FILE) {
      childOffsetX = childOffsetX - block.size[0] / 2 + ROAD_SIZE_OFFSET;
      childOffsetY = block.position[1] + 0.5;
      childOffsetZ = childOffsetZ - block.size[2] / 2 + ROAD_SIZE_OFFSET;
    } else {
      childOffsetY = block.position[1] + 0.5;
    }

    for (let i = 0; i < block.children.length; i++) {
      const childId = block.children[i];

      // Add child to city blocksMap
      const child = blocksMap[childId];
      const size = getSize(child);

      let xCoodinate = childOffsetX;
      let yCoordinate = childOffsetY + size[1] / 2;
      let zCoordinate = childOffsetZ;

      if (child.type === types.FUNCTION) {
        xCoodinate += size[0] / 2;
        zCoordinate += size[2] / 2;
      }

      // Add position as the current offset
      city[child.id] = {
        ...child,
        color: blocksPallet[child.type],
        position: [xCoodinate, yCoordinate, zCoordinate],
        size
      };

      // Update offset for siblings based on the current child
      childOffsetX = childOffsetX + size[0] + ROAD_SIZE_OFFSET;
      childOffsetZ = childOffsetZ + size[2] + ROAD_SIZE_OFFSET;

      // Add child to the processing queue
      queue.unshift(child.id);
    }
  }
  return city;
}

function buildCity(blocksMap) {
  const city = buildDistrict(blocksMap);
  city[types.PROJECT].size = getProjectSize(city);
  return city;
}

export default buildCity;
