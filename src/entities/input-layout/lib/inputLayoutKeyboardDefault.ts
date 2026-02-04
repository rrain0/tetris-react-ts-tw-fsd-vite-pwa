import type { InputLayoutKeys } from 'entities/input-layout/model/inputLayout.ts'



// TODO InputConfig - input method (keyboard/mouse/dinput/xinput) vs device (specific gamepad)

/*
 TODO InputConfig - input layouts
   Игроки.
   Можно сделать player 1, 2, 3, 4 (player (number or id) -> type -> action).
   Но обычно в современных играх при начале игры игроки поочерёдно нажимают кнопки
   и так выбирается устройство для каждого игрока.
   но есть момент, что на клавиатуре может играть и 2 игрока.
   Тогда можно создать InputLayout и по кнопке атаке при добавлении игроков выбирать InputLayout
 */

// ТОДО (оверинжиниринг) InputConfig - комбинации клавиш (например 2 кнопки вместе)

export const inputLayoutKeyboardDefault: InputLayoutKeys = {
  ingame: {
    moveLeft: [
      { inputMethod: 'keyboard', key: 'KeyA' },
    ],
    moveRight: [
      { inputMethod: 'keyboard', key: 'KeyD' },
    ],
    moveDown: [
      { inputMethod: 'keyboard', key: 'KeyS' },
    ],
    drop: [
      { inputMethod: 'keyboard', key: 'Space' },
    ],
    rotateLeft: [
      { inputMethod: 'keyboard', key: 'ArrowLeft' },
    ],
    rotateRight: [
      { inputMethod: 'keyboard', key: 'ArrowRight' },
    ],
    pause: [
      { inputMethod: 'keyboard', key: 'Escape' },
    ],
  },
  menu: {
    ok: [
      { inputMethod: 'keyboard', key: 'Enter' },
      { inputMethod: 'keyboard', key: 'NumpadEnter' },
      { inputMethod: 'keyboard', key: 'Space' },
    ],
    back: [
      { inputMethod: 'keyboard', key: 'Escape' },
    ],
    up: [
      { inputMethod: 'keyboard', key: 'KeyW' },
      { inputMethod: 'keyboard', key: 'ArrowUp' },
    ],
    down: [
      { inputMethod: 'keyboard', key: 'KeyS' },
      { inputMethod: 'keyboard', key: 'ArrowDown' },
    ],
  },
}