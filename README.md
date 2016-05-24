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

# API
### sleep(ms)

### adbshell(cmd)

### clearAppData(pkg)

### click(x, y)

### getFocusedPackageAndActivity()

### getCurrentPackageName()

### getCurrentActivity()

### dumpUI()

### startActivity(component)

### pullFile(source, target)