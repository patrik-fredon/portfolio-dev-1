# Portfolio Template

A modern, responsive portfolio template for developers and designers. Built with Next.js and TailwindCSS.

## Features

- Modern, responsive design
- Multiple language support (English, Czech, German)
- Dark mode and multiple theme options
- Animated UI interactions with Framer Motion
- Sections for:
  - Hero/Introduction
  - About
  - Skills
  - Projects
  - Education
  - Experience
  - Contact

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio-template.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the template in your browser.

## Customization

### Personal Information

Edit the `data/portfolio.json` file to update:

- Your name, title, and description
- Skills
- Projects
- Education history
- Work experience
- Contact information

### Placeholder Images

The template uses placeholder images for projects. Replace these with your own project screenshots:

1. Add your images to the `public/projects/` directory
2. Update the image paths in `data/portfolio.json`

Recommended image dimensions: 800x600px or 16:9 aspect ratio.

### Themes

The template includes multiple themes that can be modified in `app/themes.js`.

### Languages

You can customize or add new languages in the `data/portfolio.json` file. The template currently supports:

- English (en)
- Czech (cs)
- German (de)

To add a new language, add translations for all text throughout the portfolio.json file and update the `LANGUAGES` constant in `app/constants.js`.

## Deployment

This template can be easily deployed to Vercel:

1. Push to GitHub
2. Import the repository to Vercel
3. Deploy

## License

This template is available for personal and commercial use. Please respect the terms of the license.

## Credits

Created as a portfolio template for developers and designers.
