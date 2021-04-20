/// <reference types="cypress" />
// ***********************************************************
// Extends support of cypress.json
// ***********************************************************

import * as deepmerge from 'deepmerge'
import * as path from 'path'

function extendsConfig(config) {
  var mergedConfig = mergeConfig(config.configFile)
  if(mergedConfig.screenshotsFolder) {
    mergedConfig.screenshotsFolder = path.join(config.projectRoot, mergedConfig.screenshotsFolder)
  }
  if(mergedConfig.videosFolder) {
    mergedConfig.videosFolder = path.join(config.projectRoot, mergedConfig.videosFolder)
  }

  return deepmerge(config, mergedConfig)
}

function mergeConfig(configPath) {
  var config = require(configPath)
  if (config.extends) {
    const baseConfigPath = path.join(path.dirname(configPath), config.extends)
    const baseConfig = mergeConfig(baseConfigPath)
    config = deepmerge(baseConfig, config)
  }

  return config
}

module.exports = extendsConfig
