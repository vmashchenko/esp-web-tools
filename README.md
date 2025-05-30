# ESP Web Tools - Spectrum Analyzer

This is a web-based tool for flashing Spectrum Analyzer firmware to ESP32 devices.

## Features

- Support for multiple firmware versions
- 16-band and 21-band spectrum analyzer firmware variants
- Detailed version information and release notes
- Simple and intuitive web interface

## How to Add New Firmware Versions

1. Place your firmware binary in the appropriate directory:
   - `firmware/16band/` for 16-band versions
   - `firmware/21band/` for 21-band versions

2. Update the corresponding `metadata.json` file with the new version information:
   ```json
   {
     "versions": [
       {
         "file": "21band-v1.0.1.bin",
         "version": "1.0.1",
         "date": "2025-05-30",
         "description": "Improved FFT algorithm for better frequency response",
         "size": 526300
       },
       // Add new versions above this line
     ]
   }
   ```

3. Run `node generate-manifests.js` to update the firmware manifests

4. Commit and push your changes

## Development

To test locally, you can use any static file server. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## License

MIT
