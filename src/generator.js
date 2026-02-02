import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

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
        console.log(chalk.white(`\n📂 Setting up project structure...`));
        // 2. Create the project folder
        await fs.ensureDir(targetDir);

        // 3. Copy Base Template
        const baseTemplate = path.join(templateDir, `base-${language}`);
        await fs.copy(baseTemplate, targetDir);

        // 4. Handle Database Add-ons
        let dbDependencies = {};

        if (database === 'prisma') {
            console.log(chalk.white(`🔌 Configuring Prisma (PostgreSQL)...`));

            // Allow override of files (e.g., config/database.ts)
            await fs.copy(
                path.join(templateDir, 'addons/prisma'),
                targetDir,
                { overwrite: true }
            );

            // Move/Rename specific files if needed (e.g. database.ts -> src/config/database.ts)
            // But if we structure addons/prisma to have src/config/database.ts inside it, simple copy works.
            // Let's assume addons/prisma/database.ts needs to go to src/config/database.ts
            // The previous code copied to 'prisma' folder, which is correct for schema.prisma but not for database.ts connection logic.
            // We need to be careful here.

            // Manual copy for connection logic:
            if (language === 'ts') {
                await fs.copy(
                    path.join(templateDir, 'addons/prisma/database.ts'),
                    path.join(targetDir, 'src/config/database.ts'),
                    { overwrite: true }
                );
            }
            // For now, let's keep the prisma folder copy too if it has other things
            await fs.copy(
                path.join(templateDir, 'addons/prisma'),
                path.join(targetDir, 'prisma'), // Keep schema.prisma separate
                { filter: (src) => !src.endsWith('database.ts') }
            );


            dbDependencies = {
                "prisma": "^5.12.1",
                "@prisma/client": "^5.12.1"
            };

        } else if (database === 'mongoose') {
            console.log(chalk.white(`🔌 Configuring Mongoose (MongoDB)...`));

            if (language === 'ts') {
                await fs.copy(
                    path.join(templateDir, 'addons/mongoose/database.ts'),
                    path.join(targetDir, 'src/config/database.ts'),
                    { overwrite: true }
                );
            }

            // Copy models if any
            await fs.copy(
                path.join(templateDir, 'addons/mongoose'),
                path.join(targetDir, 'src/models'),
                { filter: (src) => !src.endsWith('database.ts') }
            );

            dbDependencies = {
                "mongoose": "^8.3.0"
            };
        }

        // 5. Update package.json
        const pkgPath = path.join(targetDir, 'package.json');
        if (await fs.pathExists(pkgPath)) {
            const pkg = await fs.readJson(pkgPath);
            pkg.name = projectName;

            // Inject dependencies
            pkg.dependencies = {
                ...pkg.dependencies,
                ...dbDependencies
            };

            await fs.writeJson(pkgPath, pkg, { spaces: 2 });
        }

        // 6. Install Dependencies
        console.log(chalk.yellow(`\n📦 Installing dependencies (this might take a moment)...`));
        try {
            execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
        } catch (installErr) {
            console.error(chalk.red('Failed to install dependencies. You might need to run npm install manually.'));
        }

        // 7. Prisma specific init (Optional: npx prisma generate)
        if (database === 'prisma') {
            console.log(chalk.yellow(`\n🧱 Generating Prisma Client...`));
            try {
                execSync('npx prisma generate', { cwd: targetDir, stdio: 'inherit' });
            } catch (prismaErr) {
                console.warn(chalk.yellow('Could not run prisma generate. Check if schema is valid.'));
            }
        }

        console.log(chalk.green('\n✅ Project successfully created!'));
        console.log(chalk.white(`\nNext steps:`));
        console.log(chalk.cyan(`  cd ${projectName}`));
        console.log(chalk.cyan(`  npm run dev\n`));

    } catch (error) {
        console.error(chalk.red('Error generating project:'), error);
    }
}
