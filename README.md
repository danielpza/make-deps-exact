# make-deps-exact [![npm](https://img.shields.io/npm/v/make-deps-exact)](https://www.npmjs.com/package/make-deps-exact)

Removes version range from package.json

Currently it only supports reading from package-lock.json file to replace the package.json version

## Installation

```shell
npm install make-deps-exact
```

## Usage

Uses current working directory's package.json and package-lock.json

```
make-deps-exact [...opts] [...patterns]
  --skip-git    skip git+ssh protocol
  -d,--dry      do not write to package.json
  -q,--quiet    do not output changes to console
  -h,--help     show help message
```

Pass a list of expressions if you want to only remove the semver from certain packages and not every package:

```
make-deps-exact eslint* typescript
```

## Contributing

We follow the [conventional commits specs](https://www.conventionalcommits.org/en/v1.0.0/).

### Publishing new changes

```shell
npm run release
git push origin master --follow-tags
npm publish
```
