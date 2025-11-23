import Link from "next/link";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n-config";

export default function Logo({ className, lang }: { className?: string; lang: Locale }) {
  return (
    <Link href={`/${lang}`} className={cn("text-2xl font-headline font-bold", className)}>
      EZCENTIALS
    </Link>
  );
}
