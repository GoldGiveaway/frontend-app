FROM node:18-alpine AS builder

RUN mkdir -p /home/app/ && chown -R node:node /home/app
WORKDIR /home/app
COPY --chown=node:node . .
COPY --chown=node:node .vitepress .

USER node

RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:1.27.3
COPY --from=builder /home/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]