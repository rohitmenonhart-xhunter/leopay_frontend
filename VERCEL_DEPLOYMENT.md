# Deploying the Frontend to Vercel

This guide covers how to deploy the EarnMockello frontend to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account
- The [Vercel CLI](https://vercel.com/docs/cli) (optional)
- Git repository with your code

## Deployment Steps

### 1. Prepare Your Frontend

1. Ensure your frontend is properly configured to use the production backend:
   - The environment variable `VITE_API_URL` should be set to `https://leopay-backend.onrender.com/api`
   - This is configured in the `.env` file

2. Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket)

### 2. Deploy to Vercel

#### Option 1: Deploy via Vercel Dashboard

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure the project with the following settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under "Environment Variables", add:
   - Name: `VITE_API_URL`
   - Value: `https://leopay-backend.onrender.com/api`
6. Click "Deploy"

#### Option 2: Deploy via Vercel CLI

1. Install the Vercel CLI if you haven't already:
   ```
   npm i -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Navigate to your frontend directory:
   ```
   cd frontend
   ```

4. Deploy to Vercel:
   ```
   vercel
   ```

5. Follow the prompts to configure your project

### 3. Configure Custom Domain (Optional)

1. Go to your project in the Vercel Dashboard
2. Navigate to "Settings" > "Domains"
3. Add your custom domain (e.g., `leopay.mockello.com`)
4. Follow Vercel's instructions to set up DNS records

### 4. Verify Deployment

1. Once deployed, Vercel will provide you with a URL (e.g., `https://earnmockello-frontend.vercel.app`)
2. Visit the URL to ensure your application is working correctly
3. Test user login and other features to verify the connection to the backend is working

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure the backend is properly configured to accept requests from your Vercel domain:

1. The backend's CORS configuration (in `backend/src/server.js`) should include your Vercel domain:
   ```javascript
   origin: ['https://leopay.mockello.com', 'https://earnmockello-frontend.vercel.app']
   ```

2. If using a custom domain, make sure it's also included in the allowed origins

### API Connection Issues

If the frontend can't connect to the backend:

1. Check that the environment variable `VITE_API_URL` is correctly set in your Vercel project
2. Ensure the backend is running and accessible
3. Verify that the backend URL (including the `/api` path) is correct

## Automating Deployments

Vercel automatically deploys your application when you push changes to your repository:

1. For production deployments, push to your main branch
2. For preview deployments, create a pull request

## Important Notes

- Vercel's free tier includes:
  - Automatic HTTPS
  - Global CDN
  - Continuous deployment from Git
  - Preview deployments for pull requests
  - Custom domains

- The frontend is configured to handle SPA routing using the `rewrites` property in `vercel.json`
- Static assets are configured with appropriate caching headers for optimal performance 