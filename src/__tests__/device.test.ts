import getDeviceDetails from '../index';
test('Dummy UA', () => {
    const dev = getDeviceDetails();
    expect(dev).toStrictEqual({
        "browser": { "engine": "WebKit 537.36", "name": "WebKit", "vendor": "Apple Computer, Inc.", "version": "537.36" }, "deviceName": "Windows Desktop", "hardware": {
            "cpu": { "architecture": "Unknown", "cores": 4, "name": "", "type": "Unknown" }, "gpu": {
                "name": "Unknown", "vendor":
                    "Unknown"
            }, "ram": { "size": 0, "unit": "GB" }, "screen": { "hasTouch": false, "height": 0, "touchPoints": 0, "width": 0 }
        }, "language": "en-US", "os": { "name": "Windows", "vendor": "Microsoft", "version": "32" }, "platform": { "model": "Unknown", "type": "desktop", "vendor": "Unknown" }
    });
});