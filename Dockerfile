# Tahap 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode sumber ke dalam container
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Tahap 2: Jalankan aplikasi yang sudah dibuild
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Install 'serve' untuk melayani aplikasi Next.js yang sudah dibuild
RUN npm install -g serve

# Copy hasil build dari tahap sebelumnya
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port 3000 untuk akses aplikasi
EXPOSE 3000

# Jalankan aplikasi Next.js menggunakan 'serve'
CMD ["serve", "-s", ".next", "-l", "3000"]
