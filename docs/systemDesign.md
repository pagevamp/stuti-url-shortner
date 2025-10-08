## Data modeling :

The following data model consists the blueprint for the url-shortener project and describes how data should be structured, organized, and related within this project.

The process involves defining entities (objects), their attributes (characteristics), and relationships (connections)

| Entity                 | Description                           |
| ---------------------- | ------------------------------------- |
| User                   | Registered user with verified email.  |
| Url                    | Shortened URL belonging to a user.    |
| UrlHit                 | Each time a shortened URL is visited. |
| EmailVerificationToken | Token to verify user email.           |

For user:

| Field     | Type            | Description           |     
| --------- | --------------- | --------------------- |  
| id        | UUID            | Primary key           |     
| name      | string          | User’s name           |     
| email     | string (unique) | User email            |     
| password  | string          | Hashed password       |     
| verifiedAt| timestamp       | Email verified time   |     
| createdAt | timestamp       | User created time     |     

For each Url:

| Field      | Type            | Description          |
| ---------- | --------------- | -------------------- |
| id         | UUID            | Primary key          |
| shortUrl   | string (unique) | Generated short code |
| longUrl    | text            | Original URL         |
| expiryDate | date            | Expiration date      |
| userId     | UUID (FK)       | Reference to `User`  |
| createdAt  | timestamp       | Url created time     |

For Url analytics: 

| Field     | Type      | Description        |
| --------- | --------- | ------------------ |
| hitId     | UUID      | Primary key        |
| urlId     | UUID (FK) | Reference to `Url` |
| ipAddress | string    | Visitor IP         |
| country   | string    | Parsed from IP     |
| userAgent | text      | Raw user agent     |
| browser   | text      | Visitor browser    |
| os        | text      | Operating system   |
| device    | text      | User Device info   |
| clickedAt | timestamp | Timestamp of visit |

For email authentication :

| Field       | Type      | Description     |
| ----------- | --------- | --------------- |
| id          | UUID      | Primary key     |
| userId      | UUID (FK) | Associated user |
| token       | string    | Unique token    |
| expireAlert | timestamp | Expiration date |

### **Relationship between them**

1. User (1) → (M) Url
2. Url (1) → (M) UrlAnalytics
3. User (1) → (1) EmailVerificationToken

## Entity Relation Diagram

![Entity Relation diagram](er.drawio.png)