# make-deps-exact

Removes version range from package.json

Currently it only supports reading from package-lock.json file to replace the package.json version

## Installation

```shell
npm install make-deps-exact
```

## Usage

```shell
cd go-to-npm-project
make-deps-exact

# display changes but doesn't write to package.json
make-deps-exact --dry

# skip git+ssh protocol
make-deps-exact --skip-git
```
