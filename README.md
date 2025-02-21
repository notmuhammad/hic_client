# Basic Blogs CRUD Application for HIC - Client

## View the deployed version
I deployed the client and server applications on Vercel and Railway respectively, as a bonus.
###  [Live app](https://hicblogs.vercel.app/)

## Requirements:
- [x] Use React.js with TypeScript for the frontend.
- [x] Display a list of blog posts with titles and authors.
- [x] Allow users to view a posts full content.
- [x] Provide a form to create new blog posts.
- [x] Use Axios or Fetch API to interact with the backend.
- [x] Implement a REST API using Node.js and NestJS.
- [x] Each post should have a title, author, content, and creation date.
- [x] Store posts in a PostgreSQL (or MongoDB) database.
- [x] Handle validation and errors properly. 
_Error handling could be improved greatly given more time._

### Bonus Points (Optional):
- [x] Add user authentication (signup/login) using JWT.
- [x] Implement comments for each blog post.
- [x] Deploy the project on Vercel (frontend) and Railway/Render (backend).

## Setup

#### Simply install dependencies
```bash
$ npm install
```

## Run the project

#### Locally
The client sends requests to the server instance hosted on Railway (https://hicserver-production.up.railway.app). To run the project locally, update the `baseUrl` variables in `auth.ts`, `comments.ts`, `posts.ts`, and `users.ts` which are located in the `src/services/` directory.

```bash
# dev
$ npm run dev

# build
$ npm run build
```

## Style
I configured ESLint to warn about indentation (use 4 spaces), missing semicolons, and double quotes (use single quotes).