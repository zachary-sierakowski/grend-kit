TAG ?= latest
IMAGE ?= default-nginx

WORKING_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
.PHONY: all build

all: build

build:
	@echo
	@echo "*** Building $(IMAGE):$(TAG) (run: 'TAG=xxxxx make' to override Docker image tag) ***"
	@echo
	docker build -t "$(IMAGE):$(TAG)" .