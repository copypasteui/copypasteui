// The visitor's business details for personalised prompts. Kept only in their browser.
export type Business = { name: string; trade: string; town: string; phone: string; email: string };
export const EMPTY_BUSINESS: Business = { name: "", trade: "", town: "", phone: "", email: "" };
const STORE = "copypasteui:business";

export function loadBusiness(): Business {
  try {
    const { contact, ...saved } = JSON.parse(localStorage.getItem(STORE) ?? "null") ?? {};
    // Older saves had one "Phone or email" field.
    const old = typeof contact === "string" && contact.trim() ? { [contact.includes("@") ? "email" : "phone"]: contact.trim() } : {};
    return { ...EMPTY_BUSINESS, ...old, ...saved };
  } catch {
    return EMPTY_BUSINESS;
  }
}

export function saveBusiness(b: Business) {
  try {
    localStorage.setItem(STORE, JSON.stringify(b));
  } catch {
    // storage blocked: still used for this copy
  }
}

/** The "Make it yours" note added to the end of a prompt when any detail is filled in. */
export function yourBusiness(b: Business, kind: "template" | "component") {
  if (!Object.values(b).some((v) => v.trim())) return "";
  const name = b.name.trim(),
    trade = b.trade.trim(),
    town = b.town.trim();
  const contact = [b.phone.trim() && `phone ${b.phone.trim()}`, b.email.trim() && `email ${b.email.trim()}`].filter(Boolean).join(", ");
  // "Harbour Kitchen, a seafood restaurant in Falmouth" / "Fern & Flour in Bristol" / "a florist in Leeds"
  const who = `${name}${name && trade ? ", " : ""}${trade ? `a ${trade}` : ""}${town ? ` in ${town}` : ""}`.trim();
  return `

## Make it yours
${kind === "template" ? "This website is" : "This section is"} for ${who || "the business described below"}.${contact ? ` Contact: ${contact}.` : ""}
Rewrite every heading, paragraph, button label, review, price and opening time so it is about this business, in a friendly, plain voice. Put the details above wherever the sample brand name, phone number, email or address appear. Keep the layout, spacing, motion, colours and fonts exactly as designed.`;
}
