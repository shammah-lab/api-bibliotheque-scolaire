const { writeData } = require('./utils/fileUtils');

const nettoyerDonnees = async () => {
    await writeData('books.json', []);
    console.log('Fichier books.json réinitialisé !');
};

nettoyerDonnees();