package com.daniel.curriculospring.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.daniel.curriculospring.model.CandidatoModel;

@Repository
public interface CandidatoRepository extends JpaRepository<CandidatoModel, Long>{
    List<CandidatoModel> findByNomeContaining(String nome);

    Optional<CandidatoModel> findById(Long id);

    @Query(value = "SELECT * FROM candidato WHERE cpf = :cpf", nativeQuery = true)
    public List<CandidatoModel> findByCpf(@Param("cpf") String cpf);

    @Query(value = "SELECT * FROM candidato WHERE status = :status", nativeQuery = true)
    public List<CandidatoModel> findByStatus(@Param("status") String status);

    @Query(value = "select count(status) from candidato where status = :status ", nativeQuery = true)
    public Long quantidadePorStatus(@Param("status")String status);

    @Query(value = "select count(escolaridade) from candidato where escolaridade = :escolaridade ", nativeQuery = true)
    public Long quantidadePorEscolaridade(@Param("escolaridade")String escolaridade);
}
