# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "student",
  "institution": "University Name"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "60d5ec49c1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "2026-02-25T10:30:00Z"
  }
}
```

### Login User
**POST** `/auth/login`

Authenticates user and returns JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "60d5ec49c1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

---

## Resource Endpoints

### Get All Resources
**GET** `/resources?category=&level=&resourceType=&page=1&limit=10&sort=-createdAt`

Retrieves paginated list of approved public resources.

**Query Parameters:**
- `category` (optional): Category ID
- `level` (optional): beginner, intermediate, advanced, professional
- `resourceType` (optional): textbook, research_paper, study_guide, video, worksheet
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Results per page
- `sort` (optional, default: -createdAt): Sort field

**Response (200):**
```json
{
  "resources": [
    {
      "_id": "60d5ec49c1234567890abcd",
      "title": "Advanced Mathematics",
      "description": "Comprehensive guide to advanced mathematics",
      "author": "Dr. Smith",
      "category": { "_id": "...", "name": "Mathematics" },
      "resourceType": "textbook",
      "level": "advanced",
      "downloads": 150,
      "views": 500,
      "rating": 4.5
    }
  ],
  "pagination": {
    "total": 245,
    "pages": 25,
    "currentPage": 1,
    "perPage": 10
  }
}
```

### Get Resource by ID
**GET** `/resources/:id`

Retrieves detailed information about a specific resource.

**Response (200):**
```json
{
  "_id": "60d5ec49c1234567890abcd",
  "title": "Advanced Mathematics",
  "description": "Comprehensive guide...",
  "author": "Dr. Smith",
  "category": { "_id": "...", "name": "Mathematics" },
  "subject": "Mathematics",
  "level": "advanced",
  "resourceType": "textbook",
  "fileUrl": "https://...",
  "coverImage": "https://...",
  "tags": ["algebra", "calculus", "geometry"],
  "keywords": [],
  "downloads": 150,
  "views": 501,
  "rating": 4.5,
  "reviews": [],
  "uploadedBy": { "_id": "...", "name": "Dr. Smith", "email": "..." },
  "isApproved": true,
  "createdAt": "2026-02-20T10:00:00Z"
}
```

### Upload Resource
**POST** `/resources`

Upload a new educational resource.

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "title": "Advanced Mathematics",
  "description": "Comprehensive guide to advanced mathematics",
  "author": "Dr. Smith",
  "category": "60d5ec49c1234567890abcd",
  "resourceType": "textbook",
  "subject": "Mathematics",
  "level": "advanced",
  "tags": ["algebra", "calculus"],
  "fileUrl": "https://cloudinary.com/path/to/file",
  "fileMimeType": "application/pdf"
}
```

**Response (201):**
```json
{
  "message": "Resource uploaded successfully",
  "resource": { ... }
}
```

### Download Resource
**POST** `/resources/:id/download`

Track a resource download.

**Authentication:** Required

**Response (200):**
```json
{
  "message": "Download initiated",
  "downloads": 151
}
```

---

## Search Endpoints

### Search Resources
**GET** `/search/:query?page=1&limit=10`

Full-text search across resources.

**Path Parameters:**
- `query`: Search term (URL encoded)

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Results per page

**Response (200):**
```json
{
  "resources": [ ... ],
  "pagination": { ... }
}
```

### Advanced Search
**GET** `/search?query=&category=&level=&resourceType=&subject=&language=&page=1&limit=20`

Advanced search with multiple filters.

**Query Parameters:**
- `query` (optional): Search term
- `category` (optional): Category ID
- `level` (optional): Difficulty level
- `resourceType` (optional): Resource type
- `subject` (optional): Subject area
- `language` (optional): Language

---

## User Endpoints

### Get User Profile
**GET** `/users/profile`

Retrieve authenticated user's profile.

**Authentication:** Required

**Response (200):**
```json
{
  "_id": "60d5ec49c1234567890abcd",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "institution": "University Name",
  "bio": "Student of mathematics",
  "interests": ["mathematics", "physics"],
  "downloadedResources": [ { "_id": "...", "title": "..." } ],
  "savedResources": [ { "_id": "...", "title": "..." } ],
  "createdAt": "2026-02-20T10:00:00Z"
}
```

### Update User Profile
**PUT** `/users/profile`

Update user profile information.

**Authentication:** Required

**Request Body:**
```json
{
  "name": "John Doe",
  "institution": "New University",
  "bio": "Updated bio",
  "interests": ["mathematics", "physics", "chemistry"]
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

### Save Resource
**POST** `/users/saved-resources/:resourceId`

Add a resource to user's saved collection.

**Authentication:** Required

**Response (200):**
```json
{
  "message": "Resource saved"
}
```

### Remove Saved Resource
**DELETE** `/users/saved-resources/:resourceId`

Remove a resource from saved collection.

**Authentication:** Required

**Response (200):**
```json
{
  "message": "Resource removed from saved"
}
```

---

## Admin Endpoints

### Get Pending Resources
**GET** `/admin/resources/pending`

Retrieve resources awaiting approval.

**Authentication:** Required (Admin role)

**Response (200):**
```json
[
  {
    "_id": "60d5ec49c1234567890abcd",
    "title": "Resource Title",
    "description": "...",
    "uploadedBy": { "_id": "...", "name": "...", "email": "..." },
    "category": { "_id": "...", "name": "..." },
    "resourceType": "textbook",
    "level": "intermediate",
    "subject": "Mathematics"
  }
]
```

### Approve Resource
**POST** `/admin/resources/:id/approve`

Approve a pending resource.

**Authentication:** Required (Admin role)

**Response (200):**
```json
{
  "message": "Resource approved",
  "resource": { ... }
}
```

### Reject Resource
**POST** `/admin/resources/:id/reject`

Reject and delete a resource.

**Authentication:** Required (Admin role)

**Response (200):**
```json
{
  "message": "Resource rejected and deleted"
}
```

### Get Admin Statistics
**GET** `/admin/statistics`

Retrieve platform statistics.

**Authentication:** Required (Admin role)

**Response (200):**
```json
{
  "totalUsers": 1250,
  "totalResources": 3450,
  "totalDownloads": 45000,
  "pendingApprovals": 12
}
```

---

## Analytics Endpoints

### Get Dashboard Analytics
**GET** `/analytics/dashboard`

Retrieve analytics data for admin dashboard.

**Authentication:** Required (Admin role)

**Response (200):**
```json
{
  "statistics": {
    "totalResources": 3450,
    "approvedResources": 3400,
    "totalDownloads": 45000,
    "totalViews": 150000
  },
  "resourcesByType": [
    { "_id": "textbook", "count": 1200 },
    { "_id": "research_paper", "count": 900 }
  ],
  "resourcesByLevel": [
    { "_id": "beginner", "count": 800 },
    { "_id": "intermediate", "count": 1500 }
  ],
  "topResources": [ ... ],
  "recentUploads": [ ... ]
}
```

---

## Feedback Endpoints

### Submit Feedback
**POST** `/feedback`

Submit user feedback or report issue.

**Authentication:** Required

**Request Body:**
```json
{
  "type": "bug_report",
  "subject": "Search not working",
  "message": "The search feature is not returning results",
  "resource": "60d5ec49c1234567890abcd"
}
```

**Response (201):**
```json
{
  "message": "Feedback submitted successfully",
  "feedback": { ... }
}
```

### Get User Feedback
**GET** `/feedback/user`

Retrieve user's submitted feedback.

**Authentication:** Required

**Response (200):**
```json
[ { ... }, { ... } ]
```

### Get All Feedback (Admin)
**GET** `/feedback/admin/all?status=&priority=&page=1&limit=20`

Retrieve all platform feedback.

**Authentication:** Required (Admin role)

**Query Parameters:**
- `status` (optional): open, in_progress, resolved, closed
- `priority` (optional): low, medium, high, critical
- `page` (optional): Page number
- `limit` (optional): Results per page

**Response (200):**
```json
{
  "feedback": [ ... ],
  "pagination": { ... }
}
```

### Respond to Feedback
**PUT** `/feedback/:id/respond`

Admin response to feedback.

**Authentication:** Required (Admin role)

**Request Body:**
```json
{
  "response": "We've fixed this issue in the latest update",
  "status": "resolved"
}
```

**Response (200):**
```json
{
  "message": "Feedback responded",
  "feedback": { ... }
}
```

---

## Category Endpoints

### Get All Categories
**GET** `/categories`

Retrieve all resource categories.

**Response (200):**
```json
[
  {
    "_id": "60d5ec49c1234567890abcd",
    "name": "Mathematics",
    "description": "Mathematical resources",
    "icon": "📐",
    "color": "#007bff",
    "resourceCount": 450
  }
]
```

### Get Category by ID
**GET** `/categories/:id`

Get specific category details.

**Response (200):**
```json
{
  "_id": "60d5ec49c1234567890abcd",
  "name": "Mathematics",
  "description": "Mathematical resources",
  "subcategories": ["Algebra", "Geometry", "Calculus"],
  "resourceCount": 450
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error",
  "message": "Error details (development only)"
}
```

---

## Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Admin endpoints: 200 requests per 15 minutes

## Pagination

All list endpoints support pagination:
- `page`: Current page (1-indexed, default: 1)
- `limit`: Items per page (default: 10, max: 100)

Total pages calculation: `pages = Math.ceil(total / limit)`

---

**API Version**: 1.0.0  
**Last Updated**: February 2026
