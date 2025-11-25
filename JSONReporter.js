const fs = require('fs');
const path = require('path');

class JSONReporter {
  constructor() {
    this.results = [];
  }

  onBegin(config, suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestEnd(test, result) {
    this.results.push({
      test: test.title,
      status: result.status,
      duration: result.duration,
      error: result.error ? result.error.message : null
    });
  }

  onEnd() {
    const outputPath = path.resolve(__dirname, 'test-results.json');
    fs.writeFileSync(outputPath, JSON.stringify(this.results, null, 2));
    console.log(`Results written to ${outputPath}`);
  }
}

module.exports = JSONReporter;