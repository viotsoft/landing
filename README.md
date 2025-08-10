# AI Consulting Landing Page

A full-stack landing page for AI product consulting services with newsletter signup, contact forms, and analytics tracking.

## 🚀 Features

- **Modern Landing Page**: Built with Tailwind CSS
- **Newsletter Signup**: Double opt-in email subscription
- **Contact Forms**: With UTM tracking and analytics
- **Database**: PostgreSQL with Prisma ORM
- **Analytics**: Page views and CTA click tracking
- **Calendly Integration**: Booking widget
- **Responsive Design**: Mobile-first approach

## 🛠️ Tech Stack

- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (production), SQLite (development)
- **ORM**: Prisma
- **Deployment**: Render

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/landing.git
   cd landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   DATABASE_URL="file:./dev.db"
   DATABASE_PROVIDER="sqlite"
   PORT=3000
   CORS_ORIGIN="*"
   ```

4. **Set up database**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🌐 Deployment

### Render (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repo
   - Use the `render.yaml` configuration
   - Add PostgreSQL database
   - Deploy!

### Environment Variables for Production

Set these in Render:
- `NODE_ENV`: `production`
- `DATABASE_PROVIDER`: `postgresql`
- `DATABASE_URL`: PostgreSQL connection string
- `CORS_ORIGIN`: Your domain or `*`

## 📊 API Endpoints

- `GET /api/health` - Health check
- `POST /api/subscribe` - Newsletter signup
- `GET /api/confirm?token=...` - Email confirmation
- `POST /api/contact` - Contact form submission
- `POST /api/events` - Analytics tracking

## 🗄️ Database Schema

- **Subscribers**: Email subscriptions with confirmation tokens
- **ContactMessages**: Contact form submissions with UTM tracking
- **EventLogs**: Page views and CTA click analytics

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run build` - Build for production
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:db:push` - Push schema to database

### Project Structure

```
landing/
├── src/
│   └── server.js          # Express server
├── public/
│   └── index.html         # Landing page
├── prisma/
│   └── schema.prisma      # Database schema
├── generated/             # Generated Prisma client
├── package.json
├── render.yaml           # Render deployment config
└── README.md
```

## 📝 License

MIT License - feel free to use this for your own projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support, contact: sergiokravchenko@gmail.com
