## grend-kit

A starter kit for Golang, React v16, Express, Nginx and Docker.

### Building

```
make
```

Run `make` from the root directory to build the Golang service (`grend-service` by default), Nginx proxy (`grend-nginx` by default), and UI (`grend-ui` by default) docker images. The image names can be updated by passing in different names to the `make` command or updating the defaults in [Makefile](./Makefile). 

### Running

```
docker-compose up -d
```

Run `docker-compose up -d` from the `./docker` directory to run all images together. The compose file to run the images can be found [here](./docker/docker-compose.yml). If you updated the image names built in the Makefile, update the corresponding names in the compose file as well.

To view the UI, navigate to [http://localhost:80](http://localhost:80).

---

### G - Golang Service

The golang service is a simple server that handles one request to `/health`. This endpoint returns a "Service is running normally" string.

### R - React v16

The UI image is built with react's latest version v16. The ui makes a request to the go service `/health` and also has a Error boundary setup for an example error. Run `yarn start` from `./js/react` to serve up the app on [http://localhost:3000](http://localhost:3000).

### E - Express Server

The express server is setup to serve up the react application on the root path (`/`). Requests to `/contact` use [nodemailer](https://github.com/nodemailer/nodemailer) to build and send emails. The body of the request should be JSON in the following format:

```
{
  subject: "", 
  name: "", 
  email: "", 
  phone: ""
}
```

### N - Nginx Proxy

The nginx proxy is setup to pass all `/` requests over to the UI image (`grend-ui` by default). Requests made to `/service` will be proxied to the golang service image (`grend-service` by default). To make changes to the proxy, edit [nginx.conf](./nginx/nginx.conf).

### D - Docker

The `./docker` directory contains a docker compose file to run each of the built images. There are Dockerfiles for each image [here](go/Dockerfile), [here](js/Dockerfile) and [here](nginx/Dockerfile).