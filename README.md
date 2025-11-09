# Kalesha Baig - Personal Portfolio

A fully responsive, modern personal portfolio website showcasing my work as a Software Engineer specializing in mobile and web development. Built with HTML, CSS, and JavaScript, featuring dark/light theme support, GitHub analytics integration, and a functional contact form.

## 🌐 Live Demo

Visit the live portfolio: [kalesha58.github.io](https://kalesha58.github.io)

## ✨ Features

- **Fully Responsive Design** - Works seamlessly on all devices (mobile, tablet, desktop)
- **Dark/Light Theme Toggle** - User preference-based theme switching with persistent storage
- **GitHub Analytics Integration** - Real-time GitHub statistics, contribution graphs, and language breakdown
- **Case Studies Section** - Detailed case studies showcasing problem-solving skills and technical solutions
- **Interactive Contact Form** - EmailJS integration for direct email communication
- **Smooth Animations** - Modern UI with smooth transitions and hover effects
- **Portfolio Showcase** - Filterable project gallery
- **Resume Section** - Comprehensive experience, education, and skills display

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Ionicons
- **Email Service**: EmailJS
- **GitHub API**: For real-time analytics
- **Fonts**: Google Fonts (Poppins)

## 📁 Project Structure

```
kalesha58.github.io/
├── assets/
│   ├── css/
│   │   └── style.css          # Main stylesheet with theme support
│   ├── images/                # Images and icons
│   └── js/
│       ├── contact.js         # Contact form with EmailJS integration
│       ├── github.js          # GitHub analytics integration
│       ├── navigation.js      # Page navigation logic
│       ├── theme.js           # Dark/light theme toggle
│       ├── case-studies.js    # Case studies toggle functionality
│       └── ...
├── index.html                 # Main HTML file
└── README.md                  # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- (Optional) Local web server for development

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kalesha58/kalesha58.github.io.git
cd kalesha58.github.io
```

2. Open `index.html` in your browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

3. Visit `http://localhost:8000` in your browser

## ⚙️ Configuration

### EmailJS Setup (Contact Form)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Update credentials in `assets/js/contact.js`:
```javascript
config: {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY'
}
```

### GitHub Analytics

The GitHub analytics section automatically fetches data for the username configured in `assets/js/github.js`. Update the `GITHUB_USERNAME` constant if needed.

## 📱 Sections

- **About** - Introduction and services
- **Resume** - Professional experience, education, and skills
- **Portfolio** - Project showcase with filtering
- **Case Studies** - Real-world problem-solving scenarios
- **Contact** - Contact form and location map

## 🎨 Customization

### Theme Colors

Edit CSS variables in `assets/css/style.css`:
```css
:root {
  --orange-yellow-crayola: hsl(45, 100%, 72%);
  /* ... other color variables */
}
```

### Personal Information

Update personal details in `index.html`:
- Name, title, location
- Contact information
- Social media links
- Profile picture

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Kalesha Baig**

- GitHub: [@kalesha58](https://github.com/kalesha58)
- LinkedIn: [Kalesha Baig](https://www.linkedin.com/in/kalesha-baig-ab44a0231/)
- Email: kaleshabox8@gmail.com

## 🙏 Acknowledgments

- Design inspiration from modern portfolio templates
- Ionicons for beautiful icon set
- EmailJS for contact form functionality
- GitHub API for analytics integration
