import type { ComponentProps } from 'react'



export default function IngameControls2Button(props: ComponentProps<'button'>) {
  return <button type='button' cn={ingameControlsButtonCn} {...props}/>
}

const ingameControlsButtonCn = `
  rel
  isolate
  w-[min(20cqw,20cqh,100px)]
  h-[min(20cqw,20cqh,100px)]
  rad-[calc(min(20cqw,20cqh,100px)_/_4)]
  cl-[#ffffff55]
  bg-cl-[#00000055]
  
  cursor-[pointer]
  transition-all-200
  
  hovrr:bg-cl-[#00000077]
`
