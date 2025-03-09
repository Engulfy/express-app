const { users } = require('./userController');

const processCSVUpload = async (csvData) => {
    const lines = csvData.split('\n').map(line => line.trim()).filter(line => line);

    // Ensure there is more than just the header
    if (lines.length < 2) {
        return { success: false, error: 'CSV file does not contain enough data.' };
    }

    // Parsing header line to check if it's correct
    const header = lines.shift().split(',');
    if (header.length !== 2 || header[0].trim() !== 'Name' || header[1].trim() !== 'Salary') {
        return { success: false, error: 'CSV header must contain "Name" and "Salary" columns.' };
    }

    const newData = [];
    let invalidRowDetected = false;

    // Parse each line for user data
    for (const line of lines) {
        const parts = line.split(',');

        // Check for invalid number of columns
        if (parts.length !== 2) {
            invalidRowDetected = true;
            continue;
        }

        const name = parts[0].trim();
        const salaryStr = parts[1].trim();

        // Ensure the name is not empty
        if (!name) {
            invalidRowDetected = true;
            continue;
        }

        // Try to parse the salary
        const salary = parseFloat(salaryStr);

        // Check if salary is a valid number
        if (isNaN(salary)) {
            invalidRowDetected = true;
            continue;
        }

        // Check if salary is less than 0.0 and skip the row without rejecting the file
        if (salary < 0.0) {
            continue;
        }

        newData.push({ name, salary });
    }

    // If we detected any invalid rows, reject the entire file
    if (invalidRowDetected) {
        return { success: false, error: 'CSV file contains invalid rows (incorrect number of columns or invalid salary format).' };
    }

    // Apply changes to the users array
    for (const { name, salary } of newData) {
        const index = users.findIndex(user => user.name === name);
        if (index > -1) {
            // Update existing user
            users[index].salary = salary;
        } else {
            // Insert new user
            users.push({ name, salary });
        }
    }

    return { success: true };
};

module.exports = { processCSVUpload };
