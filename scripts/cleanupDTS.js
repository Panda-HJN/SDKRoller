import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';

// 获取当前文件所在的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 遍历要处理的目录
const dirsToProcess = ['cjs', 'es', 'umd'];

dirsToProcess.forEach(dir => {
    const typesDir = path.join(__dirname, `../dist/${dir}/types`);
    traverseDirectory(typesDir);
});

function traverseDirectory(directory) {
    fs.readdir(directory, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Error reading directory', err);
            return;
        }

        files.forEach(file => {
            const fullPath = path.join(directory, file.name);

            if (file.isDirectory()) {
                traverseDirectory(fullPath);
            } else if (/\.d\.ts$/.test(file.name)) {
                fs.readFile(fullPath, 'utf8', (err, content) => {
                    if (err) {
                        console.error('Error reading file', err);
                        return;
                    }

                    const updatedContent = content.replace(/import .*;/g, '');

                    fs.writeFile(fullPath, updatedContent, 'utf8', err => {
                        if (err) {
                            console.error('Error writing file', err);
                            return;
                        }

                        console.log(`Updated ${fullPath}`);
                    });
                });
            }
        });
    });
}
