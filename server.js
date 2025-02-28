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
const express = require('express');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Directory to store Minecraft servers
const serverDirectory = path.join(__dirname, 'servers');
fs.ensureDirSync(serverDirectory);

// Handle creating a Minecraft server
app.post('/create-server', (req, res) => {
    const { serverName, minecraftVersion, serverType, cpu, memory, diskSpace } = req.body;

    const serverPath = path.join(serverDirectory, serverName);
    const serverSoftwareUrl = getServerSoftwareUrl(serverType, minecraftVersion);

    // Create the server folder
    fs.ensureDirSync(serverPath);

    // Simulate downloading server files
    axios.get(serverSoftwareUrl, { responseType: 'arraybuffer' })
        .then(response => {
            fs.writeFileSync(path.join(serverPath, `${serverType}.jar`), response.data);

            // Create necessary directories for world, plugins, and config
            fs.ensureDirSync(path.join(serverPath, 'world'));
            fs.ensureDirSync(path.join(serverPath, 'plugins'));
            fs.ensureDirSync(path.join(serverPath, 'config'));

            // Mock server properties file
            fs.writeFileSync(path.join(serverPath, 'server.properties'), `version=${minecraftVersion}\nserverType=${serverType}`);

            res.json({
                serverName,
                minecraftVersion,
                serverType,
                cpu,
                memory,
                diskSpace
            });
        })
        .catch(error => {
            console.error('Error downloading server software:', error);
            res.status(500).send('Error downloading server software');
        });
});

// Get the URL for downloading server software based on the selected type
function getServerSoftwareUrl(serverType, version) {
    switch (serverType) {
        case 'vanilla':
            return `https://launcher.mojang.com/v1/objects/vanilla-server-${version}.jar`;
        case 'spigot':
            return `https://getspigot.org/spigot-${version}.jar`;
        case 'paper':
            return `https://papermc.io/downloads/${version}.jar`;
        case 'forge':
