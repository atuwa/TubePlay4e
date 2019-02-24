var gulp = require("gulp");
var winInstaller = require('electron-windows-installer');
gulp.task('create_windows_installer', function(done) {
  winInstaller({
    appDirectory: './TubePlayForElectron-win32-x64',
    outputDirectory: './windows_installer',
    iconUrl: 'file://' + __dirname + + 'assets/icon.png'
  }).then(done).catch(done);
});