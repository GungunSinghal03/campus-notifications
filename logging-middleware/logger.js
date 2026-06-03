const LOG_API_URL = 'http://4.224.186.213/evaluation-service/logs';

class Logger {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  async log(stack, level, packageName, message) {
    const validStacks = ['backend', 'frontend'];
    const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
    const validPackages = [
      'api', 'component', 'hook', 'page', 'state', 'style', 
      'auth', 'config', 'middleware', 'utils'
    ];

    if (!validStacks.includes(stack)) {
      console.error('Invalid stack');
      return;
    }
    if (!validLevels.includes(level)) {
      console.error('Invalid level');
      return;
    }
    if (!validPackages.includes(packageName)) {
      console.error('Invalid package');
      return;
    }

    const logData = {
      stack: stack,
      level: level,
      package: packageName,
      message: message
    };

    try {
      const response = await fetch(LOG_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        },
        body: JSON.stringify(logData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Log sent! ID: ${result.logID}`);
        return result;
      }
    } catch (error) {
      console.error('Log failed:', error.message);
    }
  }
}

module.exports = Logger;