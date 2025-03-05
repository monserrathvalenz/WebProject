const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

const getItems = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query('SELECT * FROM Items');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

const createItem = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('name', sql.NVarChar, req.body.name)
      .input('description', sql.NVarChar, req.body.description)
      .query('INSERT INTO Items (name, description) VALUES (@name, @description)');
    res.status(201).json({ message: 'Item creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

const getItem = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM Items WHERE id = @id');
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

const updateItem = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('name', sql.NVarChar, req.body.name)
      .input('description', sql.NVarChar, req.body.description)
      .query('UPDATE Items SET name = @name, description = @description WHERE id = @id');
    res.json({ message: 'Item actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

const deleteItem = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM Items WHERE id = @id');
    res.json({ message: 'Item eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

module.exports = {
  getItems,
  createItem,
  getItem,
  updateItem,
  deleteItem
};
