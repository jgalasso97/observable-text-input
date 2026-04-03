# Sr SRE Coding Exercise - OpenTelemetry JavaScript Integration

## Overview

Welcome to our Sr SRE coding exercise! This exercise is designed to evaluate your skills in building observable applications using OpenTelemetry with JavaScript, both in the browser and server environments.

You'll be creating a full-stack application that demonstrates your understanding of:
- Modern JavaScript development (client and server)
- OpenTelemetry instrumentation and observability
- API design and implementation
- Code organization and documentation

**Time Expectation:** 2-4 hours

## Exercise Requirements

### Functional Requirements

#### User Interface
- Create a web UI containing:
  - A form with a single text input field
  - A submit button
  - Clear instructions prompting the user to enter text of their choosing and submit the form
  - Display areas to show results from API calls

#### Client-Side Behavior
- On form submission, the UI must make **two concurrent asynchronous calls** to the server endpoints
- Pass the entered text as input to both endpoints
- Display the results from both API calls clearly to the user
- Handle loading states and potential errors gracefully

#### Server-Side Implementation
Implement a Node.js server with two REST API endpoints:

1. **`GET /length`** (or `POST /length`)
   - Accepts text input as a parameter/body
   - Returns the character length of the input text
   - Response format: `{ "length": number }`

2. **`GET /num_vowels`** (or `POST /num_vowels`)
   - Accepts text input as a parameter/body
   - Returns the count of vowels (a, e, i, o, u - case insensitive) in the input text
   - Response format: `{ "vowel_count": number }`

### Non-Functional Requirements

#### Repository & Setup
- Submit your solution as a Git repository
- Include clear setup and run instructions in the template found in RUNNING.md
- Application must be easy to build and run locally from a clean repository clone
- Include any necessary dependencies in `package.json`
- Provide a single command to start both client and server (or clear instructions for separate processes)
- Do not use any existing Vanguard libraries or exemplars!

#### OpenTelemetry Integration
- **Server-side**: Implement OpenTelemetry auto-instrumentation
  - Instrument HTTP requests, responses, and any other relevant operations
  - Configure trace exporters (console exporter is acceptable for this exercise)
  - Ensure spans are created for each endpoint call

- **Client-side**: Implement OpenTelemetry auto-instrumentation
  - Instrument fetch/XHR requests to the server
  - Configure trace exporters (console exporter is acceptable for this exercise)
  - Ensure client-side spans correlate with server-side spans when possible (trace IDs in client should correspond to trace IDs on server)

### Developer's Choice Enhancement

Implement **one** additional feature or enhancement of your choosing. This is an opportunity to showcase your creativity and technical decision-making. Some examples include:

**Feature Examples:**
- Additional text analysis endpoints
- Input validation and sanitization
- Rate limiting or caching mechanisms
- Text analysis history/persistence

**Implementation Enhancement Examples:**
- Performance optimizations (memoization, etc.)
- Error handling/retry logic
- Custom OpenTelemetry instrumentation

**Requirements for your enhancement:**
- Document your chosen enhancement in the "Developer's Choice" section in RUNNING.md
- Explain why you chose this particular enhancement
- Describe how it adds value to the application

## Submission Guidelines

1. **Code Repository:** Ensure your Git repository is complete and includes all necessary files
2. **RUNNING.md Updates:** Use the template in RUNNING.md to provide usage instructions, document your technology choices, etc

## Evaluation Criteria

Your submission will be evaluated on:

### Technical Implementation (60%)
- Correct implementation of functional requirements
- OpenTelemetry integration and configuration
- Usage of resiliency techniques where applicable

### Enhancement & Problem-Solving (20%)
- Creativity and technical merit of chosen enhancement
- Quality of implementation
- Clear explanation of choices and rationale

### Developer Experience (20%)
- Clear and accurate setup/run instructions
- Repository organization and documentation
- Ease of building and running the application
- Code readability and maintainability

## Questions?

If you have questions about the requirements or need clarification on any aspect of the exercise, contact benjamin_schmaus@vanguard.com via email or Teams.

Good luck, and we look forward to reviewing your solution!
