# make-deps-exact ![npm](https://img.shields.io/npm/v/make-deps-exact)

Removes version range from package.json

Currently it only supports reading from package-lock.json file to replace the package.json version

## Installation

```shell
npm install make-deps-exact
```

## Usage

Uses current working directory's package.json and package-lock.json

```shell
make-deps-exact [...opts]
  --skip-git    skip git+ssh protocol
  --dry         do not write to package.json
  --help        show help message
```

## Contributing

We follow the [conventional commits specs](https://www.conventionalcommits.org/en/v1.0.0/).
