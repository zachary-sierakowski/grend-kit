package service

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Health handles requests from the router
type HealthHandler struct{}

// HealthCheck handles a GET health check request
func (hlh *HealthHandler) HealthCheck(c *gin.Context) {
	c.Data(http.StatusOK, "text/plain", []byte("Service is running normally"))
}
