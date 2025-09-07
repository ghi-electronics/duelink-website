const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonPath = path.join(__dirname, 'static', 'duelink.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Category mapping based on folder paths
const categoryMap = {
    'microcomputer': 'Microcomputer',
    'display': 'Display',
    'actuator': 'Actuator',
    'com': 'Communication',
    'hmi': 'HMI',
    'storage': 'Storage',
    'wireless': 'Wireless',
    'sensor': 'Sensor',
    'led': 'LED',
    'sound': 'Sound',
    'vision': 'Vision',
    'adapter': 'Adapter'
};

// Add category to each board
data.boards.forEach(board => {
    if (board.Code) {
        const folder = board.Code.split('/')[0];
        board.Category = categoryMap[folder] || 'Other';
        
        // Special cases based on name
        if (board.Name.includes('Ghizzy') || board.Name.includes('Holiday Tree')) {
            board.Category = 'Special';
        }
    } else {
        board.Category = 'Other';
    }
});

// Write the updated JSON back
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4));

// Report results
const categories = {};
data.boards.forEach(board => {
    categories[board.Category] = (categories[board.Category] || 0) + 1;
});

console.log('✅ Categories added successfully!');
console.log('\n📊 Category Distribution:');
Object.entries(categories).sort().forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} products`);
});
console.log(`\n📁 Total products updated: ${data.boards.length}`);