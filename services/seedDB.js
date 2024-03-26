const { query } = require('./db.js');

const seedDB = async () => {
  await query(
    `
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      author VARCHAR(255) NOT NULL,
      featured BOOLEAN DEFAULT false,
      img_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    );
    INSERT INTO articles (title, content, author) VALUES (
      'Awesome SQL',
      'SQL is awesome',
      'Some One'
    );
    `
  );
};

module.exports = { seedDB };
