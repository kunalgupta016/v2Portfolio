---
summary: "An AI-assisted workspace that brings resume feedback and structured interview practice into one full-stack application."
---

## The problem

Job seekers often need to work on two connected tasks: improving a resume for a role and preparing to explain their experience in an interview. VivaMind brings resume analysis and interview practice together so users can move from reviewing their resume to practicing role-specific questions in one place.

The project is also published in its source repository as an AI Resume & Interview Assistant.

## The product approach

The experience is organized around two workflows:

1. **Resume analysis:** Upload a PDF resume, receive an AI-generated score out of 100, then review strengths, weaknesses, and improvement suggestions.
2. **Interview practice:** Choose a suggested role or enter a custom one. The app generates 15 questions—five each at easy, medium, and hard levels. Users answer one question at a time in a chat-style interface and receive a score, feedback, and a stronger-answer suggestion.

Signup and login keep the experience tied to a user, while history pages let users revisit earlier resume analyses and interview attempts. A responsive interface and dark-mode option support the surrounding workflow.

## Architecture: separate the interface, API, and AI workflow

The frontend is built with React 18, Vite, and Tailwind CSS. It communicates with a Node.js and Express API. The server organizes the application into routes, controllers, middleware, models, and services; the Gemini integration is kept in a service layer rather than being mixed into the page UI.

MongoDB with Mongoose stores application data. Authentication uses JWT and bcrypt, and resume upload and analysis routes require authentication. The resume upload route uses upload middleware for the PDF before passing it to the controller.

The main request paths look like this:

```text
Resume flow:
React UI → authenticated Express upload route → upload middleware
          → resume controller → Gemini service → analysis response/history

Interview flow:
React practice UI → authenticated Express interview route
                  → interview controller → Gemini service
                  → question set or answer feedback/history
```

This separation gives the interface a focused job—collect inputs and present results—while the API coordinates authentication, uploads, model calls, and persistence.

## Designing the AI workflows

### Make resume feedback actionable

The analyzer returns more than a single score. It surfaces strengths, weaknesses, and suggestions, giving the user specific areas to review. The score is a way to summarize model feedback, not a guarantee of how an employer will evaluate a resume.

### Give interview practice a clear rhythm

The interview flow creates a defined set of 15 questions across three difficulty levels. Presenting one question at a time keeps the practice session conversational. After an answer, the app returns an evaluation and suggested improvement before moving on.

### Keep AI calls behind the API

The frontend talks to Express routes rather than directly to Gemini. That keeps provider integration in the backend service layer and allows the route/controller flow to enforce authentication before processing resume and interview requests.

## Challenges and decisions

- **Two different AI tasks need different output shapes.** Resume review needs a score and categorized feedback; answer review needs evaluation and a suggested stronger response. Keeping these as separate workflows makes the experience easier to understand.
- **Resume uploads need a controlled path.** The upload route combines authentication with file-upload middleware before the controller handles the request.
- **AI feedback needs human judgment.** A generated score or suggestion can be useful for iteration, but it should not be presented as an objective hiring outcome. Users should review suggestions and keep their own voice and accurate experience.
- **A practice session should be reviewable.** Resume and interview history are part of the application so users can revisit their past work rather than treating every AI response as disposable.

## Trade-offs

- **Model responses can vary.** Gemini-generated questions and feedback depend on the prompt and model response. The app can organize and present that feedback, but it cannot make an AI evaluation equivalent to a human interviewer.
- **External AI calls add a dependency.** Resume analysis and interview generation rely on the model service being available and responding successfully.
- **Resume files contain personal information.** Upload and analysis are authenticated flows; handling resumes responsibly remains important throughout storage, logging, and retention.
- **A score is easy to scan, but incomplete by itself.** The detailed feedback is more useful than treating a single number as the final assessment.

## What I learned

Adding an AI API is only one part of an AI product. The surrounding workflow matters just as much: secure the request, collect the right input, ask for a useful response shape, present the output in a way people can act on, and give them a way to return to previous work.

VivaMind combines resume feedback and interview practice around that idea. It uses AI as a structured assistant for preparation—not as a replacement for the user’s judgment or authentic experience.
