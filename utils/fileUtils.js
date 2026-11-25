
const fs = require('fs').promises;
const path = require('path');

// Construire le chemin vers un fichier JSON
const getFilePath = (fileName) => {
    return path.join(__dirname, '..', 'data', fileName);
};

// Lire les données d'un fichier JSON
const readData = async (fileName) => {
    const filePath = getFilePath(fileName);

    const data = await fs.readFile(filePath, 'utf-8');

    return JSON.parse(data);
};

// Écrire des données dans un fichier JSON
const writeData = async (fileName, data) => {
    const filePath = getFilePath(fileName);

    await fs.writeFile(
        filePath,
        JSON.stringify(data, null, 2),
        'utf-8'
    );
};

module.exports = {
    readData,
    writeData
};
