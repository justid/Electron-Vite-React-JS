# Electron-Vite-React-JS

Electron + Vite + React template.

## Overview

1. Ready out of the box  
2. Based on [vite-plugin-electron](https://github.com/electron-vite/vite-plugin-electron) and the official [template-react-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
3. Supports Node.js API in the renderer process
4. Supports React devTools

## Install

```sh
git clone https://github.com/justid/Electron-Vite-React-JS.git
cd Electron-Vite-React-JS
yarn install
```

## Develop

```sh
yarn dev
```

## Build

```sh
yarn build
```

## Directory structure

```tree
├── electron                       Electron-related code
│   ├── main                       Main-process source code
│   ├── preload                    Preload-scripts source code
│   └── electron-builder.json5     Build config file
│
├── release                        Generated after production build, contains executables
│   └── {version}
│       ├── {os}-unpacked          Contains unpacked application executable
│
├── public                         Static assets
└── src                            Renderer source code, your React application
```
