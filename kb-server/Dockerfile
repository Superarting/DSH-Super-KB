FROM node:20-alpine

WORKDIR /app
COPY server-v3.js /app/server-v3.js

ENV KB_ROOT=/data \
    KB_PORT=8787 \
    KB_HOST=0.0.0.0

EXPOSE 8787
CMD ["node", "/app/server-v3.js"]
