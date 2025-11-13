# Complete Setup Guide - CI/CD Pipeline with Docker

## 📦 What You Need to Install

### 1. Install Docker Desktop (Required for Local Testing)

**For Windows:**
1. Download Docker Desktop from: https://www.docker.com/products/docker-desktop
2. Run the installer
3. Restart your computer when prompted
4. Open Docker Desktop and wait for it to start
5. Verify installation:
   ```bash
   docker --version
   docker-compose --version
   ```

**After Docker Installation:**
- Docker Desktop must be running for Docker commands to work
- Look for the Docker icon in your system tray
- If you see "Docker Desktop is running", you're ready!

## 🚀 Step-by-Step Deployment Guide

### Step 1: Install Docker (If Not Already Done)
Follow the instructions above to install Docker Desktop.

### Step 2: Test Docker Build Locally

Once Docker is installed and running:

```bash
# Navigate to your project directory
cd C:\Users\harih\Documents

# Build the Docker image
docker build -t chatapp:latest .

# This will:
# - Download Node.js 18 Alpine base image
# - Install your app dependencies
# - Create a production-ready container
# - Tag it as 'chatapp:latest'
```

### Step 3: Run with Docker Compose (Easiest Method)

```bash
# Start both MongoDB and the app
docker-compose up -d

# This will:
# - Start MongoDB container
# - Build and start your app container
# - Connect them on a private network
# - Expose app on http://localhost:3000

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

### Step 4: Test the Application

1. Open browser at: http://localhost:3000
2. You should see the login page
3. Create an account and test the chat functionality

### Step 5: Push to GitHub

```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/chatapp.git
git branch -M main
git push -u origin main
```

### Step 6: Set Up Docker Hub

1. Create account at: https://hub.docker.com
2. Create a new repository named "chatapp"
3. Generate an access token:
   - Go to Account Settings → Security
   - Click "New Access Token"
   - Name it "GitHub Actions"
   - Copy the token (you won't see it again!)

### Step 7: Configure GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add two secrets:

   **Secret 1:**
   - Name: `DOCKER_USERNAME`
   - Value: Your Docker Hub username

   **Secret 2:**
   - Name: `DOCKER_PASSWORD`
   - Value: Your Docker Hub access token (from Step 6)

### Step 8: Trigger the CI/CD Pipeline

```bash
# Make a small change (or just push again)
git commit --allow-empty -m "Trigger CI/CD pipeline"
git push origin main
```

### Step 9: Monitor the Pipeline

1. Go to your GitHub repository
2. Click the **Actions** tab
3. You'll see the workflow running with 3 jobs:
   - ✅ **Test** - Runs your test suite
   - ✅ **Build** - Builds and pushes Docker image
   - ✅ **Deploy** - Shows deployment info

### Step 10: Deploy Anywhere

Once the pipeline succeeds, your image is on Docker Hub:

```bash
# Pull the image
docker pull YOUR_USERNAME/chatapp:latest

# Run it anywhere
docker run -d -p 3000:3000 \
  -e MONGODB_URI=mongodb://your-mongo-host:27017/chatapp \
  -e SESSION_SECRET=your-secret-key \
  YOUR_USERNAME/chatapp:latest
```

## 🔍 Troubleshooting

### Docker Not Found
**Problem:** `'docker' is not recognized as an internal or external command`

**Solution:**
1. Install Docker Desktop (see Step 1)
2. Make sure Docker Desktop is running
3. Restart your terminal/VSCode
4. Try again

### Docker Build Fails
**Problem:** Build errors during `docker build`

**Solution:**
1. Check Dockerfile syntax
2. Ensure all files are present
3. Check internet connection (for downloading base images)
4. Try: `docker build --no-cache -t chatapp:latest .`

### GitHub Actions Fails
**Problem:** Pipeline fails in GitHub Actions

**Solution:**
1. Check the Actions tab for error logs
2. Verify GitHub Secrets are set correctly
3. Ensure Docker Hub credentials are valid
4. Check if Docker Hub repository exists

### Can't Access App
**Problem:** Can't access http://localhost:3000

**Solution:**
1. Check if containers are running: `docker ps`
2. Check logs: `docker-compose logs app`
3. Ensure MongoDB is running: `docker-compose logs mongo`
4. Try restarting: `docker-compose restart`

## 📊 Useful Docker Commands

```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View images
docker images

# Stop a container
docker stop chatapp

# Remove a container
docker rm chatapp

# Remove an image
docker rmi chatapp:latest

# View logs
docker logs chatapp

# Execute command in container
docker exec -it chatapp sh

# Clean up everything
docker system prune -a
```

## 📊 Useful Docker Compose Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild and start
docker-compose up -d --build

# Stop and remove everything
docker-compose down -v
```

## 🎯 What Happens in the CI/CD Pipeline

### On Every Push to Main:

1. **GitHub Actions Triggers**
   - Workflow starts automatically
   - Checks out your code

2. **Test Stage**
   - Sets up Node.js 18
   - Installs dependencies
   - Runs `npm test`
   - Must pass to continue

3. **Build Stage** (only if tests pass)
   - Sets up Docker Buildx
   - Logs into Docker Hub
   - Builds Docker image
   - Tags with multiple versions:
     - `latest`
     - `main-<commit-sha>`
     - `main`
   - Pushes to Docker Hub

4. **Deploy Stage**
   - Confirms successful deployment
   - Shows pull command

### On Pull Requests:
- Only runs tests
- Does not build or push images

## 🔐 Security Best Practices

1. **Never commit secrets**
   - Use GitHub Secrets for sensitive data
   - Keep `.env` in `.gitignore`

2. **Use access tokens**
   - Don't use your Docker Hub password
   - Use access tokens with limited scope

3. **Rotate secrets regularly**
   - Change tokens every few months
   - Update GitHub Secrets when changed

4. **Review permissions**
   - Give minimal required permissions
   - Use read-only tokens where possible

## 🎓 Learning Resources

- **Docker:** https://docs.docker.com/get-started/
- **GitHub Actions:** https://docs.github.com/en/actions
- **Docker Compose:** https://docs.docker.com/compose/
- **CI/CD Best Practices:** https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment

## ✅ Checklist

- [ ] Docker Desktop installed and running
- [ ] Local build successful (`docker build`)
- [ ] Local run successful (`docker-compose up`)
- [ ] App accessible at localhost:3000
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Docker Hub account created
- [ ] Docker Hub repository created
- [ ] GitHub Secrets configured
- [ ] CI/CD pipeline triggered
- [ ] Pipeline completed successfully
- [ ] Image available on Docker Hub

## 🎉 Success!

Once all steps are complete, you have:
- ✅ Fully containerized application
- ✅ Automated testing on every push
- ✅ Automated Docker builds
- ✅ Images pushed to Docker Hub
- ✅ Ready to deploy anywhere

Your application can now be deployed to:
- AWS ECS/EKS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Any server with Docker installed