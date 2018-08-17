module.exports = {
  index(req, res) {
    res.send(`
      <!DOCTYPE html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
        <style>
          html, body {
            width: 100%;
            height: 100%;
          }
          body {
            overflow: hidden;
            background-color: #edf4ff;
            font-family: 'Lato', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to Cashback Explorer API!</h1>
        <p>Please see the <a href="https://github.com/CogniInc/cashback-explorer-api/blob/master/README.md">the docs</a>.</p>
      </body>
    `);
  },
};
