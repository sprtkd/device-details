import { UAParser } from 'ua-parser-js';
import { DeviceDetails, GetDeviceOptions } from "./models";
import { getComposedDetails } from './utils';

export default function getDeviceInfo(options?: GetDeviceOptions): DeviceDetails {
    const navigatorDetails = (options?.navigator) ? options.navigator : window.navigator;
    const fallback = (options?.fallback) ? options.fallback : "Unknown";
    const parser = (options?.navigator) ? new UAParser(options.navigator.userAgent) : new UAParser();
    const canvas = (options?.canvas) ? options.canvas : document.createElement('canvas');
    return getComposedDetails(navigatorDetails, parser, canvas, fallback);
}

module.exports = getDeviceInfo;
