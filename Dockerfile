FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN pnpm build

# Expose port 3000
EXPOSE 3000

# Set environment variable for port
ENV PORT=3000

# Start the app
CMD ["pnpm", "start"] 