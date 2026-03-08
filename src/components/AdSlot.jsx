import { useEffect, useRef } from "react";

// ============================================================
//  GOOGLE ADSENSE COMPONENT
//  When you receive your AdSense approval:
//
//  1. Open src/config/adsense.js
//  2. Set ADSENSE_ENABLED = true
//  3. Replace ADSENSE_CLIENT with your publisher ID (ca-pub-XXXXXXXX)
//  4. Replace slot IDs in SLOTS with your actual slot IDs
//  5. Redeploy - ads will appear automatically
// ============================================================

// Slot positions available across the site:
//  "after_result"   - below the generated sensitivity result
//  "below_features" - below feature cards on home page
//  "below_players"  - below player cards grid
//  "sidebar"        - desktop sidebar (auto-format)

export default function AdSlot({ slot = "after_result", style = {} }) {
  const ref = useRef(null);

  // Import config values
  const enabled = typeof window !== "undefined" && window.__ADSENSE_ENABLED === true;
  const client  = typeof window !== "undefined" && window.__ADSENSE_CLIENT;
  const slotId  = typeof window !== "undefined" && window.__ADSENSE_SLOTS && window.__ADSENSE_SLOTS[slot];

  useEffect(() => {
    if (!enabled || !client || !slotId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense already initialized
    }
  }, [enabled, client, slotId]);

  if (!enabled || !client || !slotId) {
    // Placeholder shown in dev / before AdSense approval
    // Remove the <div> below if you don't want visible placeholders
    return null;
  }

  return (
    <div style={{ minHeight: 90, width: "100%", maxWidth: 728, margin: "0 auto", overflow: "hidden", ...style }}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
