import helmet from "helmet";

export default helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [
        "'self'",
        "'unsafe-eval'",
        "'unsafe-inline'",
        "http://localhost:5001",
        "https://www.google.com/",
        "https://ka-f.fontawesome.com/",
        "https://cdn.jsdelivr.net/",
        "https://cdnjs.cloudflare.com",
        "https://images.unsplash.com/",
        "https://m.media-amazon.com",
        "https://www.seekpng.com",
        "https://cdn.vox-cdn.com/",
        "https://dmn-dallas-news-prod.cdn.arcpublishing.com/",
        "https://www.gannett-cdn.com/",
        "https://kit.fontawesome.com",
        "http://www.omdbapi.com/",
        "https://maxst.icons8.com/",
      ],
    },
  },
  frameguard: { action: "deny" },
  hsts: { maxAge: 7776000000, includeSubDomains: true },
});
