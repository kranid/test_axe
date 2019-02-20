// An example configuration file.
exports.config = {

  seleniumServerJar: './../node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.141.59.jar',
  port: 4445,
  //version and type of a binary may vary depends on OS type, check the binary version after npm install
  chromeDriver: './../node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.46.exe',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
  },
  baseUrl: 'http://devdemo.competentum.com/PEsci_PhysioEx/exercise-1/ex01act0',


  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['spec.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    showColor: true,
    defaultTimeoutInterval: 12000000
  }
};
