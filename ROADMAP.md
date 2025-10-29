# sports-overlay Roadmap

Plan rozwoju aplikacji sports-overlay wraz z głównymi branchami i funkcjonalnościami.  
Dokument służy do zarządzania pomysłami na rozbudowę oraz monitorowania statusu poszczególnych zadań.

---

## Założenia zarządzania branchami

- Każda funkcjonalność rozwijana jest w oddzielnym branchu rozpoczynającym się od `feature/`
- Branch nazwany jest tematycznie, np. `feature/jobs-progress-tracking`
- Po zakończeniu praca wykonywany Pull Request do `main` lub `dev`
- Statusy gałęzi oznaczone ikonami (⚪, 🟡, 🟢, 🔴)

---

## Legenda statusów

- 🟢 Zakończone
- 🟡 W trakcie
- ⚪ Do zrobienia
- 🔴 Wstrzymane

---

## Aktualne branche i plany rozbudowy

### BRAK

---

## Pomysły na przyszłość

- Szczegółowa panel administracyjny z przeglądem i aktywnym zarządzaniem kolejkami zadań
- Eksport statystyk meczów oraz historii zadań do plików CSV/PDF
- Integracja z zewnętrznymi API sportowymi w celu wzbogacenia danych overlay
- Wdrożenie testów automatycznych (unit i e2e) dla kluczowych modułów

---

## Ostatnia aktualizacja

29.10.2025

---

## Dokumentacja

Dokumentacja zawiera opis i sposoby działania endpointów REST oraz sposobów autoryzacji.  
[Swagger UI](https://localhost:3000/api-docs)

---

## Instrukcje pracy z branchami — od utworzenia do połączenia w main

Poniżej kompletny sposób pracy z branchami od ich utworzenia, przez wprowadzanie zmian, aż do scalania (merge) z główną gałęzią `main`.

1. **Utworzenie nowego brancha**  
   Najpierw przełącz się na główny branch `main` i pobierz najnowsze zmiany:

```bash
git checkout main
git pull origin main
```

Następnie utwórz i przełącz się na nowy branch funkcjonalności (np. `feature/nazwa-funkcjonalnosci`):

```bash
git checkout -b feature/nazwa-funkcjonalnosci
```

2. **Wprowadzanie zmian**

- Pracuj nad kodem w nowym branchu.
- Dodawaj zmodyfikowane pliki do stage:

```bash
git add .
```

- Twórz commity z opisem zmian:

```bash
git commit -m "Opis wprowadzonych zmian"
```

3. **Aktualizacja brancha o zmiany z main**  
   W trakcie pracy warto regularnie synchronizować branch z `main`, aby uniknąć konfliktów:

```bash
git fetch origin
git rebase origin/main
```

Jeśli pojawią się konflikty, rozwiąż je, następnie:

```bash
git add <naprawione_pliki>
git rebase --continue
```

Alternatywnie można zamiast rebase wykonać merge:

```bash
git merge origin/main
```

4. **Wypchnięcie brancha na zdalne repozytorium**

Po zakończeniu zmian wypchnij branch:

```bash
git push origin feature/nazwa-funkcjonalnosci
```

5. **Utworzenie Pull Request (PR)**  
   Na platformie GitHub utwórz Pull Request z Twojego branchu `feature/nazwa-funkcjonalnosci` do `main`.  
   Dodaj opis zmian i ewentualne wymagania do review.

6. **Aktualizacja brancha w PR o nowe zmiany z main**  
   Jeżeli w trakcie przeglądu pojawiły się nowe commity w `main`, zsynchronizuj branch:

Rebase:

```bash
git fetch origin
git checkout feature/nazwa-funkcjonalnosci
git rebase origin/main
```
