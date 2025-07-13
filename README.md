# File-Uploader

A file storage system with authentication, folder management, and file sharing.

## Features

- **Authentication**

  - Session-based auth using Passport.js
  - Prisma session store for database sessions

- **File Management**

  - File uploads with Multer
  - Folder CRUD operations
  - File details view (name, size, upload date)
  - Download functionality

- **Sharing**
  - Time-limited folder sharing links
  - Access without authentication

## Tech Stack

- Express.js
- Prisma ORM
- Passport.js
- Multer
- Supabase Storage
