## Installation

```
$ npm install
```

## Usage

- `npm run start` Starts the playground.
- `npm run dev` Starts the playground in watch mode.
- `npm run create-random-script` Creates a new random script in the `scripts` folder.
- `npm run remove-all-scripts` Removes all scripts in the `scripts` folder.

Aditionally, you can run the scripts conveniently using the Task Runner in VSCode.

## TODO

- [x] implement task to run on save and share the same terminal so that you dont need to use chokidar
  - there is no feature in vscode to run a task on save (there's a run on folder open though)
- [x] this should also work for javascript
- [x] improve and pretty print errors (maybe with https://github.com/unjs/consola)
  - [x] syntax errors
  - [x] runtime errors
