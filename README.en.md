# Watch Selling Website — Bachelor Project

This is a landing page project created as part of a bachelor's thesis at the Faculty of Computer Science, Sumy State University. The site is designed to demonstrate modern web development practices for an e-commerce solution selling watches.

##Project Goals

- Design a responsive, multilingual watch-selling website
- Apply modern UI/UX practices
- Implement SEO optimization
- Ensure accessibility and valid HTML/CSS code

##Technologies Used

- WordPress with Elementor Pro
- Apache 2.4, PHP 8.3
- HTML5, CSS3, JavaScript (vanilla)
- Manual and automatic documentation via JSDoc

##Features

- Responsive design
- Multi-language interface (Ukrainian and English)
- Optimized images and meta tags
- Semantic HTML with accessibility roles
- Ready for deployment

## Code Documentation

## Documentation Standard

This project uses [JSDoc](https://jsdoc.app/) to document JavaScript code. JSDoc comments provide information about the purpose of functions, their parameters, return values, and expected behavior.

###Example

```js
/**
 * Updates the site's content according to the selected language.
 *
 * @param {string} lang - Language code ('ua' or 'en').
 */
function updateContentText(lang) {
  ...
}
 What to Document
Every public function that interacts with the DOM or performs logic

Parameters and return types

Side effects (e.g., DOM changes or localStorage writes)

Short but clear descriptions

Rules
Use /** ... */ style for JSDoc comments

Always document function parameters using @param

If a function returns a value — add @returns

Comments should be written in the same language within a file (either English or Ukrainian)
