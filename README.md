A simple web application for managing contacts, allowing users to add, view, update, and delete contact information.

# Contact Management System

Manage your contacts efficiently with this Contact Management System. Keep track of names, emails, and phone numbers seamlessly. Add, edit, view, and delete contacts with ease using this intuitive web application.


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)


## Features

- **Add Contacts**: Users can add new contacts with their name, email, and contact number.
- **View Contacts**: Contacts are displayed in a table format, showing their name, email, and contact number.
- **Update Contacts**: Users can edit the details of existing contacts.
- **Delete Contacts**: Contacts can be deleted from the system.
- **View Contact Details**: Users can view detailed information about a specific contact.
- Add, edit, view, and delete contact information.
- User-friendly interface for managing contacts.
- Notifications for successful and failed operations.


## Technologies Used

- **Frontend**:
  - React.js
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - MySQL

## Installation

1. **Clone the repository:**
   
   ```bash
     git clone https://github.com/omkarauti11/Contact-Manager---React.js-MySQL-Node.js.git
   ```

2. **Navigate to the project directory:**

   ```bash
      cd Contact-Manager---React.js-MySQL-Node.js
   ```

3. **Install dependencies for both client and server:**

   ```bash
     cd client
     npm install
   ```

   ```bash
     cd server
     npm install
   ```

   
## Usage

1. **Configure environment variables:**
   Create a .env file in the server directory and set the following variables:
   
   ```bash
     DB_HOST=localhost
     DB_USER=your_username
     DB_PASSWORD=your_password
   ```
   
   Make sure to replace placeholders like `your_usernamee` and `your_password` with your actual MySQL database credentials.
   
2. **Start the backend server:**

   ```bash
     cd server
     npm start
   ```
   
3. **Start the frontend development server:**

   ```bash
     cd client
     npm start
   ```

4. **Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the application.**
   
5. **You can now add, view, update, and delete contacts using the provided interface.**


## Contributing
   
   Contributions are welcome! If you have ideas for improvements or find any issues, feel free to open an issue or create a pull request.
