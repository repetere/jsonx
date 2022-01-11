# [1.11.0](https://github.com/repetere/jsonx/compare/v1.10.5...v1.11.0) (2022-01-11)


### Features

* full support for express template rendering ([e6713d2](https://github.com/repetere/jsonx/commit/e6713d278f629252f62cba9b46839d80f8511873))

## [1.10.5](https://github.com/repetere/jsonx/compare/v1.10.4...v1.10.5) (2022-01-11)


### Bug Fixes

* node builtins rollup warnings from npm audit ([a1101c3](https://github.com/repetere/jsonx/commit/a1101c3da1cf8392976fc2831a8982c5f3a7441e))

## [1.10.4](https://github.com/repetere/jsonx/compare/v1.10.3...v1.10.4) (2022-01-10)


### Bug Fixes

* updated typescript error handling ([dd86673](https://github.com/repetere/jsonx/commit/dd866733885826d4e5c99a6c3d34c70c2302ba6b))

## [1.10.3](https://github.com/repetere/jsonx/compare/v1.10.2...v1.10.3) (2021-05-12)


### Bug Fixes

* error handling for generating function components ([21fe78a](https://github.com/repetere/jsonx/commit/21fe78a9ffac8009745f527dde8a03177f9c642b))

## [1.10.2](https://github.com/repetere/jsonx/compare/v1.10.1...v1.10.2) (2021-05-11)


### Bug Fixes

* cascading context for custom libraries and components ([1de4d8c](https://github.com/repetere/jsonx/commit/1de4d8c391c990b310dbaf6b6c8b2fc5a8702460))

## [1.10.1](https://github.com/repetere/jsonx/compare/v1.10.0...v1.10.1) (2021-05-08)


### Bug Fixes

* fixed custom component generation ([0d4ef98](https://github.com/repetere/jsonx/commit/0d4ef98da5808e8b847e9d73348383b47d4cbdaa))

# [1.10.0](https://github.com/repetere/jsonx/compare/v1.9.2...v1.10.0) (2021-05-07)


### Features

* invoked inline functional components and generated custom components ([fb3fb0a](https://github.com/repetere/jsonx/commit/fb3fb0af9270628340aef2873b05c393703a515c))

## [1.9.2](https://github.com/repetere/jsonx/compare/v1.9.1...v1.9.2) (2021-04-27)


### Bug Fixes

* react hook form update fix ([45676c8](https://github.com/repetere/jsonx/commit/45676c8428d8a0abd3ae51bd14851228782153e0))

## [1.9.1](https://github.com/repetere/jsonx/compare/v1.9.0...v1.9.1) (2021-03-27)


### Bug Fixes

* **express:** adding express view tests ([1aee24f](https://github.com/repetere/jsonx/commit/1aee24ff6775ebafec9549148925c7c0feba67ee))

# [1.9.0](https://github.com/repetere/jsonx/compare/v1.8.1...v1.9.0) (2021-03-25)


### Features

* **build:** adding legacy e6 builds ([114ffd2](https://github.com/repetere/jsonx/commit/114ffd257890b4ab17bbd8f707eda20880775b6d))

## [1.8.1](https://github.com/repetere/jsonx/compare/v1.8.0...v1.8.1) (2021-03-25)


### Bug Fixes

* **props:** fixed passing props on simple syntax and mixed syntax components ([8e425a7](https://github.com/repetere/jsonx/commit/8e425a7f218b5a4753a93db0e859bd3f57c80a22))

# [1.8.0](https://github.com/repetere/jsonx/compare/v1.7.0...v1.8.0) (2021-03-25)


### Features

* **props:** updated __spreadComponent to include __idx, passprops- as a list, added useremoveprops and useincludeprops ([ddce4fa](https://github.com/repetere/jsonx/commit/ddce4fa62d70bda3c638aee3dee675060459c4e4))

# [1.7.0](https://github.com/repetere/jsonx/compare/v1.6.1...v1.7.0) (2021-03-24)


### Features

* **form:** helper methods for react hook form ([021aca8](https://github.com/repetere/jsonx/commit/021aca8afb9bc2e956d72b0683708a1c582b776d))

## [1.6.1](https://github.com/repetere/jsonx/compare/v1.6.0...v1.6.1) (2021-03-23)


### Bug Fixes

* React 17 JSX transform change for functional components ([37eaf46](https://github.com/repetere/jsonx/commit/37eaf467309b36eb45dd131e962e39a851182ef7))

# [1.6.0](https://github.com/repetere/jsonx/compare/v1.5.0...v1.6.0) (2021-03-23)


### Features

* **components:** fix for makeFunctionComponent to allow for more flexible components ([3e15f00](https://github.com/repetere/jsonx/commit/3e15f0013d62561a7c5d69bfb44824cc59ec52d2))

# [1.5.0](https://github.com/repetere/jsonx/compare/v1.4.2...v1.5.0) (2021-03-21)


### Features

* **lang:** moved completely to TypeScript ([1e51e07](https://github.com/repetere/jsonx/commit/1e51e07fe64f363ced6a72427119304537a4375c))

# Changelog

## 3.0.0 (2019-04-20)

- **Chore**
  - Update Documentation

## 2.6.0 (2019-04-19)

- **Feat**
  - Added new compilation options jsonx.compile, jsonx.outputJSON, jsonx.outputHTML, jsonx.outputJSX
- **Fix**
  - pass functions in jsonx object values
- **Chore**
  - added new benchmark tests

## 2.2.0 (2019-04-01)

- **Feat**
  - Added React.lazy support
  - Added React.Suspense support
- **Fix**
  - Named class support via options
  - passing state and props to class render component via options
- **Chore**
  
## 2.1.0 (2019-04-01)

- **Feat**
- **Fix**
  - Improved inline function support
  - Improved debugging support
  - Automated parameter detection
- **Chore**
  - Update Documentation

## 2.0.0 (2019-03-29)

- **Feat**
  - Added support for Function Components
  - Added support for Hooks
- **Fix**
  - Supports refs on __functionProps
- **Chore**
  - Update Documentation
