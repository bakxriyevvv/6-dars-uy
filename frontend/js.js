const apiUrl = 'http://localhost:3000/users';


document.getElementById('createUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone, password, username })
    });

    if (response.ok) {
        alert('User created successfully');
        document.getElementById('createUserForm').reset();
        fetchUsers();
    } else {
        alert('Failed to create user');
    }
});

async function fetchUsers() {
    const response = await fetch(apiUrl);
    const users = await response.json();
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.name} - ${user.phone} - ${user.username}`;
        usersList.appendChild(listItem);
    });
}

fetchUsers();
