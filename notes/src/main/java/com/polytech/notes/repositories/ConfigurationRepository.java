package com.polytech.notes.repositories;

import com.polytech.notes.models.Configuration;
import com.polytech.notes.models.Matiere;
import com.polytech.notes.models.Unite;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigurationRepository
  extends JpaRepository<Configuration, Long> {}
