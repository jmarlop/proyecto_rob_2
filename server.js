const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());

// Configura tu conexión a Neon
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_AO2oW9CMzNlX@ep-noisy-violet-a9tp3qwi-pooler.gwc.azure.neon.tech/PR2?sslmode=require',
  ssl: { rejectUnauthorized: false }  // importante para Neon
});

// Ruta para obtener datos
app.get('/datos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tu_tabla');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al acceder a la base de datos');
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
