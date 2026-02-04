


export interface InputLayout {
  name: string
  config: InputLayoutKeys
}

export interface InputLayoutKeys {
  ingame: {
    // ◀️
    moveLeft: ActionConfig
    // ▶️
    moveRight: ActionConfig
    // 🔽
    moveDown: ActionConfig
    // ⭳
    drop: ActionConfig
    // ↶
    rotateLeft: ActionConfig
    // ↷
    rotateRight: ActionConfig
    // ⏸️
    pause: ActionConfig
  }
  menu: {
    // 🆗
    ok: ActionConfig
    // ↩️
    back: ActionConfig
    // 🔼
    up: ActionConfig
    // 🔽
    down: ActionConfig
  }
}

export type ActionConfig = InputUnit[]

export type InputUnit = KeyboardKey

export interface KeyboardKey {
  inputMethod: 'keyboard'
  key: string
}
