import type { Field } from '@lib/tetris-engine/entities/field/model/field.ts'
import type { Div } from '@utils/react/props/propTypes.ts'
import Block from '@widgets/tetris-field/entities/block/ui/Block.tsx'
import { mapPieceTypeToBlockUiData } from '@widgets/tetris-field/entities/block/lib/blockUi.ts'



export type TetrisFieldProps = Div & { field: Field }

export default function TetrisField({ field, ...rest }: TetrisFieldProps) {
  const { rows, cols } = field
  return (
    <div
      cn='grid'
      st={{
        gridTemplateRows: `repeat(${rows},1fr)`,
        gridTemplateColumns: `repeat(${cols},1fr)`,
        aspectRatio: cols / rows,
      }}
      {...rest}
    >
      {[...field].map(({ x, y, blockValue: b }) => {
        if (!b) return
        const data = mapPieceTypeToBlockUiData(b.type)
        const row = y + 1
        const col = x + 1
        return (
          <Block data={data}
            key={`${row} ${col}`}
            style={{ gridArea: `${row} / ${col}` }}
          />
        )
      })}
    </div>
  )
}
