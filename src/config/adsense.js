// ============================================================
//  GOOGLE ADSENSE CONFIGURATION
//  ============================================================
//  STEP 1: Get approved by Google AdSense (adsense.google.com)
//
//  STEP 2: Add your AdSense script tag to index.html
//          (replace the ADSENSE_PLACEHOLDER section)
//
//  STEP 3: Edit this file only:
//    - Set ADSENSE_ENABLED = true
//    - Set your Publisher ID (found in AdSense dashboard)
//    - Set your Ad Unit Slot IDs (create ad units in AdSense)
//
//  STEP 4: Redeploy to Vercel — ads appear automatically
// ============================================================

export const ADSENSE_ENABLED = false; // Change to true after approval

export const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX"; // Your Publisher ID

export const ADSENSE_SLOTS = {
  after_result:   "1234567890", // Ad shown after generating sensitivity
  below_features: "0987654321", // Ad below feature cards on home page
  below_players:  "1122334455", // Ad below player cards grid
};
