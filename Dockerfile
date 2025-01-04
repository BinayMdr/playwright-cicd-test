FROM node:18-bookworm



WORKDIR /usr/src/app

COPY package*.json ./


COPY . .

RUN npm install \ 
    && npx playwright install-deps  \
    && npx playwright install chromium \
    && npx playwright install firefox 


# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the app
CMD ["npx", "playwright", "test"]