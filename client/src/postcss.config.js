const tailwindcss = require('tailwindcss'); // Require tailwindcss...
module.exports = {
    plugins: [ // Import tailwind plugins to use tailwind in our application...
        tailwindcss('./tailwind.js'),
        require('autoprefixer')
    ],
};
