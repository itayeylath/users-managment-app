# Use an appropriate base image for your backend (e.g., Node.js)
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend files
COPY . ./

# Start the backend application
CMD ["npm", "start"]