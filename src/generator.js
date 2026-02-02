import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// Necessary for ESM to handle paths correctly
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function generateProject({ projectName, language, database }) {
    const targetDir = path.join(process.cwd(), projectName);
    const templateDir = path.join(__dirname, '../templates');

    // 1. Check if directory exists
    if (fs.existsSync(targetDir)) {
        console.log(chalk.red(`Error: Directory ${projectName} already exists!`));
        process.exit(1);
    }

    try {
        // 2. Create the project folder
        await fs.ensureDir(targetDir);

        // 3. Copy Base Template (TS or JS)
        const baseTemplate = path.join(templateDir, `base-${language}`);
        await fs.copy(baseTemplate, targetDir);

        // 4. Handle Database Add-ons
        if (database === 'prisma') {
            await fs.copy(
                path.join(templateDir, 'addons/prisma'),
                path.join(targetDir, 'prisma') // Copies into a 'prisma' folder
            );
            // NOTE: In a real app, you would also inject dependencies into package.json here
        } else if (database === 'mongoose') {
            await fs.copy(
                path.join(templateDir, 'addons/mongoose'),
                path.join(targetDir, 'src/models') // Copies into 'src/models'
            );
        }

        // 5. Update package.json name
        const pkgPath = path.join(targetDir, 'package.json');
        if (await fs.pathExists(pkgPath)) {
            const pkg = await fs.readJson(pkgPath);
            pkg.name = projectName;
            await fs.writeJson(pkgPath, pkg, { spaces: 2 });
        }

        console.log(chalk.green('\n✅ Project successfully created!'));
        console.log(chalk.white(`\nNext steps:`));
        console.log(chalk.cyan(`  cd ${projectName}`));
        console.log(chalk.cyan(`  npm install`));
        console.log(chalk.cyan(`  npm run dev\n`));

    } catch (error) {
        console.error(chalk.red('Error generating project:'), error);
    }
}