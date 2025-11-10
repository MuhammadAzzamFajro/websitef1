# websitef1

A modern web application dedicated to Formula 1, providing details on drivers, teams, race schedules, and championship standings. Built with a focus on a responsive and dynamic user experience.

## Features

*   **Drivers Section:** View details and profiles of Formula 1 drivers.
*   **Teams Section:** Explore information about the F1 constructors and their history.
*   **Race Calendar:** Access the complete F1 race schedule with dates and locations.
*   **Standings Overview:** Check current driver and constructor championship standings.
*   **Responsive UI:** Optimized for various screen sizes using a modern component library.
*   **Interactive Components:** Engaging UI elements for a richer user experience.

## Technologies Used

This project leverages a robust set of modern web development technologies:

*   **Frontend Framework:** [React](https://react.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/) - Reusable and accessible UI components built with Radix UI and Tailwind CSS.
*   **Linting:** [ESLint](https://eslint.org/) - For maintaining code quality and consistency.
*   **Package Manager:** [npm](https://www.npmjs.com/) (alternatively [Bun](https://bun.sh/))

## Installation

To get this project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/websitef1.git
    cd websitef1
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Alternatively, using Bun:
    ```bash
    bun install
    ```

## Usage

### Development Server

To start the development server:

Using npm:
```bash
npm run dev
```
Alternatively, using Bun:
```bash
bun dev
```

This will typically open the application at `http://localhost:5173` (or another port if 5173 is in use).

### Build for Production

To create a production-ready build:

Using npm:
```bash
npm run build
```
Alternatively, using Bun:
```bash
bun build
```

The compiled static files will be located in the `dist` directory.

### Code Linting

To lint the code:

Using npm:
```bash
npm run lint
```
Alternatively, using Bun:
```bash
bun lint
```

## Project Structure

```
.
├── public/                # Static assets (favicon, robots.txt)
├── src/
│   ├── assets/            # Project images
│   ├── components/        # Reusable React components (DriversSection, Footer, Hero, etc.)
│   │   └── ui/            # Shadcn UI components (accordion, button, card, dialog, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page-specific components (Drivers, Index, Schedule, Standings, Teams)
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Entry point for the React application
│   └── index.css          # Global styles
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite build tool configuration
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── ...
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is open-source and available under the [MIT License](LICENSE).
