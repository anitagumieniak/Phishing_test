// script.js
// Quiz: Phishing czy nie? — pełna logika
// Wymagane: w HTML element <main id="quiz"></main> oraz przyciski w header:
// #toggleTheme, #zoomIn, #zoomOut (skrypt utworzy resztę UI dynamicznie).

/* -------------------------
   1) Dane: 30 e-maili
   ------------------------- */
const emails = [
  {
    from: "Orange Polska <faktury@orange-pl.com>",
    subject: "Nieopłacona faktura",
    body: `Szanowny Kliencie,\nTwoja ostatnia faktura nie została opłacona. Prosimy o natychmiastową reakcję:\nhttps://orange-polska.com/faktura`,
    phishing: true,
  },
  {
    from: "Netflix <no-reply@netflix.com>",
    subject: "Nowy login do Twojego konta",
    body: `Zauważyliśmy logowanie do Twojego konta z nowej lokalizacji. Jeśli to nie Ty, zabezpiecz konto.`,
    phishing: false,
  },
  {
    from: "Urząd Skarbowy <info@podatki-gov.pl>",
    subject: "Zwrot podatku",
    body: `Masz prawo do zwrotu. Wypełnij formularz:\nhttp://podatki-gov.com/zwrot`,
    phishing: true,
  },
  {
    from: "Allegro <support@allegro.pl>",
    subject: "Potwierdzenie zamówienia nr 84523",
    body: `Twoje zamówienie zostało przyjęte do realizacji. Dziękujemy za zakupy!`,
    phishing: false,
  },
  {
    from: "Bank PKO <kontakt@pko24-pl.com>",
    subject: "Twoje konto zostało zablokowane",
    body: `Aby odblokować dostęp, zaloguj się pod adresem:\nhttps://pko24-pl.com/login`,
    phishing: true,
  },
  {
    from: "InPost <powiadomienia@inpost.pl>",
    subject: "Twoja paczka czeka w Paczkomacie",
    body: `Kliknij, aby śledzić przesyłkę:\nhttps://inpost.pl/tracking/12345`,
    phishing: false,
  },
  {
    from: "InPost <info@inpost-track.com>",
    subject: "Nieudana próba doręczenia paczki",
    body: `Twoja przesyłka nie mogła zostać dostarczona. Odbierz ponownie:\nhttps://inpost-track.com/paczka`,
    phishing: true,
  },
  {
    from: "Microsoft <security@microsoft.com>",
    subject: "Ochrona konta Microsoft",
    body: `Wykryliśmy próbę logowania z nieznanego urządzenia. Sprawdź aktywność.`,
    phishing: false,
  },
  {
    from: "Facebook <alert@facebook-security.com>",
    subject: "Twoje konto zostanie zablokowane!",
    body: `Aby uniknąć blokady, zaloguj się natychmiast:\nhttps://facebook-security.com/login`,
    phishing: true,
  },
  {
    from: "Play <no-reply@play.pl>",
    subject: "Nowa faktura do opłacenia",
    body: `Twoja faktura za usługi Play jest gotowa. Sprawdź ją w aplikacji Play24.`,
    phishing: false,
  },
  {
    from: "DHL <service@dhl-delivery.eu>",
    subject: "Twoja przesyłka została zatrzymana",
    body: `Kliknij, aby opłacić brakujące cło:\nhttp://dhl-delivery.eu/oplaty`,
    phishing: true,
  },
  {
    from: "Spotify <info@spotify.com>",
    subject: "Problem z płatnością",
    body: `Nie mogliśmy pobrać opłaty za subskrypcję. Zaktualizuj dane płatności.`,
    phishing: false,
  },
  {
    from: "Ministerstwo Zdrowia <covid@mz-gov.com>",
    subject: "Obowiązkowe szczepienia COVID-19",
    body: `Wypełnij formularz rejestracyjny pod adresem:\nhttp://mz-gov.com/szczepienia`,
    phishing: true,
  },
  {
    from: "Amazon <no-reply@amazon.pl>",
    subject: "Zamówienie wysłane!",
    body: `Twoje zamówienie zostało wysłane. Śledź przesyłkę w swoim koncie.`,
    phishing: false,
  },
  {
    from: "Amazon <support@amaz0n-poland.com>",
    subject: "Problem z Twoim kontem Amazon",
    body: `Zaloguj się, aby potwierdzić dane:\nhttps://amaz0n-poland.com`,
    phishing: true,
  },
  {
    from: "mBank <serwis@mbank-online.com>",
    subject: "Pilne: aktualizacja danych klienta",
    body: `Kliknij, aby zaktualizować dane:\nhttp://mbank-online.com/update`,
    phishing: true,
  },
  {
    from: "mBank <info@mbank.pl>",
    subject: "Nowa wiadomość w serwisie transakcyjnym",
    body: `Zaloguj się, aby odczytać wiadomość w bezpiecznym systemie.`,
    phishing: false,
  },
  {
    from: "Poczta Polska <noreply@poczta-polska.pl>",
    subject: "Awizo elektroniczne",
    body: `Twoja przesyłka czeka w oddziale. Odbierz w ciągu 7 dni.`,
    phishing: false,
  },
  {
    from: "Poczta Polska <info@poczta-polska24.com>",
    subject: "Paczka wstrzymana z powodu opłaty",
    body: `Opłać koszt 1,99 zł, aby otrzymać przesyłkę:\nhttp://poczta-polska24.com/oplaty`,
    phishing: true,
  },
  {
    from: "YouTube <no-reply@youtube.com>",
    subject: "Nowy komentarz pod Twoim filmem",
    body: `Użytkownik dodał komentarz. Sprawdź go w studio.youtube.com.`,
    phishing: false,
  },
  {
    from: "YouTube <info@youtube-service.net>",
    subject: "Twoje konto zostanie usunięte",
    body: `Kliknij, aby potwierdzić dane logowania:\nhttps://youtube-service.net/verify`,
    phishing: true,
  },
  {
    from: "Apple <no-reply@apple.com>",
    subject: "Zakup aplikacji w App Store",
    body: `Zakupiono aplikację w App Store. Jeśli to nie Ty, skontaktuj się z pomocą Apple.`,
    phishing: false,
  },
  {
    from: "Apple Support <help@apple-security.pl>",
    subject: "Zawieszenie konta Apple ID",
    body: `Twoje konto Apple zostało zawieszone. Odblokuj je tutaj:\nhttps://apple-security.pl`,
    phishing: true,
  },
  {
    from: "LinkedIn <no-reply@linkedin.com>",
    subject: "Masz nowe zaproszenie do sieci",
    body: `Kliknij, aby zobaczyć nowe zaproszenie do kontaktów.`,
    phishing: false,
  },
  {
    from: "LinkedIn <support@linkedln.com>",
    subject: "Twoje konto zostanie zablokowane!",
    body: `Zaloguj się, aby potwierdzić dane:\nhttp://linkedln.com/security`,
    phishing: true,
  },
  {
    from: "Google <no-reply@google.com>",
    subject: "Nowe logowanie do Twojego konta",
    body: `Nowe logowanie z urządzenia Samsung Galaxy. Jeśli to Ty — zignoruj.`,
    phishing: false,
  },
  {
    from: "Google Security <alert@google-verif.com>",
    subject: "Zawieszenie konta Gmail",
    body: `Zaloguj się natychmiast, aby przywrócić dostęp:\nhttp://google-verif.com/login`,
    phishing: true,
  },
  {
    from: "PayPal <no-reply@paypal.com>",
    subject: "Potwierdzenie płatności",
    body: `Otrzymaliśmy Twoją płatność w wysokości 29,99 USD.`,
    phishing: false,
  },
  {
    from: "PayPal <support@paypa1-security.com>",
    subject: "Zablokowane konto PayPal",
    body: `Zaloguj się w celu potwierdzenia tożsamości:\nhttps://paypa1-security.com`,
    phishing: true,
  },
  {
    from: "Onet <noreply@onet.pl>",
    subject: "Nowe wiadomości w skrzynce",
    body: `Masz nowe wiadomości e-mail. Sprawdź je na onet.pl.`,
    phishing: false,
  },
  {
    from: "Onet <info@onet-mail-secure.com>",
    subject: "Twoje konto zostanie usunięte!",
    body: `Kliknij, aby zachować dostęp:\nhttp://onet-mail-secure.com/verify`,
    phishing: true,
  },
];

/* -------------------------
   2) Ustawienia quizu
   ------------------------- */
const TOTAL_QUESTIONS = 10; // losujemy 10 z 30

/* -------------------------
   3) Stan gry
   ------------------------- */
let quizEmails = []; // wylosowane 10
let current = 0;
let score = 0;
let userAnswers = []; // { indexInEmails, chosenIsPhishing, correct }

/* -------------------------
   4) Elementy DOM — budowa UI
   ------------------------- */
const main = document.getElementById("quiz");
if (!main) {
  console.error('Brak elementu #quiz w HTML. Dodaj <main id="quiz"></main>.');
} else {
  // Nadpisz zawartość main — utwórz layout quizu
  main.innerHTML = `
    <section id="email-card" class="card" aria-live="polite">
      <div id="progress" class="progress">Pytanie 1/${TOTAL_QUESTIONS}</div>
      <div id="email-meta" class="email-meta">
        <div><strong>Nadawca:</strong> <span id="email-from"></span></div>
        <div><strong>Temat:</strong> <span id="email-subject"></span></div>
      </div>
      <pre id="email-body" class="email-body"></pre>

      <div id="controls" class="controls">
        <button id="btnPhishing" class="answer-btn" aria-pressed="false"> Phishing</button>
        <button id="btnSafe" class="answer-btn" aria-pressed="false"> Bezpieczne</button>
      </div>

      <div id="feedback" class="feedback hidden" role="status" aria-live="polite"></div>

      <div id="nav" class="nav hidden">
        <button id="btnNext">Dalej ➜</button>
      </div>
    </section>

    <section id="result" class="card hidden">
      <h2>Wynik</h2>
      <p id="scoreText"></p>
      <div id="breakdown"></div>
      <button id="btnRestart">Zagraj ponownie</button>
    </section>
  `;
}

/* Pobieramy elementy */
const elFrom = document.getElementById("email-from");
const elSubject = document.getElementById("email-subject");
const elBody = document.getElementById("email-body");
const elProgress = document.getElementById("progress");
const btnPhishing = document.getElementById("btnPhishing");
const btnSafe = document.getElementById("btnSafe");
const elFeedback = document.getElementById("feedback");
const elNav = document.getElementById("nav");
const btnNext = document.getElementById("btnNext");
const elResult = document.getElementById("result");
const elScoreText = document.getElementById("scoreText");
const elBreakdown = document.getElementById("breakdown");
const btnRestart = document.getElementById("btnRestart");

/* -------------------------
   5) Pomocnicze funkcje
   ------------------------- */

// Losowanie unikalnych N indeksów z tablicy emails
function pickRandomEmails(n) {
  const idx = emails.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx.slice(0, n).map((i) => ({ ...emails[i], _sourceIndex: i }));
}

// Bezpieczne wyświetlenie tekstu (zachowujemy łamanie linii)
function renderBody(text) {
  // pre element wykorzystujemy, ale upewnij się że nie ma HTML
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* -------------------------
   6) Renderowanie pytania
   ------------------------- */
function showCurrent() {
  const item = quizEmails[current];
  elFrom.textContent = item.from;
  elSubject.textContent = item.subject;
  elBody.innerHTML = renderBody(item.body);
  elProgress.textContent = `Pytanie ${current + 1}/${TOTAL_QUESTIONS}`;
  // ukryj feedback / nav
  elFeedback.classList.add("hidden");
  elNav.classList.add("hidden");
  // włącz przyciski
  btnPhishing.disabled = false;
  btnSafe.disabled = false;
  btnPhishing.setAttribute("aria-pressed", "false");
  btnSafe.setAttribute("aria-pressed", "false");
  // focus na przycisku phishing dla wygody
  btnPhishing.focus();
}

/* -------------------------
   7) Obsługa odpowiedzi
   ------------------------- */
function handleAnswer(chosenIsPhishing) {
  // zapobiegamy wielokrotnym odpowiedziom
  btnPhishing.disabled = true;
  btnSafe.disabled = true;

  const correct = quizEmails[current].phishing;
  const wasCorrect = chosenIsPhishing === correct;
  if (wasCorrect) score++;

  // zapisz odpowiedź
  userAnswers.push({
    indexInEmails: quizEmails[current]._sourceIndex,
    chosenIsPhishing,
    correct: correct,
  });

  // pokaż feedback
  elFeedback.classList.remove("hidden");
  elNav.classList.remove("hidden");

  if (wasCorrect) {
    elFeedback.innerHTML = `<strong class="ok"> Dobra odpowiedź!</strong><div class="explain">${explainAnswer(
      quizEmails[current]
    )}</div>`;
  } else {
    elFeedback.innerHTML = `<strong class="bad"> Niepoprawnie.</strong><div class="explain">Poprawna odpowiedź: <strong>${
      correct ? "Phishing" : "Bezpieczne"
    }</strong>.<br>${explainAnswer(quizEmails[current])}</div>`;
  }
}

/* Krótki komentarz edukacyjny do każdej wiadomości — heurystyki */
function explainAnswer(item) {
  const hints = [];
  // jeśli w nadawcy lub domenie są podejrzane znaki / literówki
  if (
    /[\d\-_].*amazon|amaz0n|paypa1|google-verif|pko24-pl|podatki-gov|inpost-track|poczta-polska24|youtube-service|apple-security|linkedln|paypa1-security/i.test(
      item.from + item.body
    )
  ) {
    hints.push(
      "Sprawdź dokładnie adres nadawcy i domenę — często oszuści używają literówek lub dodatkowych słów w domenie."
    );
  }
  // jeśli w treści są bezpośrednie linki HTTP (nie HTTPS) lub krótkie żądanie danych
  if (
    /http:\/\//i.test(item.body) ||
    /kliknij|zaloguj się .* natychmiast|odblokuj|potwierdź dane|wypełnij formularz|opłać/i.test(
      item.body
    )
  ) {
    hints.push(
      "Linki prowadzące przez HTTP lub prośba o natychmiastowe działanie to częsty znak phishingu."
    );
  }
  // jeśli wiadomość ma ogólny zwrot (Szanowny Kliencie) i żąda danych
  if (
    /Szanowny Kliencie|Twoje konto zostało zablokowane|zwrot podatku|zaloguj się aby|potwierdź dane/i.test(
      item.body
    )
  ) {
    hints.push(
      "Wiadomość używa nacisku czasowego lub ogólnych zwrotów — wątpliwe, jeśli nie spodziewasz się kontaktu."
    );
  }
  // jeśli żaden z powyższych nie pasuje, podaj bezpiecznik
  if (hints.length === 0)
    hints.push(
      "Treść wygląda autentycznie — sprawdź jednak nadawcę i oficjalne kanały (np. aplikację banku) zanim klikniesz."
    );
  return hints.join(" ");
}

/* -------------------------
   8) Zdarzenia przycisków
   ------------------------- */
btnPhishing.addEventListener("click", () => handleAnswer(true));
btnSafe.addEventListener("click", () => handleAnswer(false));

btnNext.addEventListener("click", () => {
  current++;
  if (current < quizEmails.length) {
    showCurrent();
  } else {
    showResults();
  }
});

btnRestart.addEventListener("click", startQuiz);

/* Klawiatura: Enter lub spacja wybierają aktywny przycisk (dostępność) */
document.addEventListener("keydown", (e) => {
  // nie przechwytuj gdy fokus w polu tekstowym (textarea/input) — ale tutaj nie ma takich
  if (e.key === "ArrowRight") {
    // skrót: przejdź dalej jeśli widoczny
    if (!elNav.classList.contains("hidden")) btnNext.click();
  }
  if (e.key === "1") btnPhishing.click();
  if (e.key === "2") btnSafe.click();
});

/* -------------------------
   9) Podsumowanie wyników
   ------------------------- */
function showResults() {
  // ukryj kartę email i pokaż wynik
  const card = document.getElementById("email-card");
  if (card) card.classList.add("hidden");
  elResult.classList.remove("hidden");
  elScoreText.textContent = `Twój wynik: ${score} / ${quizEmails.length} poprawnych.`;

  // szczegółowe rozbicie
  elBreakdown.innerHTML = ""; // czyścimy
  userAnswers.forEach((ans, i) => {
    const original = emails[ans.indexInEmails];
    const row = document.createElement("div");
    row.className = "break-row";
    row.innerHTML = `
      <div class="b-head">Pytanie ${i + 1}: <strong>${
      original.subject
    }</strong></div>
      <div><em>Nadawca:</em> ${original.from}</div>
      <pre class="mini-body">${renderBody(original.body)}</pre>
      <div><strong>Twoja odpowiedź:</strong> ${
        ans.chosenIsPhishing ? "Phishing" : "Bezpieczne"
      } — <strong>Poprawna:</strong> ${
      ans.correct ? "Phishing" : "Bezpieczne"
    }</div>
      <div class="explain small">${explainAnswer(original)}</div>
      <hr>
    `;
    elBreakdown.appendChild(row);
  });

  // focus na przycisku restart
  btnRestart.focus();
}

/* -------------------------
   10) Start / Restart
   ------------------------- */
function startQuiz() {
  // reset stanu
  quizEmails = pickRandomEmails(TOTAL_QUESTIONS);
  current = 0;
  score = 0;
  userAnswers = [];
  // pokaż właściwe sekcje
  const card = document.getElementById("email-card");
  if (card) card.classList.remove("hidden");
  elResult.classList.add("hidden");
  // render
  showCurrent();
}

/* -------------------------
   11) Tryb kontrastowy + zoom (zakłada, że elementy #toggleTheme, #zoomIn, #zoomOut istnieją)
   ------------------------- */
const toggleThemeBtn = document.getElementById("toggleTheme");
const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");

if (toggleThemeBtn) {
  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("contrast");
    // dla a11y: poinformuj
    if (document.body.classList.contains("contrast"))
      toggleThemeBtn.textContent = "🌙 Tryb normalny";
    else toggleThemeBtn.textContent = "🌗 Tryb kontrastu";
  });
}

let zoomLevel = 1;
function applyZoom() {
  document.body.style.setProperty("--zoom", zoomLevel.toFixed(2));
}
if (zoomInBtn) {
  zoomInBtn.addEventListener("click", () => {
    zoomLevel = Math.min(1.5, zoomLevel + 0.1);
    applyZoom();
  });
}
if (zoomOutBtn) {
  zoomOutBtn.addEventListener("click", () => {
    zoomLevel = Math.max(0.8, zoomLevel - 0.1);
    applyZoom();
  });
}

/* -------------------------
   12) Drobne style JS-friendly (opcjonalnie)
   ------------------------- */
/* 
  Skrypt oczekuje że w CSS masz:
  body { --zoom: 1; transform: scale(var(--zoom)); transform-origin: top center; transition: transform .15s; }
  .hidden { display: none; }
  .card { padding, margin, background itp. }
  .contrast { --bg-color: #000; --text-color: #ff0; --accent: #ff0; }
  .ok { color: #0a0; } .bad { color: #b00; }
  .answer-btn { min-width, font-size etc. }
  Możesz dodać te reguły do style.css (polecam).
*/

/* -------------------------
   13) Uruchomienie
   ------------------------- */
startQuiz();
