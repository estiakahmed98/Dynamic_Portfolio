-- Seed initial admin user (password: admin123)
INSERT INTO "Admin" (id, email, password, name, "createdAt", "updatedAt")
VALUES (
  'admin-001',
  'admin@example.com ',
  '$2a$10$rXK5VqPVfYFvYXoGq6EqV.K1YpQYxJ0xKNqGZ7X8WgLQXBKxZnB0a',
  'Admin User',
  NOW(),
  NOW()
);

-- Seed Hero Section
INSERT INTO "Hero" (id, welcome, title, subtitle, description, "imageUrl", "createdAt", "updatedAt")
VALUES (
  'hero-001',
  'Welcome',
  'I have Creative Design Experience',
  'Creative Design',
  'I''m Tanvir, a creative Product Designer. I''ve been helping businesses to solve their problems with my design for 2 years.',
  '/images/hero.png',
  NOW(),
  NOW()
);

-- Seed About Section
INSERT INTO "About" (id, title, description, "imageUrl", "createdAt", "updatedAt")
VALUES (
  'about-001',
  'About Me',
  'Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in. Aliquet donec morbi convallis pretium. Turpis tempus pharetra',
  '/images/about-20me.png',
  NOW(),
  NOW()
);

-- Seed Skills
INSERT INTO "Skill" (id, name, percentage, "order", "aboutId", "createdAt", "updatedAt")
VALUES 
  ('skill-001', 'UX', 90, 1, 'about-001', NOW(), NOW()),
  ('skill-002', 'Website Design', 85, 2, 'about-001', NOW(), NOW()),
  ('skill-003', 'App Design', 95, 3, 'about-001', NOW(), NOW()),
  ('skill-004', 'Graphic Design', 88, 4, 'about-001', NOW(), NOW());

-- Seed Services
INSERT INTO "Service" (id, title, description, icon, "order", "createdAt", "updatedAt")
VALUES 
  ('service-001', 'UI/UX', 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum', 'layout', 1, NOW(), NOW()),
  ('service-002', 'Web Design', 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum', 'monitor', 2, NOW(), NOW()),
  ('service-003', 'App Design', 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum', 'smartphone', 3, NOW(), NOW()),
  ('service-004', 'Graphic Design', 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum', 'palette', 4, NOW(), NOW());

-- Seed Projects
INSERT INTO "Project" (id, title, description, category, "imageUrl", "order", "createdAt", "updatedAt")
VALUES 
  ('project-001', 'AirCalling Landing Page Design', 'Lorem ipsum dolor sit amet consectetur', 'Web Design', '/images/projects.png', 1, NOW(), NOW()),
  ('project-002', 'Business Landing Page Design', 'Lorem ipsum dolor sit amet consectetur', 'Web Design', '/images/projects.png', 2, NOW(), NOW()),
  ('project-003', 'Ecom Web Page Design', 'Lorem ipsum dolor sit amet consectetur', 'Web Design', '/images/projects.png', 3, NOW(), NOW());

-- Seed Testimonials
INSERT INTO "Testimonial" (id, name, role, content, "imageUrl", "order", "createdAt", "updatedAt")
VALUES (
  'testimonial-001',
  'Name',
  'CEO',
  'Lorem ipsum dolor sit amet consectetur. In enim cursus odio accumsan. Id leo urna velit neque mattis id tellus arcu condimentum. Augue dictum dolor elementum convallis dignissim malesuada commodo ultrices.',
  '/placeholder.svg?height=80&width=80',
  1,
  NOW(),
  NOW()
);

-- Seed Site Settings
INSERT INTO "SiteSettings" (id, "siteName", "logoUrl", "footerText", "facebookUrl", "twitterUrl", "instagramUrl", "linkedinUrl", "createdAt", "updatedAt")
VALUES (
  'settings-001',
  'FawziUiUx',
  '/images/header.png',
  '© 2023 FawziUiUx All Rights Reserved, Inc.',
  'https://facebook.com',
  'https://twitter.com',
  'https://instagram.com',
  'https://linkedin.com',
  NOW(),
  NOW()
);
