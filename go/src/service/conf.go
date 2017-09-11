package service

import (
	"errors"
	"io/ioutil"
	"log"
	"strings"

	yaml "gopkg.in/yaml.v2"
)

type Conf struct {
	Addr  string `yaml:"addr,omitempty"`
	Debug bool   `yaml:"debug,omitempty"`
}

// DefaultConf populates a Conf structure with decent default values
func defaults() *Conf {
	conf := Conf{
		Addr: ":6040",
	}

	return &conf
}

// DefaultConf populates a Conf structure with decent default values
func DefaultConf() (*Conf, error) {
	return defaults(), nil
}

// ReadConfFile loads a configuration from the given filesystem path, using sensible defaults
// for values not specified in the file.
func ReadConfFile(filename string) (*Conf, error) {
	c := defaults()

	if err := c.load(filename); err != nil {
		return nil, err
	}

	if err := validateConfig(*c); err != nil {
		return nil, errors.New("errors found in parsed config: " + err.Error())
	}

	return c, nil
}

// load populates the application state with settings from the given file, overwriting any prepopulated fields
func (conf *Conf) load(filename string) error {
	file, err := ioutil.ReadFile(filename)
	if err != nil {
		return err
	}

	// populate bools with non-default value to detect if they are set
	if err := yaml.Unmarshal(file, &conf); err != nil {
		return err
	}

	return nil
}

// TODO validate - this does not get a reference to conf - READ ONLY validation step!
func validateConfig(conf Conf) error {
	var problems []string

	if len(problems) > 0 {
		return errors.New(strings.Join(problems, ", "))
	}

	return nil
}

// Printer prints out the current config in use
func (conf *Conf) Printer() {
	log.Println("---------------------------------------------")
	log.Println("Current configration")
	log.Println("---------------------------------------------")
	log.Printf("\tAddr - %s", conf.Addr)
	log.Printf("\tDebug - %t", conf.Debug)
	log.Println("---------------------------------------------")
}
