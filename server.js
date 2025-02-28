const express = require('express');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Simulate a list of available servers
const serverDirectory = path.join(__dirname, 'servers');

// Create server directory if it doesn't exist
fs.ensureDirSync(serverDirectory);

// Create a server
app.post('/create-server', (req, res) => {
    const { serverName, minecraftVersion, serverType, cpu, memory, diskSpace } = req.body;

    const serverPath = path.join(serverDirectory, serverName);

    // Create server folder
    fs.ensureDirSync(serverPath);
    
    // Example files (world, plugins, config) to simulate server directories
    fs.ensureDirSync(path.join(serverPath, 'world'));
    fs.ensureDirSync(path.join(serverPath, 'plugins'));
    fs.ensureDirSync(path.join(serverPath, 'config'));

    // Simulate creating server files
    fs.writeFileSync(path.join(serverPath, 'server.properties'), `version=${minecraftVersion}\nserverType=${serverType}`);

    res.json({
        serverName,
        minecraftVersion,
        serverType,
        cpu,
        memory,
        diskSpace
    });
});

// Execute command on server (mocked)
app.post('/execute-command', (req, res) => {
    const { command } = req.body;

    // Just mock a response for the command
    const mockOutput = `Executed command: ${command}`;
    res.json({ output: mockOutput });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
