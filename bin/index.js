#!/usr/bin/env node
import { input, select } from '@inquirer/prompts';
import chalk from 'chalk';
import { generateProject } from '../src/generator.js';

async function init() {
    console.log(chalk.blue.bold('\n🚀  Welcome to the Ultimate Backend Scaffolder  🚀\n'));

    // 1. Ask for Project Name
    const projectName = await input({
        message: 'What is the name of your project?',
        default: 'my-app',
        validate: (value) => {
            if (/^[a-z0-9\-_]+$/.test(value)) return true;
            return 'Name must be lowercase, numbers, underscores or dashes only.';
        },
    });

    // 2. Ask for Language
    const language = await select({
        message: 'Which language do you want to use?',
        choices: [
            { name: 'TypeScript', value: 'ts' },
            { name: 'JavaScript', value: 'js' },
        ],
    });

    // 3. Ask for Database
    const database = await select({
        message: 'Which database do you want to use?',
        choices: [
            { name: 'PostgreSQL (Prisma)', value: 'prisma' },
            { name: 'MongoDB (Mongoose)', value: 'mongoose' },
            { name: 'None', value: 'none' },
        ],
    });

    // 4. Start Generation
    console.log(chalk.cyan(`\n🛠️  Scaffolding your ${language} project with ${database}...\n`));

    await generateProject({ projectName, language, database });
}

init().catch((err) => {
    console.error(chalk.red(err));
});