import { useEffect } from "react";

const useCDN = (href: string, type: "css" | "js") => {
  useEffect(() => {
    let el: HTMLLinkElement | HTMLScriptElement;

    if (type === "css") {
      el = document.createElement("link");
      el.rel = "stylesheet";
      el.href = href;
    } else {
      el = document.createElement("script");
      el.src = href;
    }

    document.head.appendChild(el);

    return () => {
      document.head.removeChild(el);
    };
  }, [href, type]);
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  // Bootstrap CSS
  useCDN("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "css");
  
  // Font Awesome
  useCDN("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css", "css");
  
  // jQuery
  useCDN("https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js", "js");

  return (`<div className="admin-layout">
    {children}
  </div>`);
};

export { useCDN, AdminLayout };
export default useCDN;
