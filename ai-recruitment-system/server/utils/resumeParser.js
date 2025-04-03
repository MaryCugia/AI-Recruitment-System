const pdf = require('pdf-parse');
const fetch = require('node-fetch');

async function parseResume(url) {
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error('Resume parsing error:', error);
    return '';
  }
}

module.exports = { parseResume };
