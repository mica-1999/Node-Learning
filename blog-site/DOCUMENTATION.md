## Blog Site Project

This is my blog site where I will showcase my projects, similar to GitHub. The site will contain a login page, and using Node.js and other tools, I will implement a way to add new projects through a background dashboard. This dashboard will be accessible only to me through a secure login.

### Node.js vs PHP: Input Sanitization

Node.js and PHP are both popular server-side technologies, but they handle input sanitization differently. 

#### PHP
In PHP, input sanitization is crucial because user inputs are often visible in the URL, especially with GET requests. PHP provides built-in functions like `htmlspecialchars()`, `filter_input()`, and `mysqli_real_escape_string()` to sanitize inputs and prevent SQL injection and XSS attacks.

#### Node.js
In Node.js, input sanitization is equally important, even though user inputs might not always be visible in the URL. Node.js applications often use JSON bodies for POST requests, which means inputs are sent in the request body rather than the URL. However, this does not eliminate the need for sanitization. 

Node.js developers typically use libraries like `express-validator` for input validation and sanitization. Additionally, using parameterized queries with libraries like `mongoose` for MongoDB or `pg` for PostgreSQL helps prevent SQL injection.

### Key Points
- **Visibility**: In PHP, inputs are often visible in the URL, making sanitization more apparent. In Node.js, inputs are usually in the request body, but still require sanitization.
- **Libraries**: Node.js relies on external libraries for input validation and sanitization, while PHP has built-in functions.
- **Security**: Both technologies require careful handling of user inputs to prevent security vulnerabilities like SQL injection and XSS attacks.

### Example in Node.js
Here is an example of how to sanitize inputs in a Node.js application using `express-validator`:

```javascript
const { body, validationResult } = require('express-validator');

app.post('/posts', [
  body('title').trim().escape(),
  body('content').trim().escape()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Proceed with creating the post
});
```

In this example, `body('title').trim().escape()` ensures that the `title` field is trimmed and any HTML characters are escaped, preventing XSS attacks.

### Conclusion
While Node.js and PHP handle input sanitization differently, both require careful attention to user inputs to maintain security. Using appropriate libraries and techniques in Node.js ensures that your application remains secure, even if inputs are not visible in the URL.
