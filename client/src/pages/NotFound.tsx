import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/app");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#07070f] text-[#ECEAE3] p-4 font-['IBM_Plex_Sans_Arabic']">
      <Card className="w-full max-w-lg mx-4 shadow-xl border border-[#36A3FF]/30 bg-[#0c0c18]">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF754D]/20 rounded-full animate-ping" />
              <AlertCircle className="relative h-16 w-16 text-[#FF754D]" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-[#FF754D] font-['Pixelify_Sans'] mb-2">404</h1>

          <h2 className="text-xl font-semibold text-[#36A3FF] mb-4">
            الصفحة غير موجودة / Page Not Found
          </h2>

          <p className="text-[#ECEAE3]/70 mb-8 leading-relaxed text-sm">
            عذراً، الصفحة التي تبحث عنها غير موجودة.
            <br />
            The page you are looking for does not exist.
          </p>

          <div className="flex justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-[#36A3FF] hover:bg-[#36A3FF]/80 text-[#07070f] font-bold px-6 py-2.5 rounded-none border border-[#36A3FF] transition-all font-['Pixelify_Sans'] shadow-[2px_2px_0px_#FF754D]"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to /app
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
