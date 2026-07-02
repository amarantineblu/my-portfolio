import supabase from "./../supabase";

export async function logVisitor(userAgent?: string, page?: string) {
  try {
    // Get IP-based location
    const geoRes = await fetch("https://ipapi.co/json/");
    const geo = await geoRes.json();

    const { ip, city, country_name, region } = geo;

    const { error } = await supabase.from("visitors").insert({
      timestamp: new Date().toISOString(),
      page,
      url: window.location.href,
      referrer: document.referrer || "direct",
      user_agent: userAgent ?? navigator.userAgent,
      language: navigator.language,
      screen_size: `${window.screen.width}x${window.screen.height}`,
      ip,
      city,
      country: country_name,
      region,
    });

    if (error) {
    } else {
    }
  } catch (err) {
    console.error("Error fetching location:", err);
  }
}
