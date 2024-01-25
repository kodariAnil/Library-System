# Risksek Assignment Guidance Doc

### Step 1: Set Up Your Node.js Environment

1. **Install Node.js**: If you haven't already, install Node.js from [nodejs.org](https://nodejs.org/).
2. **Create a Project Directory**: Make a new directory for your project and navigate into it.
3. **Initialize npm**: Run `npm init` in your terminal. This creates a `package.json` file for managing dependencies.

### Step 2: Write Your Code in `index.js`

1. **Create the `Book` Class**:
   - Attributes: `title`, `author`, `ISBN`.
   - Method: `displayInfo()` to show book details.
2. **Create the `Library` Class**:
   - Attributes: `books` (an array to store book instances).
   - Methods: `addBook()` to add books, `displayBooks()` to show all books, `searchByTitle()` to find books by title.
3. **Create the `EBook` Subclass**:
   - Inherits from `Book`.
   - Additional attribute: `fileFormat`.
   - Override `displayInfo()` to include file format.
4. **Create Instances and Test**:
   - Instantiate a few `Book` and `EBook` objects.
   - Create a `Library` instance and add your books to it.
   - Test `displayBooks()` and `searchByTitle()` methods.
5. **Exception Handling**:
   - Add error handling in your methods (e.g., when searching for a book that doesn't exist).

### Step 3: Creating a Simple API Interface

Since you're required to use Node.js and JavaScript, we'll create a very basic API using Express.js.

1. **Install Express.js**:

   ```jsx
   npm install express
   ```

2. **Set Up Express in `index.js`**:
   - Import express and create an app instance.
   - Define routes for adding, listing, and deleting books/libraries.
3. **Define API Endpoints**:
   - POST `/addBook` to add a book.
   - GET `/listBooks` to list all books.
   - DELETE `/deleteBook` to delete a book.
   - Similarly, implement endpoints for libraries.
4. **Start the Server**:
   - Use `app.listen()` to start your server.
