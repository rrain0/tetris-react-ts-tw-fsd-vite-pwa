import Block from '@entities/block/ui/Block.tsx'
import { FieldPiece } from '@lib/tetris-engine/entities/field-piece/model/fieldPiece.ts'
import { Field } from '@lib/tetris-engine/entities/field/model/field.ts'
import { TetrominoSrs } from '@lib/tetris-engine/entities/piece/model/tetrominoSrs.ts'
import Grid from '@lib/fast-elems/Grid.tsx'
import { mapPieceTypeToBlockUiType } from 'entities/block/lib/blockUi.ts'
import * as React from 'react'


// TODO loading screen to save images to RAM (dataUrl)


const field = new Field()
field.addPiece(new FieldPiece([4, 5], TetrominoSrs.newO()))
field.addPiece(new FieldPiece([0, 14], TetrominoSrs.newT().toRotated(2)))
field.addPiece(new FieldPiece([-2, 15], TetrominoSrs.newI().toRotated(1)))
field.addPiece(new FieldPiece([1, 18], TetrominoSrs.newZ()))
field.addPiece(new FieldPiece([3, 15], TetrominoSrs.newS().toRotated(-1)))
field.addPiece(new FieldPiece([4, 18], TetrominoSrs.newJ()))
field.addPiece(new FieldPiece([6, 14], TetrominoSrs.newL().toRotated(1)))
field.addPiece(new FieldPiece([6, 18], TetrominoSrs.newO()))
field.addPiece(new FieldPiece([8, 16], TetrominoSrs.newT().toRotated(-1)))



function TetrisField() {
  
  return (
    <Grid w={300} h='ct' css={glassStyle}
      rows='repeat(20, 1fr)' cols='repeat(10, 1fr)'
    >
      {[...field].map(({ x, y, block }) => {
        if (!block) return undefined
        const type = mapPieceTypeToBlockUiType(block.type)
        if (!type) return undefined
        const ri = y + 1
        const ci = x + 1
        return (
          <Block type={type}
            key={`${ri} ${ci}`}
            style={{ gridArea: `${ri} / ${ci}` }}
          />
        )
      })}
    </Grid>
  )
}
export default TetrisField



const glassStyle = {
  border: '3px solid',
  borderColor: '#808080',
  borderRadius: '4px',
}