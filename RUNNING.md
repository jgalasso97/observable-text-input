## Setup and Running Instructions

### Prerequisites
- Node.js version: 25.9.0
- npm version: 11.12.1

### Installation
```bash
# Clone the repository
git clone https://github.com/jgalasso97/observable-text-input.git
cd observable-text-input

# Install dependencies
npm install
```

### Running the Application
```bash
# Start the application
npm start

# Access the application at:
# http://localhost:[5173]
```

### Testing OpenTelemetry Output
To verify OpenTelemtry Output we will need to check both the browser developer tools and server console.

1. Access the application in the browser at http://localhost:[5173] and open developer tools. Then enter text into the text box and click "Submit". You will see two JSON Objects printed to the console (one for each API request). Each object represents one OpenTelemetry span. The object also includes a traceId which can be used to follow the request in the backend server.

2. Open the terminal/console where the server is running. Similar to the client, you will see spans being logged out to the console. You should be able to find spans that include the API request information such as "'http.route': '/num_vowels'" and "'http.route': '/length'"

3. To confirm that the tracing is working properly you can check that the traceID for the /length request and /num_vowels request matches for both the client (step 1) and the server (step 2).

## Developer's Choice Enhancement

### Enhancement: Rate Limiter

**Description:** Added an API rate limiter to the server using express-rate-limit.

**Rationale:** To keep the focus on reliability, I chose to implement a rate limiter. Rate limiting protects backend services from traffic spikes or malicious actors by ensuring no single user can monopolize backend resources which is critical to maintain system availability.

**Implementation Notes:** The implementation uses express-rate-limit to provide a quick and simple rate limiting solution. THe rate limiting is configured to limit each IP to 20 requests every minute (chose to easily test locally). The rate per IP is stored in memory but can also be configured to be stored externally such as in a db or redis. 

## Technology Stack

*Document the technologies you chose to use:*
- Client-side: Vite + React
- Server-side: Express
- OpenTelemetry: auto-instrumentations-node, auto-instrumentations-web, instrumentation-fetch, sdk-node, sdk-trace-web, sdk-trace-base

## API Documentation

### Endpoints


### **1. Get String Length**
Calculates and returns the total number of characters in a provided text string.

* **URL:** `/length`
* **Method:** `POST`
* **Content-Type:** `application/json`

#### **Request Body**
Accepts a JSON object containing the text.

| Key | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `text` | `string` | Yes | The string you want to find the length of. |

**Example Request:**
```json
{
  "text": "Hello, world!"
}
```

#### **Responses**

**Success Response (200 OK)**
Returns the length of the string as a number.

```json
{
  "length": 13
}
```

**Error Response (400 Bad Request)**
Returned if the `text` field is missing or is not a valid string.

```json
{
  "error": "Please provide a valid "text" string in the JSON body."
}
```

---

### **2. Count Vowels**
Calculates and returns the total count of vowels in a text string.

* **URL:** `/num_vowels`
* **Method:** `POST`
* **Content-Type:** `application/json`

#### **Request Body**
Accepts a JSON object containing the text.

| Key | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `text` | `string` | Yes | The string you want to count the vowels of. |

**Example Request:**
```json
{
  "text": "example string here"
}
```

#### **Responses**

**Success Response (200 OK)**
Returns the total count of vowels found in the string.

```json
{
  "vowel_count": 6
}
```

**Error Response (400 Bad Request)**
Returned if the `text` field is missing or is not a valid string.

```json
{
  "error": "Please provide a valid "text" string in the JSON body."
}
```
