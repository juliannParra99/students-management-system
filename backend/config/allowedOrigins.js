
// Esto es  "whitelist". Es una lista de elementos, como direcciones IP, nombres de dominio, usuarios o programas, que están autorizados o permitidos para acceder o realizar peticiones l servidor o aplicación.
//we can change this acording to us domaing which we use for our up.

const allowedOrigins = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500',
    'http://localhost:8181'
];

module.exports = allowedOrigins;