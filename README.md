# FawziUiUx Portfolio

A dynamic Next.js portfolio website with a full-featured admin panel for content management.

## Features

- **Dynamic Content Management**: Edit all content through the admin panel
- **Sections**: Hero, About Me, Services, Projects, Testimonials, Contact
- **Admin Dashboard**: Secure authentication with full CRUD operations
- **Database**: PostgreSQL with Prisma ORM
- **Responsive Design**: Mobile-first design with colorful dot pattern background

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Neon is already configured via environment variables)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma Client:
```bash
npm run prisma:generate
```

3. Run database migrations:
```bash
npm run prisma:migrate
```

4. Seed the database with initial data:
```bash
npx prisma db execute --file ./scripts/002-seed-data.sql --schema ./prisma/schema.prisma
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Panel

Access the admin panel at [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Default Login Credentials:**
- Email: `admin@example.com `
- Password: `admin123`

### Admin Features

- **Dashboard**: Overview of all content with statistics
- **Hero Section**: Edit welcome text, title, description, and image
- **About Section**: Manage about content and skills with progress bars
- **Services**: Add, edit, and delete service offerings
- **Projects**: Manage project portfolio with categories and filtering
- **Testimonials**: Add and manage client testimonials
- **Settings**: Update site name, logo, footer text, and social links

## Database Schema

The application uses the following models:
- `Admin` - Admin user authentication
- `Hero` - Hero section content
- `About` - About section with related Skills
- `Service` - Service offerings
- `Project` - Portfolio projects
- `Testimonial` - Client testimonials
- `SiteSettings` - Global site configuration
- `ContactSubmission` - Contact form submissions

## Development Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio (database GUI)
```

## Project Structure

```
├── app/
│   ├── admin/          # Admin panel pages
│   ├── api/            # API routes
│   └── page.tsx        # Public portfolio homepage
├── components/
│   ├── admin/          # Admin panel components
│   └── *.tsx           # Public portfolio components
├── lib/
│   ├── auth.ts         # Authentication utilities
│   └── prisma.ts       # Prisma client singleton
├── prisma/
│   └── schema.prisma   # Database schema
├── scripts/
│   └── *.sql           # Database seed scripts
└── public/
    └── images/         # Static images
```

## Customization

### Changing Colors

Edit the design tokens in `app/globals.css`:
- `--primary`: Green color (main brand color)
- `--accent`: Orange color (call-to-action buttons)

### Updating Content

All content can be updated through the admin panel at `/admin`. No code changes required.

### Adding New Admin Users

Currently, the system supports a single admin user. To change the admin credentials:

1. Hash a new password using bcrypt
2. Update the Admin record in the database via Prisma Studio or SQL

## Deployment

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Environment variables are already set up via the Neon integration

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Authentication**: Custom with bcrypt
- **Deployment**: Vercel

## License

MIT License - feel free to use this for your own portfolio!
