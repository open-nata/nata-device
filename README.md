nata-device
=====

<p align="center"><a href="http://mclspace.com" target="_blank"><img width="400" src="http://7pun7p.com1.z0.glb.clouddn.com/image/nata-banner.png"></a></p>


<!-- <p align="center">
    <a href="https://travis-ci.org/open-nata/nata-device/branches"><img src="https://img.shields.io/travis/open-nata/nata-device.svg" alt="Build Status"></a>
    <a href="https://codecov.io/gh/open-nata/nata-device/branches"><img src="https://img.shields.io/codecov/c/github/open-nata/nata-device.svg" alt="Coverage Status"></a>
</p> -->

---------------------------------------------------------------------
**nata-device** is an abstract of android device based on [adbkit](https://github.com/openstf/adbkit), which provides high level api such as click ,textinput and much more.


# Requirements
- Nodejs >= 4.3.2
- adb

# Getting started
```
$ npm install --save nata-device
```

# Example
First make sure that the device with deviceId is connnected to the computer and can access by adb,then 

```
import Device from 'nata-device'

const deviceId = 'xxxxx'
const device = new Device(deviceId)
const component = 'SamplePackage/.sampleActivity'

device.startActivity(component).then(() => {
  console.log('done')
})

```

# API
### constructor(deviceId)
The constructor of Device class
```
import Device from 'nata-device'

const deviceId = 'xxxxx'
const device = new Device(deviceId)
```

### sleep(ms)
   * sleep for ms time
   * @param  {Integer} ms time in ms
   * @return {Promise} 

### adbshell(cmd)
  * run adb shell commmand and get the output
  * @param  {String} cmd command to run
  * @return {Promise}

### clearAppData(pkg)
   * clear app data of pkg
   * @param  {String} pkg - pkg to be cleared
   * @return {Promise}     wheather success to delete

### click(x, y)
   * click (x,y)
   * @param  {String} x - coordinate x
   * @param  {String} y - coordinate y
   * @return {Promise}

### sendKeyEvent(keycode)
   * send key event from https://developer.android.com/reference/android/view/KeyEvent.html
   * @param  {String} keycode keycode from Android
   * @return {Promise} 

### back()
  * press back key of the device
  * @return {Promise}

### getFocusedPackageAndActivity()
   * get current focused package and activity
   * @return {Promise}

### getCurrentPackageName()
   * get current package name
   * @return {Promise}

### getCurrentActivity()
   * get current activity
   * @return {Promise}

### dumpUI(target)
   * Dump ui xml and pull it to target file(default :local temp file)
   * @return {Promise} resolve the target xml file

### startActivity(component)
   * start activity
   * @param  {String} component pkg/act
   * @return {Promise}

### pullFile(source, target)
   * pull file from device to local file system
   * @param  {String} source src file path of the device
   * @param  {String} target target file path of the local file system
   * @return {Promise} target file path

### getOnlineDevices()
   * get online connected devices
   * devices An array of device objects. Device { id , type : enum[emulator, device, offline]}
   * @return {Promise }

### shell(cmd)
   * Static
   * run shell command and get the output
   * @param  {String} cmd to run
   * @return {Promise}

### logcat()
   * get [adbkit-logcat](https://www.npmjs.com/package/adbkit-logcat) client
   * @return {client}

<!-- ### getPermissionsFromApk(apk)
   * Static
   * get permissions of apk, make sure you can call aapt from command line
   * @param  {String} apk path
   * @return {String} -->

### getPermissions(pkg)
   * getPermissions pkg
   * @param  {String} pkg package of the app
   * @return {Promise} permissions [String]

### getGrantedPermissions(pkg) 
   * adb shell dumpsys package com.cvicse.zhnt | grep android.permission
   * get granted permissions
   * @param  {String} pkg package of the app
   * @return {Promise} permissions [String] granted permissions

### getNotGrantedPermissions(pkg)
   * get not granted permissions
   * @param  {String} pkg package of the app
   * @return {Promise} notGrantedPermissions [String] not granted permissions
  
### install(apk)
   * install apk
   * @param  {String} apk path
   * @return {Promise}
  
