import { useEffect } from "react";

export default function Privacy({ setPage }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ minHeight: "100vh", padding: "80px 16px 80px", position: "relative", zIndex: 2, maxWidth: 820, margin: "0 auto" }}>

      {/* Back button */}
      <button onClick={() => setPage("home")} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 16px", color: "#64748b", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", marginBottom: 32 }}>
        ← Back to Home
      </button>

      <div style={{ background: "rgba(0,255,255,0.025)", border: "1px solid rgba(0,255,255,0.1)", borderRadius: 20, padding: "clamp(24px,5vw,52px)" }}>

        <div style={{ marginBottom: 36 }}>
          <span style={{ background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.2)", borderRadius: 100, padding: "5px 16px", color: "#00ffff", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Legal</span>
          <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 900, fontSize: "clamp(26px,5vw,44px)", color: "#f0f9ff", margin: "16px 0 8px", letterSpacing: -1 }}>Privacy Policy</h1>
          <p style={{ color: "#475569", fontSize: 13 }}>Last updated: January 2025</p>
        </div>

        <div style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.8 }}>

          <P>Welcome to <B>Sensi.gg</B> ("we", "our", or "us"). This Privacy Policy explains how we collect, use, and protect information when you use our website at sensi.gg (the "Service").</P>

          <H>1. Information We Collect</H>
          <P>We collect minimal information to provide our service:</P>
          <UL items={[
            "Device information you enter (phone model) — used only to generate sensitivity settings",
            "Gameplay preferences (finger layout, gyroscope setting, skill level) — used only to generate results",
            "Anonymous usage analytics (pages visited, feature usage) via third-party tools",
            "IP address and browser type — collected automatically by hosting and analytics services",
          ]}/>
          <P>We do <B>not</B> require account registration. We do <B>not</B> collect names, email addresses, or payment information.</P>

          <H>2. How We Use Your Information</H>
          <UL items={[
            "To generate your personalized sensitivity settings",
            "To improve the accuracy of our AI model",
            "To monitor website performance and fix errors",
            "To display relevant advertisements (via Google AdSense, if enabled)",
          ]}/>

          <H>3. Google AdSense and Advertising</H>
          <P>We use or may use Google AdSense to display advertisements. Google AdSense uses cookies and similar technologies to serve ads based on your prior visits to this website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: "#00ffff" }}>Google Ad Settings</a>.</P>
          <P>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website and/or other websites on the Internet. The use of advertising cookies enables Google and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.</P>

          <H>4. Cookies</H>
          <P>Our website may use cookies for the following purposes:</P>
          <UL items={[
            "Analytics — to understand how visitors use our site (Google Analytics)",
            "Advertising — to serve relevant ads (Google AdSense)",
            "Preferences — to remember your settings between visits",
          ]}/>
          <P>You can control cookies through your browser settings. Disabling cookies may affect some functionality of the site.</P>

          <H>5. Third-Party Services</H>
          <P>We use the following third-party services that may collect data:</P>
          <UL items={[
            "Google Analytics — website traffic analysis",
            "Google AdSense — advertising",
            "Vercel / Hostinger — website hosting",
            "Railway — backend API hosting",
          ]}/>
          <P>Each of these services has its own privacy policy. We encourage you to review their policies.</P>

          <H>6. Data Retention</H>
          <P>Sensitivity inputs (device, fingers, gyro setting) are <B>not stored</B> on our servers after your session ends. Analytics data is retained for up to 26 months as per Google Analytics defaults.</P>

          <H>7. Children's Privacy</H>
          <P>Our Service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us.</P>

          <H>8. Your Rights</H>
          <P>Depending on your location, you may have the right to:</P>
          <UL items={[
            "Access the personal data we hold about you",
            "Request deletion of your personal data",
            "Opt out of analytics and advertising tracking",
            "Lodge a complaint with a supervisory authority (EU residents)",
          ]}/>

          <H>9. Changes to This Policy</H>
          <P>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. Continued use of the Service after changes constitutes acceptance of the updated policy.</P>

          <H>10. Contact Us</H>
          <P>If you have questions about this Privacy Policy, please contact us via the contact form on our website or through our social media channels.</P>

          <div style={{ marginTop: 36, padding: "20px 24px", background: "rgba(0,255,255,0.03)", border: "1px solid rgba(0,255,255,0.08)", borderRadius: 12 }}>
            <p style={{ color: "#475569", fontSize: 13, margin: 0 }}>
              <B style={{ color: "#00ffff" }}>Sensi.gg</B> is not affiliated with PUBG Corporation, Krafton Inc., or any esports organizations mentioned. Player sensitivity data is sourced from publicly available tournament streams and official team posts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function H({ children }) {
  return <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: "clamp(16px,3vw,20px)", color: "#e2e8f0", margin: "32px 0 12px", letterSpacing: -0.5 }}>{children}</h2>;
}
function P({ children }) {
  return <p style={{ margin: "0 0 14px" }}>{children}</p>;
}
function B({ children, style = {} }) {
  return <strong style={{ color: "#e2e8f0", fontWeight: 700, ...style }}>{children}</strong>;
}
function UL({ items }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 14px" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "5px 0" }}>
          <span style={{ color: "#00ffff", flexShrink: 0, marginTop: 2 }}>▸</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
