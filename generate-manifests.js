const fs = require('fs');
const path = require('path');

function generateManifests() {
  const baseUrl = 'https://raw.githubusercontent.com/vmashchenko/esp-web-tools/gh-pages';
  const firmwareDirs = ['16band', '21band'];
  
  firmwareDirs.forEach(dir => {
    const metadataPath = path.join('firmware', dir, 'metadata.json');
    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      
      metadata.versions.forEach(version => {
        const manifest = {
          name: `Spectrum Analyzer ${dir} v${version.version}`,
          version: version.version,
          builds: [
            {
              chipFamily: "ESP32",
              parts: [
                { 
                  path: `firmware/${dir}/${version.file}`,
                  offset: 0x10000
                }
              ]
            }
          ]
        };
        
        const manifestPath = path.join('firmware', dir, `firmware-${version.version}.json`);
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        console.log(`Generated manifest: ${manifestPath}`);
      });
    }
  });
  
  // Update the main firmware-XXband.json files to point to the latest version
  firmwareDirs.forEach(dir => {
    const metadataPath = path.join('firmware', dir, 'metadata.json');
    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      if (metadata.versions.length > 0) {
        const latest = metadata.versions[0]; // Assuming versions are sorted newest first
        const mainManifestPath = `firmware-${dir}.json`;
        const mainManifest = {
          name: `Spectrum Analyzer ${dir} (Latest: v${latest.version})`,
          version: latest.version,
          builds: [
            {
              chipFamily: "ESP32",
              parts: [
                { 
                  path: `firmware/${dir}/${latest.file}`,
                  offset: 0x10000
                }
              ]
            }
          ]
        };
        
        fs.writeFileSync(mainManifestPath, JSON.stringify(mainManifest, null, 2));
        console.log(`Updated main manifest: ${mainManifestPath}`);
      }
    }
  });
}

generateManifests();
