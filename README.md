# 🚀 turbo-init

**High-speed, opinionated backend scaffolding for modern developers.**

`turbo-init` is a CLI utility designed to eliminate the "boring" part of starting a new project. In seconds, it scaffolds a production-ready Node.js backend with your choice of TypeScript/JavaScript, Database ORMs, and a clean folder structure.

## ✨ Features

- **⚡ Blazing Fast:** Go from zero to a running server in under 30 seconds.
- **TypeScript First:** Built with first-class support for TypeScript (and JS for the purists).
- **Modular Architecture:** Choose your weapon—**Prisma (PostgreSQL)** or **Mongoose (MongoDB)**.
- **Production Ready:** Includes a pre-configured `/health` route, CORS, and environment variable setup.
- **Clean Slate:** No bloat. Just the essential folder structure and dependencies you actually need.

---

## 🛠️ Quick Start

You don't even need to install it. Just run:

```bash
npx @sayoun/turbo-init
```

### What happens next?

1. **Name your project:** Set your directory name.
2. **Pick your language:** Choose between TypeScript or JavaScript.
3. **Select your DB:** Pick Prisma, Mongoose, or "None" for a pure logic API.
4. **Launch:** The tool assembles your files, updates your `package.json`, and gets you ready to code.

---

## 📦 What's in the Box?

When you generate a project, `turbo-init` delivers a standardized architecture designed for scalability:

```text
my-backend-app/
├── src/
│   ├── index.ts        # Entry point with Express setup
│   ├── routes/         # API Route definitions
│   ├── controllers/    # Business logic
│   └── models/         # Database schemas (Prisma/Mongoose)
├── .env                # Pre-configured environment variables
├── .gitignore          # Essential git ignores
├── tsconfig.json       # Optimized TS configuration
└── package.json        # Clean scripts (dev, build, start)
```

---

## 🚀 Roadmap

- [ ] Add **Docker** support (one-click Dockerfile generation).
- [ ] Add **JWT Auth** boilerplate option.
- [ ] Add **Redis** integration for caching.
- [ ] Support for **Fastify** as an alternative to Express.

---

## 🤝 Contributing

This is an open-source project. If you have ideas for better boilerplates or features, feel free to:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

**Built with ⚡ by [Sayoun Parui](https://github.com/your-github-username)**
