# NaturalRootines – Project Development Spec

**Version:** 1.3
**Datum:** 02. Juli 2026
**Zweck:** Zentrale Referenz für alle technischen Entwicklungsarbeiten am Blog NaturalRootines mit Kiro.

---

## 1. Projekt-Überblick

**Name:** NaturalRootines
**Domain:** naturalrootines.de
**Beschreibung:**
Persönlicher Blog rund um smarte Routinen für mehr Energie, Fitness, Gesundheit, Supplements, Mindset und nachhaltige Lebensweise – speziell für Menschen ab ca. 35 Jahren.

**Zielgruppe:**
Berufstätige Menschen 35+, die sich aktiv mit Training, Erholung, Ernährung und Nahrungsergänzungsmitteln beschäftigen und nach ehrlichen, praxisnahen Impulsen suchen.

**Ton & Haltung:**
Persönlich, ehrlich, nuanciert und praxisorientiert. Kein Hype. Der Fokus liegt auf umsetzbaren Alltags-Verbesserungen.

**Aktueller Status (Live-Seite):**
- Ghost CMS
- Seite ist **public** und live unter https://naturalrootines.de/
- Sauberes, übersichtliches Blog-Design
- mobile first
- Post-Feed im Listen-Stil mit Titel, Tags, Datum, Lesezeit und Excerpt
- Themenbereiche: Fitness, Gesundheit, Mindset, Supplements
- Keine prominent sichtbaren Membership- oder Paid-Content-Hinweise auf der Startseite

---

## 2. Technischer Stack

| Bereich                  | Technologie                  | Details |
|--------------------------|------------------------------|--------|
| CMS                      | **Ghost**                    | Aktuell |
| Theme                    | Source (angepasst)           | Custom Theme Settings aktiv |
| Template Engine          | **Handlebars**               | Standard für Ghost Themes |
| CSS Framework            | **Tailwind CSS v4**          | Wird für das Styling verwendet |
| Post Feed                | Listen-Style                 | Bestätigt auf Live-Seite |
| Design System            | Modern Sans-Serif            | - |
| Farben                   | Accent: `#006045`            | Dunkelgrün/Teal |
| Navigation               | Logo mittig                  | - |

**Wichtige Hinweise zum Tech-Stack:**
- Das Theme basiert auf Handlebars-Templates.
- Tailwind CSS v4 wird für das gesamte Styling eingesetzt (inkl. neuer Features von v4).
- Ghost Custom Theme Settings sind weiterhin aktiv und sollten bei Anpassungen berücksichtigt werden.

---

## 3. Design & Branding Richtlinien

- **Branding:** Durchgängig **NaturalRootines**
- **Farben:**
  - Accent-Farbe: `#006045`
  - Heller, sauberer Hintergrund
- **Typografie:** Moderne Sans-Serif Schrift für Titel und Fließtext
- **Layout:** Clean, gut lesbar, übersichtlich
- **Bilder:** Natürliche, hochwertige Bilder mit Alltags- oder Naturbezug
- **Mobile:** Vollständig responsiv

**Entwicklungsregel:**
Alle Theme-Anpassungen müssen das ruhige, seriöse und gut lesbare Erscheinungsbild erhalten. Da Tailwind v4 verwendet wird, sollen neue Styles möglichst utility-first und konsistent mit dem bestehenden Tailwind-Setup umgesetzt werden.

---

## 4. Inhalts-Struktur & Taxonomie

**Aktuelle Tags:**
- Fitness
- Gesundheit
- Mindset
- Supplements

**Technische Anforderungen an Artikel:**
- Klare H2/H3-Struktur
- Interne Verlinkungen zu thematisch passenden Artikeln
- Gute Featured Images mit Alt-Text
- Bullet-Listen für bessere Lesbarkeit
- Persönliches Fazit + Einladung zum Kommentieren am Ende

---

## 5. Technische Anforderungen & Qualitätsstandards

### Performance
- Schnelle Ladezeiten
- Optimierte Bilder
- Effiziente Nutzung von Tailwind (keine unnötig großen Builds)

### SEO (technisch)
- Saubere Slugs
- Korrekte Meta-Titel & Descriptions
- Gute interne Verlinkung
- Sinnvolle Heading-Struktur

### UX & Accessibility
- Hohe Lesbarkeit
- Gute Kontraste
- Klare Navigation
- Mobile-First

---

## 6. Aktueller Status & Beobachtungen (Live-Seite)

**Positiv:**
- Sauberes, modernes und übersichtliches Design
- Guter Lesefluss durch Listen-Feed
- Klare thematische Ausrichtung
- Seite ist öffentlich erreichbar
- Modernes Tech-Setup mit Tailwind v4 + Handlebars

**Zu beachten:**
- Theme ist angepasst, aber noch Optimierungspotenzial vorhanden
- Interne Verlinkung zwischen Artikeln könnte stärker ausgebaut werden
- Membership/Newsletter ist technisch nicht prominent auf der Startseite sichtbar

---

## 7. Entwicklungs-Prinzipien (für die Arbeit mit Kiro)

1. Alle Änderungen immer im Kontext dieser Spec machen.
2. Bestehendes Design, Lesefluss und Tailwind-Struktur nicht unnötig verändern.
3. Mobile Experience und Lesbarkeit haben hohe Priorität.
4. Neue Styles sollen möglichst mit Tailwind v4 Utility Classes umgesetzt werden.
5. Bei Theme-Anpassungen immer Handlebars-Templates und bestehende Custom Theme Settings berücksichtigen.
6. Bei Unsicherheit zuerst in dieser Spec nachschlagen.
7. Lieber kleine, saubere Verbesserungen als große, riskante Änderungen.

---

## 8. Mögliche nächste Entwicklungsschwerpunkte

- Theme-Optimierungen mit Tailwind v4 (Header, Related Articles, Lesefluss, Mobile)
- Ausbau der internen Verlinkung und thematischen Cluster
- Performance-Optimierung (besonders Tailwind Build)
- Bessere Sichtbarkeit von Newsletter / Membership (falls gewünscht)

---