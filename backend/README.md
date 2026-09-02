# Roxvora Backend

FastAPI + MongoDB backend for the Roxvora e-commerce platform.

## Tech Stack

- **Framework**: FastAPI
- **Database**: MongoDB (via Motor async driver)
- **Auth**: JWT (access + refresh tokens) with bcrypt password hashing
- **Validation**: Pydantic v2

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app entry point
│   ├── core/
│   │   ├── config.py        # Settings loaded from .env
│   │   ├── security.py      # JWT creation, password hashing
│   │   └── database.py      # MongoDB connection
│   ├── models/              # MongoDB document models
│   ├── schemas/             # Pydantic request/response schemas
│   ├── api/
│   │   ├── __init__.py      # Router aggregator
│   │   ├── auth/            # Auth routes (login, refresh, logout)
│   │   └── admin/           # Admin routes (dashboard, products, ...)
│   ├── services/            # Business logic layer
│   ├── utils/               # Shared helpers (response, pagination, validators)
│   └── uploads/             # Local file uploads (products, categories, banners)
├── .env                     # Local environment variables (not committed)
├── .env.example             # Template for environment variables
└── requirements.txt         # Python dependencies
```

## Getting Started

### 1. Create and activate a virtual environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

```bash
cp .env.example .env
# Edit .env with your MongoDB URL, secret key, etc.
```

### 4. Run the development server

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.  
Interactive docs: `http://localhost:8000/docs`

## API Endpoints

| Prefix                    | Description          |
|---------------------------|----------------------|
| `POST /api/v1/auth/login` | Admin login          |
| `POST /api/v1/auth/refresh` | Refresh access token |
| `GET  /api/v1/admin/dashboard/stats` | Dashboard stats |
| `GET  /api/v1/admin/products` | List products |
| `GET  /api/v1/admin/categories` | List categories |
| `GET  /api/v1/admin/orders` | List orders |
| `GET  /api/v1/admin/customers` | List customers |
| `GET  /api/v1/admin/offers/coupons` | List coupons |
| `GET  /api/v1/admin/content/banners` | List banners |
| `GET  /api/v1/admin/settings` | Get store settings |

Full interactive docs available at `/docs` when the server is running.
