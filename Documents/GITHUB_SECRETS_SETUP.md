# GitHub Secrets Setup Guide

## 🔐 Required Secrets for CI/CD Pipeline

Your CI/CD pipeline needs two secrets to push Docker images to Docker Hub:

1. **DOCKER_USERNAME** - Your Docker Hub username
2. **DOCKER_PASSWORD** - Your Docker Hub access token

## 📋 Step-by-Step Setup

### Step 1: Get Your Docker Hub Credentials

#### A. Docker Hub Username
- This is your Docker Hub account username
- Example: If your Docker Hub profile is `https://hub.docker.com/u/johndoe`, your username is `johndoe`

#### B. Create Docker Hub Access Token (Recommended over password)

1. **Log in to Docker Hub**
   - Go to: https://hub.docker.com/
   - Sign in with your account

2. **Navigate to Security Settings**
   - Click your profile icon (top right)
   - Select "Account Settings"
   - Click "Security" in the left sidebar

3. **Generate New Access Token**
   - Click "New Access Token"
   - Give it a descriptive name: `GitHub Actions CI/CD`
   - Set permissions: **Read, Write, Delete** (or Read & Write minimum)
   - Click "Generate"

4. **Copy the Token**
   - ⚠️ **IMPORTANT:** Copy the token immediately!
   - You won't be able to see it again
   - Store it temporarily in a secure place

### Step 2: Add Secrets to GitHub Repository

1. **Go to Your Repository**
   - Visit: https://github.com/HARIHARANk2007/cicd-pipeline-automation-

2. **Navigate to Secrets Settings**
   - Click "Settings" tab (top menu)
   - In left sidebar, click "Secrets and variables"
   - Click "Actions"

3. **Add First Secret: DOCKER_USERNAME**
   - Click "New repository secret" button
   - Name: `DOCKER_USERNAME`
   - Secret: Enter your Docker Hub username (e.g., `johndoe`)
   - Click "Add secret"

4. **Add Second Secret: DOCKER_PASSWORD**
   - Click "New repository secret" button again
   - Name: `DOCKER_PASSWORD`
   - Secret: Paste the Docker Hub access token you copied earlier
   - Click "Add secret"

### Step 3: Verify Secrets Are Added

After adding both secrets, you should see:
- ✅ DOCKER_USERNAME
- ✅ DOCKER_PASSWORD

Both will show as "Updated X seconds/minutes ago"

## 🚀 Test the Pipeline

### Option 1: Trigger with Empty Commit
```bash
git commit --allow-empty -m "Test CI/CD pipeline"
git push origin main
```

### Option 2: Make a Small Change
```bash
echo "# Test" >> test.txt
git add test.txt
git commit -m "Test pipeline"
git push origin main
```

### Option 3: Use GitHub UI
1. Go to your repository
2. Click on any file
3. Click the pencil icon (Edit)
4. Make a small change
5. Commit directly to main branch

## 📊 Monitor Pipeline Execution

1. **Go to Actions Tab**
   - Visit: https://github.com/HARIHARANk2007/cicd-pipeline-automation-/actions

2. **Watch the Workflow**
   - You'll see "CI/CD Pipeline" workflow running
   - Click on it to see details

3. **Check Each Stage**
   - ✅ **Test** - Should complete in ~30 seconds
   - ✅ **Build** - Should complete in ~2-3 minutes
   - ✅ **Deploy** - Should complete in ~30 seconds

4. **Verify Success**
   - All stages should show green checkmarks
   - Check Docker Hub for your new image

## 🔍 Troubleshooting

### Error: "Invalid username or password"
**Problem:** Docker Hub credentials are incorrect

**Solution:**
1. Verify your Docker Hub username is correct
2. Make sure you're using an access token, not your password
3. Regenerate the access token if needed
4. Update the DOCKER_PASSWORD secret in GitHub

### Error: "Repository not found"
**Problem:** Docker Hub repository doesn't exist

**Solution:**
1. Log in to Docker Hub
2. Create a new repository named `chatapp`
3. Make it public or private as needed
4. Re-run the pipeline

### Error: "Permission denied"
**Problem:** Access token doesn't have write permissions

**Solution:**
1. Go to Docker Hub → Security
2. Delete the old token
3. Create a new token with "Read, Write, Delete" permissions
4. Update DOCKER_PASSWORD secret in GitHub

### Pipeline Doesn't Start
**Problem:** Secrets not configured or workflow not triggered

**Solution:**
1. Verify both secrets are added in GitHub
2. Make sure you pushed to the `main` branch
3. Check the Actions tab for any errors

## ✅ Success Indicators

After successful setup, you should see:

1. **In GitHub Actions:**
   - Green checkmark on workflow
   - All 3 stages completed successfully
   - "Deploy" stage shows image details

2. **In Docker Hub:**
   - New repository: `your-username/chatapp`
   - Image with tags: `latest`, `main`, `main-<commit-sha>`
   - Recent push timestamp

3. **You Can Pull the Image:**
   ```bash
   docker pull your-username/chatapp:latest
   ```

## 🎯 What Happens After Setup

Once secrets are configured:

1. **Every push to main** triggers the pipeline automatically
2. **Tests run** to ensure code quality
3. **Docker image builds** with your application
4. **Image pushes** to Docker Hub with multiple tags
5. **Ready to deploy** anywhere that supports Docker

## 📝 Security Best Practices

✅ **DO:**
- Use access tokens instead of passwords
- Set appropriate token permissions (Read & Write minimum)
- Rotate tokens periodically (every 3-6 months)
- Use repository secrets (not environment secrets for this case)

❌ **DON'T:**
- Share your access tokens
- Commit tokens to code
- Use your Docker Hub password directly
- Give tokens more permissions than needed

## 🔗 Quick Links

- **Your Repository:** https://github.com/HARIHARANk2007/cicd-pipeline-automation-
- **Secrets Settings:** https://github.com/HARIHARANk2007/cicd-pipeline-automation-/settings/secrets/actions
- **Actions Tab:** https://github.com/HARIHARANk2007/cicd-pipeline-automation-/actions
- **Docker Hub:** https://hub.docker.com/
- **Docker Hub Security:** https://hub.docker.com/settings/security

## 📞 Need Help?

If you encounter issues:

1. Check the Actions tab for detailed error logs
2. Verify secrets are correctly named (case-sensitive)
3. Ensure Docker Hub account is active
4. Try regenerating the access token
5. Check the troubleshooting section above

---

**Once secrets are configured, your CI/CD pipeline will be fully automated!** 🚀