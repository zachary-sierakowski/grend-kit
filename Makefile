TAG ?= latest
SERVICE_IMAGE ?= grend-service
UI_IMAGE ?= grend-ui
NGINX_IMAGE ?= grend-nginx

.PHONY: all build

all: build

build:
	IMAGE=${SERVICE_IMAGE} TAG=${TAG} $(MAKE) -C go
	IMAGE=${UI_IMAGE} TAG=${TAG} $(MAKE) -C js
	IMAGE=${NGINX_IMAGE} TAG=${TAG} $(MAKE) -C nginx