package com.polytech.notes.services;

import com.polytech.notes.models.Configuration;
import com.polytech.notes.repositories.ConfigurationRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfigurationServiceDefault implements ConfigurationService {
 
  @Autowired
  private ConfigurationRepository repository;

  @Override
  public List<Configuration> getAllConfigurations() {
    return repository.findAll();
  }

  @Override
  public Configuration saveConfiguration(Configuration c) {
    return repository.save(c);
  }
}
