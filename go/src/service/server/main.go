package main

import (
	"flag"

	log "github.com/Sirupsen/logrus"
	"github.com/gin-gonic/gin"

	service "service"
)

func main() {
	confFile := flag.String("conf", "", "A filesystem path to a config file")
	flag.Parse()

	var conf *service.Conf
	var err error
	if *confFile == "" {
		conf, err = service.DefaultConf()
	} else {
		conf, err = service.ReadConfFile(*confFile)
	}
	if err != nil {
		log.Fatalf("Unable to configure this service: %v", err.Error())
	}

	if conf.Debug {
		log.SetLevel(log.DebugLevel)
	}

	conf.Printer()

	rh := service.RouteHandlers{
		HealthHandler: &service.HealthHandler{},
	}

	router := gin.Default()
	router.Use(Cors())
	service.LoadRoutes(router, &rh)
	router.Run(conf.Addr)
}

// Cors middleware enables CORS for all routes
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, X-ProxiedEntitiesChain")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
