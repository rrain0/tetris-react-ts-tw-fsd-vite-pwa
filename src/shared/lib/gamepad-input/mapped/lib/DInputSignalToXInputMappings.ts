
const mappingsToNormalized = {
  // Norm_B_A
  Normalized_Button_A: {
    signals: [{ id: 'B2', push: 1 }],
  },
  Normalized_Button_B: {
    signals: [{ id: 'B1', push: 1 }],
  },
  Normalized_Button_X: {
    signals: [{ id: 'B3', push: 1 }],
  },
  Normalized_Button_Y: {
    signals: [{ id: 'B0', push: 1 }],
  },
}
const mappingsToVirtual = {
  // Virt_B_A
  Virtual_Button_A: {
    signals: [{ id: 'Normalized_Button_A', push: true }],
  },
}
const mappingsToXXInput = {
  // XXInput_A_Push
  XX_A_Push: {
  
  },
}
const mappingsToXXInput__ = {
  XX_A_Push: { },
  XX_B_Push: { },
  XX_X_Push: { },
  XX_Y_Push: { },
  
  XX_Select_Push: { },
  XX_Start_Push: { },
  
  XX_LB_Push: { },
  XX_RB_Push: { },
  XX_LT_Push: { },
  XX_RT_Push: { },
  
  XX_LT_Analog: { },
  XX_RT_Analog: { },
  
  XX_DPadL_Push: { },
  XX_DPadR_Push: { },
  XX_DPadU_Push: { },
  XX_DPadD_Push: { },
  
  XX_LXLeft_Push: { },
  XX_LXRight_Push: { },
  XX_LYUp_Push: { },
  XX_LYDown_Push: { },
  
  XX_LXLeft_Analog: { },
  XX_LXRight_Analog: { },
  XX_LYUp_Analog: { },
  XX_LYDown_Analog: { },
  
  XX_RXLeft_Push: { },
  XX_RXRight_Push: { },
  XX_RXUp_Push: { },
  XX_RXDown_Push: { },
  
  XX_RXLeft_Analog: { },
  XX_RXRight_Analog: { },
  XX_RXUp_Analog: { },
  XX_RXDown_Analog: { },
  
  XX_LSButton_Push: { },
  XX_RSButton_Push: { },
}

const DInputSignalToXInputMappings = [
  // A
  {
    from: [{ id: 'B2' }],
    to: [{ id: 'A', xinput: true }],
  },
  // B
  {
    from: [{ id: 'B1' }],
    to: [{ id: 'B', xinput: true }],
  },
  // X
  {
    from: [{ id: 'B3' }],
    to: [{ id: 'X', xinput: true }],
  },
  // Y
  {
    from: [{ id: 'B0' }],
    to: [{ id: 'Y', xinput: true }],
  },
  
  // Select
  {
    from: [{ id: 'B8' }],
    to: [{ id: 'Select', xinput: true }],
  },
  // Start
  {
    from: [{ id: 'B9' }],
    to: [{ id: 'Start', xinput: true }],
  },
  
  // LB
  {
    from: [{ id: 'B4' }],
    to: [{ id: 'LB', xinput: true }],
  },
  // RB
  {
    from: [{ id: 'B5' }],
    to: [{ id: 'RB', xinput: true }],
  },
  
  // LSButton
  {
    from: [{ id: 'B10' }],
    to: [{ id: 'LSButton', xinput: true }],
  },
  // RSButton
  {
    from: [{ id: 'B11' }],
    to: [{ id: 'RSButton', xinput: true }],
  },
  
  // LT
  {
    from: [{ id: 'B6' }],
    to: [{ id: 'LT', xinput: true }],
  },
  // RT
  {
    from: [{ id: 'B7' }],
    to: [{ id: 'RT', xinput: true }],
  },
  
  // LXLeft (from DPadL)
  {
    from: [{ id: 'A0', range: { from: 0, to: -1 } }],
    to: [{ id: 'LXLeft', xinput: true, range: { from: 0, to: 1 } }],
  },
  // LXRight (from DPadR)
  {
    from: [{ id: 'A0', range: { from: 0, to: 1 } }],
    to: [{ id: 'LXRight', xinput: true, range: { from: 0, to: 1 } }],
  },
  // LYDown (from DPadD)
  {
    from: [{ id: 'A1', range: { from: 0, to: 1 } }],
    to: [{ id: 'LXDown', xinput: true, range: { from: 0, to: 1 } }],
  },
  // LYUp (from DPadU)
  {
    from: [{ id: 'A1', range: { from: 0, to: -1 } }],
    to: [{ id: 'LXUp', xinput: true, range: { from: 0, to: 1 } }],
  },
]
