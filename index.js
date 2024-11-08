import express from 'express';
import db from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js'

const app = express();
const port = 3000;

app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {

    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log(`La connexion à la base de données est établie avec l'ID ${connection.threadId}`);
    });
    console.log(`Server started on http://localhost:${port}`);
});