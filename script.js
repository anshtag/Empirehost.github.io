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
