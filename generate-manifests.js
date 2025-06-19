const fs = require('fs');
const path = require('path');

function generateManifests() {
  const baseUrl = 'https://raw.githubusercontent.com/vmashchenko/esp-web-tools/gh-pages';
  const firmwareDirs = ['14band', '16band', '21band'];
  
  firmwareDirs.forEach(dir => {
    const metadataPath = path.join('firmware', dir, 'metadata.json');
    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      
      metadata.versions.forEach(version => {
        const manifest = {
          name: `Spectrum Analyzer ${dir} v${version.version}`,
          version: version.version,
          new_install_prompt_erase: true,
          builds: [
            {
              chipFamily: "ESP32",
              parts: [
                { 
                  path: `firmware/${dir}/${version.file}`,
                  offset: 0x0
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
        // We only need the version-specific manifests in the firmware directory
        // No need to generate root-level manifest files
        console.log(`Processed ${dir} firmware versions`);
      }
    }
  });
}

generateManifests();
