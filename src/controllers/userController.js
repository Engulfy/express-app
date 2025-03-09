// Seed data
let users = [
    { name: 'Alex', salary: 3000.0 },
    { name: 'Bryan', salary: 3500.0 },
];

const getUsers = ({ min, max, offset, limit, sort }) => {
    // Filter users by salary range
    const filteredUsers = users.filter(user => user.salary >= min && user.salary <= max);

    // Sort the users if sorting parameter is provided
    if (sort) {
        // Sort by name (alphabetically)
        if (sort === 'NAME') {
            filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
        // Sort by salary (ascending)
        } else if (sort === 'SALARY') {
            filteredUsers.sort((a, b) => a.salary - b.salary);
        }
    }

    // Handle offset and limit
    return filteredUsers.slice(offset, limit ? offset + limit : undefined);
};

module.exports = { getUsers, users };
