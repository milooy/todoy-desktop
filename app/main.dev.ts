/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, globalShortcut } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async ({ isModal } = { isModal: false }) => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const webPreferences =
    process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
      ? {
          nodeIntegration: true
        }
      : {
          preload: path.join(__dirname, 'dist/renderer.prod.js')
        };

  // Browser 스타일
  mainWindow = isModal
    ? new BrowserWindow({
        show: false,
        // width: 1024,
        // height: 728,
        transparent: true,
        alwaysOnTop: true,
        // skipTaskbar: true,
        frame: false,
        // frame: true,
        webPreferences
      })
    : new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        titleBarStyle: 'hiddenInset',
        webPreferences
      });

  mainWindow.loadURL(
    `file://${__dirname}/app.html${isModal ? '?isModal=true' : ''}`
  );

  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  console.log('hi');
  createWindow();
  // 'CommandOrControl+X' 단축키 리스너 등록
  const ret = globalShortcut.register('CommandOrControl+shift+space', () => {
    createWindow({ isModal: true });
    console.log('CommandOrControl+X 눌러짐.');
  });

  if (!ret) {
    console.log('등록 실패');
  }

  // 단축키가 등록되었는지 확인합니다.
  console.log(globalShortcut.isRegistered('CommandOrControl+shift+space'));
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
