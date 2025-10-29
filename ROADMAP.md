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

## Instrukcje pullowania i łączenia branchy (merge/rebase)

Aby bezpiecznie aktualizować i łączyć zmiany z innych gałęzi, stosuj poniższe kroki:

1. **Synchronizacja lokalnego brancha z `main` (lub `dev`) przed pracą:**

```bash
git checkout feature/twoj-branch
git fetch origin
git rebase origin/main
```

**lub zamiast rebase:**

```bash
git merge origin/main
```

2. **Rozwiązywanie ewentualnych konfliktów podczas rebase lub merge**

- Edytuj pliki z konfliktami
- `git add <naprawione_pliki>`
- `git rebase --continue` lub `git commit` (w przypadku merge)

3. **Po zakończeniu pracy, wypchnij branch na zdalne repo:**

```bash
git push origin feature/twoj-branch
```

4. **Stwórz Pull Request (PR) na GitHubie do głównej gałęzi (`main` lub `dev`)**

5. **Aktualizuj branch w PR o nowe zmiany z `main`, jeśli pojawiły się po otwarciu PR**

- Użyj rebase:

```bash
git checkout feature/twoj-branch
git fetch origin
git rebase origin/main
git push --force-with-lease origin feature/twoj-branch
```

lub merge:

```bash
git checkout feature/twoj-branch
git fetch origin
git merge origin/main
git push origin feature/twoj-branch
```
