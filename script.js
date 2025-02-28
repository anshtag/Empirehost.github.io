document.getElementById('createServerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const serverName = document.getElementById('server-name').value;
    const minecraftVersion = document.getElementById('minecraft-version').value;
    const serverType = document.getElementById('server-type').value;

    const serverConfig = {
        serverName,
        minecraftVersion,
        serverType,
        cpu: '100%', // Fixed CPU allocation
        memory: '2GB', // Fixed memory allocation
        diskSpace: '2GB' // Fixed disk space allocation
    };

    // For now, just log the configuration to the console
    console.log('Server Created with the following configuration:');
    console.log(serverConfig);

    // Simulate a server creation success message
    alert(`Server "${serverName}" created successfully with:
    - Version: ${minecraftVersion}
    - Type: ${serverType}
    - CPU: 100%
    - Memory: 2GB
    - Disk Space: 2GB`);
});
document.getElementById('createServerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const serverName = document.getElementById('server-name').value;
    const minecraftVersion = document.getElementById('minecraft-version').value;
    const serverType = document.getElementById('server-type').value;

    const serverConfig = {
        serverName,
        minecraftVersion,
        serverType,
        cpu: '100%',
        memory: '2GB',
        diskSpace: '2GB'
    };

    // Call API to create the server
    fetch('http://localhost:3000/create-server', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serverConfig)
    })
    .then(response => response.json())
    .then(data => {
        alert(`Server "${data.serverName}" created successfully!`);
        document.getElementById('server-management').style.display = 'block';
    })
    .catch(error => {
        console.error('Error creating server:', error);
        alert('Failed to create server.');
    });
});

// Handle console input
document.getElementById('sendCommandBtn').addEventListener('click', function() {
    const command = document.getElementById('consoleInput').value;
    if (command) {
        fetch('http://localhost:3000/execute-command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('consoleOutput').value += data.output + '\n';
        })
        .catch(error => {
            console.error('Error executing command:', error);
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Dynamically populate Minecraft versions
    const versionSelect = document.getElementById('minecraft-version');
    const versions = [
        "1.20", "1.20.1", "1.20.2", "1.20.3", "1.20.4", 
        "1.21", "1.21.1", "1.21.2", "1.21.3", "1.21.4"
    ];

    versions.forEach(version => {
        const option = document.createElement('option');
        option.value = version;
        option.textContent = version;
        versionSelect.appendChild(option);
    });

    document.getElementById('createServerForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const serverName = document.getElementById('server-name').value;
        const minecraftVersion = document.getElementById('minecraft-version').value;
        const serverType = document.getElementById('server-type').value;

        const serverConfig = {
            serverName,
            minecraftVersion,
            serverType,
            cpu: '100%',
            memory: '2GB',
            diskSpace: '2GB'
        };

        // Call API to create the server
        fetch('http://localhost:3000/create-server', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serverConfig)
        })
        .then(response => response.json())
        .then(data => {
            alert(`Server "${data.serverName}" created successfully!`);
            document.getElementById('server-management').style.display = 'block';
        })
        .catch(error => {
            console.error('Error creating server:', error);
            alert('Failed to create server.');
        });
    });

    // Handle console input
    document.getElementById('sendCommandBtn').addEventListener('click', function() {
        const command = document.getElementById('consoleInput').value;
        if (command) {
            fetch('http://localhost:3000/execute-command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ command })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('consoleOutput').value += data.output + '\n';
            })
            .catch(error => {
                console.error('Error executing command:', error);
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const serverName = document.getElementById('server-name');
    const serverStatus = document.getElementById('server-status');
    const serverVersion = document.getElementById('server-version');
    const serverMemory = document.getElementById('server-memory');
    const startStopBtn = document.getElementById('startStopBtn');
    const viewWorldBtn = document.getElementById('viewWorldBtn');
    const viewPluginBtn = document.getElementById('viewPluginBtn');
    const viewConfigBtn = document.getElementById('viewConfigBtn');
    const consoleOutput = document.getElementById('consoleOutput');
    const consoleInput = document.getElementById('consoleInput');
    const sendCommandBtn = document.getElementById('sendCommandBtn');

    // Simulate starting and stopping the server
    startStopBtn.addEventListener('click', function() {
        if (serverStatus.innerText === "Running") {
            stopServer();
        } else {
            startServer();
        }
    });

    // Simulate starting the server
    function startServer() {
        serverStatus.innerText = "Running";
        startStopBtn.innerText = "Stop Server";
        alert("Server Started!");
    }

    // Simulate stopping the server
    function stopServer() {
        serverStatus.innerText = "Stopped";
        startStopBtn.innerText = "Start Server";
        alert("Server Stopped!");
    }

    // Simulate file management actions
    viewWorldBtn.addEventListener('click', function() {
        alert("Opening world files...");
    });

    viewPluginBtn.addEventListener('click', function() {
        alert("Opening plugins folder...");
    });

    viewConfigBtn.addEventListener('click', function() {
        alert("Opening server config...");
    });

    // Simulate console command input
    sendCommandBtn.addEventListener('click', function() {
        const command = consoleInput.value;
        if (command) {
            consoleOutput.value += `> ${command}\nServer responding: Command executed successfully.\n`;
            consoleInput.value = '';
        }
    });
});
