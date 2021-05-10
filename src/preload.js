const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('WindowControls', {
    minimize: async () => ipcRenderer.invoke('WindowControls-minimize'),
    toggleMaximization: async () => ipcRenderer.invoke('WindowControls-toggleMaximization'),
    restart: async () => ipcRenderer.invoke('WindowControls-restart'),
    close: async () => ipcRenderer.invoke('WindowControls-close')
})
