
# LSS Press - Official Press Organization Website

![LSS Press Logo](public/lovable-uploads/eedd66e1-c2d9-49d3-814f-a415331d2a90.png)

**Motto:** Upholding the rule of Justice

## 📖 About

LSS Press is the official press organization of the Law Students' Society, dedicated to delivering timely news, insightful articles, and engaging interviews to the student populace. With a team of 60 committed members, we cover a wide range of topics, from legal education and student affairs to lifestyle and motivation. In addition to written content, we produce video reports and features, ensuring a dynamic and interactive media presence.

The LSS Press was established in 1992 as the official media body of the Faculty of Law, University of Ilorin. Our mission is to promote legal journalism, foster intellectual discourse among law students, and nurture the next generation of legal writers.

## 🎯 Aims and Objectives

- **A.** To foster peace, unity and progress among the students
- **B.** To promote faculty journalism
- **C.** To improve the level of consciousness of the members
- **D.** To inculcate the right values, norms and attitudes of humanity in our members and the general public
- **E.** To instill discipline in the students through educative and constructive writing
- **F.** To protect the fundamental human rights of the students on campus
- **G.** To establish an effective group communication with the University management so that the rights of the students are protected
- **H.** To report objectively the events and happenings on campus
- **I.** To promote the good name of the University and uphold and defend its integrity
- **J.** To cater for the well-being of the students within the faculty
- **K.** To train members in the art of Public speaking, Intellectual discuss and debating

## 🚀 Features

### 📰 Publications Management
- **Article Publishing**: Create and manage legal articles, case notes, and essays
- **Editorial System**: Comprehensive editorial workflow with draft, review, and publish states
- **Content Categories**: Organized content by legal specializations and topics
- **SEO Optimization**: Built-in meta tags and structured content for better search visibility

### 📅 News & Events
- **News Updates**: Latest announcements and press releases
- **Event Management**: Workshop schedules, seminars, and academic events
- **Calendar Integration**: Event scheduling and reminder system
- **Archive System**: Historical news and events with search functionality

### 👥 User Management
- **Role-Based Access**: Different permission levels for editors, writers, and contributors
- **Author Profiles**: Individual profiles for team members and contributors
- **Authentication**: Secure login system with Firebase integration
- **Member Directory**: Comprehensive listing of all LSS Press members

### 🖼️ Media Gallery
- **Photo Gallery**: Event photos and organizational moments
- **Media Library**: Centralized storage for images and documents
- **Upload Management**: Easy media upload with file organization
- **Responsive Images**: Optimized image delivery for all devices

### 💬 Interactive Features
- **Comment System**: Reader engagement on articles and posts
- **Contact Forms**: Multiple contact options for different purposes
- **Newsletter Subscription**: Email updates for subscribers
- **Social Media Integration**: Connected social media presence

### 🔧 Admin Dashboard
- **Content Management**: Full CRUD operations for all content types
- **Analytics Dashboard**: Usage statistics and performance metrics
- **User Management**: Admin controls for user accounts and permissions
- **Media Management**: File upload and organization tools

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Modern component library
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Firebase Firestore** - NoSQL cloud database
- **Firebase Authentication** - User authentication service
- **Supabase** - Additional backend services
- **Firebase Storage** - File storage and media management

### State Management & Data Fetching
- **TanStack React Query** - Server state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### UI Components & Styling
- **Radix UI** - Unstyled, accessible components
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Tailwind class merging utility
- **Next Themes** - Theme management system

### Additional Libraries
- **EmailJS** - Email service integration
- **Date-fns** - Date manipulation utilities
- **Recharts** - Chart and graph components
- **Embla Carousel** - Touch-friendly carousels

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/UI components
│   ├── admin/           # Admin-specific components
│   ├── Hero.tsx         # Homepage hero section
│   ├── Navbar.tsx       # Navigation component
│   ├── Footer.tsx       # Footer component
│   └── ...
├── pages/               # Page components
│   ├── admin/           # Admin dashboard pages
│   ├── About.tsx        # About page
│   ├── Index.tsx        # Homepage
│   └── ...
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── firebase/            # Firebase configuration
├── supabase/            # Supabase configuration
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── images/              # Static images
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Firebase account (for backend services)
- Supabase account (optional, for additional features)

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd lss-press-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id

   # Supabase Configuration (Optional)
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # EmailJS Configuration
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

4. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Enable Storage
   - Add your web app and copy the configuration

5. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Access the Application**
   Open [http://localhost:5173](http://localhost:5173) in your browser

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Firebase Rules
Configure Firestore security rules for proper data access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Publications rules
    match /publications/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // News and Events rules
    match /newsEvents/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Users rules
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Admin Access
To grant admin access:
1. Create a user account through the website
2. Manually add the user to the `users` collection in Firestore
3. Set the `role` field to `"admin"`

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1024px and above)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🔐 Security Features

- **Authentication** - Secure Firebase Authentication
- **Authorization** - Role-based access control
- **Data Validation** - Zod schema validation
- **XSS Protection** - React's built-in protection
- **Secure Headers** - Production security headers

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables
4. Set up continuous deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 👥 Team

### Editorial Board

**Adio Faidat Oluwapelumi** - *Editor-in-Chief*
Adio Faidat Oluwapelumi is the Editor-in-Chief of LSS Press. She oversees editorial works and contributes engaging content, ensuring that the publication reflects diverse perspectives. She is skilled in project management. A dedicated team player, she values collaboration and is committed to creating a platform that meets students' needs in publication. She has a keen interest in lifestyle writing.

**Sogbade Hafsat** - *Deputy Editor-in-Chief*
Sogbade Hafsat is a 400-level law student at the University of Ilorin with a strong passion for legal studies and academic pursuits. As the Deputy Editor-in-Chief of the Law Students' Society Press, she contributes to the development of editorial content and strategy. Beyond law, Hafsat enjoys writing and is deeply interested in education and literature. She is dedicated to collaborating with the team.

**Lawal Habeebat** - *Public Relations Officer*
My name is Lawal Habeebat, and I am currently the Public Relations Officer for LSS Press, where I manage communications and the dissemination of our journalistic pieces. I am a 300-level Combined Law student with a strong interest in writing, communication, and media relations. Outside of my academic and journalistic responsibilities, I enjoy reading, journaling, and solving word puzzles, which help sharpen my analytical thinking and creativity. I am passionate about developing my skills in writing and editing, and I contribute my knowledge and enthusiasm to the editorial board.

**Emmanuel Adeyeye** - *General Secretary*
My name is Emmanuel Adeyeye and I am the General Secretary of LSS Press. I enjoy art in all mediums, but books most of all so I love to read. I write too, sometimes.

**Aanu Olorunnipa** - *Financial Secretary*
Aanu Olorunnipa is a law student, content writer, and intellectual property enthusiast driven by passion and commitment. With a love for learning and connecting with others, and the love of God at the center of her journey, there's constant pursuit of knowledge and meaningful relationships.

## 📞 Contact Information

- **Email**: Lsspressdirect@gmail.com
- **Phone**: +234 704 341 6921
- **Address**: Faculty of Law, University of Ilorin, Ilorin, Nigeria

### Social Media
- **Instagram**: [@lss_press](https://www.instagram.com/lss_press?igsh=amtsbnZmZTF3bHox)
- **Twitter/X**: [@lss_press](https://x.com/lss_press?t=i6AvJQRl__bxThGw0ZMKMg&s=09)
- **YouTube**: [LSS Press](https://youtube.com/@lsspress?si=HPsSNyUbCwdw6Rfm)

## 🤝 Contributing

We welcome contributions from law students and developers! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

### Contribution Guidelines
- Follow existing code style and conventions
- Write clear commit messages
- Test your changes thoroughly
- Update documentation if necessary

## 📄 License

This project is proprietary software of the Law Students' Society Press, University of Ilorin. All rights reserved.

## 🆘 Support

For technical support or questions:
1. Check the documentation above
2. Search existing issues in the repository
3. Contact the development team
4. Email: Lsspressdirect@gmail.com

## 🔄 Updates and Maintenance

The website is actively maintained by the LSS Press technical team. Regular updates include:
- Security patches
- Feature enhancements
- Content management tools
- Performance optimizations

---

**Built with ❤️ by LSS Press Technical Team**

*Upholding the rule of Justice through digital innovation*
