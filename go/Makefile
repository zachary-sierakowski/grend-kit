TAG ?= latest
IMAGE ?= default-service

WORKING_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
.PHONY: all build clean

all: build

build:
	@echo
	@echo "*** Building $(IMAGE):$(TAG) (run: 'TAG=xxxxx make' to override Docker image tag) ***"
	@echo
	GOPATH=$(WORKING_DIR) GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -a -o bin/service service/server
	docker build -t "$(IMAGE):$(TAG)" .

clean:
	rm -rf bin

