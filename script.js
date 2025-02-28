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
