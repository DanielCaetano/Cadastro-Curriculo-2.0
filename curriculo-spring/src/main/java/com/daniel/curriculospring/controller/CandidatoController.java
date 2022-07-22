package com.daniel.curriculospring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.daniel.curriculospring.model.CandidatoModel;
import com.daniel.curriculospring.service.CandidatoService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/candidato")
@AllArgsConstructor
public class CandidatoController {
    @Autowired
    private final CandidatoService candidatoService;

    @GetMapping
    public List<CandidatoModel> listar() {
        return candidatoService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidatoModel> buscar_id(@PathVariable Long id) {
        return candidatoService.buscar_id(id);
    }

    @GetMapping("/cpf/{cpf}")
    public List<CandidatoModel> buscar_cpf(@PathVariable String cpf) {
        return candidatoService.buscar_cpf(cpf);
    }

    //@GetMapping("/status/{status}")
    //public List<CandidatoModel> buscar_status(@PathVariable String status) {
    //    return candidatoService.buscar_status(status);
    //}

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public CandidatoModel adicionar(@RequestBody CandidatoModel candidato) {
        return candidatoService.adicionar(candidato);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CandidatoModel> atualizar(@PathVariable Long id,
            @RequestBody CandidatoModel candidato) {
        System.out.println("Atualizar candidato");
        return candidatoService.atualizar(id, candidato);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CandidatoModel> deletar(@PathVariable Long id){
        System.out.println("deletando candidato");
        return candidatoService.delete(id);
    }

    @GetMapping("/status/{status}")
    public Long quantidadePorStatus(@PathVariable String status){
        System.out.println("buscando status");
        return candidatoService.quantidadePorStatus(status);
    }

    @GetMapping("/escolaridade/{escolaridade}")
    public Long quantidadePorEscolaridade(@PathVariable String escolaridade){
        System.out.println("buscando escolaridade");
        return candidatoService.quantidadePorEscolaridade(escolaridade);
    }
}
