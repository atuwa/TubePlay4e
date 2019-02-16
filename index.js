"use strct";

// Electronのモジュール
const electron = require("electron");

// アプリケーションをコントロールするモジュール
const app = electron.app;
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow = null;

// 全てのウィンドウが閉じたら終了
app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on("ready", () => {
  //ウィンドウサイズを1280*720（フレームサイズを含まない）に設定する
  mainWindow = new BrowserWindow({width: 550, height: 500, useContentSize: true});
  //使用するhtmlファイルを指定する
  mainWindow.loadURL(`file://${__dirname}/localserver/index.html`);
  //mainWindow.loadURL('http://localhost:'+localserverport+'/index.html');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
// メインプロセスでやりとりするipcMain
const {ipcMain} = require('electron');
//asynchronous-messageチャンネルの受信処理
ipcMain.on('playNicoVideo', (event, vid) => {//これ
  console.log("playNicoVideo="+vid);//正常に出てた
  mainWindow.webContents.send('PNV', vid.toString());
  // event.senderに送信元のプロセスが設定されているので、asynchronous-replyチャンネルで文字列"pong"を非同期通信で送信元に送信
  //event.sender.send('asynchronous-reply', 'pong');
  // ※event.senderはwebContentsオブジェクトな
});