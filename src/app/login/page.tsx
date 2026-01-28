/**
 * Login Page
 * 
 * Basit giris sayfasi. Navbar veya Sidebar icermez.
 */
"use client";

import { LoginForm } from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">NeonApps</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
