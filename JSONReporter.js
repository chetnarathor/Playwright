const fs = require('fs');
const path = require('path');

class JSONReporter {
  constructor() {
    console.log('JSONReporter loaded');
    this.results = [];
  }

  onBegin(config, suite) {
    console.log('Custom JSON Reporter is running...');
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
    try {
        fs.writeFileSync(outputPath, JSON.stringify(this.results, null, 2));
        console.log(`Results written to ${outputPath}`);
    } catch (error) {
        console.error('Failed to write test results:', error);
    }
  }
}

module.exports = JSONReporter;