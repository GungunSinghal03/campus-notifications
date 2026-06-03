const Logger = require('./logger');

const YOUR_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM2NzZTE4OEBjZ2poYW5qZXJpaS5pbiIsImV4cCI6MTc4MDQ3NjA1OCwiaWF0IjoxNzgwNDc1MTU4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMzY1M2I1NWItMGM1Zi00ZDE1LWJlMTMtMzMwYzg1YTVhNjY4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZ3VuZ3VuIiwic3ViIjoiODY5ZWY0MjktMzEzZC00Y2FkLWIwYjktNjgwYTVlMzBlN2NhIn0sImVtYWlsIjoiMjNjc2UxODhAY2dqaGFuamVyaWkuaW4iLCJuYW1lIjoiZ3VuZ3VuIiwicm9sbE5vIjoiMjMzMDEwNyIsImFjY2Vzc0NvZGUiOiJud3dzS3giLCJjbGllbnRJRCI6Ijg2OWVmNDI5LTMxM2QtNGNhZC1iMGI5LTY4MGE1ZTMwZTdjYSIsImNsaWVudFNlY3JldCI6IlFoRllZa2tGdm1XYURheGUifQ.8y4zFAdajOw_EkDnq3WmHcO4jU3PCw5OJcAhZAocv7E";

const logger = new Logger(YOUR_TOKEN);

async function test() {
  console.log('🧪 Testing Logger...\n');
  
  await logger.log('frontend', 'info', 'utils', 'Logger is working!');
  await logger.log('frontend', 'debug', 'component', 'Debug test message');
  await logger.log('frontend', 'warn', 'api', 'Warning test message');
  
  console.log('\n✅ Test complete!');
}

test();