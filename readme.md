# differences calculator

![Node.js CI](https://github.com/paul-reed-smith/backend-project-lvl2/workflows/Node.js%20CI/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/5be4a664edc06ca02a0d/maintainability)](https://codeclimate.com/github/paul-reed-smith/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5be4a664edc06ca02a0d/test_coverage)](https://codeclimate.com/github/paul-reed-smith/backend-project-lvl2/test_coverage)

## Discription

This utility shows the difference between two configuration files.
Supported file formats: ini, yaml and json.
The output can be in the following formats: plain, pretty and json

## Instalation

Before installing, make sure you have [npm](https://www.npmjs.com/get-npm) and [node.js](https://nodejs.org/en/) installed.

```npm i -g paul-reed-smith-hexlet-two```

This will install package globaly

## Usage

```gendiff <first file> <second file> --format <format> (pretty for default)```

## examples of use

### Plain json - output 'pretty'

[![asciicast](https://asciinema.org/a/GT3ymQ4NJ1ADNsYN4cQg0YsQC.svg)](https://asciinema.org/a/GT3ymQ4NJ1ADNsYN4cQg0YsQC)

### Plain yaml - output 'pretty'

[![asciicast](https://asciinema.org/a/hXQXgLyMx65smHNfFn4ZuIEl4.svg)](https://asciinema.org/a/hXQXgLyMx65smHNfFn4ZuIEl4)

### Plain ini - output 'pretty'

[![asciicast](https://asciinema.org/a/dvaaIlnTIIthlytjBSMl8Vf1d.svg)](https://asciinema.org/a/dvaaIlnTIIthlytjBSMl8Vf1d)

### Nested json - output 'pretty'

[![asciicast](https://asciinema.org/a/xyt8xPmSZ9U7sxwU4UkoaeeqY.svg)](https://asciinema.org/a/xyt8xPmSZ9U7sxwU4UkoaeeqY)

### Nested ini - output 'plain'

[![asciicast](https://asciinema.org/a/jXSNzJKKFHzM6AJrRuvp6w2Vs.svg)](https://asciinema.org/a/jXSNzJKKFHzM6AJrRuvp6w2Vs)

### Nested yaml - output 'json'

[![asciicast](https://asciinema.org/a/YaBS4UTXl4slI0PN9R1nkZKur.svg)](https://asciinema.org/a/YaBS4UTXl4slI0PN9R1nkZKur)
