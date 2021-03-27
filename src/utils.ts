import { DeviceDetails } from './models';

export function getComposedDetails(navigatorDetails: Navigator,
    parser: UAParser, canvas: HTMLCanvasElement, fallback: string): DeviceDetails {

    const parserResult = parser.getResult();
    return {
        language: getLanguage(navigatorDetails, fallback),
        deviceName: getDeviceName(parserResult),
        browser: getBrowser(navigatorDetails, parserResult, fallback),
        os: getOs(parserResult, fallback),
        hardware: getHardware(navigatorDetails, parserResult, canvas, fallback),
        platform: getPlatform(parserResult, fallback)
    };
}

function getDeviceName(browserDetails: UAParser.IResult) {
    const devType = getDeviceType(browserDetails).replace(/\b[a-z]/g, (x) => x.toUpperCase());
    let modelString = browserDetails.device.vendor ? browserDetails.device.vendor : '';
    modelString += browserDetails.device.model ? (modelString.length > 0 ? " " : "") +
        (browserDetails.device.model.length > 2 ? browserDetails.device.model : devType) : '';
    const os = (browserDetails.os.name ? browserDetails.os.name : '');
    modelString = modelString.length > 0 ? modelString : os
        + (os.length > 0 ? " " : "") + devType;
    return modelString;
}

function getLanguage(allDetails: Navigator, fallback: string): string {
    return withFallback(allDetails.language, fallback);
}

function getBrowser(allDetails: Navigator, browserDetails: UAParser.IResult, fallback: string) {
    return {
        vendor: allDetails.vendor,
        name: withFallback(browserDetails.browser.name, fallback),
        version: withFallback(browserDetails.browser.version, fallback),
        engine: browserDetails.engine.name ?
            (browserDetails.engine.name +
                (browserDetails.engine.version ? ' ' + browserDetails.engine.version : '')) : fallback
    };
}

function getOs(browserDetails: UAParser.IResult, fallback: string) {
    return {
        vendor: getOsVendor(browserDetails, fallback),
        name: withFallback(browserDetails.os.name, fallback),
        version: withFallback(browserDetails.os.version, '0.0'),
    };
}

function getOsVendor(browserDetails: UAParser.IResult, fallback: string) {
    const osToVendorMap = {
        'windows': 'Microsoft',
        'ios': 'Apple',
        'mac': 'Apple',
        'android': 'Google',

    };
    let osVendor;
    if (browserDetails.os.name) {
        const osname = browserDetails.os.name;
        Object.entries(osToVendorMap).forEach(([key, value]) => {
            if (osname.toLowerCase().includes(key)) {
                osVendor = value;
            }
        });
        if (osVendor) {
            return osVendor;
        } else {
            return osname;
        }
    } else {
        return fallback;
    }
}

function getHardware(allDetails: Navigator, browserDetails: UAParser.IResult,
    canvas: HTMLCanvasElement, fallback: string) {

    return {
        cpu: {
            name: '',
            architecture: withFallback(browserDetails.cpu.architecture, fallback),
            type: getOsType(browserDetails, fallback),
            cores: allDetails.hardwareConcurrency,
        },
        ram: getRam(allDetails),
        screen: getScreen(allDetails),
        gpu: getGPU(canvas, fallback)
    }
}

function getRam(allDetails: Navigator) {
    let ram: number = ((allDetails as any).deviceMemory);
    ram = ram ? ram : 0;
    return {
        size: ram,
        unit: "GB"
    }
}

function getOsType(browserDetails: UAParser.IResult, fallback: string) {
    if (browserDetails.cpu.architecture) {
        if (browserDetails.cpu.architecture.toLowerCase().includes('64')) {
            return "64 Bit";
        } else {
            return "32 Bit";
        }
    } else {
        return fallback;
    }
}

function getGPU(canvas: HTMLCanvasElement, fallback: string) {
    let gl: any;
    let gpuName;
    try {
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    } catch (e) {
        gpuName = undefined;
    }
    if (gl) {
        const gpu: string = gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL);
        gpuName = parseGpuInfo(gpu);
    }
    return {
        vendor: gpuName ? (gpuName.slice(0, gpuName.indexOf(' '))) : fallback,
        name: gpuName ? gpuName : fallback
    };
}

function extractValue(reg: any, str: string) {
    const matches = str.match(reg);
    return matches && matches[0];
}

function parseGpuInfo(renderer: any): string {
    return (extractValue(/(NVIDIA|AMD|Intel)\D*\d*\S*/, renderer) || renderer).trim();
}

function getScreen(allDetails: Navigator) {
    return {
        height: window.screen.height,
        width: window.screen.width,
        hasTouch: allDetails.maxTouchPoints > 0,
        touchPoints: allDetails.maxTouchPoints ? allDetails.maxTouchPoints : 0
    };
}

function getPlatform(browserDetails: UAParser.IResult, fallback: string) {
    return {
        model: withFallback(browserDetails.device.model, fallback),
        type: getDeviceType(browserDetails),
        vendor: withFallback(browserDetails.device.vendor, fallback)
    };
}

function getDeviceType(browserDetails: UAParser.IResult) {
    if (browserDetails.device.type) { return browserDetails.device.type; }
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return "mobile";
    }
    return "desktop";
}

function withFallback(detail: string | undefined, fallback: string) {
    return (detail ? detail : fallback);
}