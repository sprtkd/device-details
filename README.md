
# device-details

![GitHub](https://img.shields.io/github/license/sprtkd/device-details)
![Issues](https://img.shields.io/github/issues/sprtkd/device-details)
![npm](https://img.shields.io/npm/v/device-details)
![Followers](https://img.shields.io/github/followers/sprtkd?style=social)
![Stars](https://img.shields.io/github/stars/sprtkd/device-details?style=social)


# Get device details directly from browser.  
device-details uses already robust [UAParser.js](https://www.npmjs.com/package/ua-parser-js)

## No need of installers for most common device details

###  '**device-details**' uses the Navigator API to get device information right from **browser!**

# Demo
## [Check out our live demo](https://frontarm.com/demoboard/?id=80ab32ff-992b-4f4d-ac33-dc644f57c832)

# Information Available

## JSON structure (DeviceDetails interface)

```yaml
{
  language: string,
  browser: { vendor: string, name: string, version: string, engine: string },
  os: { vendor: string, name: string, version: string },
  hardware:
    {
      cpu: { name: string, architecture: string, type: string, cores: number },
      ram: { size: number, unit: string },
      screen: { height: number, width: number, hasTouch: boolean, touchPoints: number },
      gpu: { vendor: string, name: string },
    },
  platform: { model: string, type: string, vendor: string },
  deviceName: string,
}
```

## Usage

```yaml
import  getDeviceDetails  from 'device-details';
import { DeviceDetails } from "device-details/lib/models";

console.log(getDeviceDetails());
```

## Output

```yaml
{
  'language': 'en-US',
  'deviceName': 'Windows Desktop',
  'browser': { 'vendor': 'Google Inc.', 'name': 'Chrome', 'version': '89.0.4389.90', 'engine': 'Blink 89.0.4389.90' },
  'os': { 'vendor': 'Microsoft', 'name': 'Windows', 'version': '10' },
  'hardware':
    {
      'cpu': { 'name': '', 'architecture': 'amd64', 'type': '64 Bit', 'cores': 4 },
      'ram': { 'size': 8, 'unit': 'GB' },
      'screen': { 'height': 768, 'width': 1366, 'hasTouch': false, 'touchPoints': 0 },
      'gpu': { 'vendor': 'Intel(R)', 'name': 'Intel(R) HD Graphics 520' },
    },
  'platform': { 'model': 'Unknown', 'type': 'desktop', 'vendor': 'Unknown' },
}
```

## Options

```yaml
{ fallback?: string, //fallback string, ? if any item is missing ('Unknown' by default)
    navigator?
  : Navigator, //navigator object, ? if wanted to be passed externally
    canvas?
  : HTMLCanvasElement, //canvas object, if wanted to be passed externally }
```

## API

```yaml
function  getDeviceDetails(options?: GetDeviceOptions): DeviceDetails
```
