package com.polytech.notes.controllers;

import com.polytech.notes.models.Configuration;
import com.polytech.notes.services.ConfigurationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/configuration")
@CrossOrigin
public class ConfigurationController {

  @Autowired
  private ConfigurationService service;

  @GetMapping("/all")
  public List<Configuration> getAll() {
    return service.getAllConfigurations();
  }

  @PostMapping("/add")
  public Configuration addConfiguration(@RequestBody Configuration config) {
    return service.saveConfiguration(config);
  }
}
