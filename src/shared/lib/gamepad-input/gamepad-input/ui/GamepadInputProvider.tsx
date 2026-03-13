import GamepadChangeProvider from '@lib/gamepad-input/change/ui/GamepadChangeProvider.tsx'
import MappedGamepadProvider from '@lib/gamepad-input/mapped/ui/MappedGamepadProvider.tsx'
import NativeGamepadProvider from '@lib/gamepad-input/native/ui/NativeGamepadProvider.tsx'
import type { Children } from '@utils/react/props/propTypes.ts'



function GamepadProvider({ children }: Children) {
  return (
    <NativeGamepadProvider>
      <MappedGamepadProvider>
        <GamepadChangeProvider>
          {children}
        </GamepadChangeProvider>
      </MappedGamepadProvider>
    </NativeGamepadProvider>
  )
}
export default GamepadProvider
