# 🚀 Deploy Instructions

## Git Setup ✅
Your project is already initialized with Git and all files are committed!

## 📌 Manual GitHub Setup

### Step 1: Create Repository on GitHub.com

1. Go to [github.com/new](https://github.com/new)
2. **Repository name:** `llm-knowledge-archive` (or your preferred name)
3. **Description:** LLM & AI Engineer Knowledge Archive
4. **Visibility:** Public (so GitHub Pages works for free)
5. **DO NOT** initialize with README, .gitignore, or license (we already have them)
6. Click **"Create repository"**

### Step 2: Push Your Code

After creating the repo, GitHub will show you commands. Use these:

```bash
cd /Users/bphan/Documents/llm_warmup
git remote add origin https://github.com/YOUR_USERNAME/llm-knowledge-archive.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment

### Step 4: Access Your Published Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/llm-knowledge-archive/
```

## 🔧 Alternative: Using GitHub CLI (if working)

If GitHub CLI authentication works:

```bash
gh repo create llm-knowledge-archive --public --source=. --remote=origin --push
gh browse
```

Then enable GitHub Pages in repository settings.

## 📝 After Publishing

### Update Content
1. Edit any `.md` file in `content/` folder
2. Commit changes:
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```
3. GitHub Pages will auto-update in 1-2 minutes

### Add Custom Domain (Optional)
1. In repository settings → Pages
2. Add your custom domain
3. Update DNS settings with your domain provider

## 🐛 Troubleshooting

**Site not loading?**
- Wait 2-3 minutes after enabling Pages
- Check repository is public
- Verify branch is `main` not `master`

**Markdown not rendering?**
- Make sure you're using a local server or GitHub Pages
- File:// protocol won't work due to CORS

**Images not showing?**
- Check paths: `../images/filename.jpg`
- Verify files are in `images/` folder
- Push images to GitHub

## 🎉 You're Done!

Once deployed, share your knowledge archive with:
- https://YOUR_USERNAME.github.io/llm-knowledge-archive/
