FROM node:14

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application and the wait-for-it script
COPY . .
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

EXPOSE 3000:3000

# Wait for the database to be ready, then start the app
CMD ["./wait-for-it.sh", "db:5432", "--", "npm", "start"]
