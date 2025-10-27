const app = require('./app');
const config = require('./config');
const mongoose = require('mongoose');

const PORT = config.PORT || 3000;
const MONGO_URI = config.MONGODB_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/Phablo';

// Conecta ao MongoDB antes de iniciar o servidor
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log('Conectado ao MongoDB');

        // Lista coleções existentes para exibir quando conectado
        try {
            const collections = await mongoose.connection.db.listCollections().toArray();
            const names = collections.map(c => c.name);
            console.log('Coleções no banco:', names.join(', ') || '(nenhuma)');
        } catch (err) {
            console.warn('Não foi possível listar coleções:', err.message);
        }

        app.listen(PORT, (err) => {
            if (err) {
                console.error('Erro ao iniciar o servidor:', err);
                process.exit(1);
            }
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao conectar no MongoDB:', err);
        process.exit(1);
    });