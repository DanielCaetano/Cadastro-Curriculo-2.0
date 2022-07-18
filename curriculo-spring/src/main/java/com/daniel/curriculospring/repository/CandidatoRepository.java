package com.daniel.curriculospring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.daniel.curriculospring.model.CandidatoModel;

@Repository
public interface CandidatoRepository extends JpaRepository<CandidatoModel, Long>{
    
    @Query(value = "SELECT * FROM candidato WHERE cpf = :cpf", nativeQuery = true)
    public List<CandidatoModel> findByCpf(@Param("cpf") String cpf);
}
