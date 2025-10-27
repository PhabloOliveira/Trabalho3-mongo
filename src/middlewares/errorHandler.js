module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Ocrreu um erro no servidor.',
        error: err.message,
    });
};