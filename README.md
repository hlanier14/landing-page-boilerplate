# Landing Page Boilerplate

A modern, customizable landing page boilerplate built with React, Tailwind CSS, and Framer Motion. Perfect for quickly launching new products or services.

## Features

- Modern, responsive design with dark mode support
- Built with React and Tailwind CSS
- Smooth animations with Framer Motion
- SEO optimized with meta tags and structured data
- Mobile-first responsive design
- Analytics-ready with event tracking
- Production-ready build configuration

## Quick Start

### 1. Create a New Repository

1. Click the "Use this template" button on this repository's GitHub page
2. Create a new repository with your desired name
3. Clone your new repository
4. (Optional) Configure your repository's "About" section using the suggestions in [`.github/REPOSITORY_INFO.md`](.github/REPOSITORY_INFO.md)

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Your Brand

Edit `src/config/brand.js` and update the following:

```javascript
export const BRAND_CONFIG = {
  name: 'YourBrandName',           // Your brand name
  tagline: 'Your brand tagline',   // Short tagline
  url: 'https://yourbrand.com',     // Your website URL
  logo: {
    path: '/logo.svg',              // Path to your logo
    alt: 'YourBrandName logo',
    defaultSize: 44
  },
  social: {
    twitter: 'https://twitter.com/yourbrand',
    linkedin: 'https://linkedin.com/company/yourbrand'
  },
  meta: {
    defaultDescription: 'Your default meta description',
    defaultKeywords: 'your, keywords, here',
    author: 'YourBrandName'
  }
};
```

### 4. Add Your Logo

1. Place your logo file in the `public/` folder (e.g., `public/logo.svg`)
2. Place your favicon in the `public/` folder (e.g., `public/favicon.ico`)
3. Update the logo path in `src/config/brand.js`
4. Optionally customize the Logo component in `src/components/Common/Logo.js`

### 5. Customize Animations

Replace the placeholder animations with your own:

- **Hero Animation**: `src/components/Animation/HeroAnimation.js`
- **Step One Animation**: `src/components/Animation/StepOneAnimation.js`
- **Step Two Animation**: `src/components/Animation/StepTwoAnimation.js`
- **Step Three Animation**: `src/components/Animation/StepThreeAnimation.js`

Each animation file includes comments explaining how to customize it.

### 6. Update Content

Edit the following components to match your product/service:

- **Hero Section**: `src/components/Home/Hero.js`
- **How It Works**: `src/components/Home/HowItWorks.js`
- **Pricing**: `src/components/Home/Pricing.js`
- **FAQ**: `src/components/Home/FAQ.js`
- **Secondary CTA**: `src/components/Home/SecondaryCTA.js`

### 7. Update SEO Information

1. Update meta tags in `public/index.html`
2. Update `public/manifest.json` with your app name
3. Update `public/sitemap.xml` with your website URL
4. Update `public/robots.txt` with your sitemap URL

### 8. Configure Analytics

Update analytics tracking IDs in your environment variables or directly in:
- `src/services/AnalyticsService.js`

### 9. Run Development Server

```bash
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Customization Guide

### Brand Configuration

All brand-related information is centralized in `src/config/brand.js`. Update this file to change:
- Brand name (used throughout the site)
- Logo path and settings
- Social media links
- Default SEO meta information

### Logo Component

The Logo component (`src/components/Common/Logo.js`) supports two options:

1. **SVG Logo**: Replace the placeholder SVG with your own
2. **Image Logo**: Uncomment the image option and use an image file

### Animations

Each animation component is a placeholder that you should replace with your own:

- Use Framer Motion for smooth animations
- Replace with product demos, videos, or custom animations
- Each file includes example code you can modify

### Styling

The project uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.js` - Tailwind configuration
- `src/theme/designTokens.js` - Design tokens
- Individual component files - Component-specific styles

### Content Sections

Each section in `src/components/Home/` can be customized:

- **Hero.js**: Main hero section with CTA
- **HowItWorks.js**: Step-by-step feature explanation
- **Pricing.js**: Pricing tiers
- **FAQ.js**: Frequently asked questions
- **SecondaryCTA.js**: Secondary call-to-action

## Environment Variables

Create a `.env` file for environment-specific variables:

```env
REACT_APP_GA_TRACKING_ID=your-google-analytics-id
REACT_APP_SIGNUP_URL=your-signup-endpoint
```

## Deploying to Google Cloud Platform (GCP)

This project includes configuration for deploying to Google Cloud Run using Cloud Build. Follow these steps to set up automated deployments. See [Cloud Run Pricing](https://cloud.google.com/run/pricing) for cost details.

### Prerequisites

1. **Google Cloud Account**: Sign up at [cloud.google.com](https://cloud.google.com)
2. **Google Cloud SDK**: Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install)
3. **GitHub Repository**: Your code should be in a GitHub repository

### Step 1: Set Up GCP Project

1. Create a new GCP project or select an existing one:
   ```bash
   gcloud projects create your-project-id --name="Your Project Name"
   gcloud config set project your-project-id
   ```

2. Enable required APIs:
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

3. Set up billing (required for Cloud Run):
   - Go to [Cloud Console Billing](https://console.cloud.google.com/billing)
   - Link a billing account to your project

### Step 2: Update cloudbuild.yaml

1. Open `cloudbuild.yaml` in the project root

2. Replace `your-app-name` with your actual application name (appears in 3 places):
   ```yaml
   # Replace 'your-app-name' with your actual app name
   args: ['build', '-t', 'gcr.io/$PROJECT_ID/your-app-name:latest', '.']
   args: ['push', 'gcr.io/$PROJECT_ID/your-app-name:latest']
   - 'your-app-name'  # Service name
   ```

3. Update the region if needed (default is `us-central1`):
   ```yaml
   - '--region=us-central1'  # Change to your preferred region
   ```

4. (Optional) Add a service account if you need specific permissions:
   ```yaml
   - '--service-account=your-service-account@your-project.iam.gserviceaccount.com'
   ```

### Step 3: Set Up Cloud Build Trigger

1. **Connect Repository**:
   - Go to [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers)
   - Click "Connect Repository"
   - Select "GitHub (Cloud Build GitHub App)" or "GitHub (mirrored)"
   - Authenticate and select your repository

2. **Create Trigger**:
   - Click "Create Trigger"
   - **Name**: `deploy-to-cloud-run` (or your preferred name)
   - **Event**: Select "Push to a branch"
   - **Branch**: Enter your branch name (e.g., `main` or `production`)
   - **Configuration**: Select "Cloud Build configuration file (yaml or json)"
   - **Location**: Select "Repository"
   - **Cloud Build configuration file location**: `cloudbuild.yaml`
   - Click "Create"

3. **Grant Permissions** (if needed):
   ```bash
   # Grant Cloud Build service account permission to deploy to Cloud Run
   PROJECT_ID=your-project-id
   PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
   
   gcloud projects add-iam-policy-binding $PROJECT_ID \
     --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com \
     --role=roles/run.admin
   
   gcloud projects add-iam-policy-binding $PROJECT_ID \
     --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com \
     --role=roles/iam.serviceAccountUser
   ```

### Step 4: Test the Deployment

1. **Push to Trigger Branch**:
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main  # or your trigger branch
   ```

2. **Monitor Build**:
   - Go to [Cloud Build History](https://console.cloud.google.com/cloud-build/builds)
   - Watch your build progress
   - Check for any errors

3. **Access Your App**:
   - Once deployed, Cloud Run will provide a URL
   - Find it in [Cloud Run Services](https://console.cloud.google.com/run)
   - Your app will be accessible at: `https://your-app-name-xxxxx-uc.a.run.app`

### Step 5: Set Up Custom Domain (Optional)

1. Go to [Cloud Run Services](https://console.cloud.google.com/run)
2. Click on your service
3. Go to "Manage Custom Domains"
4. Add your domain and follow the DNS configuration instructions

## License

This project is open source and available for use in your projects.

## Support

For issues or questions, please open an issue on the repository.

