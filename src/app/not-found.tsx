import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background px-4 text-center">
            <div className="flex flex-col items-center space-y-6">
                <div className="rounded-full bg-muted p-6">
                    <AlertCircle className="h-12 w-12 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Sayfa Bulunamadı
                    </h2>
                    <p className="text-muted-foreground max-w-[500px]">
                        Aradığınız sayfaya ulaşılamıyor. Sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir.
                    </p>
                </div>

                <Link href="/home">
                    <Button size="lg" className="mt-4">
                        Ana Sayfaya Dön
                    </Button>
                </Link>
            </div>
        </div>
    );
}
