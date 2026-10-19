import { FormEvent, ReactNode, useEffect, useState } from "react";
import logoMark from "./assets/logo.png";
import { lake, mekong, phnomPenh, projectAreas, provinces, rivers } from "./cambodiaMapData";
import { Lang, Translation, translations } from "./i18n";

const images = {
  hero: "https://images.unsplash.com/photo-1659067181027-8afc1940e89c?auto=format&fit=crop&w=2200&q=90",
  geology: "https://images.unsplash.com/photo-1685666586493-622c826886d5?auto=format&fit=crop&w=1400&q=85",
  drilling: "https://images.unsplash.com/photo-1696059928249-f036c4d54338?auto=format&fit=crop&w=1400&q=85",
  vision: "https://images.unsplash.com/photo-1770644426895-1f27aecda9e7?auto=format&fit=crop&w=2200&q=85",
};

type IconName = "pin" | "layers" | "globe" | "leaf" | "compass" | "drill" | "chart" | "community" | "arrow";

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    layers: <><path d="m12 3-9 5 9 5 9-5-9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.4 3 14.6 0 18M12 3c-3 3.4-3 14.6 0 18" /></>,
    leaf: <><path d="M20 4C11 4 5 8.5 5 15c0 2.7 2 5 5 5 6 0 10-7 10-16Z" /><path d="M4 21c3-5 7-8 12-11" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
    drill: <><path d="M7 3h10l-1 5H8L7 3ZM10 8v9m4-9v9M8 17h8M12 17v5" /><path d="m9 12 6 3m-6 0 6-3" /></>,
    chart: <><path d="M4 20V10m6 10V4m6 16v-7m4 7H2" /></>,
    community: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2" /><path d="M3 20c0-4 2.5-7 6-7s6 3 6 7M15 15c3 0 5 2 5 5" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Logo({ light = false, label }: { light?: boolean; label: string }) {
  return (
    <a className={`logo ${light ? "logo-light" : ""}`} href="#top" aria-label={label}>
      <span className="logo-mark"><img src={logoMark} alt="" /></span>
      <span><strong>GREEN ACTION</strong><small>CAMBODIA CO., LTD.</small></span>
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</div>;
}

const navIds = ["about", "project", "approach", "expertise", "contact"] as const;

const languages: [Lang, string][] = [["en", "EN"], ["km", "ខ្មែរ"]];

function LanguageSwitch({ lang, setLang, label }: { lang: Lang; setLang: (lang: Lang) => void; label: string }) {
  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {languages.map(([code, name]) => (
        <button key={code} type="button" lang={code} className={lang === code ? "is-active" : ""} aria-pressed={lang === code} onClick={() => setLang(code)}>{name}</button>
      ))}
    </div>
  );
}

function Header({ t, lang, setLang }: { t: Translation; lang: Lang; setLang: (lang: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Logo light={!scrolled} label={t.meta.homeLabel} />
      <nav className={`nav ${open ? "is-open" : ""}`} aria-label={t.meta.mainNav}>
        {navIds.map(id => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{t.nav[id]}</a>)}
      </nav>
      <div className="header-actions">
        <LanguageSwitch lang={lang} setLang={setLang} label={t.meta.languageLabel} />
        <a className="header-cta" href="#contact">{t.contactUs} <Icon name="arrow" size={17} /></a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={t.meta.toggleNav} aria-expanded={open}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

const projects = [
  { id: "01", key: "kampongSpeu", kind: "quartz", card: 20 },
  { id: "02", key: "battambang", kind: "metal", card: 205 },
] as const;

function CambodiaMap({ t }: { t: Translation["map"] }) {
  const kmScale = (100 / 111.32) * 76;
  return (
    <div className="map-wrap" aria-label={t.aria}>
      <svg className="topography" viewBox="0 0 700 620" aria-hidden="true">
        <path d="M-10 155c90-95 167-23 237-64s137-72 212 8 162 9 224 64" />
        <path d="M-30 198c94-91 173-22 245-61s139-69 218 8 169 8 232 61" />
        <path d="M-45 242c97-88 180-21 254-59s144-66 225 7 174 8 239 59" />
        <path d="M-60 482c110-74 204-18 288-49s162-56 253 6 196 6 270 50" />
        <path d="M-40 525c102-70 190-17 269-46s152-53 238 6 182 6 251 47" />
      </svg>
      <svg className="cambodia-shape" viewBox="0 0 640 580" role="img">
        <title>{t.title}</title>
        <defs>
          <linearGradient id="mapFill" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#0d8450" />
            <stop offset="1" stopColor="#00492a" />
          </linearGradient>
          <pattern id="grid" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M18 0H0v18" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
          </pattern>
          <clipPath id="khmClip"><path d={provinces + projectAreas.kampongSpeu.main + projectAreas.battambang.main} /></clipPath>
        </defs>

        <path className="country-outline" d={provinces + projectAreas.kampongSpeu.main + projectAreas.battambang.main} />
        <path className="country" d={provinces} />
        <path className="map-grid" d={provinces} />
        {projects.map(p => <path key={p.id} className={`province province-${p.kind}`} d={projectAreas[p.key].main} />)}
        <g clipPath="url(#khmClip)">
          <path className="river" d={rivers} />
          <path className="river river-main" d={mekong} />
        </g>
        <path className="lake" d={lake} />

        {projects.map(p => {
          const [cx, cy] = projectAreas[p.key].center;
          return (
            <g key={p.id} className={`project-marker marker-${p.kind}`}>
              <circle className="marker-ring ring-one" cx={cx} cy={cy} r="18" />
              <circle className="marker-badge" cx={cx} cy={cy} r="9.5" />
              <text x={cx} y={cy + 3.4} textAnchor="middle" className="marker-number">{p.id}</text>
            </g>
          );
        })}

        <circle className="capital-dot" cx={phnomPenh[0]} cy={phnomPenh[1]} r="4" />
        <text x={phnomPenh[0] + 8} y={phnomPenh[1] + 4} className="map-city">{t.phnomPenh}</text>
        <text x="268" y="262" textAnchor="middle" className="map-country-label">{t.cambodia}</text>
        <text x="150" y="282" className="map-water">{t.tonleSap}</text>

        {projects.map(p => {
          const area = projectAreas[p.key];
          const label = t.areas[p.key];
          return (
            <g key={p.id} className={`inset inset-${p.kind}`}>
              <rect className="inset-card" x="420" y={p.card} width="180" height="175" />
              <circle className="marker-badge" cx="584" cy={p.card + 20} r="9.5" />
              <text x="584" y={p.card + 23.4} textAnchor="middle" className="marker-number">{p.id}</text>
              <text x="434" y={p.card + 24} className="map-overline">{t.project} {p.id}</text>
              <text x="434" y={p.card + 44} className="map-label">{label.name.toUpperCase()}</text>
              <path className="inset-province" d={area.inset} />
              {area.districts.map(district => <path key={district.name} className="inset-district" d={district.d}><title>{district.name}</title></path>)}
              <circle className="marker-dot" cx={area.townInset[0]} cy={area.townInset[1]} r="3" />
              <text x={area.townInset[0] + 6} y={area.townInset[1] + 3.5} className="map-city">{label.town}</text>
              <text x="434" y={p.card + 165} className="map-overline inset-mineral">{label.mineral.toUpperCase()}</text>
            </g>
          );
        })}

        <g className="map-legend" transform="translate(430 415)">
          <rect className="province province-quartz" width="12" height="9" y="-8" />
          <text x="20" y="0">{t.legend[0]}</text>
          <rect className="province province-metal" width="12" height="9" y="12" />
          <text x="20" y="20">{t.legend[1]}</text>
          <path className="river river-main" d="M0 36h12" />
          <text x="20" y="40">{t.legend[2]}</text>
          <circle className="capital-dot" cx="6" cy="56" r="4" />
          <text x="20" y="60">{t.legend[3]}</text>
          <path className="scale-bar" d={`M0 82v5h${kmScale}v-5`} />
          <text x={kmScale + 8} y="88">{t.legend[4]}</text>
        </g>
      </svg>
      <div className="map-coordinate">{t.footer}</div>
    </div>
  );
}

function WorldMap({ hub, hubSmall }: { hub: string; hubSmall: string }) {
  const points = [
    ["20%", "25%"], ["46%", "55%"], ["55%", "67%"],
    ["25%", "61%"], ["28%", "74%"], ["83%", "70%"],
  ];
  return (
    <div className="world-map">
      <svg viewBox="0 0 1000 490" aria-hidden="true">
        <path d="M57 112 103 55l102-23 79 31 52 57-31 56-77 4-35 49-45-31-50 13-44-44Z M254 247l64 17 43 71-26 105-55-36-24-83-38-50Z M436 91l95-38 121 14 48 35-41 37-87-4-30 31-65-15-56-32Z M500 177l91 8 52 72-25 126-64 65-56-84-21-119Z M667 130l90-59 167 37 31 70-69 57-109-8-55 43-66-50Z M794 322l94-38 72 51-14 78-105 14-67-50Z" />
        <path className="routes" d="M200 122Q409 10 835 343M280 354Q510 180 835 343M470 260Q660 205 835 343M835 343Q700 490 550 354" />
      </svg>
      {points.map(([left, top]) => <div className="world-point" key={`${left}-${top}`} style={{ left, top }}><i /></div>)}
      <div className="world-hub"><i /><span>{hub}</span><small>{hubSmall}</small></div>
    </div>
  );
}

function readSavedLang(): Lang {
  try {
    return localStorage.getItem("lang") === "km" ? "km" : "en";
  } catch {
    return "en";
  }
}

function App() {
  const [sent, setSent] = useState(false);
  const [lang, setLang] = useState<Lang>(readSavedLang);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies for this visit.
    }
  }, [lang]);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("revealed")),
      { threshold: 0.12 },
    );
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div id="top">
      <Header t={t} lang={lang} setLang={setLang} />
      <main>
        <section className="hero">
          <img src={images.hero} alt={t.hero.imgAlt} />
          <div className="hero-overlay" />
          <div className="hero-lines" />
          <div className="hero-content reveal">
            <Eyebrow light>{t.hero.eyebrow}</Eyebrow>
            <h1>{t.hero.title}<br /><em>{t.hero.titleEm}</em></h1>
            <p>{t.hero.text}</p>
            <div className="button-row">
              <a className="button button-gold" href="#project">{t.hero.ctaProject} <Icon name="arrow" size={18} /></a>
              <a className="button button-ghost" href="#about">{t.hero.ctaAbout}</a>
            </div>
          </div>
          <div className="hero-meta">
            <div><small>{t.hero.regionLabel}</small><strong>{t.hero.region}</strong></div>
            <div><small>{t.hero.disciplineLabel}</small><strong>{t.hero.discipline}</strong></div>
          </div>
          <a className="scroll-cue" href="#about"><span /> {t.hero.scroll}</a>
        </section>

        <section className="section about" id="about">
          <div className="about-copy reveal">
            <Eyebrow>{t.about.eyebrow}</Eyebrow>
            <h2>{t.about.lines.map(line => <span key={line}>{line}<br /></span>)}<em>{t.about.lineEm}</em></h2>
            <p className="lead">{t.about.lead}</p>
            <p>{t.about.body}</p>
            <div className="highlights">
              {(["pin", "layers", "globe"] as const).map((icon, i) => <div key={icon}><Icon name={icon} /><span>{t.about.highlights[i]}</span></div>)}
            </div>
          </div>
          <div className="about-visual reveal">
            <div className="image-frame"><img src={images.geology} alt={t.about.imgAlt} /></div>
            <div className="image-note"><span>{t.about.noteLabel}</span><strong>{t.about.note[0]}<br />{t.about.note[1]}</strong></div>
            <div className="vertical-caption">{t.about.vertical}</div>
          </div>
        </section>

        <section className="project" id="project">
          <div className="section project-heading reveal">
            <div><Eyebrow light>{t.project.eyebrow}</Eyebrow><h2>{t.project.title}<br /><em>{t.project.titleEm}</em></h2></div>
            <p>{t.project.text}</p>
          </div>
          <div className="project-stage section">
            <CambodiaMap t={t.map} />
            <div className="project-card reveal">
              {projects.map((p, i) => (
                <div className="project-entry" key={p.id}>
                  <div className="card-index"><i className={`swatch swatch-${p.kind}`} />{t.project.projectLabel} / {p.id}</div>
                  <div className="data-row"><span>{t.project.location}</span><strong>{t.project.entries[i].location}</strong></div>
                  <div className="data-row"><span>{t.project.mineral}</span><strong>{t.project.entries[i].mineral}</strong></div>
                </div>
              ))}
              <div className="data-row"><span>{t.project.approach}</span><strong>{t.project.approachValue}</strong></div>
              <a href="#approach">{t.project.viewApproach} <Icon name="arrow" size={17} /></a>
            </div>
          </div>
        </section>

        <section className="section approach" id="approach">
          <div className="approach-intro reveal">
            <Eyebrow>{t.approach.eyebrow}</Eyebrow>
            <h2>{t.approach.title} <em>{t.approach.titleEm}</em></h2>
            <p>{t.approach.text}</p>
          </div>
          <div className="process reveal">
            {(["compass", "layers", "drill", "chart"] as const).map((icon, i) => (
              <div className="process-step" key={icon}>
                <div className="process-top"><span>0{i + 1}</span><i><Icon name={icon} /></i></div>
                <h3>{t.approach.steps[i].title}</h3><p>{t.approach.steps[i].text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="responsibility">
          <div className="section">
            <div className="responsibility-heading reveal">
              <div><Eyebrow light>{t.responsibility.eyebrow}</Eyebrow><h2>{t.responsibility.title}<br /><em>{t.responsibility.titleEm}</em></h2></div>
              <p>{t.responsibility.text}</p>
            </div>
            <div className="responsibility-grid reveal">
              {(["leaf", "compass", "community", "chart"] as const).map((icon, i) => (
                <article key={icon}><div><span>0{i + 1}</span><Icon name={icon} size={30} /></div><h3>{t.responsibility.items[i].title}</h3><p>{t.responsibility.items[i].text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section partner" id="expertise">
          <div className="partner-content reveal">
            <Eyebrow>{t.expertise.eyebrow}</Eyebrow>
            <h2>{t.expertise.title}<br /><em>{t.expertise.titleEm}</em></h2>
            <p className="lead">{t.expertise.lead}</p>
            <p>{t.expertise.body}</p>
            <div className="partner-mark"><span className="gold-disc">GA</span><div><small>{t.expertise.markLabel}</small><strong>{t.expertise.markValue}</strong></div></div>
          </div>
          <div className="partner-image reveal">
            <img src={images.drilling} alt={t.expertise.imgAlt} />
            <div className="partner-tag"><span>{t.expertise.tagLabel}</span><strong>{t.expertise.tag[0]}<br />{t.expertise.tag[1]}</strong></div>
          </div>
        </section>

        <section className="global">
          <div className="global-title reveal">
            <Eyebrow light>{t.global.eyebrow}</Eyebrow>
            <h2>{t.global.title} <em>{t.global.titleEm}</em></h2>
            <p>{t.global.text}</p>
          </div>
          <WorldMap hub={t.global.hub} hubSmall={t.global.hubSmall} />
        </section>

        <section className="section focus">
          <div className="focus-heading reveal"><Eyebrow>{t.focus.eyebrow}</Eyebrow><h2>{t.focus.title}</h2><p>{t.focus.text}</p></div>
          <div className="focus-grid reveal">
            {(["layers", "leaf", "globe", "pin"] as const).map((icon, i) => (
              <article key={icon}><span>0{i + 1}</span><Icon name={icon} size={32} /><h3>{t.focus.items[i].title}</h3><p>{t.focus.items[i].text}</p><i className="card-arrow"><Icon name="arrow" size={18} /></i></article>
            ))}
          </div>
        </section>

        <section className="vision">
          <img src={images.vision} alt={t.vision.imgAlt} />
          <div className="vision-overlay" />
          <div className="vision-content reveal">
            <Eyebrow light>{t.vision.eyebrow}</Eyebrow>
            <blockquote>{t.vision.quote}</blockquote>
            <span>GREEN ACTION (CAMBODIA) CO., LTD.</span>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-copy reveal">
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <h2>{t.contact.title}<br /><em>{t.contact.titleEm}</em></h2>
            <p>{t.contact.text}</p>
            <div className="contact-detail"><small>{t.contact.enquiries}</small><a href="mailto:cambodiagreenaction@gmail.com">cambodiagreenaction@gmail.com</a></div>
            <div className="contact-detail"><small>{t.contact.office}</small><span>{t.contact.officeValue}</span></div>
          </div>
          <form className="contact-form reveal" onSubmit={submit}>
            <div className="form-row">
              <label><span>{t.contact.name}</span><input required name="name" placeholder={t.contact.namePlaceholder} /></label>
              <label><span>{t.contact.company}</span><input name="company" placeholder={t.contact.companyPlaceholder} /></label>
            </div>
            <label><span>{t.contact.email}</span><input required type="email" name="email" placeholder="name@company.com" /></label>
            <label><span>{t.contact.message}</span><textarea required name="message" rows={4} placeholder={t.contact.messagePlaceholder} /></label>
            <button className="button button-green" type="submit">{sent ? t.contact.sent : t.contact.send} <Icon name="arrow" size={18} /></button>
            {sent && <p className="form-status">{t.contact.status}</p>}
          </form>
        </section>
      </main>
      <footer>
        <div className="footer-main">
          <div><Logo light label={t.meta.homeLabel} /><p>{t.footer.text}</p></div>
          <div><small>{t.footer.navigation}</small>{navIds.map(id => <a key={id} href={`#${id}`}>{t.nav[id]}</a>)}</div>
          <div><small>{t.footer.contact}</small><a href="mailto:cambodiagreenaction@gmail.com">cambodiagreenaction@gmail.com</a><span>{t.contact.officeValue}</span></div>
        </div>
        <div className="footer-bottom"><span>{t.footer.rights}</span><span>{t.footer.tagline}</span></div>
      </footer>
    </div>
  );
}

export default App;
