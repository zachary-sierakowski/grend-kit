package service

import (
	"github.com/gin-gonic/gin"
)

type RouteHandlers struct {
	HealthHandler *HealthHandler
}

// LoadRoutes adds routes to the router
func LoadRoutes(router *gin.Engine, rh *RouteHandlers) {
	// health check
	router.GET("/health", rh.HealthHandler.HealthCheck)
}
