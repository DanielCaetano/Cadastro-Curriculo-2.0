package com.daniel.curriculospring.service;

import java.io.Console;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.daniel.curriculospring.model.CandidatoModel;
import com.daniel.curriculospring.model.StatusEntrega;
import com.daniel.curriculospring.repository.CandidatoRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CandidatoService {

    private CandidatoRepository candidatoRepository;

    public List<CandidatoModel> listar() {
        Sort sort = Sort.by("id").descending();
        return candidatoRepository.findAll(sort);
    }

    public ResponseEntity<CandidatoModel> buscar_id(Long id) {
        return candidatoRepository.findById(id)
                .map(candidato -> ResponseEntity.ok(candidato))
                .orElse(ResponseEntity.notFound().build());
    }

    public List<CandidatoModel> buscar_cpf(String cpf) {
        return candidatoRepository.findByCpf(cpf);
    }

    public List<CandidatoModel> buscar_status(String status) {
        return candidatoRepository.findByCpf(status);
    }

    public CandidatoModel adicionar(CandidatoModel candidato) {
        candidato.setStatusCandidato(StatusEntrega.Aguardando);
        return candidatoRepository.save(candidato);
    }

    public ResponseEntity<CandidatoModel> atualizar(Long id, CandidatoModel candidato) {
        if (!candidatoRepository.existsById(id)) {
            System.out.println("id não encontrado atualizar");
            return ResponseEntity.notFound().build();
        }
        System.out.println("atualizado");
        candidato.setId(id);
        return ResponseEntity.ok(
                candidatoRepository.save(candidato));
                
    }

    public ResponseEntity<CandidatoModel> delete(Long id){
        if (!candidatoRepository.existsById(id)) {
            System.out.println("id não encontrado");
            return ResponseEntity.notFound().build();
        }
        candidatoRepository.deleteById(id);
        System.out.println("ID deletado ");
        return ResponseEntity.noContent().build();
    }

    public Long quantidadePorStatus(String status){
        return candidatoRepository.quantidadePorStatus(status);
    }

    public Long quantidadePorEscolaridade(String escolaridade){
        return candidatoRepository.quantidadePorEscolaridade(escolaridade);
    }

}
