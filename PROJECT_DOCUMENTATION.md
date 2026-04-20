# Neon Apps - Proje Dokümantasyonu

## İçindekiler
1. [Sayfa İnceleme Sırası](#sayfa-İnceleme-sırası)
2. [Proje Mimarisi](#proje-mimarisi)
3. [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
4. [Sayfa Detayları](#sayfa-detayları)
5. [Ana Bileşenler](#ana-bileşenler)
6. [Veri Akışı](#veri-akışı)

---

## Sayfa İnceleme Sırası

Projeyi anlamak için sayfaları şu sırayla incelemeniz önerilir:

### 1. Login Sayfası (`/login`)
**Dosya**: `src/app/login/page.tsx`

**Neden İlk?** Uygulama akışının başlangıç noktasıdır. Kullanıcı kimlik doğrulaması burada yapılır.

**Öğrenecekleriniz**:
- Zustand ile state yönetimi (authentication store)
- Next.js'de Client-Side rendering (`use client`)
- Hydration ve yönlendirme (routing) mantığı
- Protected route'ların temeli

---

### 2. Ana Sayfa / Dashboard (`/`)
**Dosya**: `src/app/page.tsx`

**Neden İkinci?** Login'den sonra kullanıcının geldiği ilk yerdir ve tüm uygulamanın merkezidir.

**Öğrenecekleriniz**:
- Dashboard layout yapısı (Sidebar + Header + Main)
- Birden fazla component'in birlikte kullanımı
- Role-based UI rendering (Admin vs Employee)
- Stats, Announcements, Projects gibi dashboard component'leri
- Quick Actions ve Activity Feed kullanımı

---

### 3. Onboarding Sayfası (`/onboarding`)
**Dosya**: `src/app/onboarding/page.tsx`

**Neden Üçüncü?** Multi-step form işlemlerini ve state machine kullanımını gösterir.

**Öğrenecekleriniz**:
- Multi-step form yapısı
- State machine mantığı
- URL senkronizasyonu (query parameters)
- Form validation
- CSV export özelliği
- Sayfa yenileme uyarıları

---

### 4. Data Demo Sayfası (`/data-demo`)
**Dosya**: `src/app/data-demo/page.tsx`

**Neden Dördüncü?** React Query ve modern veri yönetimi tekniklerini gösterir.

**Öğrenecekleriniz**:
- React Query (TanStack Query) kullanımı
- Server-state management
- Data fetching, caching, ve refetching
- Skeleton loading states
- Error handling
- Offline detection
- Tab-based navigation

---

### 5. Staff Sayfası (`/staff`)
**Dosya**: `src/app/staff/page.tsx`

**Neden Beşinci?** Protected route ve permission-based access kontrolünü basit bir örnekle gösterir.

**Öğrenecekleriniz**:
- Protected Route kullanımı
- Permission-based access control
- Basit veri listeleme

---

### 6. Settings Sayfası (`/settings`)
**Dosya**: `src/app/settings/page.tsx`

**Neden Son?** Form controls ve UI pattern'lerini gösterir, önceki sayfaları anladıktan sonra daha kolay anlaşılır.

**Öğrenecekleriniz**:
- Card-based layout organizasyonu
- Switch, Button, Label gibi UI component'leri
- Settings kategorileri (Notifications, Security, Appearance, etc.)
- Danger zone pattern'i

---

## Proje Mimarisi

```
Neon-Apps-6/
├── src/
│   ├── app/                    # Next.js App Router sayfaları
│   │   ├── page.tsx           # Ana dashboard sayfası
│   │   ├── login/             # Login sayfası
│   │   ├── onboarding/        # Onboarding formu
│   │   ├── data-demo/         # React Query demo
│   │   ├── staff/             # Staff yönetimi (Protected)
│   │   ├── settings/          # Ayarlar (Protected)
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global stiller
│   │
│   ├── components/            # React bileşenleri
│   │   ├── ui/               # Shadcn/ui bileşenleri
│   │   ├── Header.tsx        # Üst menü
│   │   ├── Sidebar.tsx       # Yan menü
│   │   ├── LoginForm.tsx     # Login formu
│   │   ├── OnboardingForm.tsx # Multi-step form
│   │   ├── ProtectedRoute.tsx # Route koruma
│   │   └── ...               # Diğer bileşenler
│   │
│   ├── stores/               # Zustand state stores
│   │   ├── auth.ts          # Authentication store
│   │   └── onboarding.ts    # Onboarding state machine
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useDataQueries.ts # React Query hooks
│   │
│   ├── lib/                  # Utility fonksiyonlar
│   │   ├── auth.ts          # Auth helper'ları
│   │   ├── axios.ts         # Axios instance
│   │   ├── api.ts           # API fonksiyonları
│   │   ├── csvExport.ts     # CSV export utility
│   │   └── zodiacSigns.ts   # Zodiac sign mapping
│   │
│   ├── data/                 # Mock/static data
│   │   ├── dashboard.ts     # Dashboard verileri
│   │   └── staff.ts         # Staff verileri
│   │
│   └── types/                # TypeScript type definitions
│       └── index.ts
│
└── package.json
```

---

## Kullanılan Teknolojiler

### Frontend Framework
- **Next.js 14+** - React framework with App Router
- **React 18+** - UI library
- **TypeScript** - Type safety

### State Management
- **Zustand** - Minimal state management (auth, onboarding)
- **React Query (TanStack Query)** - Server state management

### UI Components
- **Shadcn/ui** - Headless UI components
- **Radix UI** - Primitive UI components
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library

### Data Fetching
- **Axios** - HTTP client
- **TanStack Query** - Data fetching, caching, synchronization

### Forms & Validation
- Custom validation logic
- Multi-step state machine

### Utilities
- **clsx / cn** - Class name utility
- **Sonner** - Toast notifications
- **CSV Export** - Custom CSV generation

---

## Sayfa Detayları

### 1. Login Sayfası

**Amaç**: Kullanıcı kimlik doğrulaması

**Özellikler**:
- Email/Password girişi
- "Remember Me" özelliği
- Test kullanıcıları için hızlı giriş
- Responsive tasarım
- Gradient background

**Kullanılan Bileşenler**:
- `LoginForm` component
- Zustand auth store

**Veri Akışı**:
```
User Input → LoginForm → Auth Store → Redirect to Dashboard
```

---

### 2. Ana Sayfa (Dashboard)

**Amaç**: Kullanıcıya genel bakış sunmak

**Özellikler**:
- 4 adet istatistik kartı (Stats)
- Quick Actions bar (role-based)
- Announcements listesi
- Active Projects listesi
- Recent Activity feed
- Breadcrumb navigation

**Kullanılan Bileşenler**:
- `Sidebar`, `Header` - Layout
- `StatCard` - İstatistikler
- `QuickActions` - Hızlı aksiyonlar
- `ActivityFeed` - Aktivite geçmişi
- `Breadcrumb` - Navigasyon

**Veri Kaynağı**:
- Static data from `src/data/dashboard.ts`

---

### 3. Onboarding Sayfası

**Amaç**: Yeni kullanıcı bilgilerini toplamak

**Özellikler**:
- 3 adımlı form (Identity, Professional, Confirmation)
- Progress bar
- Form validation
- URL senkronizasyonu
- CSV export
- Sayfa yenileme uyarısı (Türkçe)

**Kullanılan Bileşenler**:
- `OnboardingForm` - Ana form container
- `IdentityStep`, `ProfessionalStep`, `ConfirmationStep` - Adım bileşenleri
- Zustand onboarding store

**State Management**:
- State machine pattern
- URL query parameters

---

### 4. Data Demo Sayfası

**Amaç**: React Query ile veri yönetimini göstermek

**Özellikler**:
- 1000+ user ve post verisi
- Tab-based navigation (Users/Posts)
- Skeleton loading
- Manual refetch button
- Offline alert
- Cache status display
- Zodiac sign mapping

**Kullanılan Bileşenler**:
- `UserCard`, `PostCard` - Veri kartları
- `SkeletonCard` - Loading state
- `OfflineAlert` - Network durumu
- `RefetchButton` - Manuel yenileme

**Data Fetching**:
- React Query hooks (`useUsers`, `usePosts`)
- 5 dakika stale time
- 10 dakika garbage collection

---

### 5. Staff Sayfası

**Amaç**: Staff üyelerini görüntüleme (Admin only)

**Özellikler**:
- Protected route (staff permission)
- Staff listesi
- Basit card layout

**Access Control**:
- Sadece Admin ve Manager rolleri erişebilir

---

### 6. Settings Sayfası

**Amaç**: Uygulama ayarlarını yönetmek

**Özellikler**:
- Notifications ayarları
- Security ayarları
- Appearance ayarları
- Language & Region
- Danger Zone (account deletion)

**UI Pattern'leri**:
- Card-based sections
- Switch toggles
- Danger zone styling

---

## Ana Bileşenler

### Authentication & Protection
- **LoginForm** - Giriş formu
- **ProtectedRoute** - Route koruma wrapper'ı

### Layout
- **Header** - Üst menü (theme toggle, user menu)
- **Sidebar** - Yan navigasyon (permission-based filtering)

### Forms
- **OnboardingForm** - Multi-step form container
- **IdentityStep, ProfessionalStep, ConfirmationStep** - Form adımları

### Data Display
- **UserCard** - Kullanıcı kartı
- **PostCard** - Post kartı
- **StaffCard** - Staff kartı
- **StatCard** - İstatistik kartı

### Feedback & Loading
- **SkeletonCard** - Loading placeholder
- **OfflineAlert** - Offline uyarısı
- **ActivityFeed** - Aktivite listesi

### UI Components (Shadcn/ui)
- Card, Button, Input, Label, Switch, Badge, Separator, vb.

---

## Veri Akışı

### Authentication Flow
```
1. Login Page → LoginForm
2. User submits credentials
3. Zustand Auth Store validates
4. Store updates isAuthenticated
5. Redirect to Dashboard
6. Protected routes check auth state
```

### Data Fetching Flow (React Query)
```
1. Component mounts
2. useUsers/usePosts hook triggers
3. React Query checks cache
4. If stale/missing → fetch from API
5. Data stored in cache (5min fresh)
6. Component receives data
7. Manual refetch available
8. Cache persists for 10min
```

### Onboarding Flow
```
1. OnboardingForm mounts
2. URL sync with query params
3. User fills step 1 → validate → next
4. User fills step 2 → validate → next
5. User reviews step 3 → submit
6. Data exported to CSV
7. State machine resets
```

---

## Önemli Notlar

### Güvenlik
- Protected routes require authentication
- Permission-based access control
- Client-side validation (production'da server-side de olmalı)

### Performance
- React Query caching (5min stale, 10min GC)
- Lazy loading
- Optimistic UI updates

### UX
- Loading states (skeletons)
- Error handling
- Offline detection
- Toast notifications
- Responsive design
- Dark mode support

---

## Geliştirme İpuçları

1. **Yeni Sayfa Eklerken**:
   - Protected mi olacak? → `ProtectedRoute` kullan
   - Menu'de görünecek mi? → `menuItems` array'ine ekle
   - Data fetching gerekli mi? → React Query hook oluştur

2. **State Yönetimi**:
   - Global state → Zustand store
   - Server state → React Query
   - Local state → useState

3. **Stil Güncellemeleri**:
   - Tailwind CSS kullan
   - Dark mode için `dark:` prefix
   - Responsive için `sm:`, `md:`, `lg:` breakpoints

4. **Type Safety**:
   - Her zaman TypeScript type'ları tanımla
   - `src/types/` klasöründe merkezi type'lar

---

Bu dokümantasyon, projenin genel yapısını ve mantıklı öğrenme sırasını göstermektedir. Her sayfanın kaynak kodunda detaylı Türkçe yorumlar bulabilirsiniz.
