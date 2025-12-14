# Kaustav Chakraborty - Portfolio

A modern, responsive portfolio website showcasing ML & Embedded Systems projects with an AI-powered assistant.

## ✨ Features

- **3D Animated Hero Section** - Three.js powered interactive sphere
- **Responsive Design** - Optimized for mobile, tablet, and desktop (up to 1920px)
- **Project Showcase** - 4 production projects with status indicators (Active/Completed/Inactive/Deployed)
- **AI Lab Assistant** - OpenAI-powered chatbot with privacy protection and local fallback responses
- **Modern UI** - Tailwind CSS with custom cyan/blue theme and smooth animations
- **Custom Scrollbars** - Themed scrollbars matching the portfolio design

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Fast build tool
- **Three.js** (@react-three/fiber, @react-three/drei) - 3D graphics
- **Tailwind CSS** - Utility-first styling
- **OpenAI API** - AI assistant (optional)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Kaustav-coder-hub/my-portfolio.git

# Navigate to project directory
cd my-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Configuration

### AI Lab Setup (Optional)

1. Create `.env.local` file in the root directory:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

2. The AI Lab works without API key using smart local fallback responses
3. For full OpenAI integration, get an API key from [OpenAI Platform](https://platform.openai.com/)
4. See `AI_SETUP_INSTRUCTIONS.md` for detailed setup guide

### Profile Customization

Edit `src/App.jsx` to update:
- Personal information (`sampleData` object)
- Projects, skills, timeline
- Avatar image path (`src/assets/images/my-profile-pic.png`)
- Social media links

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: 1280px - 1920px
- **XL Screens**: > 1920px

## 🎨 Color Scheme

- **Primary**: Cyan (#06B6D4) / Blue (#3B82F6)
- **Secondary**: Purple (#A855F7) / Pink (#EC4899)
- **Background**: Dark gradients (#050a15, #05060a, #0a0e1a)
- **Text**: Gray shades (#E5E7EB, #9CA3AF, #6B7280)

## 📄 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

### Deploy to hosting platforms:

**Vercel / Netlify:**
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: Add `VITE_OPENAI_API_KEY` if using AI features

**GitHub Pages:**
```bash
npm run build
# Deploy the dist/ folder
```

## 📂 Project Structure

```
my-portfolio/
├── public/              # Static assets
├── src/
│   ├── assets/
│   │   └── images/     # Profile pictures, project images
│   ├── App.jsx         # Main component
│   ├── App.css         # Component styles
│   ├── index.css       # Global styles & custom scrollbar
│   └── main.jsx        # Entry point
├── .env.local          # Environment variables (not committed)
├── .gitignore          # Git ignore rules
├── AI_SETUP_INSTRUCTIONS.md  # AI Lab setup guide
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## 🔒 Privacy & Security

- API keys stored in `.env.local` (gitignored)
- AI assistant blocks personal questions
- No personal data shared or stored
- Local fallback responses when API unavailable

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📧 Contact

- **GitHub**: [@Kaustav-coder-hub](https://github.com/Kaustav-coder-hub/)
- **LinkedIn**: [Kaustav Chakraborty](https://www.linkedin.com/in/kaustav-chakraborty-2009292a9/)

## 📝 License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ by Kaustav Chakraborty
