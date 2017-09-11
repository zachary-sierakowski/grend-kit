TAG ?= latest
IMAGE ?= default-ui

WORKING_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
.PHONY: all build node_modules webpack

all: build

build: node_modules webpack
	@echo
	@echo "*** Building $(IMAGE):$(TAG) (run: 'TAG=xxxxx make' to override Docker image tag) ***"
	@echo
	docker build -t "$(IMAGE):$(TAG)" .

node_modules:
	( cd react && yarn )

webpack:
	( cd react && yarn build )