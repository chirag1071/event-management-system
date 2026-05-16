const fs = require('fs');
const path = require('path');

function checkFileCase(filePath) {
    const dir = path.dirname(filePath);
    const base = path.basename(filePath);
    try {
        const files = fs.readdirSync(dir);
        if (!files.includes(base)) {
            const actualFile = files.find(f => f.toLowerCase() === base.toLowerCase());
            console.log(`Mismatch: Expected '${base}', Found '${actualFile}' at ${filePath}`);
        }
    } catch(e) {}
}

function traverse(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        if (f === 'node_modules' || f === '.git' || f === 'dist') continue;
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            traverse(p);
        } else if (p.endsWith('.jsx') || p.endsWith('.js') || p.endsWith('.ts')) {
            const content = fs.readFileSync(p, 'utf-8');
            
            // import something from './File'
            const regex = /import\s+(?:.*?\s+from\s+)?['"]([^'"]+)['"]/g;
            let match;
            while ((match = regex.exec(content)) !== null) {
                const importPath = match[1];
                if (importPath.startsWith('.')) {
                    const resolved = path.resolve(dir, importPath);
                    const exts = ['', '.js', '.jsx', '.ts', '.tsx', '.css'];
                    for (const ext of exts) {
                        const testPath = resolved + ext;
                        if (fs.existsSync(testPath)) {
                            checkFileCase(testPath);
                            break;
                        }
                    }
                }
            }
        }
    }
}

console.log("Checking imports...");
traverse(path.resolve('./src'));
console.log("Done.");
