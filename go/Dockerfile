FROM golang

COPY bin/service /service
COPY config/service.yaml /service.yaml

EXPOSE 6040

ENTRYPOINT ["/service", "-conf=/service.yaml"]
