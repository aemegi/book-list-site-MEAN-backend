# Filename: Dockerfile
RUN node Index.js
COPY . .
EXPOSE 3000
CMD ["node", "Index.js"]
