package com.polytech.notes.services;

import com.polytech.notes.models.Configuration;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface ConfigurationService {
  List<Configuration> getAllConfigurations();
  Configuration saveConfiguration(Configuration c);
}
