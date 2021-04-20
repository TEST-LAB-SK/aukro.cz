# aukro.cz

## Installation

```shell
yarn install && yarn cypress verify
```

yarn can be downloaded from: `https://classic.yarnpkg.com/en/docs/install`

## Open Cypress UI for test environment

```shell
yarn cy:<project>:<config>:open
```

`<project>`:
 - `project` for aukro.cz project

 `<config>`: you can find all configs in `cypress/config`

## Execute tests headlessly

```shell
yarn cy:<project>:<config>:run -b chrome --headless
```

## Execute tests in docker

```shell
docker run -it -v $PWD:/e2e -w /e2e cypress/included:<version> -C cypress/config/<env>.json
```