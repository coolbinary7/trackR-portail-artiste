import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./logo.css";
import "./workflow.css";
import "./featurings.css";
import "./responsive-sites.css";
import "./login.css";
import "./guides.css";
import "./corrections.css";
import { chatGPTSignInPath, getChatGPTUser } from "./chatgpt-auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "trackR — Portail artiste",
  description: "Soumettez et suivez vos prochaines sorties avec trackR.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getChatGPTUser();

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {user ? children : (
          <main className="login-page">
            <section className="login-brand" aria-label="trackR">
              <img src="/trackr-logo.png" alt="trackR" />
              <div>
                <p className="login-eyebrow">TRACKR · DISTRIBUTION</p>
                <h1>Votre prochaine sortie commence ici.</h1>
                <p>Préparez votre projet, vos artistes, votre tracklist et votre planning dans un espace sécurisé.</p>
              </div>
              <div className="login-steps" aria-label="Parcours de soumission">
                <span><b>01</b> Projet</span>
                <span><b>02</b> Artistes</span>
                <span><b>03</b> Tracklist</span>
              </div>
            </section>

            <section className="login-panel">
              <div className="login-card">
                <img src="/trackr-logo.png" alt="" aria-hidden="true" />
                <p className="login-eyebrow">ESPACE ARTISTE</p>
                <h2>Connectez-vous pour continuer</h2>
                <p>Votre connexion permet de sécuriser votre demande et de retrouver votre espace.</p>
                <a className="login-button" href={chatGPTSignInPath("/")}>
                  Se connecter avec ChatGPT <span aria-hidden="true">→</span>
                </a>
                <small>En continuant, vous accédez à votre espace de mise en ligne trackR.</small>
              </div>
              <p className="login-help">Besoin d’aide ? <a href="mailto:support@virginmusicafrique.com">Contactez notre équipe</a></p>
            </section>
          </main>
        )}
      </body>
    </html>
  );
}
