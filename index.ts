import chokidar from "chokidar";
import chalk from "chalk";
import { execSync } from "node:child_process";

function clearConsole() {
	process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
	console.clear();
}

function printNodeVersion() {
	console.log(chalk.dim(`Node ${process.version}`));
}

clearConsole();
printNodeVersion();
console.log(new Date());
console.log("Watching for changes...");

// todo: handle race conditions if a file is running and another one has to run
// keep a reference and discard result accordingly?

chokidar.watch("./scripts/*.{ts,js}").on("change", (path) => {
	clearConsole();

	console.log(chalk.dim(`Node ${process.version}`));
	console.log(new Date());
	console.log(chalk.dim(path));
	console.log();

	try {
		const result = execSync(`tsx --import ./polyfills/console.ts ${path}`, {
			encoding: "utf-8",
		});
		console.log(result);
	} catch (e) {
		console.log(e);
	}
});
