"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/auth";
import { Button } from "../components/ui/button";
import { ArrowRight, Code2, Terminal, Sparkles } from "lucide-react";

// Helper to handle hydration without setState in useEffect
const useMounted = () => {
    return useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    );
};

export default function LandingPage() {
    const { isAuthenticated, hydrated } = useAuthStore();
    const router = useRouter();
    const mounted = useMounted();

    useEffect(() => {
        if (hydrated && isAuthenticated) {
            router.push("/home");
        }
    }, [hydrated, isAuthenticated, router]);

    if (!mounted || !hydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return null;
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
            {/* Matrix Rain Background */}
            <MatrixRain />

            {/* Gradient Orbs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Icon Animation */}
                    <div className="flex justify-center gap-4 mb-8">
                        <div className="animate-bounce delay-0">
                            <Code2 className="w-12 h-12 text-purple-400" />
                        </div>
                        <div className="animate-bounce delay-100">
                            <Terminal className="w-12 h-12 text-blue-400" />
                        </div>
                        <div className="animate-bounce delay-200">
                            <Sparkles className="w-12 h-12 text-pink-400" />
                        </div>
                    </div>

                    {/* Typing Animation Headline */}
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient">
                            <TypingText text="Neon Apps" />
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
                            Staff Management Dashboard
                        </p>
                    </div>

                    {/* Glassmorphism Card */}
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500 hover:scale-105">
                        <div className="space-y-6">
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                                <CodeSnippet text="Next.js 15" delay={0} />
                                <CodeSnippet text="TypeScript" delay={100} />
                                <CodeSnippet text="React Query" delay={200} />
                                <CodeSnippet text="Zustand" delay={300} />
                            </div>

                            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                Modern, full-featured staff management system with role-based access control,
                                real-time data synchronization, and beautiful UI.
                            </p>

                            {/* Login Button */}
                            <Button
                                onClick={() => router.push("/login")}
                                size="lg"
                                className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110"
                            >
                                Login to Dashboard
                                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                            </Button>
                        </div>
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute inset-0 pointer-events-none">
                        <Particle delay={0} />
                        <Particle delay={2} />
                        <Particle delay={4} />
                        <Particle delay={1} />
                        <Particle delay={3} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function TypingText({ text }: { text: string }) {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev: string) => prev + text[currentIndex]);
                setCurrentIndex((prev: number) => prev + 1);
            }, 150);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text]);

    return (
        <span>
            {displayText}
            <span className="animate-pulse">|</span>
        </span>
    );
}

function CodeSnippet({ text, delay }: { text: string; delay: number }) {
    return (
        <span
            className="px-3 py-1 bg-slate-800/50 border border-purple-500/30 rounded-md font-mono text-purple-300 animate-fade-in"
            style={{ animationDelay: `${delay}ms` }}
        >
            {text}
        </span>
    );
}

function Particle({ delay }: { delay: number }) {
    const [randomX] = useState(() => Math.random() * 100);
    const [randomY] = useState(() => Math.random() * 100);

    return (
        <div
            className="absolute w-2 h-2 bg-purple-400 rounded-full animate-float opacity-50"
            style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                animationDelay: `${delay}s`
            }}
        ></div>
    );
}

function MatrixRain() {
    const [columns] = useState(() =>
        [...Array(20)].map(() => ({
            animationDelay: Math.random() * 5,
            animationDuration: 10 + Math.random() * 10,
            characters: [...Array(30)].map(() =>
                String.fromCharCode(33 + Math.floor(Math.random() * 94))
            )
        }))
    );

    return (
        <div className="absolute inset-0 overflow-hidden opacity-20">
            {columns.map((column, i) => (
                <div
                    key={i}
                    className="absolute text-green-500 font-mono text-xs animate-matrix-rain"
                    style={{
                        left: `${i * 5}%`,
                        animationDelay: `${column.animationDelay}s`,
                        animationDuration: `${column.animationDuration}s`
                    }}
                >
                    {column.characters.map((char, j) => (
                        <div key={j}>{char}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}
