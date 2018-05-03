// An example configuration file.
exports.config = {
  seleniumAddress: 'http://segrid1:4444/wd/hub',

  //version and type of a binary may vary depends on OS type, check the binary version after npm install
  chromeDriver: './../node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.38.exe',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
  },
  baseUrl: 'http://devdemo.competentum.com/PEsci_PhysioEx/exercise-',


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
