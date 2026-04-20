# Neon Apps

NeonApps, Next.js 16 ve TypeScript ile geliştirilmiş modern bir personel yönetim ve duyuru platformudur. Uygulama, rol tabanlı erişim, onboarding, istatistikler ve kullanıcı dostu arayüz sunar.

## Kurulum

```bash
npm install
npm run dev
```

- Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır.

## Özellikler
- Personel listesi ve detayları
- Duyuru yönetimi
- Onboarding süreci
- Rol tabanlı erişim (Admin/Çalışan)
- İstatistikler ve veri analizleri
- Modern ve responsive arayüz

## Sayfalar ve Ekran Görüntüleri

### 1. Ana Sayfa (Home)
![Home](/screenshots/home.png)
Açıklama: Personel dizini ve özet bilgiler.

### 2. İstatistikler
![Statistics](/screenshots/statistics.png)
Açıklama: Burç ve departman bazlı analizler.

### 3. Personel Listesi
![Staff](/screenshots/staff.png)
Açıklama: Tüm çalışanların listesi ve detayları.

### 4. Ayarlar
![Settings](/screenshots/settings.png)
Açıklama: Kullanıcı ve uygulama ayarları.

### 5. Onboarding
![Onboarding](/screenshots/onboarding.png)
Açıklama: Yeni çalışan ekleme ve onboarding adımları.

### 6. Giriş (Login)
![Login](/screenshots/login.png)
Açıklama: E-posta ve şifre ile giriş ekranı.

### 7. Data Demo
![Data Demo](/screenshots/data-demo.png)
Açıklama: JsonPlaceholder ile veri yönetimi ve demo.

### 8. Duyuru Detay
![Announcement](/screenshots/announcement.png)
Açıklama: Duyuru detayları ve önizleme.

## Güvenlik
- `.env*`, local config ve hassas dosyalar `.gitignore` ile korunur.
- Ekran görüntüleri ve local dosyalar repoya dahil edilmez.

## Katkı ve Lisans
Katkı sağlamak için fork'layıp PR gönderebilirsiniz. MIT Lisansı ile sunulmuştur.

## Overview

Neon Apps is a production ready staff management system that showcases:

  Role based authentication and authorization
  Multi step onboarding workflow with state persistence
  Advanced data management with caching and offline support
  Responsive design with light/dark mode
  Type safe development with TypeScript

## Features

  **Authentication System**: Secure login with role based permissions
  **Dashboard**: Real time statistics, announcements, and activity tracking
  **Data Management**: Handles 1000+ records with pagination, search, and filtering
  **Multi Step Onboarding**: Three step form with validation and CSV export
  **Staff Management**: Role based access control for employee data
  **Settings Panel**: Comprehensive application configuration
  **Theme Support**: Light and dark mode with persistent preferences
  **Offline Detection**: Automatic network status monitoring
  **Type Safety**: Full TypeScript coverage across the codebase

## Technology Stack

### Core
  Next.js 16.1.3 (App Router)
  React 19.2.3
  TypeScript 5.x
  Tailwind CSS 4.x

### State Management
  Zustand 5.0.10 (global state)
  TanStack React Query 5.90.20 (server state)

### UI Components
  Radix UI primitives
  Lucide React icons
  Shadcn/ui components

### Forms & Validation
  React Hook Form 7.71.1
  Zod 4.3.5

### Data Fetching
  Axios 1.13.4
  JSONPlaceholder API (demo)

## Installation

### Prerequisites

  Node.js 20.x or higher
  npm or pnpm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/MuhammetEmreNumanoglu/Neon-Apps.git
cd Neon-Apps
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Configure environment variables in `.env.local`:
```bash
NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard (/)
│   ├── login/             # Authentication
│   ├── onboarding/        # Multi step form
│   ├── data demo/         # Data management demo
│   ├── staff/             # Staff management (protected)
│   ├── settings/          # Application settings (protected)
│   ├── announcements/     # Announcements with dynamic routes
│   └── statistics/        # Statistics page (protected)
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── Header.tsx        # Application header
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── LoginForm.tsx     # Authentication form
│   ├── OnboardingForm.tsx # Multi step onboarding
│   └── ProtectedRoute.tsx # Route protection HOC
├── stores/               # Zustand state stores
│   ├── auth.ts          # Authentication state
│   └── onboardingStore.ts # Onboarding state machine
├── hooks/                # Custom React hooks
│   └── useDataQueries.ts # React Query data hooks
├── lib/                  # Utility functions
│   ├── auth.ts          # Authentication helpers
│   ├── axios.ts         # Axios configuration
│   ├── api.ts           # API client
│   ├── csvExport.ts     # CSV generation
│   └── zodiacSigns.ts   # Data transformation utilities

# NeonApps

NeonApps, modern ve kullanıcı dostu bir personel yönetim sistemidir. Rol tabanlı erişim, onboarding, veri analitiği ve tema desteğiyle öne çıkar.

## Özellikler

- **Rol tabanlı giriş ve yetkilendirme**
- **Çok adımlı onboarding ve Excel çıktısı**
- **1000+ verilik gelişmiş veri yönetimi**
- **Çalışan listesi ve filtreleme**
- **Burç ve departman istatistikleri**
- **Dark/Light tema desteği**

---


## Uygulama Akışı ve Ekran Görüntüleri

### 1. Login1 (Hoş Geldin)
Kullanıcı siteye ilk girdiğinde karşılaştığı, uygulamanın tanıtım ve giriş ekranıdır.

![Login1](/screenshots/Login1.PNG)

**Açıklama:**
Kullanıcıya uygulamanın temel özellikleri ve teknolojileri tanıtılır. "Login to Dashboard" butonuna tıklandığında kullanıcı Login ekranına yönlendirilir.

---

### 2. Login
Kullanıcı adı ve şifre ile giriş yapılan ekrandır.

![Login](screenshots/Login.PNG)

**Açıklama:**
Sadece "@neonapps.com" uzantılı e-posta adresleriyle giriş yapılabilir. Başarılı giriş sonrası kullanıcı Dashboard'a yönlendirilir.

---

### 3. Dashboard (Ana Sayfa)
Kullanıcı giriş yaptıktan sonra karşılaştığı ana paneldir.

![Dashboard](/screenshots/Dashboard.PNG)

**Açıklama:**
Kullanıcıya hoş geldin mesajı, genel istatistikler, aktif projeler, duyurular ve CSV ile toplu veri yükleme imkanı sunar. Tüm uygulama bölümlerine buradan erişim sağlanır.

---

### 4. Onboarding
Yeni çalışan ekleme ve bilgilerin toplandığı çok adımlı form ekranıdır.

![Onboarding](/screenshots/Onboarding-Form.PNG)

**Açıklama:**
Kullanıcıdan ad, soyad, burç gibi temel bilgiler alınır. Sonraki adımlarda departman ve rol seçilir, en sonunda girilen bilgilerle kişiye özel bir Excel dosyası oluşturulur.

---

### 5. Staff
Tüm çalışanların listelendiği ve filtrelenebildiği ekrandır.

![Staff](/screenshots/Staff.png)

**Açıklama:**
Çalışanların isim, soyisim, burç ve çalıştığı bölümler kartlar halinde gösterilir. Üstteki filtre ile departmana göre listeleme yapılabilir.

---

### 6. Data
İnternetten çekilen 1000 adet kullanıcının yönetildiği gelişmiş veri ekranıdır.

![Data](/screenshots/Data.png)

**Açıklama:**
Kullanıcılar sayfa sayfa listelenir, arama yapılabilir ve toplu seçim ile silme işlemi uygulanabilir. Demo amaçlıdır, veriler JSONPlaceholder API'den alınır.

---

### 7. Statistics
Kullanıcıların burç ve departman bazında dağılımının analiz edildiği ekrandır.

![Statistics](/screenshots/Statistics.PNG)

**Açıklama:**
Tüm kullanıcılar arasında burçların ve departman-burç kombinasyonlarının yüzdesel dağılımı grafik ve tablo ile gösterilir.

---

### 8. Settings
Uygulama ayarlarının görsel olarak sunulduğu, işlevsel olmayan ekrandır.

![Settings](/screenshots/Settings.PNG)

**Açıklama:**
Bildirim, güvenlik, görünüm gibi ayar başlıkları yer alır fakat şu an için sadece arayüz gösterimidir, gerçek bir işlevselliği yoktur.

---

## Tema Desteği

- Sitede dark mode ve light mode arasında geçiş yapılabilir.

---

## Kurulum

```bash
npm install
npm run dev
```
Uygulama: [http://localhost:3000](http://localhost:3000)

---

## Notlar

- Settings sayfası işlevsel değildir, sadece arayüz gösterimidir.
- Authentication ve veri işlemleri demo amaçlıdır.
- Excel çıktısı onboarding formunda oluşturulur.
- Data sayfasındaki veriler internetten çekilir ve silinebilir.

---

Daha fazla teknik detay için: [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)
## API Integration
