import type { InputLayoutKeys } from 'entities/input-layout/model/inputLayout.ts'



// TODO InputConfig - input method (keyboard/mouse/dinput/xinput) vs device (specific gamepad)

/*
 TODO InputConfig - input layouts
   Игроки.
   1) Можно сделать player 1, 2, 3, 4 (player (number or id) -> type -> action).
   2) Layout by player then by device.
   3) When players enter the game, they button.
   It selects first layout with this button (or i may show a list of matched layouts to select).
   4) Но обычно в современных играх при начале игры игроки поочерёдно нажимают кнопки
   и так выбирается устройство для каждого игрока.
   но есть момент, что на клавиатуре может играть и 2 игрока.
   Тогда можно создать InputLayout и по кнопке атаке при добавлении игроков выбирать InputLayout
   5) Как-то при включении игры надо выбирать layout, если ничего не может выбраться - включать дефолтный.
   6) Можно создавать маппинг, потом перевыбирать его для другого устройства, а потом из маппинга делать инпут конфиг.
   7) Input devices. Input config.
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