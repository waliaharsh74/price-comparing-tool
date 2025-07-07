# Price Comparing Tool

This project exposes an API that uses the [SerpAPI](https://serpapi.com/) Google Shopping engine to fetch product prices. It is built with TypeScript and Express.

## Requirements

- Node.js 18+
- npm

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and provide your configuration values:

   ```bash
   cp .env.example .env
   # edit .env to set SERP_API_KEY and PORT
   ```

3. Build the TypeScript project:

   ```bash
   npm run build
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The API will be available on `http://localhost:${PORT}`.

### Development

Use the development script to automatically rebuild and run the server:

```bash
npm run dev
```

### Testing

Run the test suite with:

```bash
npm test
```

## Docker

A `Dockerfile` is included to run the application in a container.

Build the image:

```bash
docker build -t price-comparing-tool .
```

Run the container, providing your API key via environment variables:

```bash
docker run -p 3000:3000 -e SERP_API_KEY=your_key price-comparing-tool
```

Set `PORT` with `-e PORT=your_port` if you wish to use a custom port.
