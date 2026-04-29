# Tetris
### React + TS + Tailwind + FSD + Vite + PWA
### Приложение можно собрать в докер


- Играть можно, очки текут, уровни повышаются.
- Пока что более менее готовы движок и экран самой игры.
- Движок реализован на raf и JS генераторах.
- Пауза пока не поддерживается.
- Сохранение прогресса не реализовано.
- Пока что 1 экран самой игры.
- Вёрстка адаптивная под всё на CSS Container Queries.
- Есть режим полного экрана и установка в качестве PWA.

Управление:

1) Клавиатура:
  - Summary: WASD, QE, JK, Space
  - ◀️ ▶️ Move left or right - press or hold A or D
  - 🔽 Soft drop - press or hold S
  - 🔼 Move up - press or hold W
  - ↶ ↷ Rotate left or right - press Q or E or press J or K
  - ⭳ Hard drop - press Space

2) Геймпад (XInput):
  - Summary: DPad, XY, A or B or LT
  - ◀️ ▶️ Move left or right - press or hold DPadL or DPadR
  - 🔽 Soft drop - press or hold DPadD
  - 🔼 Move up - press or hold DPadU
  - ↶ ↷ Rotate left or right - press X or Y
  - ⭳ Hard drop - press A or B or LT

3) Тачпад:
  - Вдохновлялся управлением из скролл-шутеров.
  - Summary: Touch and hold then move left or right, up or down. Use up, down, hard drop buttons on the left.
  - ◀️ ▶️ Move left or right - Touch and hold then move left or right
  - 🔽 Soft drop  - soft drop button on the left.
  - 🔼 Move up - up button on the left.
  - ↶ ↷ Rotate left or right - Touch and hold then move up or down
  - ⭳ Hard drop - hard drop button on the left.



# Запуск dev mode
- Установка пэкедж-менеджера pnpm<br/>
`npm install -g pnpm@latest-10`

- Запуск проекта<br/>
`pnpm run dev`
