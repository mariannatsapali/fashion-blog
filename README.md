# Fashion Blog Project

Welcome to the Fashion Blog project! This web application serves as a platform for sharing the latest fashion trends, style tips, and personal expressions of fashion enthusiasts.

## Features

- **Explore Fashion Trends:** Stay updated with the latest fashion trends and discover new styles.
- **Author Contributions:** Articles contributed by various fashion enthusiasts and authors.
- **Search Functionality:** Effortlessly find articles using the search feature.
- **User-Friendly Interface:** A clean and intuitive interface designed for an enjoyable user experience.

## Technologies Used

- **Node.js:** Server-side JavaScript runtime.
- **Express:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing article information.
- **EJS:** Embedded JavaScript templates for rendering dynamic content.
- **Quill Editor:** Rich text editor for creating and editing article content.

### Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/mariannatsapali/fashion-blog.git
   cd fashion-blog
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI= [TYPE YOUR MONGODB URI]
   ```

### MongoDB Database

- Ensure that your MongoDB server is running before starting the application.
- The MongoDB connection URI can be configured in the `.env` file.
- Check the documentation for more: https://www.mongodb.com/docs/drivers/node/current/quick-start/

### Running the Application

- **Production Mode:**
  ```bash
  npm start
  ```
  This command starts the server using Node.js.

- **Development Mode:**
  ```bash
  npm run dev
  ```
  This command starts the server with Nodemon for automatic restarts on code changes.

5. Open your browser and navigate to `http://localhost:3000` to explore the Fashion Blog.

### Project Structure

- **`app.js`**: Entry point of the application.
- **`public/`**: Static assets (stylesheets, images, etc.).
- **`views/`**: EJS templates for rendering HTML pages.

### Routes

- **Home Page:** `/`
- **Articles List Page:** `/articles`
- **Contact Page:** `/contact`
- **Search Results Page:** `/search-results`
- **About Page:** `/about`
- **Compose Page:** `/compose`
- **Article Details Page:** `/articles/:articleId`
- **Edit Article Page:** `/articles/:articleId/edit`

### Adding, Editing, and Deleting Articles

- To add a new article, navigate to the `/compose` page and fill out the required fields.
- To edit an existing article, visit the specific article's page and click on the "Edit" button.
- To delete an article, go to the specific article's page and click on the "Delete" button.

### Important Notes

- This application is for educational purposes and may lack advanced features for production.
- Double-check the MongoDB URI and make sure the MongoDB server is running.

## Contributing

If you're interested in contributing to the project, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the [Apache License 2.0](LICENSE).

Happy fashion-blogging! 👗✨
