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
document.addEventListener("DOMContentLoaded", () => {
    const servers = [
        { name: "Ansh_tag", id: "#5F15X0FucyPDDRi", type: "PaperMC 1.21.4", status: "offline" },
        { name: "Empiresmp_1", id: "#T0n5P3P0wh7fhEso", type: "PaperMC 1.21.4", status: "offline" },
        { name: "Luckblockraces", id: "#pM47sa79NNcWia5v", type: "PaperMC 1.21.4", status: "offline" }
    ];

    const serverList = document.getElementById("serverList");

    servers.forEach(server => {
        const serverDiv = document.createElement("div");
        serverDiv.classList.add("server-card");
        if (server.status === "online") {
            serverDiv.classList.add("online");
        }

        serverDiv.innerHTML = `
            <h3>${server.name}</h3>
            <p>${server.id}</p>
            <p>⚙️ ${server.type}</p>
            <div class="server-status"></div>
        `;

        serverList.appendChild(serverDiv);
    });
});
// Firebase Configuration (Replace with your own)
const firebaseConfig = {
             apiKey: "
AIzaSyAvvYwCpNnx8yGPfv-axZa0DJ9E4pVCpnM",
            authDomain: "empire-host-74181.firebasestorage.app",
            projectId: "empire-host-74181",
            storageBucket: ""empire-host-74181.firebasestorage.app",
            messagingSenderId: "227816617588",
            appId: "1:227816617588:web:3fa5837c6d84bef8eb4321"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login Function
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            document.getElementById("message").innerText = "Login successful!";
            window.location.href = "dashboard.html"; // Redirect to dashboard
        })
        .catch((error) => {
            document.getElementById("message").innerText = error.message;
        });
}

// Register Function
function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            document.getElementById("message").innerText = "Registration successful!";
        })
        .catch((error) => {
            document.getElementById("message").innerText = error.message;
        });
}

// Google Login
function googleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then((result) => {
            document.getElementById("message").innerText = "Google Login successful!";
            window.location.href = "dashboard.html"; // Redirect to dashboard
        })
        .catch((error) => {
            document.getElementById("message").innerText = error.message;
        });
}
