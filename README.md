# AKIRO — AI Learning & Career Companion

A modern, production-ready React application for AI-powered learning and career development in tech. Built with React, TypeScript, Tailwind CSS, and featuring a complete user journey from skill selection to job readiness.

## 🌊 Design System - Ocean Calm Theme

- **Primary**: `#2563EB` (Ocean Blue)
- **Accent**: `#14B8A6` (Teal)
- **Background**: `#F0F9FF` (Light Blue)
- **Text**: `#0F172A` (Dark Blue)
- **Typography**: Inter font family
- **Components**: Card-based layout with generous whitespace, rounded corners, subtle shadows

## ✨ Features

### 🎯 Complete User Journey
- **Landing Page**: Hero section with social proof and feature highlights
- **Authentication**: Mock signup/login with validation
- **Skill Selection**: Interactive cards for Full Stack, MERN, DevOps, Data Science, Cloud
- **Personalized Roadmap**: Visual milestone tracker with progress indicators
- **Weekly Assignments**: Quizzes and projects with status tracking
- **Job Search**: Live job listings with filters and recommendations
- **AI Chat Helper**: Collapsible chat widget with code examples

### 🎨 Design Features
- Responsive design with mobile-first approach
- Ocean Calm color palette throughout
- Gradient buttons and hero sections
- Card hover effects and smooth transitions
- Accessibility-focused with semantic HTML and ARIA labels
- Dark/light mode support built into the design system

### 🔧 Technical Features
- **React 18** with TypeScript
- **Tailwind CSS** with custom design system
- **React Router** for navigation
- **Context API** for state management
- **Mock APIs** for data simulation
- **Component-based architecture**
- **Fully typed with TypeScript**

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Shadcn UI components with custom variants
│   ├── Navigation.tsx
│   ├── ChatHelper.tsx
│   ├── WeeklyAssignments.tsx
│   └── ...
├── pages/
│   ├── HomePage.tsx  # Landing page with auth modals
│   ├── Dashboard.tsx # Main student dashboard
│   ├── Roadmap.tsx   # Learning path visualization
│   └── JobSearch.tsx # Job listings and search
├── contexts/
│   └── AuthContext.tsx # Authentication state
├── lib/
│   └── api.ts        # Mock API functions
└── assets/           # Generated images and assets
```

## 🎨 Component Library

### Custom Button Variants
- `hero`: Gradient background with hover effects
- `accent`: Teal accent color variant
- `card`: Card-style button for secondary actions

### Key Components
- **SkillSelection**: Interactive skill cards with market data
- **WeeklyAssignments**: Assignment cards with quiz modal
- **ChatHelper**: Collapsible AI tutor with code preview
- **Navigation**: Responsive nav with user dropdown

## 🌐 Mock APIs

All data is mocked client-side for easy development:

```typescript
// Available endpoints
getSkills()           // Skill cards with market data
getRoadmap(skillId)   // Learning milestones
getJobs(query)        // Job listings
getAssignments()      // Weekly tasks
getTrendingSkills()   // Popular skills
```

### Replacing with Real APIs

To connect real APIs, update the functions in `src/lib/api.ts`:

```typescript
export const getJobs = async (query?: string): Promise<Job[]> => {
  const response = await fetch(`/api/jobs?query=${query}`);
  return response.json();
};
```

## 🎯 Key Pages & Routes

- `/` - Landing page with authentication
- `/dashboard` - Student dashboard with progress
- `/roadmap` - Visual learning path
- `/jobs` - Job search and recommendations

## 🔧 Customization

### Design System
- Edit `src/index.css` for color tokens and gradients
- Update `tailwind.config.ts` for custom utilities
- Modify component variants in `src/components/ui/`

### Adding New Skills
Update the mock data in `src/lib/api.ts`:

```typescript
const mockSkills: Skill[] = [
  {
    id: 'new-skill',
    name: 'New Technology',
    description: 'Learn the latest tech',
    demand: 'High',
    openings: 50000,
    trending: true,
    icon: '🚀'
  }
];
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- All components are fully responsive
- Touch-friendly interface on mobile

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and live regions
- Keyboard navigation support
- Color contrast ratio ≥ 4.5:1
- Screen reader friendly

## 🎭 Production Ready

- TypeScript for type safety
- ESLint configuration
- Optimized build process
- Component error boundaries
- Performance optimizations

## 📈 Next Steps

1. **Connect Real Backend**: Replace mock APIs with actual endpoints
2. **Add Authentication**: Integrate with Firebase/Auth0/Supabase
3. **Payment Integration**: Add subscription/premium features
4. **Advanced Analytics**: Track user progress and engagement
5. **Mobile App**: React Native version using shared components

## 🛠 Built With

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Lucide React](https://lucide.dev/) for icons
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/) for build tooling

---

**AKIRO** - Empowering the next generation of developers with AI-powered learning. 🚀