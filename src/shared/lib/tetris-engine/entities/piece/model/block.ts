


// Rectangular matrix
// → x
// ↓ y
export type Blocks<T = any> = T[][]



export function blocksRows(blocks: Blocks) { return blocks.length }
export function blocksCols(blocks: Blocks) { return blocks[0]?.length ?? 0 }

export function *blocksIterator(blocks: Blocks) {
  const rows = blocksRows(blocks), cols = blocksCols(blocks)
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const block = { x, y, blockValue: blocks[y][x] }
      yield block
    }
  }
}

export function blocksGetFirstNonEmptyRow(blocks: Blocks) {
  const rows = blocksRows(blocks), cols = blocksCols(blocks)
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (blocks[y][x]) return y
    }
  }
  return rows
}
export function blocksGetFirstNonEmptyCol(blocks: Blocks) {
  const rows = blocksRows(blocks), cols = blocksCols(blocks)
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (blocks[y][x]) return x
    }
  }
  return cols
}
